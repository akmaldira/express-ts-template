import { appConfig } from "@config/environments";
import { errorTypes } from "@exceptions/index";
import { AppResponse } from "@utils/default-response";
import { NextFunction, Request, Response } from "express";
import { ValiError } from "valibot";

export default function errorMiddleware(
  error: errorTypes,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    const errors = error.errors || [];

    if (error instanceof ValiError) {
      error.issues.map((issue) =>
        errors.push({
          path: issue.path,
          message: issue.message,
        }),
      );
    }

    if (appConfig.NODE_ENV === "development") {
      console.error(error);
    }

    const response = new AppResponse(statusCode, message, null, errors);
    return response.send(res);
  } catch (error) {
    next(error);
  }
}
