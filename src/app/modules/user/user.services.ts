/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { Admin } from "../admin/admin.model";
import { IAdmin } from "../admin/admin.interface";
import { JwtPayload } from "jsonwebtoken";
import { profileProjection } from "./user.constant";

// get all users:
const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({}).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Users Not Found")
  );
  return users;
};

// get single user:
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id).orFail(
    new ApiError(httpStatus.NOT_FOUND, "User Not Found")
  );
  return result;
};
// update user:
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser> => {
  await User.exists({ _id: id }).orFail(
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
  }).orFail(
    new ApiError(
      httpStatus.NOT_FOUND,
      "Failed to Update User or User not Found"
    )
  );

  return result;
};

// delete user:
const deleteUser = async (id: string): Promise<IUser> => {
  const result = await User.findByIdAndDelete(id).orFail(
    new ApiError(
      httpStatus.NOT_FOUND,
      "Failed to Delete User or User not Found"
    )
  );
  return result;
};

const getUserProfile = async (
  userAuthData: JwtPayload
): Promise<IUser | IAdmin> => {
  const { _id, role } = userAuthData;

  // role ? admin | seller| buyer => model
  const UserModel: any =
    role === ENUM_USER_ROLE.ADMIN
      ? Admin
      : role === ENUM_USER_ROLE.BUYER || role === ENUM_USER_ROLE.SELLER
      ? User
      : null;

  const userProfile = await UserModel.findById(_id, profileProjection)
    .lean()
    .orFail(
      new ApiError(httpStatus.NOT_FOUND, "Failed to retrieve or User Not Found")
    );

  return userProfile;
};

const updateUserProfile = async (
  userAuthData: JwtPayload,
  payload: Partial<IUser>
): Promise<IUser | IAdmin> => {
  const { _id, role } = userAuthData;

  // role ? admin | seller| buyer => model
  const UserModel: any =
    role === ENUM_USER_ROLE.ADMIN
      ? Admin
      : role === ENUM_USER_ROLE.BUYER || role === ENUM_USER_ROLE.SELLER
      ? User
      : null;

  // role !== admin | buyer | seller
  if (!UserModel) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Role must be admin | buyer | seller"
    );
  }

  // if user exists at database
  await UserModel.exists({ _id }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "User not found !")
  );

  // if data not sent from client-side
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

  const result = await UserModel.findOneAndUpdate({ _id }, UserData, {
    new: true,
  })
    .lean()
    .select(profileProjection);

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
};
