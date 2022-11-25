import mongoose from "mongoose";

const raceRequestSchema = mongoose.Schema({
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
  status: {
    type: String,
    enum: ["Pendiente", "Aceptado", "Rechazado"],
    default: "Pendiente",
    required: true,
  },
});

const RaceRequest = mongoose.model("race_request", raceRequestSchema);

export { RaceRequest };
