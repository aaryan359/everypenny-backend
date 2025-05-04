import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();

import {
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  ApiError,
} from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError(
        "Authentication token missing",
        "Please provide a valid Bearer token",
      );
    }

    let decoded: jwt.JwtPayload;
    console.log("token is", token);
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
      console.log("decoded token is", decoded);
    } catch (jwtError) {
      throw new ForbiddenError(
        "Invalid or expired token",
        jwtError instanceof Error
          ? jwtError.message
          : "Token verification failed",
      );
    }

    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) {
      throw new UnauthorizedError(
        "User account not found",
        "The user associated with this token no longer exists",
      );
    }
    console.log(" user in midleware is", user);

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(
        new InternalServerError(
          "Authentication processing failed",
          error instanceof Error ? error.message : "Unknown auth error",
        ),
      );
    }
  }
};
