import { CustomError } from './custom.error';

export class NotFoundError extends CustomError {
  constructor(public message = 'Resource not found.', public statusCode = 404, public status = false) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { status: boolean; code: number; errors: { message: string; field?: string }[] } {
    return {
      status: this.status,
      code: this.statusCode,
      errors: [{ message: this.message }],
    };
  }
}
