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
  if (buyer.role !== "buyer") {
    throw new ApiError(404, "User is not Buyer");
  }

  const cow = await Cow.findById(order.cow);
  if (!cow) {
    throw new ApiError(404, "Cow not found");
  }

  // If the user has enough money
  if (buyer.budget >= cow.price) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      // Seller budget addition
      const seller = await User.findById(cow.seller);
      if (!seller) {
        throw new ApiError(404, "Seller not found");
      }

      const sellerNewBudget = Number(seller.budget) + Number(cow.price);

      const sellerUpdateDoc = {
        budget: sellerNewBudget,
      };

      const sellerUpdate = await User.findByIdAndUpdate(
        seller._id,
        sellerUpdateDoc,
        { session }
      );

      if (!sellerUpdate) {
        throw new ApiError(404, "Failed to update seller");
      }

      // Buyer budget deduction
      const buyerNewBudget = Number(buyer.budget) - Number(cow.price);

      const buyerUpdateDoc = {
        budget: buyerNewBudget,
      };
      const buyerUpdate = await User.findByIdAndUpdate(
        buyer._id,
        buyerUpdateDoc,
        { session }
      );
      if (!buyerUpdate) {
        throw new ApiError(404, "Failed to update seller");
      }

      // cow sold out
      const cowUpdateDoc = { label: "sold out" };
      const cowLevel = await Cow.findByIdAndUpdate(cow._id, cowUpdateDoc, {
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
