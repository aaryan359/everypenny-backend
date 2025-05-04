import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
      default: "💰",
    },

    category: {
      type: String,
      enum: [
        "food",
        "shopping",
        "transport",
        "entertainment",
        "bills",
        "health",
        "other",
      ],
      default: "other",
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "credit_card", "debit_card", "cash", "other"],
      default: "UPI",
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    merchant: String,

    location: String,

    isRecurring: {
      type: Boolean,
      default: false,
    },

    aiAnalysis: {
      spendingPattern: String,
      monthlyTrend: String,
      suggestions: String,
    },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model("Transaction", TransactionSchema);
