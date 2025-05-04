import { Router } from "express";
import { login, register } from "../contorllers/authController";
import { validateRequest } from "../middlewares/validationMiddleware";
import { registerSchema } from "../validations/authValidations";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
