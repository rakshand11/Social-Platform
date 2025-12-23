import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
  {
    followers: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    following: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

followSchema.index({ followers: 1, following: 1 }, { unique: true });
export const followModel = mongoose.model("follow", followSchema);
