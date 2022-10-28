import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  },
  zipCode: {
    type: Number,
    min: 5,
    required: true,
  },
  level: {
    type: String,
    enum: ["Principiante", "Intermedio", "Experto"],
    default: "Principiante",
    required: true,
  },
  friends: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  friendsRequest: {
    type: Schema.Types.ObjectId,
    ref: "friend_request",
  },
  racesCreated: {
    type: Schema.Types.ObjectId,
    ref: "race",
  },
  racesRequests: {
    type: Schema.Types.ObjectId,
    ref: "race_request",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);
export { User };
