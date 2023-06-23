import { IPaginationOptions } from "../interfaces/pagination";

export const paginationFields: (keyof IPaginationOptions)[] = [
  "page",
  "limit",
  "sortBy",
  "sortOrder",
];
