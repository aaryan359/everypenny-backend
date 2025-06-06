import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError, BadRequestError, ConflictError, NotFoundError } from "../utils/ApiError";

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
    next: NextFunction
  ): Promise<void> => {
    try {
     
      const allowedUpdates = ['name', 'email', 'password', 'phone', 'avatar'];
      const updates = Object.keys(req.body);
      
      
      const isValidOperation = updates.every(update => 
        allowedUpdates.includes(update)
      );
      
      if (!isValidOperation) {
        throw new BadRequestError(
          'Invalid fields in update request',
          `Allowed fields: ${allowedUpdates.join(', ')}`
        );
      }
  
     
      if (updates.includes('email')) {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser && existingUser._id.toString() !== req.user!._id.toString()) {
          throw new ConflictError('Email already in use');
        }
      }
  
      
      const updateData: Record<string, any> = {};
      
      updates.forEach(update => {
          updateData[update] = req.body[update];
        
      });
  
    
      const user = await User.findByIdAndUpdate(
        req.user!._id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password -refreshToken');
  
      if (!user) {
        throw new NotFoundError('User not found');
      }
  
      
      
      let token: string | undefined;
      if (updates.includes('email') || updates.includes('password')) {
        token = generateToken(user._id.toString());
      }
  
      // 7. Return response
      const response: ApiResponse = {
        success: true,
        message: 'Profile updated successfully',
        data: { 
          user,
          ...(token && { token }) 
        }
      };
  
      res.status(200).json(response);
      
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
