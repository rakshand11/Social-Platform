import type { Request, Response } from "express";
import { postModel } from "../model/post.model.js";
import { commentModel } from "../model/comment.model.js";

export const commentController = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;
    const { text } = req.body;

    const post = await postModel.findById(postId);

    if (!post) {
      res.status(401).json({
        msg: "post not found",
      });
      return;
    }

    const comment = await commentModel.create({
      post: postId,
      user: userId,
      text,
    });
    res.status(201).json({
      msg: "commented successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
    return;
  }
};
