"use client";
import { User, LogOut, UserCircle, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client/react";

import gql from "graphql-tag";

export const ON_BOOKING_ADDED = gql`
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

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    logout();
  };

  const isOwner = user && (user.role === "owner" || user.role === "seller");

  useSubscription(ON_BOOKING_ADDED, {
    // With the AuthContext fix, user.id will always be available.
    variables: { ownerId: user?._id || user?.id },
    // Only subscribe if the user is an owner/seller.
    skip: !isOwner,
    onData({ data }) {
      const booking = data?.data?.bookingAdded;
      if (booking) {
        // This is the correct way to handle incoming subscription data.
        setNotifications((prev) => [booking, ...prev]);
      }
    },
  });

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-30">
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold tracking-wide"
      >
        {/* Roof Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M3 12l9-8 9 8" />
          <path d="M9 21V9h6v12" />
        </svg>
        <span>NestFinder</span>
      </Link>

      {user ? (
        <div className="flex items-center gap-6">
          {/* 🔔 Notifications */}
          <div className="relative">
            <button
              className="relative"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <div className="relative">
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                    {notifications.length}
                  </span>
                )}
              </div>
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-lg shadow-xl p-4 z-50 max-h-80 overflow-y-auto">
                <h3 className="font-semibold text-lg mb-2">Notifications</h3>
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500">No new notifications</p>
                ) : (
                  notifications.map((n, idx) => (
                    <div
                      key={idx}
                      className="border-b border-gray-200 py-2 text-sm"
                    >
                      <p className="font-semibold">{n.user.name}</p>
                      <p>
                        requested to book <b>{n.property.title}</b>
                      </p>
                      <p className="text-xs text-gray-500">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* 👤 User Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-full transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <User className="w-6 h-6" />
              <span className="font-semibold">{user.name}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-xl p-4 z-50">
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle className="w-12 h-12 text-blue-600" />
                  <div>
                    <p className="font-bold text-lg">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <hr className="my-2 border-gray-200" />
                <Link
                  href="/profile"
                  className="flex items-center gap-3 w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
                >
                  <User className="w-5 h-5 text-blue-600" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200 mt-2"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-transform duration-200 ease-in-out hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-transform duration-200 ease-in-out hover:scale-105"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
