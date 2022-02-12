export abstract class CustomError extends Error {
  abstract status: boolean;

  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    status: boolean;
    code: number;
    errors: { message: string; field?: string }[];
  };
}
