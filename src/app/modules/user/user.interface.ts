import { Model } from "mongoose";

type IUserRole = "seller" | " buyer";

type IName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  password: string;
  role: IUserRole;
  name: IName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
