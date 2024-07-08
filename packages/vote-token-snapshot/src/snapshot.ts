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
  amount: string;
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

    return axios.get(url, { responseType: 'json' }).then((response) => {
      const sortedData = response.data.snapshots.sort(
        (a: SnapshotIndex, b: SnapshotIndex) => a.blockHeight - b.blockHeight,
      );
      return sortedData;
    });
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

    return axios.get(url, { responseType: 'arraybuffer' }).then((response) => {
      const data = this.fromBinary(response.data);
      return Promise.resolve(data);
    });
  }

  private fromBinary(data: Buffer): SnapshotData {
    const decompressedData = fzstd.decompress(data);
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(decompressedData);
    const jsonObject = JSON.parse(jsonString) as SnapshotData;
    return jsonObject;
  }
}

const voteTokenSnapshot = new Snapshot();
export default voteTokenSnapshot;
