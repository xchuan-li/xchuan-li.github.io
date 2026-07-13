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
    tags: ["Thesis", "Modal force", "Language-model arm"],
    desc: "The format of modal force: is necessity/possibility a quantification over a set of possible worlds (Kratzer) or a single degree of certainty (Lassiter)? Judgment data cannot separate the two; a model's representational format under intervention can. This is the language-model arm of the Master's thesis — the model is the instrument, not the object. A pilot already reads a force direction built from evidence alone, with no modal word present; ablate it on a might sentence and its certainty jumps toward must, while a base-rate control does not. GRADUS is its graded epistemic-force dataset.",
    group: "core",
    tier: "thesis",
    category: "personal",
    status: "Ongoing",
    node: "certify",
    maturity: "active",
    progress: "modal force · LM arm · pilot run",
    output: "Thesis",
    blurb: "What is modal force made of — a set of worlds, or a degree? The language-model arm of the thesis; the model is the instrument.",
    domain: "Modal force · language models",
    kind: "project",
    demo: false,
  },
  {
    title: "Modal reasoning in the human mind",
    href: "/research",
    color: "var(--accent-slate)",
    tint: "rgba(56, 112, 140, 0.10)",
    glyph: "latent",
    tags: ["Thesis", "Human arm", "Developmental"],
    desc: "The human arm of the same thesis. The very modal contrast the language-model pilot turns on — evidence-driven force, worlds versus degree — put to people through a shared behavioural paradigm, drawing on the developmental literature on modal cognition (Leahy & Carey). One modal theory, one set of predictions, adjudicated in two systems at once: where they agree, and where the model departs from the mind, both constrain the theory. In planning, co-designed from the cognitive-developmental side.",
    group: "core",
    tier: "thesis",
    category: "personal",
    status: "In design",
    maturity: "concept",
    progress: "human arm · shared paradigm · in planning",
    output: "Thesis",
    blurb: "The same modal theory, tested in people through a shared paradigm — the human counterpart of MODUS.",
    domain: "Modal reasoning · human experiment",
    kind: "project",
  },
  {
    title: "Latent Control States",
    href: "/research",
    color: "var(--accent-amber)",
    glyph: "latent",
    tags: ["Collaboration", "Mechanistic"],
    short: "Does prompt framing shift a causally relevant latent state, or only the output? My contribution: a utilitarian minimal-pair probe — dilemma × benefit-size × framing — testing whether the choice tracks the real stakes or only surface pressure. A collaboration with DFKI.",
    group: "support",
    tier: "group",
    category: "collaborative",
    status: "Ongoing",
    node: "mechanism",
    maturity: "active",
    progress: "data pipeline built",
    output: "Decision experiment",
    blurb: "Does prompt framing shift a causally relevant latent state, or only the surface?",
    domain: "Mechanistic interp",
    kind: "project",
    archived: true,
  },
  {
    title: "Cross-lingual ProtoBias",
    href: "/research/cross-lingual-protobias",
    color: "var(--accent-indigo)",
    glyph: "protobias",
    tags: ["Extension · applied"],
    short: "An applied multimodal stress test: semantic content versus culture-specific prototype shortcuts. My contribution: the cross-lingual evaluation across seven languages that extends an established NLP group's forthcoming paper.",
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
    text: "The Master's thesis (MODUS), language-model arm: is modal force a set of possible worlds (Kratzer) or a degree of certainty (Lassiter)? A pilot already reads a force direction built from evidence alone, with no modal word present; ablate it on a might sentence and its certainty jumps toward must, while a base-rate control does not. The format test and a graded epistemic-force dataset come next.",
  },
  {
    label: "Alongside",
    text: "The human arm of the same thesis: the very modal contrast the model turns on, put to people through a shared behavioural paradigm, drawing on the developmental literature on modal cognition. One theory, one set of predictions, adjudicated in two systems at once. In planning, co-designed from the cognitive-developmental side.",
  },
  {
    label: "Writing",
    text: "A formal-semantics working paper on modality — the theoretical spine the two experimental arms derive their predictions from. In preparation.",
  },
  {
    label: "Horizon",
    text: "The same method runs on from modality to conditionals, counterfactuals, and quantifiers. Modality is where I build depth, not the boundary of the question.",
  },
];
