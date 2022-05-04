const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{njk,html,js}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      // sans: ["Graphik", "sans-serif"],
      // serif: ["Merriweather", "serif"],
    }
  },
  plugins: [require('@tailwindcss/typography')],
  colors: {
    primary: colors.purple,
    secondary: colors.orange
  }
}
