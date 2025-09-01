import express from "express";
import { sendEmail } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/sendEmail", sendEmail);

export default messageRouter;
