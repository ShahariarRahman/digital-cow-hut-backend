/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

type IName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  _id: Types.ObjectId;
  password: string;
  role: "admin";
  name: IName;
  phoneNumber: string;
  address: string;
};

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, "password" | "role" | "_id">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
