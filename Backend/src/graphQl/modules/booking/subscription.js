import { pubsub } from "../../server/pubsub.js";

export const subscriptionResolvers={
    bookingAdded: {
       subscribe: (_, { ownerId }) => pubsub.asyncIterator([`BOOKING_ADDED_${ownerId}`])

    },
}

