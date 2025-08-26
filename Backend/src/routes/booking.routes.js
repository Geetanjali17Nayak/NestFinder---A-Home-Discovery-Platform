import express from "express"
import { auth } from "../middlewares/auth.middleware.js"
import { createBooking, deleteBooking, getAllBookings, getBookingById, updateBooking } from "../controllers/booking.controller.js";
import { checkRoles } from "../middlewares/roles.middleware.js";


const bookingRouter=express.Router();
bookingRouter.post("/createBooking",auth,checkRoles("buyer"),createBooking);
bookingRouter.get("/getAllBookings",checkRoles("agent","seller"),auth,getAllBookings);
bookingRouter.get("/getBookingById/:id",auth,getBookingById);
bookingRouter.patch("/updateBooking/:id",auth,checkRoles("agent", "seller"),updateBooking);
bookingRouter.delete("/deleteBooking/:id",auth,checkRoles("buyer", "agent", "seller"),deleteBooking);

export default bookingRouter;
