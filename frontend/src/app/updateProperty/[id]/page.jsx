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

  // Fetch property data
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
        setError("❌ Failed to fetch property");
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
      setError("❌ Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-blue-200 transition-all hover:shadow-blue-200"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center drop-shadow">
          ✏️ Update Property
        </h2>

        {error && (
          <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
        )}

        {/* Title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Beautiful Apartment"
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg 
                       focus:outline-none focus:border-blue-500 
                       shadow-sm transition 
                       text-black placeholder-gray-400"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-5">
          <label
            htmlFor="location"
            className="block text-gray-700 font-semibold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="New York City"
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg 
                       focus:outline-none focus:border-blue-500 
                       shadow-sm transition 
                       text-black placeholder-gray-400"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-5">
          <label
            htmlFor="price"
            className="block text-gray-700 font-semibold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="1500"
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg 
                       focus:outline-none focus:border-blue-500 
                       shadow-sm transition 
                       text-black placeholder-gray-400"
            required
          />
        </div>

        {/* Type */}
        <div className="mb-8">
          <label
            htmlFor="type"
            className="block text-gray-700 font-semibold mb-2"
          >
            Type
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg 
                       focus:outline-none focus:border-blue-500 
                       shadow-sm transition 
                       text-black"
            required
          >
            <option value="">Select Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="rental">Rental</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:bg-green-700 hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Updating..." : "✅ Update Property"}
        </button>
      </form>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import api from "@/app/lib/api";

// export default function UpdateProperty() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     price: "",
//     type: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch property data to prefill form
//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const res = await api.get(`/api/properties/getPropertyById/${id}`);
//         setFormData({
//           title: res.data.title,
//           location: res.data.location,
//           price: res.data.price,
//           type: res.data.type,
//         });
//       } catch (err) {
//         setError("Failed to fetch property");
//       }
//     };
//     if (id) fetchProperty();
//   }, [id]);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       await api.patch(`/api/properties/updateProperty/${id}`, formData);
//       router.push("/profile"); // redirect after update
//     } catch (err) {
//       setError("Failed to update property");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">Update Property</h2>

//       {error && <p className="text-red-500 mb-3">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Title"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           placeholder="Location"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           placeholder="Price"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           placeholder="Type (e.g. Apartment, Villa)"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
//         >
//           {loading ? "Updating..." : "Update Property"}
//         </button>
//       </form>
//     </div>
//   );
// }
