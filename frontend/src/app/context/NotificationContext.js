"use client";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useSubscription } from "@apollo/client/react";
import gql from "graphql-tag";

// Subscriptions
const ON_BOOKING_ADDED = gql`
  subscription OnBookingAdded($ownerId: ID!) {
    bookingAdded(ownerId: $ownerId) {
      id
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

const ON_USER_REGISTERED = gql`
  subscription OnUserRegistered {
    userRegistered {
      id
      name
      email
      role
    }
  }
`;

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user: currentUser } = useAuth(); // logged-in user
  const [notifications, setNotifications] = useState([]);

  const isOwner =
    currentUser &&
    (currentUser.role === "owner" || currentUser.role === "seller");
  const isAdmin = currentUser && currentUser.role === "admin";

  // Booking subscription
  useSubscription(ON_BOOKING_ADDED, {
    variables: { ownerId: currentUser?._id || currentUser?.id },
    skip: !isOwner,
    onData({ data }) {
      const booking = data?.data?.bookingAdded;
      if (booking && currentUser) {
        setNotifications((prev) => [
          { type: "booking", ...booking, receiver: currentUser.name },
          ...prev,
        ]);
      }
    },
  });

  // User registration subscription
  useSubscription(ON_USER_REGISTERED, {
    skip: !isAdmin,
    onData({ data }) {
      const newUser = data?.data?.userRegistered;
      if (newUser && currentUser) {
        setNotifications((prev) => [
          {
            type: "user",
            message: `${newUser.name} registered as ${newUser.role}`,
            user: newUser,
            receiver: currentUser.name,
          },
          ...prev,
        ]);
      }
    },
  });

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, currentUser }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
