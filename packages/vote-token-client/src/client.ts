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

  private isInitialized: boolean = false;

  initialize(options?: InitOptions): void {
    if (this.isInitialized) {
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
    this.isInitialized = true;
  }

  public xzkBalance(account: string): Promise<number> {
    if (!this.xzkInstance || !this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    return this.xzkInstance
      .balanceOf(account)
      .then((balance) => fromDecimals(toBN(balance.toString()), decimals))
      .catch((error) => createErrorPromise(error.toString()));
  }

  public vXZkBalance(account: string): Promise<number> {
    if (!this.vXZkInstance || !this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    return this.vXZkInstance
      .balanceOf(account)
      .then((balance) => fromDecimals(toBN(balance.toString()), decimals))
      .catch((error) => createErrorPromise(error.toString()));
  }

  public approve(account: string, amount: number): Promise<PopulatedTransaction | undefined> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    const { vXZkContract } = this.config;
    return this.xzkAllowance(account)
      .then((allowance: number) => {
        if (allowance >= amount) {
          return Promise.resolve(undefined);
        }

        return this.checkXZKBalance(account, amount).then(() => {
          if (!this.xzkInstance) {
            return createErrorPromise(
              'Client not initialized',
              MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR,
            );
          }
          const amountBN = toDecimals(amount, decimals);
          return this.xzkInstance.populateTransaction.approve(vXZkContract, amountBN.toString());
        });
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public approveCostInUSD(): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }
    return this.calcCostInUSD(this.config.approveGas).catch((error) => createErrorPromise(error.toString()));
  }

  public deposit(account: string, target: string, amount: number): Promise<PopulatedTransaction> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    return this.checkApprove(account, amount)
      .then(() => {
        if (!this.vXZkInstance) {
          return createErrorPromise(
            'Client not initialized',
            MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR,
          );
        }
        const amountBN = toDecimals(amount, decimals);
        return this.vXZkInstance.populateTransaction.depositFor(target, amountBN.toString());
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public depositCostInUSD(): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    return this.calcCostInUSD(this.config.depositGas).catch((error) => createErrorPromise(error.toString()));
  }

  public withdraw(account: string, target: string, amount: number): Promise<PopulatedTransaction> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    return this.checkXZKBalance(account, amount)
      .then(() => {
        if (!this.vXZkInstance) {
          return createErrorPromise(
            'Client not initialized',
            MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR,
          );
        }
        const amountBN = toDecimals(amount, decimals);
        return this.vXZkInstance.populateTransaction.withdrawTo(target, amountBN.toString());
      })
      .catch((error) => createErrorPromise(error.toString()));
  }

  public withdrawCostInUSD(): Promise<number> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }
    return this.calcCostInUSD(this.config.withdrawGas).catch((error) => createErrorPromise(error.toString()));
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

  private xzkAllowance(account: string): Promise<number> {
    if (!this.xzkInstance || !this.config) {
      return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
    }

    const { decimals } = this.config;
    const { vXZkContract } = this.config;
    return this.xzkInstance
      .allowance(account, vXZkContract)
      .then((allowance) => fromDecimals(toBN(allowance.toString()), decimals))
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
    return this.getEthPrice().then((ethPrice) => {
      if (!this.provider) {
        return createErrorPromise('Client not initialized', MystikoGovernanceErrorCode.NOT_INITIALIZED_ERROR);
      }
      return this.provider.getGasPrice().then((gasPrice) => {
        const costGas = toBN(gasPrice.toString()).mul(toBN(gas.toString()));
        const costEth = fromDecimals(costGas, 18);
        const costUSD = costEth * ethPrice;
        return parseFloat(costUSD.toFixed(2));
      });
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
