"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/lib/api";

export default function UpdateProperty() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch property data to prefill form
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/api/properties/getPropertyById/${id}`);
        setFormData({
          title: res.data.title,
          location: res.data.location,
          price: res.data.price,
          type: res.data.type,
        });
      } catch (err) {
        setError("Failed to fetch property");
      }
    };
    if (id) fetchProperty();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.patch(`/api/properties/updateProperty/${id}`, formData);
      router.push("/profile"); // redirect after update
    } catch (err) {
      setError("Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Update Property</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type (e.g. Apartment, Villa)"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}
