/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#EEF2FF',
          DEFAULT: '#5046E5', // Matches your exact brand purple
          hover: '#4338CA',
        }
      }
    },
  },
  plugins: [],
}