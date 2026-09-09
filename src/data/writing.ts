// Single source of truth for the Writing section — consumed by the listing page
// (src/pages/writing/index.astro), the homepage (featured note only), and the RSS
// feed. Essays are layered into tiers so the research identity reads as settled,
// not shifting: research notes lead, intellectual background and earlier thinking
// sit below and stay accessible.

export type Tier = "research-note" | "essay" | "intellectual-background" | "earlier-work";

export interface Post {
  slug: string;
  title: string;
  date: string;
  pubDate: string; // ISO date first published
  excerpt: string;
  tier: Tier;
  featured?: boolean; // surfaced on the homepage
}

export const posts: Post[] = [
  {
    slug: "logic-of-natural-language",
    title: "Is the logic of natural language the logic of the logicians?",
    date: "July 2026",
    pubDate: "2026-07-16",
    excerpt:
      "How formal semantics turns intuitions about meaning into competing, testable hypotheses — with epistemic modals such as must as the case in point.",
    tier: "research-note",
    featured: true,
  },
  {
    slug: "meaning-beneath-language",
    title: "What would it mean for meaning to survive a change of language?",
    date: "June 2026",
    pubDate: "2026-06-04",
    excerpt:
      "German, English, and Chinese carry similar content by different grammatical means. When a model handles all three, what evidence would show it learned a shared structure rather than three separate habits?",
    tier: "research-note",
  },
  {
    slug: "from-leibniz",
    title: "What Leibniz taught me to ask about language",
    date: "May 2026",
    pubDate: "2026-05-23",
    excerpt:
      "My undergraduate thesis was on Leibniz's characteristica universalis. What stayed with me is one question: can the form of a language show the structure of its meaning?",
    tier: "intellectual-background",
  },
  {
    slug: "inverted-observability",
    title: "Inverted Observability — psychology and interpretability as mirror sciences",
    date: "June 2026",
    pubDate: "2026-06-21",
    excerpt:
      "An earlier essay. Developmental psychology and interpretability observe hidden representations from opposite sides — one sees behaviour, the other mechanism — and each might lend the other something.",
    tier: "earlier-work",
  },
];
