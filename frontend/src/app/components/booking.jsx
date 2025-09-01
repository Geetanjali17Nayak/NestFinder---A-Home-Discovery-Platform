"use client"; // This is important for React to treat this as a client component

import { useMutation } from "@apollo/client/react";
import gql from "graphql-tag";
import { useAuth } from "../context/AuthContext";
import { use } from "react";

const ADD_BOOKING = gql`
  mutation AddBooking($property: ID!, $user: ID!, $message: String) {
    addBooking(property: $property, user: $user, message: $message) {
      _id
      message
      status
      property {
        title
      }
      user {
        name
        email
      }
    }
  }
`;


// const ADD_BOOKING = gql`
//   mutation AddBooking($ownerId: ID!, $bookingInput: BookingInput!) {
//     addBooking(ownerId: $ownerId, bookingInput: $bookingInput) {
//       id
//       property
//       user
//       message
//       status
//     }
//   }
// `;



export default function BookingButton({ propertyId }) {
  const { user } = useAuth();
  const [addBooking, { loading, error }] = useMutation(ADD_BOOKING);

  const handleBooking = async () => {
    console.log("User in BookingButton:", user);
    if (!user) {
      alert("You must be logged in to book.");
      return;
    }
    try {
      await addBooking({
        variables: {
          property: propertyId,
          user: user._id || user.id,
          message: "Booking request",
        },
      });

      alert("Booking requested!");
    } catch (err) {
      console.error(err);
      alert("Failed to book");
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={loading}
      className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 font-bold text-lg transition"
    >
      {loading ? "Booking..." : "Book Now"}
    </button>
  );
}
