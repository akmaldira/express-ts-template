import UserController from "@controllers/user.controller";
import { Router } from "express";

const userRoute = Router();
const userController = new UserController();

userRoute.get("/", userController.getAllUsers);

export default userRoute;
