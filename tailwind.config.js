/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
          "2xl": "10rem",
        },
      },
    },
  },
  plugins: [],
};
