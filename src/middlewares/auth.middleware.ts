import { UnauthorizedException } from "@/exceptions";
import { UserRole } from "@entities/enum";
import { NextFunction, Request, Response } from "express";

export default async function (role: UserRole) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split("Bearer")[1];

      if (!token) {
        throw new UnauthorizedException("Unauthorized");
      }

      const user = await req.app.locals.authService.verifyToken(role, token);
      req.app.locals.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}
