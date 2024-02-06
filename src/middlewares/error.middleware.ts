import { appConfig } from "@config/environments";
import { UnauthorizedException, errorTypes } from "@exceptions/index";
import { AppResponse } from "@utils/default-response";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ValiError } from "valibot";

export default function errorMiddleware(
  error: errorTypes,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Something went wrong";
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

    if (
      error instanceof JsonWebTokenError ||
      error.name === "TokenExpiredError"
    ) {
      const error = new UnauthorizedException("Token is invalid or expired");
      statusCode = error.statusCode;
      message = error.message;
    }

    const response = new AppResponse(statusCode, message, null, errors);
    return response.send(res);
  } catch (error) {
    next(error);
  }
}
