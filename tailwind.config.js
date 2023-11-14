/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {   
      spacing: {
        0.75: '0.2rem',
      },
      fontSize: {
        '7xl': '5rem'
      }
    },
  },
  plugins: [],
}

