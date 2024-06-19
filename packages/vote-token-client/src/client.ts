import { ERC20, MystikoVoteToken } from '@mystikonetwork/contracts-abi-governance';
import {
  DefaultProviderFactory,
  fromDecimals,
  toBN,
  toDecimals,
  waitTransactionHash,
} from '@mystikonetwork/utils';
import { ScanApiEtherFetcherFactory, ScanApiEtherFetcher } from '@mystikonetwork/ether-fetcher';
import { PopulatedTransaction, providers } from 'ethers';
import { Config } from './config';
import { createErrorPromise, MystikoGovernanceErrorCode } from './error';

export class Client {
  private readonly config: Config;

  private readonly xzkInstance: ERC20;

  private readonly vXZkInstance: MystikoVoteToken;

  private fetcher: ScanApiEtherFetcher;

  public provider: providers.Provider;

  constructor(chainId: number = 1, scanApiBaseUrl?: string) {
    this.config = new Config(chainId);
    const factory = new DefaultProviderFactory();
    this.provider = factory.createProvider(this.config.providers);
    this.fetcher = this.initScanApiFetcher(chainId, scanApiBaseUrl);
    this.xzkInstance = this.config.xzkContractInstance(this.provider);
    this.vXZkInstance = this.config.vXZkContractInstance(this.provider);
  }

  public xzkBalance(account: string): Promise<number> {
    return this.xzkInstance
      .balanceOf(account)
      .then((balance) => fromDecimals(toBN(balance.toString()), this.config.decimals))
      .catch((error) => createErrorPromise(error.toString()));
  }

  public vXZkBalance(account: string): Promise<number> {
    return this.vXZkInstance
      .balanceOf(account)
      .then((balance) => fromDecimals(toBN(balance.toString()), this.config.decimals))
      .catch((error) => createErrorPromise(error.toString()));
  }

  public approve(account: string, amount: number): Promise<PopulatedTransaction | undefined> {
    return this.xzkAllowance(account)
      .then((allowance: number) => {
        if (allowance >= amount) {
          return Promise.resolve(undefined);
        }

        return this.checkXZKBalance(account, amount).then(() => {
          const amountBN = toDecimals(amount, this.config.decimals);
          return this.xzkInstance.populateTransaction.approve(this.config.vXZkContract, amountBN.toString());
        });
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public approveCostInUSD(): Promise<number> {
    return this.calcCostInUSD(this.config.approveGas).catch((error) => createErrorPromise(error.toString()));
  }

  public deposit(account: string, target: string, amount: number): Promise<PopulatedTransaction> {
    return this.checkApprove(account, amount)
      .then(() => {
        const amountBN = toDecimals(amount, this.config.decimals);
        return this.vXZkInstance.populateTransaction.depositFor(target, amountBN.toString());
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public depositCostInUSD(): Promise<number> {
    return this.calcCostInUSD(this.config.depositGas).catch((error) => createErrorPromise(error.toString()));
  }

  public withdraw(account: string, target: string, amount: number): Promise<PopulatedTransaction> {
    return this.checkXZKBalance(account, amount)
      .then(() => {
        const amountBN = toDecimals(amount, this.config.decimals);
        return this.vXZkInstance.populateTransaction.withdrawTo(target, amountBN.toString());
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public withdrawCostInUSD(): Promise<number> {
    return this.calcCostInUSD(this.config.withdrawGas).catch((error) => createErrorPromise(error.toString()));
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
      .allowance(account, this.config.vXZkContract)
      .then((allowance) => fromDecimals(toBN(allowance.toString()), this.config.decimals))
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

  private initScanApiFetcher(chainId: number, scanApiBaseUrl?: string): ScanApiEtherFetcher {
    const apikey = '';
    const factory = new ScanApiEtherFetcherFactory();
    return factory.create({ chainId, apikey, scanApiBaseUrl });
  }

  private calcCostInUSD(gas: number): Promise<number> {
    return this.getEthPrice().then((ethPrice) =>
      this.provider.getGasPrice().then((gasPrice) => {
        const costGas = toBN(gasPrice.toString()).mul(toBN(gas.toString()));
        const costEth = fromDecimals(costGas, 18);
        const costUSD = costEth * ethPrice;
        return parseFloat(costUSD.toFixed(2));
      }),
    );
  }

  private getEthPrice(): Promise<number> {
    return this.fetcher.getEthPriceInUSD();
  }
}
