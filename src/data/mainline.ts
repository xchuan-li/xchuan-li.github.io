// The research arc as one continuous, scroll-scrubbed story — bookended by
// Leibniz. Single source of truth for MainlineScrolly.astro (the homepage) and
// plain.astro (text mirror). `reelQ` is the short question shown on the left
// vertical "question axis"; the rest drives the right-hand figure + intro.

export interface MainlineStep {
  n: string;
  method: string;
  title: string;
  qword: string;
  question: string;
  blurb: string;
  href: string;
  reelQ: string; // the left-axis question (rolls to the current beat)
  pending?: boolean;
}

export const mainline: MainlineStep[] = [
  {
    n: "·",
    method: "Origin",
    title: "From a sufficient reason",
    qword: "Why",
    question: "when a model answers correctly, what is its sufficient reason?",
    blurb:
      "Leibniz's nihil est sine ratione, put to a model: is the right answer licensed by the genuine structure — a grounding reason — or by a surface accident that merely correlates, a predictive one?",
    href: "/writing/from-leibniz",
    reelQ: "What is the sufficient reason?",
  },
  {
    n: "01",
    method: "Certify",
    title: "Stable Is Not Grounded",
    qword: "Whether",
    question: "is the stable, correct answer grounded — or could a shortcut produce it just as well?",
    blurb:
      "Split that sufficient reason into two routes: a grounded one and a shortcut. Both can yield the same output — so correctness alone can't tell them apart, and the shortcut can't be ruled out.",
    href: "/research/sc-certification",
    reelQ: "Grounded, or a shortcut?",
  },
  {
    n: "02",
    method: "Localize",
    title: "Isotrace",
    qword: "Where",
    question: "which route did the reasoning actually take?",
    blurb:
      "So we trace the path through the model — following the label, not the internals — until one route is confirmed as load-bearing and the other is ruled out.",
    href: "/research/isotrace",
    reelQ: "Which structure carries it?",
  },
  {
    n: "03",
    method: "Quantify",
    title: "Causal Inferential Yield",
    qword: "How much",
    question: "given it's grounded, how much inference does the model actually yield?",
    blurb:
      "With the route confirmed, measure how much of the inference that structure licenses the model productively produces — a yield, not an accuracy.",
    href: "/research/ciy",
    reelQ: "How much does it yield?",
  },
  {
    n: "04",
    method: "Apply",
    title: "Cross-lingual causal-feature thesis",
    qword: "Structure or surface",
    question: "does the structure hold beneath every language — Leibniz's characteristica?",
    blurb:
      "Re-dress the confirmed structure in each language's grammar — morphology, word order, context — and test whether the model tracks a structure beneath them, or rides each surface. The horizon Leibniz named. Coordinate pending an experiment.",
    href: "/research/typological-grounding",
    reelQ: "Beneath every language?",
    pending: true,
  },
];
