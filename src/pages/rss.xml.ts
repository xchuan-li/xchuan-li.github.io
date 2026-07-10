import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { posts } from "../data/writing";

export function GET(context: APIContext) {
  const items = [...posts]
    .sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate))
    .map((p) => ({
      title: p.title,
      description: p.excerpt,
      link: `/writing/${p.slug}/`,
      pubDate: new Date(p.pubDate),
    }));

  return rss({
    title: "Xiaochuan Li: Writing",
    description:
      "Notes and essays on causal inference, interpretability, and the philosophy of inference.",
    site: context.site ?? "https://xchuan-li.github.io",
    items,
    customData: "<language>en-us</language>",
  });
}
