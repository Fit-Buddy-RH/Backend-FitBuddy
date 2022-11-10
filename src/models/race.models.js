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
    status: {
      type: String,
      enum: ["Terminada", "Agendada", "En Curso"],
      default: "Scheduled",
      required: true,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    rating: {
      type: number,
    },
    assistants: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);
