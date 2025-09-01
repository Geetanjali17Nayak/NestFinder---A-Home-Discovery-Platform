import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
export const BOOKING_CREATED = "BOOKING_CREATED";
export const USER_REGISTERED = "USER_REGISTERED";

export { pubsub };
