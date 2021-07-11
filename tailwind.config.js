const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: colors,
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      margin: ['last'],
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
