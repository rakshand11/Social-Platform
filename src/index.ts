import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import { userRouter } from "./route/user.route.js";
import { postRouter } from "./route/post.route.js";
import { likeRouter } from "./route/like.route.js";
import { commentRouter } from "./route/comment.route.js";
import { followRouter } from "./route/follow.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

const connectToDB = async () => {
  const mongoURL = process.env.MONGODB_URI || "";
  try {
    await mongoose.connect(mongoURL);
    console.log("successfully connected to DB");
  } catch (error) {
    console.error("failed to connected to DB", error);
  }
};

connectToDB();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);
app.use("/comment", commentRouter);
app.use("/follow", followRouter);
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    msg: "okay",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
