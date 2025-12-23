import { Router } from "express";
import { middleware } from "../middleware/middleware.js";
import {
  allLikeController,
  likeController,
} from "../controller/like.controller.js";

export const likeRouter: Router = Router();

likeRouter.post("/postlike/:postId", middleware, likeController);
likeRouter.get("/everylike", middleware, allLikeController);
