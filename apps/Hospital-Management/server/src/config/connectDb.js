import mongoose from "mongoose";
export default async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoose");
  } catch (error) {
    console.log("faild to connect to mongoose : ", error.message);
  }
}
