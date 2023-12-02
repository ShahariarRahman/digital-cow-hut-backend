import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.services";
import { IOrder } from "./order.interfaces";
import { JwtPayload } from "jsonwebtoken";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userAuthData = req.user as JwtPayload;
  const { ...data } = req.body;
  const result = await OrderService.createOrder(userAuthData, data);

  sendResponse<IOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const userAuthData = req.user as JwtPayload;
  const result = await OrderService.getAllOrders(userAuthData);

  sendResponse<IOrder[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const userAuthData = req.user as JwtPayload;
  const orderId = req.params.id;

  const result = await OrderService.getSingleOrder(userAuthData, orderId);

  sendResponse<IOrder>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order information retrieved successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
