import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../model/user.model.js";
import { blacklistModel } from "../model/blacklist.model.js";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
      token: string | undefined;
      user: any;
    }
  }
}

interface jwtPayload {
  userId: string;
}

export const userMiddleware = process.env.USER_MIDDLEWARE || "";

export const middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      msg: "token not provided",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  const blacklist = await blacklistModel.findOne({ token: token });

  if (blacklist) {
    res.status(401).json({
      msg: "token expired",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token || "", userMiddleware) as jwtPayload;

    console.log(decoded);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      res.status(404).json({
        msg: "user not found",
      });
      return;
    }

    req.userId = decoded.userId;
    req.token = token;
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
    return;
  }
};
