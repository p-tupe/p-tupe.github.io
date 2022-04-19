module.exports = (config) => {

  // Copy as they are in build dir
  // config.addPassthroughCopy("./src/assets/");

  // Watch for changes and build
  config.addWatchTarget("./src/assets/css/");
  config.addWatchTarget("./src/assets/js/");

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
