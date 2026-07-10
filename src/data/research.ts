// Single source of truth for the research program — consumed by the rich
// homepage (src/pages/index.astro) and the plain homepage (src/pages/plain.astro).
// Keeping the data here means a change to a project or its status updates both
// presentations at once.

export type ProjectGroup = "core" | "frontier" | "support";

// Commitment/timeline tier: now (solo, before applications) / thesis / group.
export type ProjectTier = "now" | "thesis" | "group";

// Ownership — drives the personal vs collaborative reading on each card.
export type ProjectCategory = "personal" | "collaborative";

export type ProjectStatus =
  | "Drafting"
  | "In design"
  | "Planned"
  | "Exploratory"
  | "Ongoing"
  | "Complete";

// Which node of the research mainline a project hangs from.
//   certify      — behaviour, on the synthetic sandbox
//   mechanism    — inside real models (activation space)
//   crosslingual — does it hold across languages
export type ProjectNode = "certify" | "mechanism" | "crosslingual";

// Maturity, shown as the small status dot on each card.
//   near    — near-complete / in submission
//   active  — in progress (a real pilot / build)
//   concept — concept or planned
export type ProjectMaturity = "near" | "active" | "concept";

// Homepage showcase: what the project ultimately is.
//   tool    — a reusable workbench / piece of infrastructure
//   paper   — targets (or contributes to) a paper
//   project — a standalone project / decision experiment / thesis chapter
export type ProjectKind = "tool" | "paper" | "project";

export interface Project {
  n?: string;
  title: string;
  href: string;
  color?: string;
  tint?: string;
  glyph?: string;
  tags: string[];
  desc?: string;
  short?: string;
  group: ProjectGroup;
  tier: ProjectTier;
  category: ProjectCategory;
  status: ProjectStatus;
  node?: ProjectNode;
  // When set, the project is a "bridge" card that spans from `node` (its left
  // column) to `spanTo` (the adjacent column to the right) on the homepage mainline.
  spanTo?: ProjectNode;
  maturity?: ProjectMaturity;
  progress?: string;
  // Natural deliverable — what this project actually produces. Not everything
  // aims at a paper: a project can be a decision experiment, a shared workbench,
  // a thesis chapter, a through-line, or a contribution to a collaborator's paper.
  output?: string;
  blurb?: string;
  // Showcase tags used on the homepage cards and the /research index. `domain` is
  // the short field label; `kind` is what the project ultimately is. The homepage
  // cards show only result-bearing projects (maturity !== "concept"); the /research
  // index shows the full program.
  domain?: string;
  kind?: ProjectKind;
  // Whether the project page has an interactive demo (shown as a small marker).
  demo?: boolean;
  // Parked: the page stays up (URL unbroken) but the project is withdrawn from
  // all mainline narratives (homepage, /research index, /plain).
  parked?: boolean;
  // Archived: off the current active focus (only SNG + CAST stay on the
  // mainline). The project page and its record are kept, but the piece is demoted
  // to a secondary "earlier & collaborative work" tier and dropped from the
  // homepage — it is neither parked (still listed) nor mainline.
  archived?: boolean;
}

