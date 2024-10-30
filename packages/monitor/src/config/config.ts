import { Governor, OpenZeppelinGovernanceContractFactory } from '@mystikonetwork/contracts-abi-governance';
import { providers } from 'ethers';

export type ChainConfig = {
  chainId: number;
  governorContract: string;
  providers: string[];
};

export class Config {
  private static chainConfigs: { [chainId: number]: ChainConfig } = {
    1: {
      chainId: 1,
      governorContract: '0x2a5eEf90F1aA36CaE2535349B522891A044EFCC1',
      providers: [
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        'https://eth-mainnet.public.blastapi.io',
        'https://rpc.ankr.com/eth',
      ],
    },
    11155111: {
      chainId: 11155111,
      governorContract: '0x207bdf60d72a73d395b742D74a9E618C96Cd9a32',
      providers: ['https://rpc.sepolia.org', 'https://sepolia.gateway.tenderly.co'],
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

  public get providers(): string[] {
    return this.config.providers;
  }

  public governorInstance(provier: providers.Provider) {
    return OpenZeppelinGovernanceContractFactory.connect<Governor>(
      'Governor',
      this.config.governorContract,
      provier,
    );
  }
}
