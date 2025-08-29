
"use client";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../lib/api";
import Router from "next/router";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (user && user.role === "seller") {
      api
        .get("/api/properties/getOwnerProperties")
        .then((res) => setProperties(res.data))
        .catch((err) => console.error("Error fetching properties", err));
    }
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  if (!user && !loading) {
    return (
      <div className="p-8 text-center">Please log in to view your profile.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 py-10 px-4">
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-3xl mt-10">
        <div className="flex items-center mb-6">
          <img
            src={
              user.avatar && user.avatar !== ""
                ? user.avatar
                : "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.name)
            }
            alt="User"
            className="w-16 h-16 rounded-full mr-4 object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-700">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {user.role === "seller" && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-green-700">
              My Properties
            </h3>
            <Link href="/addProperties">
              <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Add Property
              </button>
            </Link>

            {properties.length === 0 ? (
              <p className="text-gray-500">No properties found.</p>
            ) : (
              <ul className="space-y-4">
                {properties.map((property) => (
                  <li
                    key={property._id}
                    className="bg-white p-4 rounded-2xl shadow-lg flex gap-6 items-center border border-blue-100 hover:shadow-xl transition"
                  >
                    {property.images && property.images.length > 0 && (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-700 text-xl mb-1 truncate">
                        {property.title}
                      </h4>
                      <p className="text-gray-700 text-sm mb-1">
                        {property.location}
                      </p>
                      <p className="text-green-700 font-bold text-lg mb-2">
                        ₹{property.price.toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Link href={`/updateProperty/${property._id}`}>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 shadow">
                            Update
                          </button>
                        </Link>
                        <Link href={`/deleteProperty/${property._id}`}>
                          <button
                            onClick={async () => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this property?"
                                )
                              ) {
                                // try {
                                  const res = await fetch(
                                    `http://localhost:5000/api/properties/deleteProperty/${property._id}`,
                                    { method: "DELETE" }
                                  );
                                  if (res.ok) {
                                    alert("Property deleted successfully!");
                                    Router.push("/profile");
                                  } else {
                                    alert("Failed to delete property.");
                                  }
                                // } catch (error) {
                                  console.error(error);
                                  alert("Something went wrong.");
                                }
                              }
                            }
                            // }
                            className="px-3 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-700 shadow"
                          >
                            Delete
                          </button>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
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
