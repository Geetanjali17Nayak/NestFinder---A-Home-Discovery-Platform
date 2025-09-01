// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation"; // 👈 for navigation
// import api from "../lib/api";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../components/Navbar";

// export default function HomePage() {
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

//   const handleContactClick = (ownerId) => {
//     if (!user) {
//       // Not logged in → redirect to login
//       router.push("/login");
//     } else {
//       // Logged in → go to contact page
//       router.push(`/contact/${ownerId}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 relative">
//       {/* Navbar */}
//       <Navbar />
//       {/* Hero Section */}
//       <section className="relative z-10 text-center py-14 bg-gradient-to-r from-blue-100 via-green-100 to-blue-200 shadow-lg rounded-2xl mx-4 mt-8 mb-12">
//         <div className="max-w-2xl mx-auto">
//           <h2 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg flex flex-col items-center justify-center">
//             <span className="mb-2">Find Your Dream Home</span>
//             <span className="text-4xl text-green-600">with NestFinder</span>
//           </h2>
//         </div>
//       </section>

//       {/* Properties Section */}
//       <main className="p-8 relative z-10">
//         {loading && <p className="text-center">Loading properties...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {properties.map((property) => (
//               <div
//                 key={property._id}
//                 className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
//               >
//                 <img
//                   src={
//                     property.images && property.images.length > 0
//                       ? property.images[0]
//                       : "https://images.unsplash.com/photo-1560184897-67f4a3c7e96e?auto=format&fit=crop&w=800&q=80"
//                   }
//                   alt={property.title}
//                   className="h-64 w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-blue-900">
//                     {property.title}
//                   </h3>
//                   <p className="text-gray-500">{property.location}</p>
//                   <p className="text-blue-600 font-bold mt-2">
//                     ₹{property.price.toLocaleString()}/month
//                   </p>
//                   <Link href={`/property/${property._id}`}>
//                     <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
//                       View Details
//                     </button>
//                   </Link>
//                   <button
//                     onClick={() => handleContactClick(property.owner)}
//                     className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
//                   >
//                     Contact
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
      const response = await api.get(`/api/properties/searchProperties`, {
        params: {
          location: query,
          type,
          priceMin,
          priceMax,
        },
      });

      setProperties(response.data);
      if (!properties && properties.length === 0) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-center py-20 bg-gradient-to-r from-blue-600 to-green-500 shadow-lg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Find Your Perfect Home
          </h1>
          <p className="text-lg text-white mb-6">
            Browse thousands of properties for rent and sale
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-8 border border-blue-200"
          >
            {/* Location */}
            <input
              type="text"
              placeholder="City or locality"
              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none text-gray-800 bg-blue-50 placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* Type */}
            <select
              className="px-4 py-3 border border-blue-300 rounded-lg focus:outline-none text-gray-800 bg-blue-50"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="rental">For Rent</option>
              <option value="sale">For Sale</option>
            </select>

            {/* Price Min */}
            <input
              type="number"
              placeholder="Min Price"
              className="px-4 py-3 border border-blue-300 rounded-lg focus:outline-none w-28 text-gray-800 bg-blue-50 placeholder-gray-400"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />

            {/* Price Max */}
            <input
              type="number"
              placeholder="Max Price"
              className="px-4 py-3 border border-blue-300 rounded-lg focus:outline-none w-28 text-gray-800 bg-blue-50 placeholder-gray-400"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />

            {/* Search button */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-transform transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* Properties Section */}
      <main className="p-8 max-w-7xl mx-auto">
        {loading && <p className="text-center">Loading properties...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && properties.length === 0 && (
          <p className="text-center text-gray-500 text-lg font-semibold">
            No properties found.
          </p>
        )}
        {!loading && !error && properties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl border shadow hover:shadow-2xl transition overflow-hidden"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      property.images && property.images.length > 0
                        ? property.images[0]
                        : "https://images.unsplash.com/photo-1560184897-67f4a3c7e96e?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={property.title}
                    className="h-56 w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow">
                    {property.type === "rental" ? "For Rent" : "For Sale"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {property.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{property.location}</p>
                  <p className="text-green-600 font-bold text-lg mt-2">
                    ₹{property.price.toLocaleString()}
                    {property.type === "rental" && <span>/month</span>}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <Link href={`/property/${property._id}`}>
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleContactClick(property.owner)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
