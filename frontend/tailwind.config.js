/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#22c55e', // text-green-500
          DEFAULT: '#16a34a', // text-green-600
          dark: '#15803d', // text-green-700
        },
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          surface2: '#2C2C2C',
        }
      }
    },
  },
  plugins: [],
}
