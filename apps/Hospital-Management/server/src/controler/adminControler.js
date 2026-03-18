import Appointment from "../models/Appointment.js";
import Medicine from "../models/Medicine.js";
import Session from "../models/Session.js";
import User from "../models/User.js";

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAppointments = async (req, res) => {
  try {
    const appointment = await Appointment.find();
    res.status(200).json({ appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createDoctor = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    if (!userName || !userEmail || !userPassword) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findOne({ userEmail: userEmail });
    if (user) {
      return res.status(401).json({ message: "User already exgists" });
    }
    const doctor = await User.create({
      userName,
      userEmail,
      userPassword,
      role: "doctor",
    });
    if (doctor) {
      return res
        .status(200)
        .json({ message: "Doctor added successfully", doctor });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message )
  }
};
export const createSessions = async (req, res) => {
  const { sessionTitle, doctorEmail, time, slot} = req.body;
  try {
    if (!sessionTitle || !doctorEmail || !time || !slot ) {

      return res.status(404).json({ message: "All fields are require" });
    }
    const doctor = await User.findOne({userEmail:doctorEmail})
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(401).json({ message: "Invalid doctor email" });
    }
    const newSession = await Session.create({
      tittle:sessionTitle,
      doctor:doctor.userName,
      doctorId:doctor._id,
      date:time,
      totalSlot:slot,
      leftSlot: slot,
    });
    if (newSession) {
      return res
        .status(200)
        .json({ message: "Session created successfully", session: newSession });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteSession = async (req, res) => {
  try {
    const deletedSessions = await Session.findByIdAndDelete(req.params.id);
    if (deletedSessions) {
      return res.status(200).json({
        message: "Session deleted successfully",
        session: deletedSessions,
      });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await User.findByIdAndDelete(req.params.id);
    if (deletedDoctor) {
      return res.status(200).json({
        message: "Doctor deleted successfully",
        session: deletedDoctor,
      });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res.status(200).json({
        message: "User deleted successfully",
        session: deletedUser,
      });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateDoctor = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    if (!userName || !userEmail || !userPassword) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findOne({ userEmail: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedDoctor = await User.findByIdAndUpdate(req.params.id, {
      userName,
      userEmail,
      userPassword,
    });
    if (updatedDoctor) {
      return res.status(200).json({
        message: "Doctor updated successfully",
        doctor: updatedDoctor,
      });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getInfo = async (req,res)=>{
  try {
    const users = await User.find()
    const sessions = (await Session.find()).length
    const appointment = (await Appointment.find()).length
    let doctors = users.filter((user=> user.role === 'doctor'))
    doctors = doctors.length
    let patients = users.filter((user=> user.role === 'user'))
    patients = patients.length
    res.json({doctors,patients,sessions,appointment})
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}
export const getMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.find()
    if (medicine.length === 0) {
      return res.json({ medicine: null });
    }
    if (medicine) {
       return res.json({ medicine });
    }
    return res.json({ message:'Something whent wrong' });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const giveMedicine = async (req,res)=>{
 try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(400).json({ message: "invalid id" });
    }
    if (medicine.status === "completed") {
      return res.json({ message: "Already given" });
    }
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, {
      status: "completed",
    });
    if (updatedMedicine) {
      return res.json({ message: "Successfully given" });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

