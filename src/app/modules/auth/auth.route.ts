import express from "express";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.userSignupZodSchema),
  AuthController.userSignup
);

export const AuthRoutes = router;
