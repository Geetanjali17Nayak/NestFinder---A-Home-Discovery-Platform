import express from "express"
import { registerUser,loginUser,getUserProfile, updateUserProfile,deleteUserProfile } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";


const userRouter=express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login",loginUser)
userRouter.get("/getUserProfile",auth,getUserProfile);
userRouter.patch("/updateUserProfile",updateUserProfile);
userRouter.delete("/deleteUserProfile",auth,deleteUserProfile);


export default userRouter;