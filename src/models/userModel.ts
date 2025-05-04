import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },

  phone: {
    type: Number,
  },

  email: {
    type: String,
    require: [true, "Email is required"],
  },
  password: {
    type: String,
  },
  age: {
    type: String,
  },

  upiIds: [String],

  monthlyBudget: Number,

  spendingCategories: [
    {
      name: String,
      limit: Number,
      currentSpend: Number,
    },
  ],
  notificationPrefs: {
    sms: Boolean,
    app: Boolean,
    email: Boolean,
  },
});

export const User = mongoose.model("User", UserSchema);
