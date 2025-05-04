import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "./ApiResponse";
import { ApiError } from "./ApiError";

export function successResponse<T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200,
  meta?: any,
): Response {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };
  return res.status(statusCode).json(response);
}

export function errorResponse(res: Response, error: ApiError): Response {
  return res.status(error.statusCode).json(error.toResponse());
}

export function handleAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
