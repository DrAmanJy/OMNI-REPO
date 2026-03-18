import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin", "doctor",'pharmacists'] },
  },
  { timestamps: true, versionKey: false }
);
const User = mongoose.model("User", userSchema);
export default User;