export const projects: Project[] = [
  {
    title: "MODUS",
    href: "/research/modus",
    color: "var(--accent-deep-purple)",
    tint: "rgba(176, 156, 219, 0.10)",
    glyph: "xling",
    tags: ["Thesis", "Modal force"],
    desc: "The format of modal force: is necessity/possibility a quantification over a set of possible worlds (Kratzer) or a single degree of certainty (Lassiter)? Judgment data cannot separate the two; a model's representational format under intervention can. The language model is the instrument here, not the object, and it is also the Master's thesis. GRADUS is its graded dataset.",
    group: "core",
    tier: "thesis",
    category: "personal",
    status: "Ongoing",
    node: "certify",
    maturity: "active",
    progress: "modal force · thesis · pilot run",
    output: "Thesis",
    blurb: "What is modal force made of: a set of worlds, or a degree? The thesis; the LM is the instrument.",
    domain: "Modal force · format",
    kind: "project",
    demo: false,
  },
  {
    title: "HanGL",
    href: "/research/hangl",
    color: "var(--accent-teal-deep)",
    tint: "rgba(15, 110, 86, 0.10)",
    glyph: "hangl",
    tags: ["Word-level", "Morphology"],
    desc: "Is a Sino-Korean word's meaning composed from its Hanja morphemes (學 + 校 → school) or memorized whole? Hangul hides the morphemes; Hanja is the answer key the model never sees. The word-level cut of the program's question, with an existing human-psycholinguistics literature to mirror it against. A grounding pilot is done (grounding scales with capability); the morphological-decomposition direction is the forward step.",
    group: "core",
    tier: "now",
    category: "personal",
    status: "Ongoing",
    node: "mechanism",
    maturity: "active",
    progress: "pilot done · morphology next",
    output: "Paper",
    blurb: "Is a Sino-Korean word composed from its Hanja morphemes, or memorized whole?",
    domain: "Sino-Korean morphology",
    kind: "paper",
    demo: true,
  },
  {
    title: "ORDO",
    href: "/research/ordo",
    color: "var(--accent-coral)",
    tint: "rgba(240, 153, 123, 0.10)",
    glyph: "mcm",
    tags: ["Case study", "Generics"],
    desc: "Generics (birds fly, except penguins) and modals (you should repay, unless…) are both defaults that tolerate exceptions, the kind of inference classical logic cannot state. Do they share one ordering-source mechanism, or two? A layered novelty-of-exception design where either outcome is a real finding.",
    group: "core",
    tier: "thesis",
    category: "personal",
    status: "In design",
    node: "certify",
    maturity: "concept",
    progress: "generics · in design",
    output: "Paper",
    blurb: "Do generics and modals share one ordering source, or two? Either outcome is a finding.",
    domain: "Generics · defeasibility",
    kind: "project",
  },
  {
    title: "Cross-lingual ProtoBias",
    href: "/research/cross-lingual-protobias",
    color: "var(--accent-indigo)",
    glyph: "protobias",
    tags: ["Extension · applied"],
    short: "An applied multimodal stress test: semantic content versus language- and culture-specific prototype shortcuts. A collaborative project extending a forthcoming paper from an established NLP research group.",
    group: "support",
    tier: "group",
    category: "collaborative",
    status: "Ongoing",
    node: "crosslingual",
    maturity: "active",
    progress: "report 2 · 2 models, 7 langs",
    output: "Co-authored paper",
    blurb: "Across languages, does a vision-language model track meaning or culture-specific prototype shortcuts?",
    domain: "Multimodal bias",
    kind: "paper",
    demo: true,
    archived: true,
  },
];

export interface NowItem {
  label: string;
  text: string;
}

export const now: NowItem[] = [
  {
    label: "Primary",
    text: "The Master's thesis (MODUS): is modal force a set of possible worlds (Kratzer) or a degree of certainty (Lassiter)? A pilot already reads a force direction built from evidence alone, with no modal word present; ablate it on a might sentence and its certainty jumps toward must, while a base-rate control does not. The format test and a graded epistemic-force dataset come next.",
  },
  {
    label: "Alongside",
    text: "HanGL: is a Sino-Korean word's meaning composed from its Hanja morphemes, or memorized whole? A grounding pilot is done; the morphological-decomposition test, with a human-psycholinguistics literature to mirror it against, is next.",
  },
  {
    label: "Collaborative",
    text: "Cross-lingual ProtoBias: does a vision-language model track meaning, or culture-specific prototype shortcuts? A co-authored paper extending an established NLP group's work, now in its second iteration.",
  },
  {
    label: "Horizon",
    text: "The same question runs on past modality to conditionals, quantifiers, and counterfactuals. Modality is the first case study, not the last.",
  },
];
