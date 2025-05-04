import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const SALT_ROUNDS = 10;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        message: "Email already registered",
      };
      res.status(409).json(response);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate token
    const token = generateToken(user._id.toString());

    // Omit password
    const userResponse = user.toObject();
    delete userResponse.password;

    const response: ApiResponse = {
      success: true,
      message: "User registered successfully",
      data: { user: userResponse, token },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const response: ApiResponse = {
        success: false,
        message: "All fields are required",
      };
      res.status(400).json(response);
      return;
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const response: ApiResponse = {
        success: false,
        message: "Email not registered. Please Register",
      };
      res.status(409).json(response);
      return;
    }

    // Generate token
    const token = generateToken(existingUser._id.toString());

    // password removed
    const userResponse = existingUser.toObject();
    delete userResponse.password;

    const response: ApiResponse = {
      success: true,
      message: "User login successfully",
      data: { user: userResponse, token },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        message: "Email already registered",
      };
      res.status(409).json(response);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate token
    const token = generateToken(user._id.toString());

    // Omit password
    const userResponse = user.toObject();
    delete userResponse.password;

    const response: ApiResponse = {
      success: true,
      message: "User registered successfully",
      data: { user: userResponse, token },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const response: ApiResponse = {
        success: false,
        message: "Email already registered",
      };
      res.status(409).json(response);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate token
    const token = generateToken(user._id.toString());

    // Omit password
    const userResponse = user.toObject();
    delete userResponse.password;

    const response: ApiResponse = {
      success: true,
      message: "User registered successfully",
      data: { user: userResponse, token },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
