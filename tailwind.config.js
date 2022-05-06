const colors = require('tailwindcss/colors')

module.exports = {
  // mode: 'jit',
  content: ['./src/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch'
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
  colors: {
    primary: colors.purple,
    secondary: colors.orange
  }
}
