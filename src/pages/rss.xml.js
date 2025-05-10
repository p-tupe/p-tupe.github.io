import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: "Pritesh Tupe's Feed",
    description: "Pritesh Tupe's Blogs and Stories",
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      link: `/posts/${posts.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
