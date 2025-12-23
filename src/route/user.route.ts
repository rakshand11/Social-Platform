import { Router } from "express";
import {
  userLogoutController,
  userSigninController,
  userSignupController,
} from "../controller/user.controller.js";
import { middleware } from "../middleware/middleware.js";

export const userRouter: Router = Router();

userRouter.post("/signup", userSignupController);
userRouter.post("/signin", userSigninController);
userRouter.post("/logout", middleware, userLogoutController);
