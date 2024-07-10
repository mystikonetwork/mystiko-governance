import axios from 'axios';
import * as fzstd from 'fzstd';
import { Config } from './config';
import { createErrorPromise, MystikoSnapshotErrorCode } from './error';
import { PathSchema } from './path';

export interface InitOptions {
  chainId?: number;
}

export interface SnapshotIndex {
  blockHeight: number;
  timestamp: number;
}

export interface SnapshotAccountData {
  account: string;
  amount: number;
}

export interface SnapshotData {
  blockHeight: number;
  timestamp: number;
  total: number;
  holders: SnapshotAccountData[];
}

export class Snapshot {
  private config?: Config;

  private pathSchema: PathSchema = new PathSchema();

  initialize(options?: InitOptions): void {
    const chainId = options?.chainId || 1;
    this.config = new Config(chainId);
  }

  public listSnapshotIndexes(): Promise<SnapshotIndex[]> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoSnapshotErrorCode.NOT_INITIALIZED_ERROR);
    }

    const url = `${this.config.url}/${this.pathSchema.snapshotIndex(
      this.config.chainId,
      this.config.vXZkContract,
    )}`;

    return axios.get(url, { responseType: 'json' }).then((response) =>
      response.data.snapshots
        .sort((a: any, b: any) => a.block_height - b.block_height)
        .map((snapshot: any) => ({
          blockHeight: snapshot.block_height,
          timestamp: snapshot.timestamp,
        })),
    );
  }

  public snapshotData(blockHeight?: number): Promise<SnapshotData> {
    if (!this.config) {
      return createErrorPromise('Client not initialized', MystikoSnapshotErrorCode.NOT_INITIALIZED_ERROR);
    }
    const url = `${this.config.url}/${this.pathSchema.snapshotDataPath(
      this.config.chainId,
      this.config.vXZkContract,
      blockHeight,
    )}`;

    return axios.get(url, { responseType: 'arraybuffer' }).then((response) => this.fromBinary(response.data));
  }

  private fromBinary(data: Buffer): Promise<SnapshotData> {
    try {
      const decompressedData = fzstd.decompress(new Uint8Array(data));
      const decoder = new TextDecoder('utf-8');
      const jsonString = decoder.decode(decompressedData);
      const jsonObject = JSON.parse(jsonString) as SnapshotData;
      jsonObject.holders.sort((a, b) => b.amount - a.amount);
      return Promise.resolve(jsonObject);
    } catch (error) {
      return createErrorPromise('Decompression error', MystikoSnapshotErrorCode.DecompressionError);
    }
  }
}

const voteTokenSnapshot = new Snapshot();
export default voteTokenSnapshot;
