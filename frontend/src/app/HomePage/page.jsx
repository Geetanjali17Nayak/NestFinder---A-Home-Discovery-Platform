// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "../lib/api";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../components/Navbar";

// export default function HomePage() {
//   const [query, setQuery] = useState("");
//   const [type, setType] = useState("");
//   const [priceMin, setPriceMin] = useState("");
//   const [priceMax, setPriceMax] = useState("");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await api.get("/api/properties/getAllProperties");
//         setProperties(response.data);
//       } catch (err) {
//         setError("Failed to fetch properties.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await api.get(`/api/properties/searchProperties`, {
//         params: {
//           location: query,
//           type,
//           priceMin,
//           priceMax,
//         },
//       });

//       setProperties(response.data);
//       if (!properties && properties.length === 0) {
//         setError("No properties found.");
//       }
//     } catch (err) {
//       setError("Failed to fetch properties.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactClick = (ownerId) => {
//     if (!user) {
//       router.push("/login");
//     } else {
//       router.push(`/contact/${ownerId}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative text-center py-20 bg-gradient-to-r from-blue-600 to-green-500 shadow-lg">
//         <div className="max-w-4xl mx-auto px-6">
//           <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-md">
//             Find Your Perfect Home
//           </h1>
//           <p className="text-lg text-white mb-6">
//             Browse thousands of properties for rent and sale
//           </p>

//           {/* Search Box */}
//           <form
//             onSubmit={handleSearch}
//             className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-8 border border-blue-200"
//           >
//             {/* Location */}
//             <input
//               type="text"
//               placeholder="City or locality"
//               className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none text-gray-800 bg-blue-50 placeholder-gray-400"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />

//             {/* Type */}
//             <select
//               className="px-4 py-3 border border-blue-300 rounded-lg focus:outline-none text-gray-800 bg-blue-50"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//             >
//               <option value="">All Types</option>
//               <option value="rental">For Rent</option>
//               <option value="sale">For Sale</option>
//             </select>

//             {/* Price Min */}
//             <input
//               type="number"
//               placeholder="Min Price"
//               className="px-4 py-3 border border-blue-300 rounded-lg focus:outline-none w-28 text-gray-800 bg-blue-50 placeholder-gray-400"
//               value={priceMin}
//               onChange={(e) => setPriceMin(e.target.value)}
//             />

//             {/* Price Max */}
//             <input
//               type="number"
//               placeholder="Max Price"
//               className="px-4 py-3 border border-blue-300 rounded-lg focus:outline-none w-28 text-gray-800 bg-blue-50 placeholder-gray-400"
//               value={priceMax}
//               onChange={(e) => setPriceMax(e.target.value)}
//             />

//             {/* Search button */}
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-transform transform hover:scale-105"
//             >
//               <span className="flex items-center gap-2">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//                 Search
//               </span>
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* Properties Section */}
//       <main className="p-8 max-w-7xl mx-auto">
//         {loading && <p className="text-center">Loading properties...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}
//         {!loading && !error && properties.length === 0 && (
//           <p className="text-center text-gray-500 text-lg font-semibold">
//             No properties found.
//           </p>
//         )}
//         {!loading && !error && properties.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
//             {properties.map((property) => (
//               <div
//                 key={property._id}
//                 className="bg-white rounded-xl border shadow hover:shadow-2xl transition overflow-hidden"
//               >
//                 {/* Image */}
//                 <div className="relative">
//                   <img
//                     src={
//                       property.images && property.images.length > 0
//                         ? property.images[0]
//                         : "https://images.unsplash.com/photo-1560184897-67f4a3c7e96e?auto=format&fit=crop&w=800&q=80"
//                     }
//                     alt={property.title}
//                     className="h-56 w-full object-cover"
//                   />
//                   <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow">
//                     {property.type === "rental" ? "For Rent" : "For Sale"}
//                   </span>
//                 </div>

//                 {/* Content */}
//                 <div className="p-5">
//                   <h3 className="text-lg font-semibold text-gray-800 truncate">
//                     {property.title}
//                   </h3>
//                   <p className="text-gray-500 text-sm">{property.location}</p>
//                   <p className="text-green-600 font-bold text-lg mt-2">
//                     ₹{property.price.toLocaleString()}
//                     {property.type === "rental" && <span>/month</span>}
//                   </p>

//                   <div className="flex gap-3 mt-4">
//                     <Link href={`/property/${property._id}`}>
//                       <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
//                         View Details
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => handleContactClick(property.owner)}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
//                     >
//                       Contact
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }






// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "../lib/api";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../components/Navbar";

