import mongoose from "mongoose";
import { GeoSchema } from "./geojson.schema.js";

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
    birthdate: {
      type: Date,
      required: true,
      default: "1999-01-01T00:00:00.000Z",
    },
    image: {
      type: String,
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
    idGoogle: {
      type: String,
      required: true,
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
