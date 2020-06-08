import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  public constructor() {
    super(`Not found`);
  }

  public serializeErrors() {
    return { errors: [{ message: this.message }] };
  }

  public statusCode = 404;
}
