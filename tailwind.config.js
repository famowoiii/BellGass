/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        pepek: "30rem", // Contoh ukuran kustom untuk height
      },
      colors: {
        red: "#c93535",
        white: "#ffffff",
        grey: "#a8a8a8",
      },
      backgroundImage: {
        homebg: "url('./homefirst.png')",
        homebgsc: "url('./homesecond.png')",
      },
      blur: {
        xs: "1.6px",
      },
      fontFamily: { signika: ["Signika Negative", "sans-serif"] },
      screens: { phone: "330px" },
    },
  },
  plugins: [],
};
