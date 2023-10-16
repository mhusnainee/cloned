/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      sm: "400px",
      smd: "516px",
      md: "786px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        sfy: "#aa002d",
      },
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
};
