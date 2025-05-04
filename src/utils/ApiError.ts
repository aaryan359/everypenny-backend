import { ApiResponse } from "./ApiResponse";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string,
    message: string,
    public details?: string,
    public validationErrors?: Record<string, string>,
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  toResponse(): ApiResponse {
    return {
      success: false,
      message: this.message,
      error: {
        code: this.errorCode,
        details: this.details,
        validationErrors: this.validationErrors,
      },
    };
  }
}

// Common error types
export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", details?: string) {
    super(400, "BAD_REQUEST", message, details);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", details?: string) {
    super(401, "UNAUTHORIZED", message, details);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", details?: string) {
    super(403, "FORBIDDEN", message, details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found", details?: string) {
    super(404, "NOT_FOUND", message, details);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Conflict", details?: string) {
    super(409, "CONFLICT", message, details);
  }
}

export class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error", details?: string) {
    super(500, "INTERNAL_SERVER_ERROR", message, details);
  }
}
