export type ChainConfig = {
  chainId: number;
  url: string;
  vXZkContract: string;
};

export class Config {
  private static chainConfigs: { [chainId: number]: ChainConfig } = {
    1: {
      chainId: 1,
      url: 'https://static.mystiko.network/snapshot/v1',
      vXZkContract: '0x16aFFA80C65Fd7003d40B24eDb96f77b38dDC96A',
    },
    11155111: {
      chainId: 11155111,
      url: 'https://static.mystiko.network/snapshot/v1',
      vXZkContract: '0xE662feEF4Bb1f25e5eBb4F9f157d37A921Af1587',
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

  public get url(): string {
    return this.config.url;
  }

  public get vXZkContract(): string {
    return this.config.vXZkContract;
  }
}
