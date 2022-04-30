const colors = require("tailwindcss/colors");
const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");

module.exports = {
  content: ["./docs/**/*.{html,js}", "./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      // sans: ["Graphik", "sans-serif"],
      // serif: ["Merriweather", "serif"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
  colors: {
    primary: colors.purple,
    secondary: colors.orange,
  },
};
