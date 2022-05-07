const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // mode: 'jit',
  content: ['./src/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Baloo Tamma 2', ...defaultTheme.fontFamily.sans],
      serif: ['Arima Madurai', ...defaultTheme.fontFamily.serif]
    },
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
