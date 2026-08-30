import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "@/utils/slugify";

export function getUniqueCategories(posts: CollectionEntry<"posts">[]) {
  const categoryMap = new Map<string, string>();

  for (const post of posts) {
    for (const category of post.data.categories ?? []) {
      const slug = slugifyStr(category);
      if (!categoryMap.has(slug)) {
        categoryMap.set(slug, category);
      }
    }
  }

  return [...categoryMap.entries()].map(([slug, label]) => ({
    slug,
    label,
    href: `categories/${slug}`,
  }));
}
