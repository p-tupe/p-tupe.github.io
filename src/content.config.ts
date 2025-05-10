import { glob } from "astro/loaders"

import { z, defineCollection } from "astro:content"

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/posts" }),
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

const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/collections/notes" }),
})

export const collections = { posts, gs, notes }
