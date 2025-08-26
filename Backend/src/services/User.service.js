import User from "../models/User.models";
import bcrypt from "bcrypt"


export const createUser= async (userData) => {
    const passwordHash= await bcrypt.hash(userData.password,10);
    userData.password= passwordHash;
  const user = new User(userData);
  return await user.save();
}


export const getUser = async ()=>{
    const users= await User.find();
    return users;

}

export const findUserByemail= async(email)=>{
    return await User.findOne({email})
}

