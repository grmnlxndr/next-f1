const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      colors: {
        emerald: colors.emerald,
        teal: colors.teal,
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
