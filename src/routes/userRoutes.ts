import { Router } from "express";
import { login, register, updateProfile } from "../contorllers/authController";
import { validateRequest } from "../middlewares/validationMiddleware";
import { registerSchema } from "../validations/authValidations";
import { authMiddleware } from "../middlewares/authmiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.patch('/profile',authMiddleware,updateProfile);

export default router;
