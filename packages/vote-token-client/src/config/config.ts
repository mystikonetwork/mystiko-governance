import {
  MystikoGovernanceContractFactory,
  MystikoVoteToken,
  ERC20,
} from '@mystikonetwork/contracts-abi-governance';
import { providers } from 'ethers';

type ChainConfig = {
  decimals: number;
  xzkContract: string;
  vXZkContract: string;
  providerUrls: string[];
};

export class Config {
  private static chainConfigs: { [chainId: number]: ChainConfig } = {
    1: {
      decimals: 18,
      xzkContract: '0xe8fC52b1bb3a40fd8889C0f8f75879676310dDf0',
      vXZkContract: '0x16aFFA80C65Fd7003d40B24eDb96f77b38dDC96A',
      providerUrls: [
        'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7',
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        'https://rpc.flashbots.net',
      ],
    },
    11155111: {
      decimals: 18,
      xzkContract: '0x932161e47821c6F5AE69ef329aAC84be1E547e53',
      vXZkContract: '0xE662feEF4Bb1f25e5eBb4F9f157d37A921Af1587',
      providerUrls: ['https://eth-sepolia.public.blastapi.io', 'https://1rpc.io/sepolia	'],
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

  public get tokenDecimals(): number {
    return this.config.decimals;
  }

  public get xzkContractAddress(): string {
    return this.config.xzkContract;
  }

  public get vXZkContractAddress(): string {
    return this.config.vXZkContract;
  }

  public get providers(): string[] {
    return this.config.providerUrls;
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
