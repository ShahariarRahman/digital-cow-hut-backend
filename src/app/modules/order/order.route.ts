import express from "express";
import { OrderController } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidation } from "./order.validation";

const router = express.Router();

// router.get("/", OrderController.getAllOrders);

router.post(
  "/",
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

export const OrderRoutes = router;
