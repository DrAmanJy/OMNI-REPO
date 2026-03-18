import express from "express";
import {
  buyMedicine,
  createAppointment,
  deleteAppointment,
  getAppointment,
  getInfo,
  getMedicine,
} from "../controler/userControler.js";
import { getSessions } from "../controler/adminControler.js";
const router = express.Router();
router.get("/appointment/:id", getAppointment);
router.get("/info/:id", getInfo);
router.get("/medicine/:id", getMedicine);
router.put("/medicine/:id", buyMedicine);
router.get("/sessions", getSessions);
router.post("/appointment", createAppointment);
router.delete("/appointment/:id", deleteAppointment);
export default router;
