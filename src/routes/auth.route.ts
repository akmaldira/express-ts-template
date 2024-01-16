import AuthController from "@controllers/auth.controller";
import { Router } from "express";

const authRoute = Router();
const authController = new AuthController();

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);

export default authRoute;
