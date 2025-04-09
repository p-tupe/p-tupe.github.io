const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      serif: [...defaultTheme.fontFamily.serif],
      sans: [...defaultTheme.fontFamily.sans],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "75ch",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  // For photo.html when they are dynamically applied
  safelist: ["md:columns-2", "md:columns-3", "md:columns-4"],
}
