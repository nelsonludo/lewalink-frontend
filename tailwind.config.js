/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    colors: {
      primary: "#bb29ff", // weird Esau purple
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        custom: "-8.93px -8.93px 17.859px #FFF, 4.465px 0px 17.859px #CA7DFF",
      },
      borderRadius: {
        custom: "8.93px",
      },
    },
  },
  plugins: [],
};
