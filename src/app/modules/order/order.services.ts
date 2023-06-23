import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IOrder } from "./order.interfaces";
import { Order } from "./order.model";

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  const newOrder = await Order.create(order);

  const orderData = await Order.findById(newOrder._id)
    .populate("cow")
    .populate("buyer");

  if (!newOrder) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create Order");
  }
  return orderData;
};

export const OrderService = {
  createOrder,
};
