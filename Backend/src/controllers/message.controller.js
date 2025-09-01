import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


export const sendEmail = async (req, res) => {
  try {
    const { ownerEmail, userEmail, message } = req.body;

    if (!ownerEmail || !userEmail || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Transporter config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // gmail app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // user’s email (sender shown)
      to: ownerEmail,  // property owner’s email
      subject: "New message from user",
      text: message,
      replyTo: process.env.EMAIL_USER, // so owner can reply directly
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Email could not be sent" });
  }
};
