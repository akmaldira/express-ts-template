import { loginBodySpec, registerBodySpec } from "@/dtos/auth.dto";
import AuthService from "@services/auth.service";
import { AppResponse } from "@utils/default-response";
import { NextFunction, Request, Response } from "express";
import { parse } from "valibot";

export default class AuthController {
  private service: AuthService;
  constructor() {
    this.service = new AuthService();
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = parse(loginBodySpec, req.body);
      const result = await this.service.login(email, password);

      const response = new AppResponse(200, "Login successfully", result);
      return response.send(res);
    } catch (error) {
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = parse(registerBodySpec, req.body);
      const result = await this.service.register(email, password);

      const response = new AppResponse(200, "Register successfully", result);
      return response.send(res);
    } catch (error) {
      next(error);
    }
  };
}
