import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes.js" 
import propertyRouter from "./routes/property.routes.js";
import bookingRouter from "./routes/booking.routes.js";



export const app= express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // The origin of your frontend app
  credentials: true,
}));
app.use("/api/users", userRouter);
app.use("/api/properties", propertyRouter); 
app.use("/api/bookings", bookingRouter);
