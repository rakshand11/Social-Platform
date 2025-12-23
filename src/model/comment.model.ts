import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema( //made comment model because it has numerous values in it as well as it goes for likes
  {
    text: {
      type: String,
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

export const commentModel = mongoose.model("comment", commentSchema);
