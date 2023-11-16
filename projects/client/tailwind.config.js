/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/react-daisyui/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [],
  },
  theme: {
    extend: {
      colors: {
        primary: "#0256EE",
        secondary: "#0256EE",
        tertiary: "#9B02EE",
        accent: "",
      },
      fontFamily: {
        primary: "Ubuntu",
        secondary: "MD Sans",
      },
      backgroundImage: {
        login: "url('./asset/Login.png')",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};

// docs daisyui : https://daisyui.com/components/
// docs flowbite : https://flowbite.com/docs/getting-started/introduction/
// component toast : https://sonner.emilkowal.ski/
