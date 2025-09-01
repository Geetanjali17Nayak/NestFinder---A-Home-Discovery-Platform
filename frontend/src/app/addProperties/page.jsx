"use client";
import { useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";

export default function AddPropertyPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    type: "rental",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("/api/properties/addProperty", form);
      router.push("/profile"); // Redirect to profile after success
    } catch (err) {
      setError(err.response?.data?.message || "❌ Failed to add property");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-blue-200"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center drop-shadow-lg">
          Add New Property
        </h2>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        {/* Property Images Block */}
        <div className="mb-6">
          <label
            htmlFor="images"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Property Images (URLs, comma separated)
          </label>
          <input
            type="text"
            name="images"
            id="images"
            placeholder="https://image1.jpg, https://image2.jpg"
            value={form.images || ""}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="location"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="type"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Type
          </label>
          <select
            name="type"
            id="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-400"
          >
            <option value="rental">Rental</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-green-700 transition"
        >
          Add Property
        </button>

        {error && (
          <p className="text-red-600 mt-6 text-center text-base font-semibold">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
