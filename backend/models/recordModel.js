import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  condition: { type: String, required: true },
  description: { type: String, required: true },
  symptoms: [String],
  doctor: String,
  reports: [String],
  date: { type: Date, required: true },
  notes: String, 
  painScale: { type: Number, min: 0, max: 10 },
  painDuration: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
}, { timestamps: true });

const recordModel = mongoose.models.record || mongoose.model("record", recordSchema);

export default recordModel;