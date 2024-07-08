export enum MystikoSnapshotErrorCode {
  UNKNOWN_ERROR = 0,
  NOT_INITIALIZED_ERROR = 1,
}

export class MystikoSnapshotError extends Error {
  public readonly code: MystikoSnapshotErrorCode;

  constructor(message: string, code: MystikoSnapshotErrorCode) {
    super(message);
    this.code = code;
  }
}

export function createError(message: string, code?: MystikoSnapshotErrorCode): MystikoSnapshotError {
  return new MystikoSnapshotError(message, code || MystikoSnapshotErrorCode.UNKNOWN_ERROR);
}

export function createErrorPromise(message: string, code?: MystikoSnapshotErrorCode): Promise<any> {
  return Promise.reject(createError(message, code));
}
