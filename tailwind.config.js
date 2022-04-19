const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./docs/**/*.{html,js}", "./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
  colors: {
    primary: colors.purple,
    secondary: colors.orange,
  },
};
