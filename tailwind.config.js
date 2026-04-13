/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#EF4F5F',
        'brand-dark': '#cb3c4a',
      }
    },
  },
  plugins: [],
}
