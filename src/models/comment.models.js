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
    text: {
      type: String,
      maxLenght: 1000,
      trim: true,
    },
    image: {
      type: String,
    },
    rate: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

export { Comment };
