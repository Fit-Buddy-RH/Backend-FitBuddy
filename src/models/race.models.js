import mongoose from "mongoose";

const GeoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const raceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 60,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLenght: 10000,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    location: GeoSchema,
    level: {
      type: String,
      enum: ["Principiante", "Intermedio", "Experto"],
      default: "Principiante",
      required: true,
    },
    km: {
      type: Number,
      enum: [5, 10, 15],
      default: 5,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["Jogging", "Running", "Retrorunning"],
      default: "Jogging",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Programada", "Terminada"],
      default: "Programada",
      required: true,
    },
    rating: {
      type: Number,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    assistants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

raceSchema.index({ location: "2dsphere" });

const Race = mongoose.model("race", raceSchema);
export { Race };
