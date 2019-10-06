export enum ErrorCode {
  ERR_INPUT_VALIDATION = 'ERR_INPUT_VALIDATION',
  ERR_DUPLICATE_ENTRY = 'ERR_DUPLICATE_ENTRY',
}

export class APIError extends Error {
  public code: ErrorCode;
  public message: string;
  public status: number;
  constructor(args: { message?: string; code: ErrorCode; status?: number }) {
    super();
    this.code = args.code;
    this.message = args.message || 'Something went wrong.';
    this.status = args.status || 400;
  }
}
