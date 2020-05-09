import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  private reason = 'Error connecting to database';

  public constructor() {
    super();
  }

  public serializeErrors() {
    return { errors: [{ message: this.reason }] };
  }

  public statusCode = 500;
}
