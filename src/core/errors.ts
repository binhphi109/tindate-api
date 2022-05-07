/* eslint-disable max-classes-per-file */
export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INVALID = 420,
  INTERNAL_SERVER = 500,
}

export class TinderError extends Error {
  readonly name: any;

  readonly status: HttpStatusCode;

  readonly code?: string;

  constructor(
    message: string,
    status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER,
    code?: string
  ) {
    super(message);

    // if no name provided, use the default. defineProperty ensures that it stays non-enumerable
    if (!this.name) {
      Object.defineProperty(this, "name", { value: "TinderError" });
    }

    this.status = status;
    this.code = code;

    Error.captureStackTrace(this);
  }
}

export class ValidationError extends TinderError {
  constructor(message: string) {
    super(message, HttpStatusCode.BAD_REQUEST, "VALIDATION_FAILED");

    Object.defineProperty(this, "name", { value: "ValidationError" });
  }
}

export class AuthenticationError extends TinderError {
  constructor(message: string) {
    super(message, HttpStatusCode.UNAUTHORIZED, "UNAUTHENTICATED");

    Object.defineProperty(this, "name", { value: "AuthenticationError" });
  }
}

export class ForbiddenError extends TinderError {
  constructor(message: string) {
    super(message, HttpStatusCode.FORBIDDEN, "FORBIDDEN");

    Object.defineProperty(this, "name", { value: "ForbiddenError" });
  }
}

export class UserInputError extends TinderError {
  constructor(message: string) {
    super(message, HttpStatusCode.INVALID, "BAD_USER_INPUT");

    Object.defineProperty(this, "name", { value: "UserInputError" });
  }
}

export class InvalidDataError extends TinderError {
  constructor(message: string) {
    super(message, HttpStatusCode.INVALID, "INVALID_DATA");

    Object.defineProperty(this, "name", { value: "InvalidDataError" });
  }
}

export class NotFoundError extends TinderError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND, "NOT_FOUND");

    Object.defineProperty(this, "name", { value: "NotFoundError" });
  }
}

export class InternalServerError extends TinderError {
  constructor(message: string) {
    super(message, HttpStatusCode.INTERNAL_SERVER, "INTERNAL_SERVER_ERROR");

    Object.defineProperty(this, "name", { value: "InternalServerError" });
  }
}
