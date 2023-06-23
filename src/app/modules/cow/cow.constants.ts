import {
  IBreed,
  ICategory,
  ICowFilters,
  ILabel,
  ILocation,
} from "./cow.interfaces";

export const location: ILocation[] = [
  "Dhaka",
  "Chattogram",
  "Barishal",
  "Rajshahi",
  "Sylhet",
  "Comilla",
  "Rangpur",
  "Mymensingh",
];

export const breed: IBreed[] = [
  "Brahman",
  "Nellore",
  "Sahiwal",
  "Gir",
  "Indigenous",
  "Tharparkar",
  "Kankrej",
];

export const label: ILabel[] = ["for sale", "sold out"];

export const category: ICategory[] = ["Dairy", "Beef", "DualPurpose"];

export const cowFilterableFields: (keyof ICowFilters)[] = [
  "minPrice",
  "maxPrice",
  "location",
  "searchTerm",
];

export const cowSearchableFields = ["location", "breed", "category"];
