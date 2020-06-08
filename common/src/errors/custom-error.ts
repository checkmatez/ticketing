interface SimpleError {
  message: string;
  field?: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serializeErrors(): { errors: SimpleError[] };
}
