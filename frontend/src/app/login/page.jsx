// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "../lib/api";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const router = useRouter();
//   const { login } = useAuth();
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const res = await api.post("/api/users/login", form);
//       setSuccess("Login Successful ✅ Redirecting...");
//       login(res.data);
//       setTimeout(() => {
//         router.push("/HomePage"); // redirect after login
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid credentials ❌");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
//       <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200">
//         <div className="flex flex-col items-center mb-8">
//           <div className="bg-blue-600 rounded-full p-4 mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="white"
//               className="w-10 h-10"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
//               />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
//             Welcome Back!
//           </h2>
//           <p className="text-gray-500">Sign in to your NestFinder account</p>
//         </div>
//         {error && (
//           <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
//         )}
//         {success && (
//           <p className="text-green-500 mb-4 text-center font-semibold">
//             {success}
//           </p>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               required
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               required
//               placeholder="Enter your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md"
//           >
//             Login
//           </button>
//         </form>
//         <div className="mt-6 text-center text-gray-600">
//           Don't have an account?{" "}
//           <a
//             href="/register"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Register
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
      setSuccess("Login Successful ✅ Redirecting...");
      login(res.data);
      setTimeout(() => {
        router.push("/HomePage"); // redirect after login
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200">
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
            Welcome Back!
          </h2>
          <p className="text-gray-500">Sign in to your NestFinder account</p>
        </div>

        {/* Alerts */}
        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold bg-red-100 py-2 rounded-lg">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 mb-4 text-center font-semibold bg-green-100 py-2 rounded-lg">
            {success}
          </p>
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
              className="w-full border border-blue-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
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
              className="w-full border border-blue-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
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
      </div>
    </div>
  );
}
