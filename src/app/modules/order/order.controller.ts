import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.services";
import { IOrder } from "./order.interfaces";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await OrderService.createOrder(data);

  sendResponse<IOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async () => {
  return 0;
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
