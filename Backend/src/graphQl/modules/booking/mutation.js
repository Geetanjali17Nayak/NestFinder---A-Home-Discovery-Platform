import { bookingModel } from "../../../models/booking.model.js";
import Property from "../../../models/property.model.js";
import { pubsub } from "../../server/pubsub.js";

export const bookingMutations = {
  addBooking: async (_, { property, user, message }) => {
    const newBooking = await bookingModel.create({
      property,
      user,
      message,
      status: "pending",
    });

    // Fetch the property to get the owner's ID
    const propertyDetails = await Property.findById(property);
    if (propertyDetails && propertyDetails.owner) {
      const ownerId = propertyDetails.owner.toString();

      // The subscription payload needs to match the schema, so we populate the booking.
      const populatedBooking = await newBooking.populate([{ path: 'property' }, { path: 'user', select: 'name email avatar' }]);
      pubsub.publish(`BOOKING_ADDED_${ownerId}`, { bookingAdded: populatedBooking });
       return populatedBooking;
    }

    return newBooking;
  },
};