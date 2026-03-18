import { response } from "express";
import Appointment from "../models/Appointment.js";
import Medicine from "../models/Medicine.js";
import Session from "../models/Session.js";
import User from "../models/User.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ doctorId: req.params.id });
    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAppointments = async (req, res) => {
  try {
    const appointment = await Appointment.find({ doctorId: req.params.id });
    if (appointment.length === 0) {
      return res.status(200).json({ appointment: null });
    }
    res.status(200).json({ appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const giveMedicine = async (req, res) => {
  const { userId, doctorId, disease, medicine } = req.body;
  try {
    if (!userId || !doctorId || !disease || !medicine) {
      return res.status(400).json({ message: "All feild are required" });
    }
    const doctor = await User.findById(doctorId);
    const user = await User.findById(userId);
    if (doctor.role !== "doctor") {
      return res.status(400).json({ message: "invalid doctor" });
    }
    if (user.role !== "user") {
      return res.status(400).json({ message: "invalid user" });
    }
    const medicineD = await Medicine.create({
      userId,
      userName: user.userName,
      doctorId,
      disease,
      medicine,
      doctorName: doctor.userName,
    });
    if (medicineD) {
      return res.json({ message: "Medicine given successfully" });
    }
    return res.status(500).json({ message: "Something whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
