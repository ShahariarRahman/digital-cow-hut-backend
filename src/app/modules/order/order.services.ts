import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IOrder } from "./order.interfaces";
import { Order } from "./order.model";
import { User } from "../user/user.model";
import { Cow } from "../cow/cow.model";
import mongoose from "mongoose";

const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  const buyer = await User.findOne({ _id: order.buyer, role: "buyer" }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Buyer not found or User is not a buyer")
  );

  const cow = await Cow.findOne({
    _id: order.cow,
    label: { $ne: "sold out" },
  }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Cow not found or has been sold")
  );

  // buyer has enough money
  if (buyer.budget >= cow.price) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Seller income addition
      await User.findByIdAndUpdate(
        cow.seller,
        { $inc: { income: Number(cow.price) } },
        { new: true, session }
      ).orFail(new ApiError(httpStatus.NOT_FOUND, "Failed to update seller"));

      // Buyer budget deduction
      await User.findByIdAndUpdate(
        buyer._id,
        { $inc: { budget: -Number(cow.price) } },
        { new: true, session }
      ).orFail(new ApiError(httpStatus.NOT_FOUND, "Failed to update buyer"));

      // cow sold out
      await Cow.findByIdAndUpdate(
        cow._id,
        { label: "sold out" },
        { new: true, session }
      ).orFail(new ApiError(httpStatus.NOT_FOUND, "Failed to update cow"));

      // create order
      const newOrder = await Order.create(order);

      await session.commitTransaction();
      await session.endSession();

      const populatedOrder = await Order.findById(newOrder._id)
        .populate({
          path: "cow",
          populate: {
            path: "seller",
          },
        })
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
