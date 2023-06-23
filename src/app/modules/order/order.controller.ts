import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.services";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await OrderService.createOrder(data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders retrieved successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
};
