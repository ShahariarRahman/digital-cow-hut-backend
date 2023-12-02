import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { ILoginUserResponse } from "../auth/auth.interface";

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  const newAdmin = await Admin.create(payload);
  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create admin");
  }
  return newAdmin.toObject();
};

const loginAdmin = async (
  payload: Pick<IAdmin, "phoneNumber" | "password">
): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  // admin exists:
  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not exist");
  }

  // password matching:
  if (
    !isAdminExist.password ||
    !(await Admin.isPasswordMatched(password, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // create access token & refresh token
  const { _id, role } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
};
