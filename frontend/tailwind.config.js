/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",      // App Router
    "./src/components/**/*.{js,jsx,ts,tsx}", 
    "./src/pages/**/*.{js,jsx,ts,tsx}",     // Pages (if used)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};