import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema(
  {
    userId:{type: String, required: true },
    tittle: { type: String, required: true },
    appointment: { type: String, required: true },
    doctor: { type: String, required: true },
    doctorId: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);
const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment
