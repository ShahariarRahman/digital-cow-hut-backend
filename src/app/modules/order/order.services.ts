import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IOrder } from "./order.interfaces";
import { Order } from "./order.model";
import { User } from "../user/user.model";
import { Cow } from "../cow/cow.model";
import mongoose from "mongoose";

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  const buyer = await User.findById(order.buyer);
  const cow = await Cow.findById(order.cow);

  if (buyer && cow) {
    if (buyer.budget >= cow.price) {
      const session = await mongoose.startSession();

      try {
        session.startTransaction();
        // Change the cow's label from 'for sale' to 'sold out'.
        cow.label = "sold out";
        const cowLevel = await Cow.findByIdAndUpdate(cow._id, cow, { session });

        if (!cowLevel) {
          throw new ApiError(404, "Failed to update cow label");
        }
        // create order for user
        const newOrder = await Order.create(order);
        const orderData = await Order.findById(newOrder._id)
          .populate("cow")
          .populate("buyer");

        session.commitTransaction();
        session.endSession();

        return orderData;
      } catch (error) {
        session.abortTransaction();
        throw error;
      }
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Buyer has insufficient budget");
  }
  return null;
};

export const OrderService = {
  createOrder,
};
