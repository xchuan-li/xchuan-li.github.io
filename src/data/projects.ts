// Public project descriptions, checked against the Vault on 17 September 2026; the thesis
// entry on 24 September (the MA moved to modal language in preschool children on 23 September).
// The thesis study is planned, not running. Private exploratory work is not published here.
export const projects = {
  protobias: {
    title: "Cross-lingual ProtoBias",
    href: "/research/cross-lingual-protobias",
    question: "Can models follow explicit semantic constraints despite prototypicality, and does this ability vary across languages?",
    summary: "A controlled evaluation holding image pairs fixed while varying the prompt language, with approximately 12,600 judgments across seven languages and two VLM systems.",
    connection: "The study connects my interest in how linguistic information interacts with prior expectations to controlled behavioural measurement and reproducible analysis.",
    status: "Study complete · first-author manuscript in revision",
  },
  threeWays: {
    title: "Three Ways of Leaving p Unsettled",
    href: "/research/three-ways",
    question: "What different information do apparently similar expressions of uncertainty contribute?",
    summary: "A formal semantic and pragmatic comparison of might p, might p or might not p, and I don’t know whether p, examining the commitments they create and the responses they license.",
    connection: "The project develops the linguistic analysis and diagnostics needed to formulate a precise empirical question.",
    status: "Analysis in development · independent judgments pending",
  },
  thesis: {
    title: "Modal language in preschool children",
    href: "/research/learnability",
    question: "How do preschool children understand modal expressions, and how does this relate to their reasoning about possibilities?",
    summary: "A small study of modal language, planned to run alongside an existing study of how preschool children reason about possibilities.",
    connection: "The formal analysis specifies what modal expressions contribute; the thesis asks how children come to understand them. It includes no language-model study.",
    status: "Master’s thesis · in planning",
  },
  typicality: {
    title: "Typicality in referent choice",
    href: "/research/typicality-in-referent-choice",
    question: "When a description built on a category term fits two candidates, how much of the choice is the description doing, and how much is typicality?",
    summary: "A working paper separating three conditions under which a superordinate description meets two candidates differing in typicality, and stating the limits of what a forced choice between them can report.",
    connection: "The paper gives the linguistic analysis the ProtoBias evaluation needed: it states the distinction that design presupposes but does not itself separate.",
    status: "Working paper · lingbuzz/010343",
  },
  latentControl: {
    title: "Latent Control States",
    href: "/research/latent-control-states",
    question: "How does prompt framing change model choices, and can the behavioural effect be explained mechanistically?",
    summary: "A collaboration with DFKI in which I designed controlled dilemma comparisons to distinguish sensitivity to outcomes from framing and action preferences.",
    connection: "This project develops my training in mechanistic interpretability: moving from controlled behavioural contrasts to tests of which internal representations and computations contribute to a model’s answer.",
    status: "Behavioural pilots · mechanistic analysis in progress",
  },
};
