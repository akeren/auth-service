import { CustomError } from '@src/errors/custom.error';

export class DatabaseConnectionError extends CustomError {
  // eslint-disable-next-line no-unused-vars
  constructor(public message = 'Error connecting to database!', public statusCode = 555, public status = false) {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return {
      status: this.status,
      code: this.statusCode,
      errors: [{ message: this.message }],
    };
  }
}
