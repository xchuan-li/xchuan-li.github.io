// Single source of truth for the Writing section — consumed by the listing
// page (src/pages/writing/index.astro) and the RSS feed (src/pages/rss.xml.ts).
// pubDate is the ISO date the note was first published; date is the label shown
// on the page.

export interface Post {
  slug: string;
  title: string;
  date: string;
  pubDate: string;
  excerpt: string;
  status: "note" | "draft";
}

export const posts: Post[] = [
  {
    slug: "inverted-observability",
    title: "Inverted Observability — psychology and interpretability as mirror sciences",
    date: "June 2026",
    pubDate: "2026-06-21",
    excerpt:
      "Developmental psychology and interpretability ask one question — behind a system that looks like it can, what is the format of the representation? — from opposite sides of a mirror. One sees behavior but not mechanism; the other sees mechanism but cannot trust behavior. Why they calibrate each other, where the mirror misleads, and why language is the instrument they share.",
    status: "note",
  },
  {
    slug: "meaning-beneath-language",
    title: "Is there meaning beneath the language?",
    date: "June 2026",
    pubDate: "2026-06-04",
    excerpt:
      "The same content is carried by German morphology, English word order, and Chinese context. When a model handles all three, does it represent the meaning beneath the forms — or three separate surface habits that each happen to work? The motivating question behind the typological-grounding line.",
    status: "note",
  },
  {
    slug: "from-leibniz",
    title: "From a Sufficient Reason to a Universal Language — what philosophy gave me that ML didn't",
    date: "May 2026",
    pubDate: "2026-05-23",
    excerpt:
      "My undergraduate thesis was on Leibniz's characteristica universalis. Two years and a discipline change later, that ambition has split into the two poles of my work — the principle of sufficient reason as the question I can put to a model, and the universal character as the goal I can only walk toward.",
    status: "note",
  },
];
