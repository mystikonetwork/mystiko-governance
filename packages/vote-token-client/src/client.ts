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
import BN from 'bn.js';
import { Config } from './config';
import { createErrorPromise, MystikoGovernanceErrorCode } from './error';

export interface InitOptions {
  chainId?: number;
  scanApiBaseUrl?: string;
}

export class Client {
  private config?: Config;

  private xzkInstance?: ERC20;

  private vXZkInstance?: MystikoVoteToken;

  private fetcher?: ScanApiEtherFetcher;

  public provider?: providers.Provider;

  private isInit: boolean = false;

  initialize(options?: InitOptions): void {
    if (this.isInit) {
      return;
    }

    const chainId = options?.chainId || 1;
    const scanApiBaseUrl = options?.scanApiBaseUrl;
    this.config = new Config(chainId);
    const factory = new DefaultProviderFactory();
    this.provider = factory.createProvider(this.config.providers);
    this.fetcher = this.initScanApiFetcher(chainId, scanApiBaseUrl);
    this.xzkInstance = this.config.xzkContractInstance(this.provider);
    this.vXZkInstance = this.config.vXZkContractInstance(this.provider);
    this.isInit = true;
  }

  public get isInitialized(): boolean {
    return this.isInit;
  }

  public resetInitStatus(): void {
    this.isInit = false;
  }

