const pluginRss = require("@11ty/eleventy-plugin-rss")
const sitemap = require("@quasibit/eleventy-plugin-sitemap")

const card = require("./src/_includes/components/card.js")

module.exports = eleventyConfig => {
  // Do not use assets/, else css is included as well.
  eleventyConfig.addPassthroughCopy("src/assets/icons/")
  eleventyConfig.addPassthroughCopy("src/assets/imgs/")
  eleventyConfig.addPassthroughCopy("src/assets/docs/")
  eleventyConfig.addPassthroughCopy("src/assets/js/")

  eleventyConfig.addPassthroughCopy("src/site.webmanifest")
  eleventyConfig.addPassthroughCopy("src/robots.txt")
  eleventyConfig.addPassthroughCopy("src/CNAME")

  eleventyConfig.addCollection("gs_sorted", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("gs")
      .sort((a, b) => a.data.part - b.data.part)
  })

  eleventyConfig.addCollection("foa_sorted", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("foa")
      .sort((a, b) => a.data.part - b.data.part)
  })

  eleventyConfig.addCollection("notes", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("notes")
      .map(n => {
        n.title = n.url.split("/")[2]
        return n
      })
      .filter(n => !["README"].includes(n.title))
  })

  eleventyConfig.addPairedShortcode("card", card)

  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://priteshtupe.com",
    },
  })

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  }
}
