import {
  MystikoGovernanceContractFactory,
  MystikoVoteToken,
  ERC20,
} from '@mystikonetwork/contracts-abi-governance';
import { providers } from 'ethers';

export type ChainConfig = {
  chainId: number;
  decimals: number;
  xzkContract: string;
  vXZkContract: string;
  providers: string[];
  approveGas: number;
  depositGas: number;
  withdrawGas: number;
};

export class Config {
  private static chainConfigs: { [chainId: number]: ChainConfig } = {
    1: {
      chainId: 1,
      decimals: 18,
      xzkContract: '0xe8fC52b1bb3a40fd8889C0f8f75879676310dDf0',
      vXZkContract: '0x16aFFA80C65Fd7003d40B24eDb96f77b38dDC96A',
      providers: [
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        'https://eth-mainnet.public.blastapi.io',
        'https://ethereum-rpc.publicnode.com',
        'https://eth.drpc.org',
        'https://rpc.ankr.com/eth',
        'https://rpc.flashbots.net',
      ],
      approveGas: 46371,
      depositGas: 87966,
      withdrawGas: 86755,
    },
    11155111: {
      chainId: 11155111,
      decimals: 18,
      xzkContract: '0x932161e47821c6F5AE69ef329aAC84be1E547e53',
      vXZkContract: '0xE662feEF4Bb1f25e5eBb4F9f157d37A921Af1587',
      providers: ['https://eth-sepolia.public.blastapi.io', 'https://1rpc.io/sepolia	'],
      approveGas: 46371,
      depositGas: 87966,
      withdrawGas: 86755,
    },
  };

  private readonly config: ChainConfig;

  public constructor(chainId: number) {
    const config = Config.chainConfigs[chainId];
    if (!config) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }
    this.config = config;
  }

  public get chainId(): number {
    return this.config.chainId;
  }

  public get decimals(): number {
    return this.config.decimals;
  }

  public get xzkContract(): string {
    return this.config.xzkContract;
  }

  public get vXZkContract(): string {
    return this.config.vXZkContract;
  }

  public get providers(): string[] {
    return this.config.providers;
  }

  public get approveGas(): number {
    return this.config.approveGas;
  }

  public get depositGas(): number {
    return this.config.depositGas;
  }

  public get withdrawGas(): number {
    return this.config.withdrawGas;
  }

  public xzkContractInstance(provier: providers.Provider) {
    return MystikoGovernanceContractFactory.connect<ERC20>('ERC20', this.config.xzkContract, provier);
  }

  public vXZkContractInstance(provier: providers.Provider) {
    return MystikoGovernanceContractFactory.connect<MystikoVoteToken>(
      'MystikoVoteToken',
      this.config.vXZkContract,
      provier,
    );
  }
}
