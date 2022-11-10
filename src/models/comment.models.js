import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    race: {
      type: Schema.Types.ObjectId,
      ref: "race",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
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
      type: number,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

export { Comment };
