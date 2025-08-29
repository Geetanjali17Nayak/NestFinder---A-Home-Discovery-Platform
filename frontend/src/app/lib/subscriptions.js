import { gql } from "@apollo/client";

export const BOOKING_ADDED_SUBSCRIPTION = gql`
  subscription bookingAdded($ownerId: ID!) {
    bookingAdded(ownerId: $ownerId) {
      _id
      property {
        _id
        title
      }
      user {
        _id
        name
      }
      message
      status
      createdAt
    }
  }
`;
