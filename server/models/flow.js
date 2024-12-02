import mongoose from "mongoose";

const flowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nodes: [
    {
      id: String,
      type: {
        type: String,
        enum: ["coldEmail", "delay", "leadSource"],
      },
      position: {
        x: Number,
        y: Number,
      },
      data: mongoose.Schema.Types.Mixed,
    },
  ],
  edges: [
    {
      id: String,
      source: String,
      target: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Flow", flowSchema);
