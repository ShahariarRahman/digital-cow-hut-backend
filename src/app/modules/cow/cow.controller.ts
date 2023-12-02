import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { CowService } from "./cow.services";
import { ICow } from "./cow.interfaces";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { cowFilterableFields } from "./cow.constants";
import { JwtPayload } from "jsonwebtoken";

// create a cow
const createCow = catchAsync(async (req: Request, res: Response) => {
  const userAuthData = req.user as JwtPayload;
  const { ...data } = req.body;
  const result = await CowService.createCow(userAuthData, data);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow created successfully",
    data: result,
  });
});

// get all cows
const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cows retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

// get single cow
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow retrieved successfully",
    data: result,
  });
});

// update a cow
const updateCow = catchAsync(async (req: Request, res: Response) => {
  const userAuthData = req.user as JwtPayload;
  const cowId = req.params.id;
  const updatedData = req.body;

  const result = await CowService.updateCow(userAuthData, cowId, updatedData);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow updated successfully",
    data: result,
  });
});

// delete a cow
const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const userAuthData = req.user as JwtPayload;
  const id = req.params.id;
  const result = await CowService.deleteCow(userAuthData, id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cow deleted successfully",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
