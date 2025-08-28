import User from "../models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user from its id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getUserProfile= async (req,res)=>{
    const userId= req.user.id;
    try{
        const user= await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
    
}

export const updateUserProfile= async (req,res)=>{
  const user= req.user;
  const updates= req.body;
  try{
    const updatedUser= await User.findByIdAndUpdate(user._id,updates,{new:true}).select("-password"); 
    res.json(updatedUser);
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

  export const deleteUserProfile= async (req,res)=>{
    const user= req.user;
    try{
      await User.findByIdAndDelete(user._id);
      res.json({message:"User deleted successfully"});    
    }
    catch(err){
      res.status(500).json({message: err.message});
    }
  }

