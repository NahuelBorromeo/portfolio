import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

/** All published posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** Posts of one series in reading order: by `order` if present, else oldest first. */
export function sortSeries(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    if (a.data.order != null && b.data.order != null) {
      return a.data.order - b.data.order;
    }
    return a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
  });
}

/** Map of series name → posts in reading order. */
export function groupBySeries(posts: Post[]): Map<string, Post[]> {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    if (!post.data.series) continue;
    const group = groups.get(post.data.series) ?? [];
    group.push(post);
    groups.set(post.data.series, group);
  }
  for (const [name, group] of groups) {
    groups.set(name, sortSeries(group));
  }
  return groups;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC", // frontmatter dates are date-only; render them as written
  });
}
