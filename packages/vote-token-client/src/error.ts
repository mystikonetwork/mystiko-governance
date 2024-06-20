export enum MystikoGovernanceErrorCode {
  UNKNOWN_ERROR = 0,
  NOT_INITIALIZED_ERROR = 1,
  PARAMETER_ERROR = 2,
  BALANCE_ERROR = 3,
  APPROVE_AMOUNT_ERROR = 4,
}

export class MystikoGovernanceError extends Error {
  public readonly code: MystikoGovernanceErrorCode;

  constructor(message: string, code: MystikoGovernanceErrorCode) {
    super(message);
    this.code = code;
  }
}

export function createError(message: string, code?: MystikoGovernanceErrorCode): MystikoGovernanceError {
  return new MystikoGovernanceError(message, code || MystikoGovernanceErrorCode.UNKNOWN_ERROR);
}

export function createErrorPromise(message: string, code?: MystikoGovernanceErrorCode): Promise<any> {
  return Promise.reject(createError(message, code));
}
