import { CustomError } from './custom.error';

export class DatabaseConnectionError extends CustomError {
  // eslint-disable-next-line no-unused-vars
  constructor(public message = 'Error connecting to database!', public statusCode = 500, public status = false) {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): { status: boolean; code: number; errors: { message: string; field?: string }[] } {
    return {
      status: this.status,
      code: this.statusCode,
      errors: [{ message: this.message }],
    };
  }
}
