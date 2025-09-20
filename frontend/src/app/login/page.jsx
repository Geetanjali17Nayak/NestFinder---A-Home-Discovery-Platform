
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/api/users/login", form);
      setSuccess("✅ Login Successful! Redirecting...");
      login(res.data);
      setTimeout(() => {
        router.push("/HomePage");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-4 mb-4 shadow-md">
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
            Welcome Back!
          </h2>
          <p className="text-gray-600">Sign in to your NestFinder account</p>
        </div>

        {/* Alerts */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mb-4 text-center font-semibold bg-red-100 py-2 px-4 rounded-lg"
          >
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 mb-4 text-center font-semibold bg-green-100 py-2 px-4 rounded-lg"
          >
            {success}
          </motion.p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
              placeholder="Enter your password"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </a>
        </div>
      </motion.div>
    </div>
  );
}
