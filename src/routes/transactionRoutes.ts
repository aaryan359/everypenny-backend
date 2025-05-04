import { Router } from "express";
import { addTransaction } from "../contorllers/transactionController";
import { validateRequest } from "../middlewares/validationMiddleware";
import { registerSchema } from "../validations/authValidations";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.post("/add-transaction", authMiddleware, addTransaction);

export default router;
