export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-green-900 to-blue-800 text-white py-8 mt-16 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
            />
          </svg>
          <span className="font-bold text-lg tracking-wide">NestFinder</span>
        </div>
        <div className="flex space-x-8 mb-4 md:mb-0">
          <a href="/" className="hover:text-green-400 font-medium transition">
            Home
          </a>
          <a
            href="/about"
            className="hover:text-green-400 font-medium transition"
          >
            About
          </a>
          <a
            href="/helpDesk"
            className="hover:text-green-400 font-medium transition"
          >
            Contact
          </a>
        </div>
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} NestFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
