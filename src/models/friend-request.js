import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema({
  userRequester: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  userResponder: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
  },
});

const FriendRequest = mongoose.model("friend_request", friendRequestSchema);

export { FriendRequest };
