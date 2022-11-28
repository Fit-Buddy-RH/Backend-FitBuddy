import mongoose from "mongoose";

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
      minLenght: 15,
      maxLenght: 10000,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
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
    status: {
      type: String,
      enum: ["Programada", "En Curso", "Terminada"],
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

const Race = mongoose.model("race", raceSchema);
export { Race };
