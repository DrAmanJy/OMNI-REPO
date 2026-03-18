import mongoose from "mongoose";
const medicineSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    doctorId: { type: String, required: true },
    disease: { type: String, required: true },
    medicine: { type: String, required: true },
    doctorName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "ordered", "completed"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);
const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
