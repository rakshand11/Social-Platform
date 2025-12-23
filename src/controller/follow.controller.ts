import type { Request, Response } from "express";
import { followModel } from "../model/follow.model.js";

export const FollowController = async (req: Request, res: Response) => {
  try {
    const followerId = req.userId;
    const followingId = req.params.followingId;

    if (followerId === followingId) {
      res.status(400).json({
        msg: "you can not follow yourself",
      });
      return;
    }

    const follow = await followModel.findOne({
      followers: followerId,
      following: followingId,
    });

    if (follow) {
      res.status(400).json({
        msg: "ypu are already following this user",
      });
      return;
    }

    const Follow = followModel.create({
      followers: followerId,
      following: followingId,
    });

    res.status(201).json({
      msg: "followed successfully",
      Follow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
    return;
  }
};

export const unFollowController = async (req: Request, res: Response) => {
  try {
    const followerId = req.userId;
    const followingId = req.params.followingId;

    await followModel.deleteOne({
      followers: followerId,
      following: followingId,
    });
    res.status(200).json({
      msg: "unfollowed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "internal server error",
    });
    return;
  }
};

export const getAllFollowers = async (req: Request, res: Response) => {
  const followerId = req.params.followerId;

  const follower = await followModel
    .find({
      following: followerId,
    })
    .populate("followers", "firstName");
  res.status(200).json({
    follower,
  });
};

export const getAllFollowing = async (req: Request, res: Response) => {
  const followingId = req.params.followingId;

  const following = await followModel.find({
    followers: followingId,
  });

  if (following.length === 0) {
    res.status(400).json({
      msg: "u have no followings",
    });
    return;
  }

  res.status(200).json({
    following,
  });
};
