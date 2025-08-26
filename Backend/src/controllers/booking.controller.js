import { bookingModel } from "../models/booking.model.js";

//create Booking

export const createBooking = async (req, res) => {
  try {
    const { property, message } = req.body;

    const booking = new bookingModel({ property, message, user: req.user._id });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get all Bookings

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find()
      .populate("property")
      .populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get Bookings by ID

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingModel
      .findById(req.params.id)
      .populate("property")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const { user } = req;
    let isAuthorized = false;

    if (user.role === "agent") {
      isAuthorized = true;
    } else if (user.role === "buyer" && booking.user._id.equals(user._id)) {
      isAuthorized = true;
    } else if (
      user.role === "seller" &&
      booking.property &&
      booking.property.owner.equals(user._id)
    ) {
      isAuthorized = true;
    }

    if (isAuthorized) {
      return res.status(200).json(booking);
    }
    return res.status(403).json({ message: "Access Denied" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update booking (status only)

export const updateBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await bookingModel.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
      }
    );
    res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete booking

export const deleteBooking = async (req, res) => {
try {
    const booking= await bookingModel.findByIdAndDelete(req.params.id);
    if(!booking)
    {
        res.status(404).json({message:"Booking not found"})
    }
    res.status(200).json({message:"Booking deleted successfully"});
    
} catch (error) {
    return res.status(500).json({ message: error.message });
    
}
};
