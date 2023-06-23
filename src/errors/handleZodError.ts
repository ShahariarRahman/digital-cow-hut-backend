import { IGenericErrorMessage } from "../interfaces/error";
import { IGenericErrorResponse } from "../interfaces/common";
import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const error: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: error,
  };
};

export default handleZodError;
