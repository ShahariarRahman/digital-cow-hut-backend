import { IOrder } from "./order.interfaces";

const createOrder = async (order: IOrder) => {
  return order;
};

export const OrderService = {
  createOrder,
};
