import { Router } from "express";
import {
  FollowController,
  getAllFollowers,
  getAllFollowing,
  unFollowController,
} from "../controller/follow.controller.js";
import { middleware } from "../middleware/middleware.js";

export const followRouter: Router = Router();

followRouter.post("/create/:followingId", middleware, FollowController);
followRouter.delete("/unfollow/:followingId", middleware, unFollowController);
followRouter.get("/:followerId", getAllFollowers);
followRouter.get("/following/:followingId", getAllFollowing);
