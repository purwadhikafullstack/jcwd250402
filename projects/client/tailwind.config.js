/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: "#0256EE",
      secondary: "#EE0255",
      tertiary: "#9B02EE",
      accent: "",
    },
    fontFamily: {
      primary: "Ubuntu",
      secondary: "MD Sans",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};

// docs daisyui : https://daisyui.com/components/
// docs flowbite : https://flowbite.com/docs/getting-started/introduction/
// component toast : https://sonner.emilkowal.ski/
