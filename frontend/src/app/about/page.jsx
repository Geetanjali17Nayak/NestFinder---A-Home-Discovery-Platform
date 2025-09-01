"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 py-10 px-4">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
          About NestFinder
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          NestFinder is your trusted platform for discovering, buying, renting,
          and selling properties. Our mission is to make home discovery simple,
          transparent, and enjoyable for everyone.
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Browse thousands of verified properties</li>
          <li>Connect directly with sellers, agents, and owners</li>
          <li>Advanced search and filtering options</li>
          <li>Modern, user-friendly interface</li>
          <li>Secure user authentication and dashboard</li>
        </ul>
        <p className="text-md text-gray-500 text-center">
          Whether you're looking for your dream home or want to list your
          property, NestFinder is here to help you every step of the way.
        </p>
      </div>
    </div>
  );
}
