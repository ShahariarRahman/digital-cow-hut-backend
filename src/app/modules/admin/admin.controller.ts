/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin } from "./admin.interface";
import { AdminService } from "./admin.services";
import config from "../../../config";
import { IRefreshTokenResponse } from "../auth/auth.interface";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await AdminService.createAdmin(adminData);

  const { password, ...rest } = result;

  sendResponse<Omit<IAdmin, "password">>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Admin created successfully",
    data: rest,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
  const result = await AdminService.loginAdmin(adminData);

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

export const AdminController = {
  createAdmin,
  loginAdmin,
};
