import express from "express";
import { about, deleteAcc, login, signup, updateAcc } from "../controler/authControler.js";
const router = express.Router()
router.post("/login",login)
router.post("/signup",signup)
router.get("/about/:id",about)
router.delete("/delete/:id",deleteAcc)
router.put("/delete",updateAcc)
export default router