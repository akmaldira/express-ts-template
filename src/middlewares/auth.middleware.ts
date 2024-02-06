import { appConfig } from "@/config/environments";
import AppDataSource from "@/database/datasource";
import User from "@/database/entities/user.entity";
import { UnauthorizedException } from "@/exceptions";
import ForbiddenException from "@/exceptions/forbidden.exception";
import { UserRole } from "@entities/enum";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function hasRole(roles: UserRole[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split("Bearer")[1];

      if (!token) {
        throw new UnauthorizedException("Unauthorized");
      }

      const decoded = jwt.verify(token, appConfig.JWT_SECRET) as { id: string };
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new UnauthorizedException("Unauthorized");
      }

      if (!roles.includes(user.role)) {
        throw new ForbiddenException("Unauthorized");
      }

      req.user = user ?? undefined;
      next();
    } catch (error) {
      next(error);
    }
  };
}
