import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// router.get("/", OrderController.getAllOrders);

router.post(
  "/",
  //   validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

export const OrderRoutes = router;
