import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/:id", UserController.getSingleUser);

router.delete("/:id", UserController.deleteUser);

router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.get("/", UserController.getAllUsers);

export const UserRoutes = router;
