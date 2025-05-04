import { Request, Response, NextFunction } from "express";
import { Transaction } from "../models/transactionModel";
import { ApiResponse } from "../utils/ApiResponse";




export const addttile = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { title, amount } = req.body

        if (!title || !amount) {
            const response: ApiResponse = {
                success: false,
                message: "All fields are required",
            };
            res.status(400).json(response);
            return;
        }


        const emoji = await generateAIEmoji(title);


        const transaction = Transaction.create({

        })



    } catch (error) {
        next(error);
    }
};
