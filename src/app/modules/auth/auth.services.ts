import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";

const userSignup = async (user: IUser): Promise<IUser | null> => {
  const newUser = await User.create(user);
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  return newUser;
};

export const AuthService = {
  userSignup,
};
