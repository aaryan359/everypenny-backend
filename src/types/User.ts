import { Document } from "mongoose";

export interface UserType extends Document {
  name: string;
  phone?: number;
  email: string;
  password: string;
  age?: string;
  upiIds?: string[];
  monthlyBudget?: number;
}
