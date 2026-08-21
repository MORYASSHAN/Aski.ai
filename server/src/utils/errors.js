export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad request") {
    super(400, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not found") {
    super(404, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Conflict") {
    super(409, message);
  }
}

export class ServiceUnavailableError extends ApiError {
  constructor(message = "Service unavailable") {
    super(503, message);
  }
}