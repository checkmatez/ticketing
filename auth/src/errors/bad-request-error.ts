import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  public constructor(public message: string) {
    super(message);
  }

  public serializeErrors() {
    return { errors: [{ message: this.message }] };
  }

  public statusCode = 400;
}
