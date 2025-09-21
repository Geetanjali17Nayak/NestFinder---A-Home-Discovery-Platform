import React from "react";
import Link from "next/link";
import BookingButton from  "../../components/booking";
import api from "@/app/lib/api";

async function getPropertyById(id) {
  const res = await api.get(`/api/properties/getPropertyById/${id}`); 
  if (!res.ok) throw new Error("Failed to fetch property");
  return res.json();
}

export default async function PropertyPage({ params }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 py-10 px-4">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-3xl mt-8 relative z-10">
        {/* Title & Description */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-lg">
            {property.title}
          </h1>
          <p className="text-gray-600 text-lg mb-4 font-medium">
            {property.description}
          </p>
        </div>

        {/* Property Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-blue-50 rounded-xl shadow flex flex-col items-center">
            <span className="text-blue-600 font-bold text-lg mb-1">Location</span>
            <span className="text-gray-800 text-base">{property.location}</span>
          </div>
          <div className="p-6 bg-green-50 rounded-xl shadow flex flex-col items-center">
            <span className="text-green-600 font-bold text-lg mb-1">Price</span>
            <span className="text-green-700 font-extrabold text-2xl">
              ₹{property.price.toLocaleString()}
            </span>
          </div>
          <div className="p-6 bg-yellow-50 rounded-xl shadow flex flex-col items-center">
            <span className="text-yellow-600 font-bold text-lg mb-1">Type</span>
            <span className="text-gray-800 text-base capitalize">{property.type}</span>
          </div>
        </div>

        {/* Images */}
        {property.images && property.images.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              Property Images
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {property.images.map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transform transition duration-300 border border-blue-100"
                >
                  <img
                    src={img}
                    alt={`Property image ${idx + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Button */}
        <div className="flex justify-center mt-8">
          <BookingButton propertyId={property._id || id} />
        </div>

        {/* Back to Home Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/HomePage"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 font-bold text-lg transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}






