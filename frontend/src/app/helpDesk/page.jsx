"use client";
import { useState } from "react";
import api from "../lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
      await api.post("/api/contact", form);
      setMessage("✅ Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-blue-200"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-500 text-center">
            We would love to hear from you! Fill out the form below.
          </p>
        </div>

        {/* Form Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mb-4"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mb-4"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 border border-blue-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mb-4 resize-none"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          Send Message
        </button>

        {/* Feedback Messages */}
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
      </form>
    </div>
  );
}
