"use client";

import { useSubscription } from "@apollo/client";
import { ON_BOOKING_ADDED } from "../graphql/subscription";

export default function NotificationBell({ ownerId }) {
  const { data, loading, error } = useSubscription(ON_BOOKING_ADDED, {
    variables: { ownerId },
  });

  return (
    <div className="relative">
      <button className="p-2 rounded-full bg-gray-200">
        🔔
        {data && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            1
          </span>
        )}
      </button>
      {data && (
        <div className="absolute mt-2 bg-white shadow p-2 rounded">
          <p>
            New booking for <strong>{data.bookingAdded.property.title}</strong>
          </p>
          <p>From: {data.bookingAdded.user.name}</p>
        </div>
      )}
    </div>
  );
}
