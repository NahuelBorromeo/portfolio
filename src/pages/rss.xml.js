import rss from "@astrojs/rss";
import { getPublishedPosts } from "../lib/blog";

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: "Nahuel Borromeo — Blog",
    description:
      "Notes on iOS engineering: Swift, SwiftUI, UIKit and the fundamentals — written while studying them in public.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
