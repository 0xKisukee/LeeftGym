/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./styles/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f1df46",
        secondary: "#43b9f4",
        tertiary: "#f5f5f5",
        background: "#101010",
        bgsec: "#232323",
        text: "#e6e6e6",
        delete: "#ff645b",
      }
    },
  },
  plugins: [],
}