import { Router } from "express";
import { commentController } from "../controller/comment.controller.js";
import { middleware } from "../middleware/middleware.js";

export const commentRouter: Router = Router();

commentRouter.post("/create/:postId", middleware, commentController);
