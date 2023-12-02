import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", routes);

// testing
// app.get("/", async () => {
//   //  test
// });

app.use(globalErrorHandler);

// handle not found:
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    succuss: false,
    message: req.originalUrl,
    errorMessages: [{ path: ".", message: "API Not Found" }],
  });
  next();
});

// test:

export default app;
