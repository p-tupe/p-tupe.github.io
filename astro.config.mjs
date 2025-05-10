// @ts-check
import { defineConfig } from "astro/config"

import sitemap from "@astrojs/sitemap"
import robotsTxt from "astro-robots-txt"
import compressor from "astro-compressor"

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["static.priteshtupe.com"],
  },
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "gruvbox-light-hard",
        dark: "gruvbox-dark-hard",
      },
    },
  },
  site: "https://www.priteshtupe.com",
  devToolbar: { enabled: false },
  integrations: [sitemap(), robotsTxt(), compressor()],
})
