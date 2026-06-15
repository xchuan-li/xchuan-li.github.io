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
    slug: "meaning-beneath-language",
    title: "Is there meaning beneath the language?",
    date: "June 2026",
    pubDate: "2026-06-04",
    excerpt:
      "The same content is carried by German morphology, English word order, and Chinese context. When a model handles all three, does it represent the meaning beneath the forms — or three separate surface habits that each happen to work? The motivating question behind the typological-grounding line.",
    status: "note",
  },
  {
    slug: "causal-residue",
    title: "Causal structure as residue — training as elimination",
    date: "May 2026",
    pubDate: "2026-05-28",
    excerpt:
      "Every training example is a falsifier — a behavioral observation compatible with some causal structures and incompatible with others. The structure a learner ends up with is the residue of cumulative cutting. This may be the hidden unification of the core program and its extensions.",
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
  {
    slug: "decidability-boundary",
    title: "Why interpretability needs a decidability boundary",
    date: "May 2026",
    pubDate: "2026-05-22",
    excerpt:
      "There is a difference between a measurement being hard and a quantity being undefined. Past a certain depth, much of what interpretability treats as a hard measurement is in fact an undefined quantity.",
    status: "draft",
  },
  {
    slug: "inferential-productivity",
    title: "Reasoning is generative; grounding needs the other direction",
    date: "May 2026",
    pubDate: "2026-05-23",
    excerpt:
      "Most conceptual machinery we have for reasoning runs in one direction — premises into conclusions, conclusions into more conclusions. The harder direction, and the one that almost no standard tool measures, is the reverse: given a system's behavior, what is the smallest causal structure that has to be there for the behavior to land?",
    status: "note",
  },
];
