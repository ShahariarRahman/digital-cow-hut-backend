import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ICow, ICowFilters } from "./cow.interfaces";
import { Cow } from "./cow.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { cowSearchableFields } from "./cow.constants";
import { SortOrder } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

// create a cow
const createCow = async (user: JwtPayload, payload: ICow): Promise<ICow> => {
  if (payload.seller !== user._id) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Seller Field will be your user id : ${user._id}`
    );
  }

  const newCow = (await Cow.create(payload)).populate("seller");

  if (!newCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create cow");
  }
  return newCow;
};

// get all cows
const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === "maxPrice") {
          return { price: { $lte: value } };
        }
        if (field === "minPrice") {
          return { price: { $gte: value } };
        } else {
          return { [field]: value };
        }
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .populate("seller")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

// get single cow
const getSingleCow = async (id: string): Promise<ICow> => {
  const result = await Cow.findById(id)
    .populate("seller")
    .orFail(new ApiError(httpStatus.NOT_FOUND, "Cow not found"));
  return result;
};

// update a cow
const updateCow = async (
  user: JwtPayload,
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  await Cow.exists({ _id: id }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Cow not found")
  );

  // Only the specific seller of the cow can update
  const isSellerValid = await Cow.isSellerValid(id, user._id);
  if (!isSellerValid) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Can only be accessed by the seller of the cow"
    );
  }

  // No data from client-side
  if (Object.keys(payload).length < 1) {
    throw new Error("No data found to update");
  }

  // if seller field updates?
  // seller field === logged in seller id
  if (payload.seller && payload.seller !== user._id) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Seller Field will be your user id : ${user._id}`
    );
  }

  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
    .populate("seller")
    .orFail(new ApiError(httpStatus.NOT_FOUND, "Failed to Update"));

  return result;
};

// delete a cow
const deleteCow = async (
  user: JwtPayload,
  id: string
): Promise<ICow | null> => {
  await Cow.exists({ _id: id }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "No cow found to delete")
  );

  // Only the specific seller of the cow can delete
  const isSellerValid = await Cow.isSellerValid(id, user._id);

  if (!isSellerValid) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Can only be accessed by the seller of the cow"
    );
  }

  const result = await Cow.findByIdAndDelete(id).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Failed to Delete")
  );
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
