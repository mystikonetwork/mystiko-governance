import { ERC20, MystikoVoteToken } from '@mystikonetwork/contracts-abi-governance';
import {
  DefaultProviderFactory,
  fromDecimals,
  toBN,
  toDecimals,
  waitTransactionHash,
} from '@mystikonetwork/utils';
import { PopulatedTransaction, providers } from 'ethers';
import { Config } from './config';
import { createErrorPromise, MystikoGovernanceErrorCode } from './error';

export class Client {
  private readonly config: Config;

  private readonly xzkInstance: ERC20;

  private readonly vXZkInstance: MystikoVoteToken;

  public provider: providers.Provider;

  constructor(chainId: number = 1) {
    this.config = new Config(chainId);
    const factory = new DefaultProviderFactory();
    this.provider = factory.createProvider(this.config.providers);
    this.xzkInstance = this.config.xzkContractInstance(this.provider);
    this.vXZkInstance = this.config.vXZkContractInstance(this.provider);
  }

  public xzkBalance(account: string): Promise<number> {
    return this.xzkInstance
      .balanceOf(account)
      .then((balance) => fromDecimals(toBN(balance.toString()), this.config.tokenDecimals))
      .catch((error) => createErrorPromise(error.toString()));
  }

  public vXZkBalance(account: string): Promise<number> {
    return this.vXZkInstance
      .balanceOf(account)
      .then((balance) => fromDecimals(toBN(balance.toString()), this.config.tokenDecimals))
      .catch((error) => createErrorPromise(error.toString()));
  }

  public approve(account: string, amount: number): Promise<PopulatedTransaction> {
    return this.checkXZKBalance(account, amount)
      .then(() => {
        const amountBN = toDecimals(amount, this.config.tokenDecimals);
        return this.xzkInstance.populateTransaction.approve(
          this.config.vXZkContractAddress,
          amountBN.toString(),
        );
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public deposit(account: string, target: string, amount: number): Promise<PopulatedTransaction> {
    return this.checkApprove(account, amount)
      .then(() => {
        const amountBN = toDecimals(amount, this.config.tokenDecimals);
        return this.vXZkInstance.populateTransaction.depositFor(target, amountBN.toString());
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public withdraw(account: string, target: string, amount: number): Promise<PopulatedTransaction> {
    return this.checkXZKBalance(account, amount)
      .then(() => {
        const amountBN = toDecimals(amount, this.config.tokenDecimals);
        return this.vXZkInstance.populateTransaction.withdrawTo(target, amountBN.toString());
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public confirm(
    txHash: string,
    confirmations: number = 5,
    timeout: number = 60000,
  ): Promise<providers.TransactionReceipt> {
    return waitTransactionHash(this.provider, txHash, confirmations, timeout).catch((error) =>
      createErrorPromise(error.toString()),
    );
  }

  private xzkAllowance(account: string): Promise<number> {
    return this.xzkInstance
      .allowance(account, this.config.vXZkContractAddress)
      .then((allowance) => fromDecimals(toBN(allowance.toString()), this.config.tokenDecimals))
      .catch((error) => createErrorPromise(error.toString()));
  }

  private checkVXZKBalance(account: string, amount: number): Promise<void> {
    return this.vXZkBalance(account)
      .then((balance) => {
        if (balance < amount) {
          return createErrorPromise('Insufficient balance', MystikoGovernanceErrorCode.BALANCE_ERROR);
        }
        return Promise.resolve();
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  private checkXZKBalance(account: string, amount: number): Promise<void> {
    return this.xzkBalance(account)
      .then((balance) => {
        if (balance < amount) {
          return createErrorPromise('Insufficient balance', MystikoGovernanceErrorCode.BALANCE_ERROR);
        }
        return Promise.resolve();
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  private checkApprove(account: string, amount: number): Promise<void> {
    return this.xzkAllowance(account)
      .then((allowance) => {
        if (allowance < amount) {
          return createErrorPromise(
            'Insufficient approve amount',
            MystikoGovernanceErrorCode.APPROVE_AMOUNT_ERROR,
          );
        }
        return Promise.resolve();
      })
      .catch((error) => createErrorPromise(error.toString()));
  }
}