  public getChainId(): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    return Promise.resolve(this.config.chainId);
  }

  public xzkBalance(account: string): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    return this.queryXZKBalance(account).then((balance) => fromDecimals(balance, decimals));
  }

  public vXZkTotalSupply(): Promise<number> {
    if (!this.vXZkInstance || !this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    return this.vXZkInstance
      .totalSupply()
      .then((totalSupply) => fromDecimals(toBN(totalSupply.toString()), decimals))
      .catch((error) => createErrorPromise(error.toString()));
  }

  public vXZkBalance(account: string): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    return this.queryVXZKBalance(account).then((balance) => fromDecimals(balance, decimals));
  }

  public approve(
    account: string,
    isMax?: boolean,
    amount?: number,
  ): Promise<PopulatedTransaction | undefined> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    if ((isMax && amount) || (!isMax && amount === undefined)) {
      return createErrorPromise('isMax and amount conflict', MystikoGovernanceErrorCode.PARAMETER_ERROR);
    }

    const { decimals } = this.config;
    return this.queryXZKBalance(account).then((balance) => {
      if (amount !== undefined) {
        const amountBN = toDecimals(amount, decimals);
        if (amountBN.gt(balance)) {
          return createErrorPromise('Insufficient balance', MystikoGovernanceErrorCode.BALANCE_ERROR);
        }
        return this.buildApproveTransaction(account, amountBN);
      }

      return this.buildApproveTransaction(account, balance);
    });
  }

  public approveCostInUSD(): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }
    return this.calcCostInUSD(this.config.approveGas);
  }

  public deposit(
    account: string,
    target: string,
    isMax?: boolean,
    amount?: number,
  ): Promise<PopulatedTransaction> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    if ((isMax && amount) || (!isMax && amount === undefined)) {
      return createErrorPromise('isMax and amount conflict', MystikoGovernanceErrorCode.PARAMETER_ERROR);
    }
    const { decimals } = this.config;
    return this.queryXZKBalance(account).then((balance) => {
      if (amount !== undefined) {
        const amountBN = toDecimals(amount, decimals);
        if (amountBN.gt(balance)) {
          return createErrorPromise('Insufficient balance', MystikoGovernanceErrorCode.BALANCE_ERROR);
        }
        return this.buildDepositTransaction(account, target, amountBN);
      }

      return this.buildDepositTransaction(account, target, balance);
    });
  }

  public depositCostInUSD(): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    return this.calcCostInUSD(this.config.depositGas);
  }

  public withdraw(
    account: string,
    target: string,
    isMax?: boolean,
    amount?: number,
  ): Promise<PopulatedTransaction> {
    if (!this.config || !this.vXZkInstance) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    if ((isMax && amount) || (!isMax && amount === undefined)) {
      return createErrorPromise('isMax and amount conflict', MystikoGovernanceErrorCode.PARAMETER_ERROR);
    }

    const { decimals } = this.config;
    const { vXZkInstance } = this;
    return this.queryVXZKBalance(account).then((balance) => {
      if (amount !== undefined) {
        const amountBN = toDecimals(amount, decimals);
        if (amountBN.gt(balance)) {
          return createErrorPromise('Insufficient balance', MystikoGovernanceErrorCode.BALANCE_ERROR);
        }
        return vXZkInstance.populateTransaction
          .withdrawTo(target, amountBN.toString())
          .catch((error) => createErrorPromise(error.toString()));
      }

      return vXZkInstance.populateTransaction
        .withdrawTo(target, balance.toString())
        .catch((error) => createErrorPromise(error.toString()));
    });
  }

  public withdrawCostInUSD(): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }
    return this.calcCostInUSD(this.config.withdrawGas);
  }

  public confirm(
    txHash: string,
    confirmations: number = 5,
    timeout: number = 60000,
  ): Promise<providers.TransactionReceipt> {
    if (!this.provider) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    return waitTransactionHash(this.provider, txHash, confirmations, timeout).catch((error) =>
      createErrorPromise(error.toString()),
    );
  }

  private queryXZKBalance(account: string): Promise<BN> {
    if (!this.xzkInstance) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    return this.xzkInstance
      .balanceOf(account)
      .then((balance) => toBN(balance.toString()))
      .catch((error) => createErrorPromise(error.toString()));
  }

  private queryVXZKBalance(account: string): Promise<BN> {
    if (!this.vXZkInstance) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    return this.vXZkInstance
      .balanceOf(account)
      .then((balance) => toBN(balance.toString()))
      .catch((error) => createErrorPromise(error.toString()));
  }

  private xzkAllowance(account: string): Promise<BN> {
    if (!this.xzkInstance || !this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { vXZkContract } = this.config;
    return this.xzkInstance
      .allowance(account, vXZkContract)
      .then((allowance) => toBN(allowance.toString()))
      .catch((error) => createErrorPromise(error.toString()));
  }

  private checkApprove(account: string, amount: BN): Promise<void> {
    return this.xzkAllowance(account).then((allowance) => {
      if (allowance < amount) {
        return createErrorPromise(
          'Insufficient approve amount',
          MystikoGovernanceErrorCode.APPROVE_AMOUNT_ERROR,
        );
      }
      return Promise.resolve();
    });
  }

  private buildApproveTransaction(account: string, amount: BN): Promise<PopulatedTransaction | undefined> {
    if (!this.xzkInstance || !this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { xzkInstance } = this;
    const { vXZkContract } = this.config;

    return this.xzkAllowance(account).then((allowance) => {
      if (allowance.gte(amount)) {
        return Promise.resolve(undefined);
      }
      return xzkInstance.populateTransaction
        .approve(vXZkContract, amount.toString())
        .catch((error) => createErrorPromise(error.toString()));
    });
  }

  private buildDepositTransaction(
    account: string,
    target: string,
    amount: BN,
  ): Promise<PopulatedTransaction> {
    if (!this.vXZkInstance) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { vXZkInstance } = this;
    return this.checkApprove(account, amount).then(() =>
      vXZkInstance.populateTransaction
        .depositFor(target, amount.toString())
        .catch((error) => createErrorPromise(error.toString())),
    );
  }

  private initScanApiFetcher(chainId: number, scanApiBaseUrl?: string): ScanApiEtherFetcher {
    const apikey = '';
    const factory = new ScanApiEtherFetcherFactory();
    return factory.create({ chainId, apikey, scanApiBaseUrl });
  }

  private calcCostInUSD(gas: number): Promise<number> {
    return this.getEthPrice().then((ethPrice) => {
      if (!this.provider) {
        return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
      }
      return this.provider
        .getGasPrice()
        .then((gasPrice) => {
          const costGas = toBN(gasPrice.toString()).mul(toBN(gas.toString()));
          const costEth = fromDecimals(costGas, 18);
          const costUSD = costEth * ethPrice;
          return parseFloat(costUSD.toFixed(3));
        })
        .catch((error) => createErrorPromise(error.toString()));
    });
  }

  private getEthPrice(): Promise<number> {
    if (!this.fetcher) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }
    return this.fetcher.getEthPriceInUSD();
  }
}

const voteTokenClient = new Client();
export default voteTokenClient;
