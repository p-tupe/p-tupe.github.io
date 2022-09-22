const pluginRss = require("@11ty/eleventy-plugin-rss")
const sitemap = require("@quasibit/eleventy-plugin-sitemap")
const lunr = require("lunr")

const { write, unlink } = require("fs/promises")

const card = require("./src/_includes/components/card.js")
const { writeFile } = require("fs")

let indexBuilt = false
module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy("src/site.webmanifest")
  eleventyConfig.addPassthroughCopy("src/robots.txt")
  eleventyConfig.addPassthroughCopy("src/CNAME")
  // Do not use while assets/, else css is included as well.
  eleventyConfig.addPassthroughCopy("src/assets/icons/")
  eleventyConfig.addPassthroughCopy("src/assets/imgs/")
  eleventyConfig.addPassthroughCopy("src/assets/docs/")
  eleventyConfig.addPassthroughCopy("src/assets/js/")

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
    const all_notes = collectionApi.getFilteredByTag("notes").map(n => {
      n.title = n.fileSlug
      n.text = n.template.inputContent
      return n
    })

    if (!indexBuilt) {
      console.log("Building notes search index...")

      const idx = lunr(function () {
        this.ref("url")
        this.field("text")
        all_notes.forEach(this.add, this)
      })

      const data = [
        "---\n",
        "permalink: notesIndex.json\n",
        "layout: ''\n",
        "---\n",
        JSON.stringify(idx),
      ].join("")

      const file = "./src/pages/notesIndex.html"

      writeFile(file, data, err => err && console.error(err))

      indexBuilt = true
    }

    return all_notes
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
