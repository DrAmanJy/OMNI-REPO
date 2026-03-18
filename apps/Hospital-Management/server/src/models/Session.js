import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema(
  {
    tittle: { type: String, required: true },
    doctor: { type: String, required: true },
    doctorId: { type: String, required: true },
    date: { type: Date, required: true },
    totalSlot: { type: Number, required: true },
    leftSlot: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);
const Session = mongoose.model("Session", sessionSchema);
export default Session
