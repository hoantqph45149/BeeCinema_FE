/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      keyframes: {
        ping: {
          "0%": { transform: "scale(1)", opacity: "0" },
          "30%": { opacity: "0.5" },
          "100%": { transform: "scale(1.3)", opacity: "0" },
        },
      },
      animation: {
        ping: "ping 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
      colors: {
        primary: "#FFFFFF", // Màu chính (trắng)
        secondary: "#333333", // Màu phụ (xanh trắng)
        accent: "#337AB7", // Màu nổi bật (xanh dương)
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
  // important: true,
};
