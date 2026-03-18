import express from "express";
import {
  createDoctor,
  createSessions,
  deleteDoctor,
  deleteSession,
  deleteUser,
  getAppointments,
  getDoctors,
  getInfo,
  getMedicine,
  getSessions,
  getUsers,
  giveMedicine,
  updateDoctor,
} from "../controler/adminControler.js";
const router = express.Router();
router.get("/appointment", getAppointments);
router.get("/medicine", getMedicine);
router.get("/sessions", getSessions);
router.post("/sessions", createSessions);
router.delete("/sessions/:id", deleteSession);
router.get("/doctors", getDoctors);
router.post("/doctor", createDoctor);
router.put("/doctor/:id", updateDoctor);
router.put("/medicine/:id", giveMedicine);
router.delete("/doctor/:id", deleteDoctor);
router.delete("/user/:id", deleteUser);
router.get("/patients", getUsers);
router.get("/info", getInfo);
export default router;
