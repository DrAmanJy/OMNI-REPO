import Appointment from "../models/Appointment.js";
import Medicine from "../models/Medicine.js";
import Session from "../models/Session.js";
import User from "../models/User.js";

export const getAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.id });
    if (appointments.length === 0) {
      return res.status(200).json({ appointments: null });
    } else {
      return res.status(200).json({ appointments });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
export const createAppointment = async (req, res) => {
  const { userId, sessionId } = req.body;

  try {
    if (!userId || !sessionId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (session.leftSlot <= 0)
      return res.status(400).json({ message: "No slots left" });

    const existing = await Appointment.findOne({
      userId,
      doctorId: session.doctorId,
      date: session.date,
    });
    if (existing)
      return res
        .status(400)
        .json({ message: "You already have an appointment for this session" });

    session.leftSlot -= 1;
    await session.save();

    const appointment = await Appointment.create({
      userId,
      tittle: session.tittle,
      appointment: session.totalSlot - session.leftSlot,
      doctor: session.doctor,
      doctorId: session.doctorId,
      date: session.date,
    });

    res.status(200).json({ message: "Appointment created", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getInfo = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    const appointments = await Appointment.find({ userId: req.params.id });
    res.json({
      doctors: doctors.length,
      appointment: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (appointment) {
      return res
        .status(200)
        .json({ message: "Appointment successfully canceled" });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.find({ userId: req.params.id });
    if (medicine.length === 0) {
      return res.json({ medicine: null });
    }
    if (medicine) {
      return res.json({ medicine });
    }
    return res.json({ message: "Something whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const buyMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(400).json({ message: "invalid id" });
    }
    if (medicine.status === "ordered") {
      return res.json({ message: "Already bought" });
    }
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, {
      status: "ordered",
    });
    if (updatedMedicine) {
      return res.json({ message: "Successfully bought" });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
