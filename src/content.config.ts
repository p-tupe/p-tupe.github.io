import { glob } from "astro/loaders"

import { z, defineCollection } from "astro:content"

const posts = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/collections/posts",
  }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
})

const gs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/gs" }),
  schema: z.object({
    title: z.string(),
    part: z.number(),
  }),
})

const foa = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/foa" }),
  schema: z.object({
    title: z.string(),
    part: z.number(),
  }),
})

const notes = defineCollection({
  loader: glob({
    pattern: ["**/[^_]*.md", "!README.md"],
    base: "./src/collections/notes",
  }),
  schema: z.object({
    modified: z.string(),
  }),
})

export const collections = { posts, gs, foa, notes }
