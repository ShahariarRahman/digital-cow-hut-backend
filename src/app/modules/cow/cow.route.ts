import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CowController } from "./cow.controller";
import { CowValidation } from "./cow.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

// access: buyer, seller, admin
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow
);

// access: specific seller of the cow
router.delete("/:id", auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

// access: specific seller of the cow
router.patch(
  "/:id",
  validateRequest(CowValidation.updateCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateCow
);

// access: buyer, seller, admin
router.get(
  "/",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  CowController.getAllCows
);

// access: seller
router.post(
  "/",
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);

export const CowRoutes = router;
