import { CustomError } from '@src/errors/custom.error';

export class DatabaseConnectionError extends CustomError {
  // eslint-disable-next-line no-unused-vars
  constructor(public reason = 'Error connecting to database!', public statusCode = 555, public status = false) {
    super(reason);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return {
      status: this.status,
      code: this.statusCode,
      errors: [{ message: this.reason }],
    };
  }
}
