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
    slug: "logic-of-natural-language",
    title: "Is the logic of natural language the logic of the logicians?",
    date: "July 2026",
    pubDate: "2026-07-16",
    excerpt:
      "How a question about logical form moved from Aristotle and Leibniz to formal semantics and language models, and why that history led me from philosophy to linguistics.",
    status: "note",
  },
  {
    slug: "inverted-observability",
    title: "Inverted Observability — psychology and interpretability as mirror sciences",
    date: "June 2026",
    pubDate: "2026-06-21",
    excerpt:
      "Developmental psychology infers hidden representations from behaviour. Interpretability can inspect mechanisms but often struggles to say what they mean. This essay asks what the two fields can learn from each other.",
    status: "note",
  },
  {
    slug: "meaning-beneath-language",
    title: "Is there meaning beneath the language?",
    date: "June 2026",
    pubDate: "2026-06-04",
    excerpt:
      "German, English, and Chinese can express similar content through different grammatical resources. When a model handles all three, what would show that it learned a shared meaning rather than three separate shortcuts?",
    status: "note",
  },
  {
    slug: "from-leibniz",
    title: "From a Sufficient Reason to a Universal Language — what philosophy gave me that ML didn't",
    date: "May 2026",
    pubDate: "2026-05-23",
    excerpt:
      "My undergraduate work on Leibniz left me with two questions: what counts as a sufficient reason, and whether a formal system can preserve the structure of thought. This essay traces how those questions reappeared in my work on language models.",
    status: "note",
  },
];
