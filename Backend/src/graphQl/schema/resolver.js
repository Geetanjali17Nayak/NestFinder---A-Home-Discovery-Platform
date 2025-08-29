import { bookingMutations } from "../modules/booking/mutation.js";
import { pubsub } from "../server/pubsub.js";

export const resolvers = {
  Query: {
    _: () => true,
  },
  Mutation: bookingMutations,
  Subscription: {
    bookingAdded: {
      subscribe: (_, { ownerId }) =>
        pubsub.asyncIterableIterator(`BOOKING_ADDED_${ownerId}`),
    },
  },
};
