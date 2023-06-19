import { ValidationError } from 'express-validator';
import { CustomError } from './custom.error';

export class RequestValidationError extends CustomError {
  constructor(public errors: ValidationError[], public statusCode = 422, public status = false) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { status: boolean; code: number; errors: { message: string; field?: string }[] } {
    return {
      status: this.status,
      code: this.statusCode,
      errors: this.formattedValidationErrors(),
    };
  }

  private formattedValidationErrors(): any[] {
    return this.errors.map(error => {
      return { message: error.msg, field: error.type === 'field' ? error.path : error.type };
    });
  }
}
