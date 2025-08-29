"use client";
import { User, Home, LogOut, UserCircle } from "lucide-react"; // user icon
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-30">
      {/* <Link href="/HomePage" className="flex items-center gap-2 text-xl font-bold">
        <Home className="w-7 h-7" />
        <span > NestFinder</span>
      </Link> */}

      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold tracking-wide"
      >
        {/* Roof Icon (instead of Home icon) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M3 12l9-8 9 8" />
          <path d="M9 21V9h6v12" />
        </svg>
        <span>NestFinder</span>
      </Link>

      {user ? (
        <div className="flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-full transition-transform duration-200 ease-in-out hover:scale-105">
              <User className="w-6 h-6" />
              <span className="font-semibold">{user.name}</span>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-xl p-4 hidden group-hover:block transition-all duration-300 ease-in-out transform opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-3 mb-4">
                <UserCircle className="w-12 h-12 text-blue-600" />
                <div>
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <hr className="my-2 border-gray-200" />
              <Link
                href="/profile"
                className="flex items-center gap-3 w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200"
              >
                <UserCircle className="w-5 h-5" />
                <span>My Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left text-red-600 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors duration-200 mt-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-transform duration-200 ease-in-out hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-transform duration-200 ease-in-out hover:scale-105"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
