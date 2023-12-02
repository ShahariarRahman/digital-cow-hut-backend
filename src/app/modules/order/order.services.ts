/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IOrder } from "./order.interfaces";
import { Order } from "./order.model";
import { User } from "../user/user.model";
import { Cow } from "../cow/cow.model";
import mongoose from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { JwtPayload } from "jsonwebtoken";

// create order
const createOrder = async (
  user: JwtPayload,
  order: IOrder
): Promise<IOrder | null> => {
  if (order.buyer !== user._id) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Buyer Field will be your user id : ${user._id}`
    );
  }

  const buyer = await User.findById(order.buyer).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Buyer not found")
  );

  const cow = await Cow.findOne({
    _id: order.cow,
    label: { $ne: "sold out" },
  }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Cow not found or Cow has been Sold")
  );

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
      const newOrder = await Order.create([order], { session });

      await session.commitTransaction();
      await session.endSession();

      const populatedOrder = await Order.findById(newOrder[0]._id)
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

// get specific orders
const getAllOrders = async (userAuthData: JwtPayload): Promise<IOrder[]> => {
  const { _id, role } = userAuthData;

  const query: any = {};

  // field filtering: in populated data with match: if no match, cow = null
  const populatePaths = [
    { path: "buyer" },
    {
      path: "cow",
      match: role === ENUM_USER_ROLE.SELLER ? { seller: _id } : undefined,
      populate: {
        path: "seller",
      },
    },
  ];

  // buyer: add field filter
  // admin | seller: do nothing: query= {};
  // !buyer | !admin | !seller: throw error
  if (role === ENUM_USER_ROLE.BUYER) {
    query.buyer = _id; // field filtering
  } else if (role !== ENUM_USER_ROLE.ADMIN && role !== ENUM_USER_ROLE.SELLER) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "User must be Admin | Buyer | Seller"
    );
  }

  let orders = await Order.find(query)
    .lean()
    .populate(populatePaths)
    .orFail(
      new ApiError(
        httpStatus.UNAUTHORIZED,
        "Failed / invalid access. buyer/ seller can only access orders related to them. Admin access all."
      )
    );

  // seller & push the order.cow !== null
  if (role === ENUM_USER_ROLE.SELLER) {
    orders = orders.filter(order => order.cow !== null);
  }

  // empty means this user have no access of any orders
  if (!orders.length) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "This seller's cows have not been ordered yet"
    );
  }

  return orders;
};

// get specific single order
const getSingleOrder = async (
  userAuthData: JwtPayload,
  orderId: string
): Promise<IOrder | null> => {
  const { _id, role } = userAuthData;

  const query: any = { _id: orderId };

  // field filtering: in populated data with match: if no match cow = null
  const populatePaths = [
    { path: "buyer" },
    {
      path: "cow",
      match: role === ENUM_USER_ROLE.SELLER ? { seller: _id } : undefined,
      populate: {
        path: "seller",
      },
    },
  ];

  // buyer: add field filter
  // admin | seller: do nothing: { _id: orderId };
  // !buyer | !admin | !seller: throw error
  if (role === ENUM_USER_ROLE.BUYER) {
    query.buyer = _id; // field filtering
  } else if (role !== ENUM_USER_ROLE.ADMIN && role !== ENUM_USER_ROLE.SELLER) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "User must be Admin | Buyer | Seller"
    );
  }

  const order = await Order.findOne(query)
    .lean()
    .populate(populatePaths)
    .orFail(
      new ApiError(
        httpStatus.NOT_FOUND,
        "Failed / invalid access. buyer/ seller can only access order related to them. Admin access all."
      )
    );

  // seller & order.cow === null
  if (role === ENUM_USER_ROLE.SELLER && !order.cow) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Seller only have access to order of own cow."
    );
  }

  return order;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
