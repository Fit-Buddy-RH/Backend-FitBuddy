import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLenght: 1,
      maxLenght: 30,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      minLenght: 1,
      maxLenght: 30,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://fibuddy-users-bucket.s3.us-east-2.amazonaws.com/profile+picture.png",
    },
    imageKey: {
      type: String,
      default: null,
    },
    level: {
      type: String,
      enum: ["Principiante", "Intermedio", "Experto"],
      default: "Principiante",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /.*@.*\..*/,
    },
    password: {
      type: String,
      default: null,
    },
    idGoogle: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    friendsRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "friend_request",
      },
    ],
    racesCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "race",
      },
    ],
    racesRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "race_request",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export { User };
