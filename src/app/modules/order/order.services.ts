import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IOrder } from "./order.interfaces";
import { Order } from "./order.model";
import { User } from "../user/user.model";
import { Cow } from "../cow/cow.model";
import mongoose from "mongoose";

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  const buyer = await User.findById(order.buyer);
  if (!buyer) {
    throw new ApiError(404, "Buyer not found");
  }

  const cow = await Cow.findById(order.cow);
  if (!cow) {
    throw new ApiError(404, "Cow not found");
  }

  if (buyer.budget >= cow.price) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      // cow sold out
      const updateDoc = { label: "sold out" };
      const cowLevel = await Cow.findByIdAndUpdate(cow._id, updateDoc, {
        session,
      });

      if (!cowLevel) {
        throw new ApiError(404, "Failed to update cow label");
      }

      // create order
      const newOrder = await Order.create(order);

      await session.commitTransaction();
      await session.endSession();

      const populatedOrder = await Order.findById(newOrder._id)
        .populate("cow")
        .populate("buyer");

      return populatedOrder;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Buyer has insufficient budget");
  }
};

export const OrderService = {
  createOrder,
};
