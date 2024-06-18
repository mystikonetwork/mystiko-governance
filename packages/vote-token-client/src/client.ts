import { ERC20, MystikoVoteToken } from '@mystikonetwork/contracts-abi-governance';
import {
  toBN,
  fromDecimals,
  toDecimals,
  waitTransactionHash,
  DefaultProviderFactory,
} from '@mystikonetwork/utils';
import { PopulatedTransaction, providers } from 'ethers';
import { Config } from './config';

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
      .then((balance) => fromDecimals(toBN(balance.toString()), this.config.tokenDecimals));
  }

  public vXZkBalance(account: string): Promise<number> {
    return this.vXZkInstance
      .balanceOf(account)
      .then((balance) => fromDecimals(toBN(balance.toString()), this.config.tokenDecimals));
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
      .catch((error) => {
        throw error;
      });
  }

  public deposit(account: string, target: string, amount: number): Promise<PopulatedTransaction> {
    return this.checkApprove(account, amount)
      .then(() => {
        const amountBN = toDecimals(amount, this.config.tokenDecimals);
        return this.vXZkInstance.populateTransaction.depositFor(target, amountBN.toString());
      })
      .catch((error) => {
        throw error;
      });
  }

  public withdraw(account: string, target: string, amount: number): Promise<PopulatedTransaction> {
    return this.checkXZKBalance(account, amount)
      .then(() => {
        const amountBN = toDecimals(amount, this.config.tokenDecimals);
        return this.vXZkInstance.populateTransaction.withdrawTo(target, amountBN.toString());
      })
      .catch((error) => {
        throw error;
      });
  }

  public confirm(
    txHash: string,
    confirmations: number = 5,
    timeout: number = 60000,
  ): Promise<providers.TransactionReceipt> {
    return waitTransactionHash(this.provider, txHash, confirmations, timeout);
  }

  private xzkAllowance(account: string): Promise<number> {
    return this.xzkInstance
      .allowance(account, this.config.vXZkContractAddress)
      .then((allowance) => fromDecimals(toBN(allowance.toString()), this.config.tokenDecimals));
  }

  private checkVXZKBalance(account: string, amount: number): Promise<void> {
    return this.vXZkBalance(account).then(
      (balance) => {
        if (balance < amount) {
          throw new Error('Insufficient balance');
        }
      },
      (error) => {
        throw error;
      },
    );
  }

  private checkXZKBalance(account: string, amount: number): Promise<void> {
    return this.xzkBalance(account).then(
      (balance) => {
        if (balance < amount) {
          throw new Error('Insufficient balance');
        }
      },
      (error) => {
        throw error;
      },
    );
  }

  private checkApprove(account: string, amount: number): Promise<void> {
    return this.xzkAllowance(account).then(
      (allowance) => {
        if (allowance < amount) {
          throw new Error('Insufficient approve amount');
        }
      },
      (error) => {
        throw error;
      },
    );
  }
}
