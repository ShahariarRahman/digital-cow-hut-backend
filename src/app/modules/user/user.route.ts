import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

// access: specific admin, specific buyer, specific seller
router.get(
  "/my-profile",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  UserController.getUserProfile
);

// access: specific admin, specific buyer, specific seller
router.patch(
  "/my-profile",
  validateRequest(UserValidation.updateProfileZodSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  UserController.updateUserProfile
);

// access: admin
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);

// access: admin
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

// access: admin
router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

// access: admin
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
