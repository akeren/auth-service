import { CustomError } from '@src/errors/custom.error';

export class UnauthorizedError extends CustomError {
  // eslint-disable-next-line no-unused-vars
  constructor(public message: string, public statusCode = 401, public status = false) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return {
      status: this.status,
      code: this.statusCode,
      errors: [{ message: this.message }],
    };
  }
}
