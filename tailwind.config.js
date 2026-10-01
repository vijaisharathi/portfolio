/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        'mea': ['"Mea Culpa"', 'cursive'],
        'hindi-display': ['"Rozha One"', 'serif'],
      },
    },
  },
}