import { Router } from "express";
import {
  getAllPost,
  getPostController,
  postController,
} from "../controller/post.controller.js";
import { middleware } from "../middleware/middleware.js";

export const postRouter: Router = Router();

postRouter.post("/caption", middleware, postController);
postRouter.get("/getpost/:postId", getPostController);
postRouter.get("/getallpost", getAllPost);
