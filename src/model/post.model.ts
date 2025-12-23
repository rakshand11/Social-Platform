import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    caption: {
      type: String,
      default: "",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

export const postModel = mongoose.model("post", postSchema);
