/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "almost-white": "#E9F1F7",
        "white-grey": "#D9D9D9",
        "grey-grey": "#8A8787",
        "sidibou-blue": "#2274A5",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
