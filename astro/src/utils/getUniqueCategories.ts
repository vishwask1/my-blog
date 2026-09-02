import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "@/utils/slugify";

const categoryOrder = new Map<string, number>([
  ["poetry", 0],
  ["travel", 1],
  ["sports", 2],
  ["fiction", 3],
  ["kannada", 4],
]);

export function sortCategories(categories: string[]) {
  return [...new Set(categories)].sort((a, b) => {
    const rankA = categoryOrder.get(a.trim().toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
    const rankB = categoryOrder.get(b.trim().toLowerCase()) ?? Number.MAX_SAFE_INTEGER;

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    return a.localeCompare(b, undefined, { sensitivity: "base" });
  });
}

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

  return [...categoryMap.entries()]
    .sort(([slugA, labelA], [slugB, labelB]) => {
      const rankA = categoryOrder.get(labelA.trim().toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
      const rankB = categoryOrder.get(labelB.trim().toLowerCase()) ?? Number.MAX_SAFE_INTEGER;

      if (rankA !== rankB) {
        return rankA - rankB;
      }

      return labelA.localeCompare(labelB, undefined, { sensitivity: "base" });
    })
    .map(([slug, label]) => ({
      slug,
      label,
      href: `categories/${slug}`,
    }));
}
