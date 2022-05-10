const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // mode: "jit",
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
};