// export default function HomePage() {
//   const [query, setQuery] = useState("");
//   const [type, setType] = useState("");
//   const [priceMin, setPriceMin] = useState("");
//   const [priceMax, setPriceMax] = useState("");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await api.get("/api/properties/getAllProperties");
//         setProperties(response.data);
//       } catch (err) {
//         setError("Failed to fetch properties.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.get("/api/properties/searchProperties", {
//         params: {
//           location: query,
//           type,
//           priceMin,
//           priceMax,
//         },
//       });
//       setProperties(response.data);
//       if (!response.data || response.data.length === 0) {
//         setError("No properties found.");
//       }
//     } catch (err) {
//       setError("Failed to fetch properties.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactClick = (ownerId) => {
//     if (!user) {
//       router.push("/login");
//     } else {
//       router.push(`/contact/${ownerId}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative text-center py-24 bg-gradient-to-br from-blue-600 to-green-500 shadow-lg">
//         <div className="max-w-5xl mx-auto px-6">
//           <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow">
//             Find Your Dream Home
//           </h1>
//           <p className="text-xl text-white mb-8">
//             Explore top properties for rent and sale near you.
//           </p>

//           {/* Search Form */}
//           <form
//             onSubmit={handleSearch}
//             className="flex flex-wrap justify-center gap-4 bg-white p-6 rounded-2xl shadow-xl border border-blue-100 max-w-4xl mx-auto"
//           >
//             <input
//               type="text"
//               placeholder="Enter city or area"
//               className="flex-1 min-w-[200px] px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <select
//               className="px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//             >
//               <option value="">All Types</option>
//               <option value="rental">For Rent</option>
//               <option value="sale">For Sale</option>
//             </select>
//             <input
//               type="number"
//               placeholder="Min Price"
//               className="w-28 px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none"
//               value={priceMin}
//               onChange={(e) => setPriceMin(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Max Price"
//               className="w-28 px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 focus:outline-none"
//               value={priceMax}
//               onChange={(e) => setPriceMax(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition hover:scale-105"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* Properties Section */}
//       <main className="py-12 px-6 max-w-7xl mx-auto">
//         {loading && (
//           <p className="text-center text-lg text-gray-500">
//             Loading properties...
//           </p>
//         )}
//         {error && (
//           <p className="text-center text-red-600 font-medium">{error}</p>
//         )}

//         {!loading && !error && properties.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
//             {properties.map((property) => (
//               <div
//                 key={property._id}
//                 className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
//               >
//                 {/* Image */}
//                 <div className="relative h-56">
//                   <img
//                     src={
//                       property.images?.[0] ||
//                       "https://images.unsplash.com/photo-1560184897-67f4a3c7e96e?auto=format&fit=crop&w=800&q=80"
//                     }
//                     alt={property.title}
//                     className="object-cover h-full w-full"
//                   />
//                   <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//                     {property.type === "rental" ? "For Rent" : "For Sale"}
//                   </span>
//                 </div>

//                 {/* Content */}
//                 <div className="p-5">
//                   <h3 className="text-lg font-bold truncate">
//                     {property.title}
//                   </h3>
//                   <p className="text-gray-500 text-sm">{property.location}</p>
//                   <p className="text-green-600 font-bold text-lg mt-2">
//                     ₹{property.price.toLocaleString()}{" "}
//                     {property.type === "rental" && <span>/month</span>}
//                   </p>
//                   <div className="flex gap-3 mt-4">
//                     <Link href={`/property/${property._id}`}>
//                       <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
//                         View Details
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => handleContactClick(property.owner)}
//                       className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
//                     >
//                       Contact
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && !error && properties.length === 0 && (
//           <p className="text-center text-gray-500 text-lg mt-12">
//             No properties found matching your criteria.
//           </p>
//         )}
//       </main>
//     </div>
//   );
// }





'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/api/properties/getAllProperties");
        setProperties(response.data);
      } catch (err) {
        setError("Failed to fetch properties.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/properties/searchProperties", {
        params: {
          location: query,
          type,
          priceMin,
          priceMax,
        },
      });
      setProperties(response.data);
      if (!response.data || response.data.length === 0) {
        setError("No properties found.");
      }
    } catch (err) {
      setError("Failed to fetch properties.");
    } finally {
      setLoading(false);
    }
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
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-center py-24 bg-gradient-to-br from-blue-600 to-green-500 shadow-lg">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-white mb-4 drop-shadow"
          >
            Find Your Dream Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white mb-8"
          >
            Explore top properties for rent and sale near you.
          </motion.p>

          {/* Search Form */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
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
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition hover:scale-105"
            >
              Search
            </button>
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
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {properties.map((property, i) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Image */}
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

                {/* Content */}
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
                    <Link href={`/property/${property._id}`}>
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleContactClick(property.owner)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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

