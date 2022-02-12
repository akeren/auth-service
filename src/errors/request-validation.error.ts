import { ValidationError } from 'express-validator';
import { CustomError } from '@src/errors/custom.error';

export class RequestValidationError extends CustomError {
  // eslint-disable-next-line no-unused-vars
  constructor(public errors: ValidationError[], public statusCode = 444, public status = false) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return {
      status: this.status,
      code: this.statusCode,
      errors: this.formattedValidationErrors(),
    };
  }

  private formattedValidationErrors(): any[] {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param };
    });
  }
}
