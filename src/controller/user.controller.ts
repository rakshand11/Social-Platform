import type { Request, Response } from "express";
import { signinBody, signupBody } from "../zod/user.js";
import { userModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/middleware.js";
import { email } from "zod";
import { blacklistModel } from "../model/blacklist.model.js";

export const userSignupController = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = signupBody.safeParse(req.body);

    if (!success) {
      res.status(400).json({
        msg: "Invalid input",
        error: error.format(),
      });
      return;
    }

    const { email, firstName, password, lastName } = data;

    const userAlreadyExist = await userModel.findOne({ email: email });

    if (userAlreadyExist) {
      res.status(409).json({
        msg: "user already exist",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    });

    const userId = user._id;

    const token = jwt.sign({ userId }, userMiddleware, { expiresIn: "30d" });

    res.status(201).json({
      msg: "signed up successfully",
      token,
      user,
    });
  } catch (error) {}
};

export const userSigninController = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = signinBody.safeParse(req.body);

    if (!success) {
      res.status(401).json({
        msg: "Invalid Input",
        error: error.format(),
      });
      return;
    }

    const userExist = await userModel.findOne({
      email: data.email,
    });

    console.log(userExist);

    if (!userExist) {
      res.status(401).json({
        msg: "Invalid User",
      });
      return;
    }

    const passwordValidation = await bcrypt.compare(
      data.password,
      userExist.password
    );

    if (!passwordValidation) {
      res.status(401).json({
        msg: "Invalid Password",
      });
      return;
    }

    const userId = userExist._id;

    const token = jwt.sign({ userId }, userMiddleware, { expiresIn: "30d" });

    res.status(200).json({
      msg: "Signin successfully",
      token,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
    });
    return;
  }
};

export const userLogoutController = async (req: Request, res: Response) => {
  try {
    const token = req.token;
    const decoded = req.user;

    console.log(token);

    if (!token) {
      res.status(400).json({
        msg: "token not found",
      });
      return;
    }

    const expiresAt = new Date(decoded.exp * 1000);

    await blacklistModel.create({
      token: token,
      expiresAt: expiresAt,
    });

    res.status(200).json({
      msg: "logged out successfully",
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
    return;
  }
};
