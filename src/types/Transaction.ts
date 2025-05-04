import { Document, Types } from "mongoose";

export interface IAIAnalysis {
  spendingPattern?: string;
  monthlyTrend?: string;
  suggestions?: string;
}

export type PaymentMethod =
  | "UPI"
  | "credit_card"
  | "debit_card"
  | "cash"
  | "other";
export type TransactionType = "credit" | "debit";
export type TransactionCategory =
  | "food"
  | "shopping"
  | "transport"
  | "entertainment"
  | "bills"
  | "health"
  | "other";

export interface Transaction extends Document {
  userId: Types.ObjectId;
  amount: number;
  type: string;
  title: string;
  emoji: string;
  category: string;
  paymentMethod: string;
  transactionDate: Date;
  merchant?: string;
  location?: string;
  isRecurring: boolean;
  aiAnalysis?: IAIAnalysis;
}
