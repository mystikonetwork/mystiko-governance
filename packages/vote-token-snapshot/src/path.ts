export class PathSchema {
  private readonly dataSuffix: String = '.zst';

  public chainPath(chainId: number): string {
    return `chains/${chainId}`;
  }

  public snapshotPath(chainId: number, contractAddress: string): String {
    return `${this.chainPath(chainId)}/contracts/${contractAddress}/balance`;
  }

  public snapshotIndex(chainId: number, contractAddress: string): string {
    return `${this.snapshotPath(chainId, contractAddress)}/index.json`;
  }

  public snapshotLatestDataPath(chainId: number, contractAddress: string): string {
    return `${this.snapshotPath(chainId, contractAddress)}/latest${this.dataSuffix}`;
  }

  public snapshotDataPath(chainId: number, contractAddress: string, blockHeight?: number): string {
    if (!blockHeight) {
      return this.snapshotLatestDataPath(chainId, contractAddress);
    }
    return `${this.snapshotPath(chainId, contractAddress)}/snapshots/${this.blockDataPath(blockHeight)}`;
  }

  public blockDataPath(blockHeight: number): string {
    let numStr = blockHeight.toString();
    while (numStr.length < 9) {
      numStr = `0${numStr}`;
    }
    return `${numStr}${this.dataSuffix}`;
  }
}
