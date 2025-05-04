import { Request, Response, NextFunction } from "express";
import { Transaction } from "../models/transactionModel";
import { ApiResponse } from "../utils/ApiResponse";
import { generateAIEmoji } from "../utils/emojiGenerator";

export const addTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { title, amount } = req.body;

    // Validation
    if (!title || !amount) {
      res.status(400).json({
        success: false,
        message: "Title and amount are required",
      } as ApiResponse);
    }

    // Get authenticated user
    const userId = req.user!._id;

    // Generate emoji (optional)
    const emoji = await generateAIEmoji(title);

    // Create transaction
    const transaction = await Transaction.create({
      userId,
      title,
      amount: Number(amount),
      transactionDate: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      data: transaction,
    } as ApiResponse);
  } catch (error) {
    next(error);
  }
};
