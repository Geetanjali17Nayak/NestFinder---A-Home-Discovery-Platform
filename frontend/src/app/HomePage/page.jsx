"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [hasMore, setHasMore] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const fetchProperties = async (search = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/properties/searchProperties", {
        params: {
          location: query,
          type,
          priceMin,
          priceMax,
          page,
          limit,
        },
      });

      setProperties(response.data);
      setHasMore(response.data.length === limit);
      if (search && response.data.length === 0) {
        setError("No properties found.");
      }
    } catch (err) {
      setError("Failed to fetch properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProperties(true);
  };

  const handleContactClick = (ownerId) => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/contact/${ownerId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-center py-24 bg-gradient-to-br from-blue-600 to-green-500 shadow-lg">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
            }}
            className="text-5xl font-extrabold text-white mb-4 drop-shadow"
          >
            Find Your Dream Home
          </motion.h1>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 bg-white p-6 rounded-2xl shadow-xl border border-blue-100 max-w-4xl mx-auto"
          >
            <input
              type="text"
              placeholder="Enter city or area"
              className="flex-1 min-w-[200px] px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="rental">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
            <input
              type="number"
              placeholder="Min Price"
              className="w-28 px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="w-28 px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition"
            >
              Search
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Properties Section */}
      <main className="py-12 px-6 max-w-7xl mx-auto">
        {loading && (
          <p className="text-center text-lg text-gray-500">
            Loading properties...
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {!loading && !error && properties.length > 0 && (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {properties.map((property, i) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1}}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative h-56">
                    <img
                      src={
                        property.images?.[0] ||
                        "https://images.unsplash.com/photo-1560184897-67f4a3c7e96e?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={property.title}
                      className="object-cover h-full w-full"
                    />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      {property.type === "rental" ? "For Rent" : "For Sale"}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold truncate">
                      {property.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{property.location}</p>
                    <p className="text-green-600 font-bold text-lg mt-2">
                      ₹{property.price.toLocaleString()}{" "}
                      {property.type === "rental" && <span>/month</span>}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          router.push(`/property/${property._id}`)
                        }
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleContactClick(property.owner)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                      >
                        Contact
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className={`px-4 py-2 rounded-lg border ${
                  page === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Prev
              </motion.button>
              <span className="px-4 py-2 bg-white rounded-lg shadow">
                Page {page}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!hasMore}
                onClick={() => setPage((p) => p + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  !hasMore
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </motion.button>
            </div>
          </>
        )}

        {!loading && !error && properties.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-12">
            No properties found matching your criteria.
          </p>
        )}
      </main>
    </div>
  );
}
