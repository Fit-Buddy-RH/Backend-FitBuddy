import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    race: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "race",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      maxLenght: 100,
      trim: true,
    },
    text: {
      type: String,
      maxLenght: 400,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    imageKey: {
      type: String,
      default: null,
    },
    rate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

export { Comment };
