const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");

module.exports = (config) => {
  config.addPlugin(pluginTailwindCSS, {
    src: "src/css/style.css",
    dest: "assets/css/",
  });

  config.addPassthroughCopy("src/assets/icons/");
  config.addPassthroughCopy("src/assets/imgs/");
  config.addPassthroughCopy("src/assets/docs/");
  config.addPassthroughCopy("src/assets/js/");

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
