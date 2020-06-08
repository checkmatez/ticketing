import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  public constructor() {
    super('Not authorized');
  }

  public serializeErrors() {
    return { errors: [{ message: 'Not authorized' }] };
  }

  public statusCode = 401;
}
