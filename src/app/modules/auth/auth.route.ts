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

router.post(
  "/login",
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.userLogin
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
