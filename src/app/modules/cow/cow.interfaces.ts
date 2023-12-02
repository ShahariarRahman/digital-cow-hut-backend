/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type ILocation =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";

export type IBreed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";

export type ILabel = "for sale" | "sold out";

export type ICategory = "Dairy" | "Beef" | "DualPurpose";

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ILocation;
  breed: IBreed;
  weight: number;
  label: ILabel;
  category: ICategory;
  seller: Types.ObjectId | IUser;
};

export type CowModel = {
  isSellerValid(cowId: string, sellerId: string): Promise<ICow | null>;
} & Model<ICow>;

export type ICowFilters = {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  searchTerm?: string;
};
