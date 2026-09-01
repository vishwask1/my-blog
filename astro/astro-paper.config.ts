import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineAstroPaperConfig } from "./src/types/config";

const siteDescription = readFileSync(
  resolve(process.cwd(), "src/content/site-description.md"),
  "utf-8",
).trim();

export default defineAstroPaperConfig({
  site: {
    url: "https://vishwask1.github.io/my-blog/",
    title: "Vishwas",
    tagline: "What is not spoken is written",
    description: siteDescription,
    author: "Vishwas",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Kolkata",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/vishwask1" },
    { name: "x", url: "https://x.com/vishwask1" },
  ],
  shareLinks: [
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});