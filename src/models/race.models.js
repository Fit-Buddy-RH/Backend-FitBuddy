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
      type: Schema.Types.ObjectId,
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
      type: number,
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
      enum: ["jogging", "Running", "Retrorunning"],
      default: "jogging",
      required: true,
    },
    quantity: {
      type: number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Terminada", "Agendada", "En Curso"],
      default: "Agendada",
      required: true,
    },
    rating: {
      type: number,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    assistants: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);
