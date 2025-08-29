// src/app/contact/[ownerId]/page.js
"use client";

import { useEffect, useState } from "react";

export default function ContactPage({ params }) {
  const { ownerId } = params; // ✅ no need to await
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/getUserById/${ownerId}`
        );
        const data = await res.json();
        setOwner(data);
      } catch (err) {
        console.error("Error fetching owner:", err);
      }
    };
    fetchOwner();
  }, [ownerId]);

  if (!owner)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 py-10 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl">
        {/* Avatar / Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            Owner Contact Details
          </h2>
        </div>

        {/* Owner Info */}
        <div className="mb-4">
          <span className="block text-gray-600 font-semibold mb-1">Name</span>
          <span className="block text-gray-800 text-lg">{owner.name}</span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-600 font-semibold mb-1">Email</span>
          <span className="block text-gray-800 text-lg">{owner.email}</span>
        </div>
        {owner.phone && (
          <div className="mb-4">
            <span className="block text-gray-600 font-semibold mb-1">
              Phone
            </span>
            <span className="block text-gray-800 text-lg">{owner.phone}</span>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
