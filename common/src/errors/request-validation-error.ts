import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  public constructor(private errors: ValidationError[]) {
    super('Invalid request paramaters');
  }

  public serializeErrors() {
    return { errors: this.errors.map((e) => ({ message: e.msg, field: e.param })) };
  }

  public statusCode = 400;
}
