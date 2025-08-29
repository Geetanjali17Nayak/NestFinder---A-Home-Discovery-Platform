"use client";
import { useState } from "react";
import api from "../lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer", // default role
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      await api.post("/api/users/register", form);
      setMessage("✅ User Registered Successfully!");
      setForm({ name: "", email: "", password: "", role: "buyer" });
    } catch (err) {
      setError(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 rounded-full p-4 mb-4 shadow-md">
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
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500">Sign up for NestFinder</p>
        </div>

        {/* Form Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mb-4"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mb-4 bg-white"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="agent">Agent</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          Register
        </button>

        {/* Messages */}
        {message && (
          <p className="text-green-600 text-center font-semibold mt-4 bg-green-100 py-2 rounded-lg">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center font-semibold mt-4 bg-red-100 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
