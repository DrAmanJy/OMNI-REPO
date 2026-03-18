import express from "express";
import { getAppointments, getSessions, giveMedicine } from "../controler/doctorControler.js";
const router = express.Router()
router.get("/appointment/:id",getAppointments)
router.get("/sessions/:id",getSessions)
router.post("/medicine",giveMedicine)
export default router