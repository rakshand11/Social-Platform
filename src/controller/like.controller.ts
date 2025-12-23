import type { Request, Response } from "express";
import { postModel } from "../model/post.model.js";
import { likeModel } from "../model/like.model.js";
import { userModel } from "../model/user.model.js";

export const likeController = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;

    const post = await postModel.findById(postId);

    if (!post) {
      res.status(404).json({
        msg: "post not found",
      });
      return;
    }

    const existingLike = await likeModel.findOne({
      post: postId,
      user: userId,
    });

    if (existingLike) {
      res.status(409).json({
        msg: "you have already liked this post",
      });
      return;
    }

    const like = await likeModel.create({
      post: postId,
      user: userId,
    });
    res.status(201).json({
      msg: "post liked successfully",
      like,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

export const allLikeController = async (req: Request, res: Response) => {
  try {
    const user_id = req.userId;
    const like = await likeModel.find({ user: user_id });
    const post = like.map((like) => like.post);

    if (!like) {
      res.status(404).json({
        msg: "likes not found",
      });
      return;
    }

    res.status(200).json({
      msg: "all liked post",
      post,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "internal server error" });
  }
};
