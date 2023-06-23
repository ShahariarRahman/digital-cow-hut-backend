import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CowController } from "./cow.controller";
import { CowValidation } from "./cow.validation";

const router = express.Router();

router.get("/:id", CowController.getSingleCow);

router.delete("/:id", CowController.deleteCow);

router.patch(
  "/:id",
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.get("/", CowController.getAllCows);

router.post(
  "/",
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

export const CowRoutes = router;
