/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // scan all your source files
    "./components/**/*.{js,ts,jsx,tsx}" // if you have a separate components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
