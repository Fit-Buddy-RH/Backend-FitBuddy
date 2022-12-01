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

export { GeoSchema };
