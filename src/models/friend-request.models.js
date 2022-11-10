import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema({
  userRequester: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userResponder: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pendiente", "Aceptado", "Rechazado"],
    default: "Pendiente",
    required: true,
  },
});

const FriendRequest = mongoose.model("friend_request", friendRequestSchema);

export { FriendRequest };
