import { CustomError } from '@src/errors/custom.error';

export class NotFoundError extends CustomError {
  // eslint-disable-next-line no-unused-vars
  constructor(public message = 'Resource not found.', public statusCode = 404, public status = false) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return {
      status: this.status,
      code: this.statusCode,
      errors: [{ message: this.message }],
    };
  }
}
