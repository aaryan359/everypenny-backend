import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: string;
    validationErrors?: Record<string, string>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Extend Express Response type
declare global {
  namespace Express {
    interface Response {
      apiResponse: <T>(data: ApiResponse<T>) => Response;
    }
  }
}
