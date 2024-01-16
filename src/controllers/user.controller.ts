import UserService from "@services/user.service";
import { AppResponse } from "@utils/default-response";
import { NextFunction, Request, Response } from "express";

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.service.getAllUsers();

      const response = new AppResponse(200, "Success", users);
      return response.send(res);
    } catch (error) {
      next(error);
    }
  };
}
