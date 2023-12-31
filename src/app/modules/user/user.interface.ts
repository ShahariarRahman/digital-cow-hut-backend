/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

type IUserRole = "seller" | "buyer";

type IName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id: Types.ObjectId;
  password: string;
  role: IUserRole;
  name: IName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, "password" | "role" | "_id">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
