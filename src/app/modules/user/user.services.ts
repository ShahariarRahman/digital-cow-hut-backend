/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({}).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Users Not Found")
  );
  return users;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id).orFail(
    new ApiError(httpStatus.NOT_FOUND, "User Not Found")
  );
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  await User.findById(id).orFail(
    new ApiError(httpStatus.NOT_FOUND, "User not found !")
  );

  if (Object.keys(payload).length < 1) {
    throw new Error("No data found to update");
  }

  const { name, ...UserData } = payload;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (UserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, UserData, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Failed to Delete User")
  );
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
