import { CustomError } from './custom.error';

export class UnauthorizedError extends CustomError {
  constructor(public message: string, public statusCode = 401, public status = false) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors(): { status: boolean; code: number; errors: { message: string; field?: string }[] } {
    return {
      status: this.status,
      code: this.statusCode,
      errors: [{ message: this.message }],
    };
  }
}
