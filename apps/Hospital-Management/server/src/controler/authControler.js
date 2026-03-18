import User from "../models/User.js";

export const signup = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    if (!userName || !userEmail || !userPassword) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findOne({ userEmail: userEmail });
    if (user) {
      return res.status(401).json({ message: "User already exgists" });
    }
    const newUser = await User.create({ userName, userEmail, userPassword });
    if (newUser) {
      return res
        .status(200)
        .json({ message: "User Signup successfully", user: newUser });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    if (!userEmail || !userPassword) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findOne({ userEmail: userEmail })
    if (user?.userPassword !== userPassword) {
      return res.status(401).json({ message: "Invaild credentials" });
    }
    return res
      .status(200)
      .json({ message: "User Login successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const about = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.json({ user: null });
  }
  res.json({user})
};
export const deleteAcc = async (req,res)=>{
  try {
     const account = await User.findByIdAndDelete(req.params.id)
  if (account) {
  return  res.json({message:"Account successfully deleted"})
  }
  res.status(500).json({ message: 'Somthing whent wrong' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
 
}
export const updateAcc = async (req, res) => {
  console.log(req.body)
  const { userName, userEmail, userPassword ,userId } = req.body;
  console.log(userName, userEmail, userPassword ,userId )
  try {
    if (!userName || !userEmail || !userId) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findById(userId)

    if (user.userEmail !== userEmail) {
       const user = await User.find({userEmail})
       if (user) {
        return res.status(401).json({ message: "Email already in use" });
       }
      const newUser = await User.findByIdAndUpdate(userId,{ userName, userEmail,userPassword },{new:true});
      return res
        .status(200)
        .json({ message: "User successfully  updated", user: newUser });
    }
    if (userPassword) {
      const newUser = await User.findByIdAndUpdate(userId,{ userName, userPassword },{new:true});
      return res
        .status(200)
        .json({ message: "User successfully  updated", user: newUser });
    }
    const newUser = await User.findByIdAndUpdate(userId,{ userName },{new:true});
    if (newUser) {
      return res
        .status(200)
        .json({ message: "User successfully  updated", user: newUser });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};