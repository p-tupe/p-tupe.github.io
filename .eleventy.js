require("dotenv").config()
const Image = require("@11ty/eleventy-img")
const pluginRss = require("@11ty/eleventy-plugin-rss")
const sitemap = require("@quasibit/eleventy-plugin-sitemap")
const lunr = require("lunr")

const card = require("./src/_includes/components/card.js")

let indexBuilt = false
module.exports = eleventyConfig => {
  addCollections(eleventyConfig)

  eleventyConfig.addPairedShortcode("card", card)

  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://priteshtupe.com",
    },
  })

  addImageShortCode(eleventyConfig)

  addPassthroughCopy(eleventyConfig)

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  }
}

function addCollections(eleventyConfig) {
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
      buildNotesIndex(all_notes)
    }

    return all_notes
  })
}

function buildNotesIndex(all_notes) {
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

  require("fs").writeFile(file, data, err => err && console.error(err))

  indexBuilt = true
}

function addImageShortCode(eleventyConfig) {
  console.log("Caching images...")

  const IMAGE_URL = process.env.PERSONAL_WEBSITE_MEDIA

  eleventyConfig.addShortcode(
    "image",
    async function (src, alt, className, onClick) {
      let metadata = await Image(IMAGE_URL + src, {
        formats: ["webp"],
        outputDir: "./docs/assets/imgs",
        urlPath: "/assets/imgs",
      })

      let imageAttributes = {
        alt,
        onClick,
        class: className,
        loading: "lazy",
        decoding: "async",
      }

      return Image.generateHTML(metadata, imageAttributes)
    },
  )
}

function addPassthroughCopy(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/site.webmanifest")
  eleventyConfig.addPassthroughCopy("src/robots.txt")
  eleventyConfig.addPassthroughCopy("src/CNAME")
  // Do not use whole assets/, else css is included as well.
  eleventyConfig.addPassthroughCopy("src/assets/icons/")
  eleventyConfig.addPassthroughCopy("src/assets/imgs/")
  eleventyConfig.addPassthroughCopy("src/assets/docs/")
  eleventyConfig.addPassthroughCopy("src/assets/js/")
}
