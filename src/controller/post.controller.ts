import type { Request, Response } from "express";
import { postModel } from "../model/post.model.js";

export const postController = async (req: Request, res: Response) => {
  try {
    const { caption } = req.body;

    if (!caption) {
      res.status(400).json({
        msg: "caption not found",
      });
      return;
    }

    const userId = req.userId;
    console.log(userId);

    const post = await postModel.create({
      caption: caption,
      user: userId,
    });
    res.status(201).json({
      msg: "post created successfully",
      post: post,
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

export const getPostController = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findById(postId).select("caption");

    if (!post) {
      res.status(404).json({
        msg: "post not found ",
      });
      return;
    }
    res.status(200).json({
      msg: "post found",
      post: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
    return;
  }
};

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const user_id = req.userId;
    const post = await postModel.find({ user_id });
    res.status(200).json({
      msg: " post found",
      post,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};
