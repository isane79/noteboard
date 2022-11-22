/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#182737',
        secondary: '#999AB6',
        accent: '#44BAA9',
        neutral: '#E4DCCF',
      }
    }
  },
  plugins: [],
}
