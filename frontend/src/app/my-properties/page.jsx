"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties/getOwnerProperties", {
          withCredentials: true, // ensures cookies/session token is sent
        });
        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching owner properties", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-green-700">My Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="p-4 border rounded-lg shadow-md">
              <h4 className="text-lg font-semibold">{property.title}</h4>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-blue-600 font-bold">${property.price}</p>
              <p className="text-sm text-gray-500">{property.type}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No properties found</p>
        )}
      </div>
    </div>
  );
}
