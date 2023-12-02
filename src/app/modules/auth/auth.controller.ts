/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.services";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import config from "../../../config";
import { IRefreshTokenResponse } from "./auth.interface";

const userSignup = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.userSignup(userData);

  const { password, ...rest } = result;

  sendResponse<Omit<IUser, "password">>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: rest,
  });
});

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.userLogin(userData);

  const { refreshToken, ...rest } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: rest,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New access token generated successfully !",
    data: result,
  });
});

export const AuthController = {
  userSignup,
  userLogin,
  refreshToken,
};
