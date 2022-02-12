import { CustomError } from '@src/errors/custom.error';

export class BadRequestError extends CustomError {
  // eslint-disable-next-line no-unused-vars
  constructor(public message: string, public statusCode = 400, public status = false) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return {
      status: this.status,
      code: this.statusCode,
      errors: [{ message: this.message }],
    };
  }
}
