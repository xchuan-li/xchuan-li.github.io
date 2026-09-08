// Single source of truth for the research program — consumed by the homepage
// (src/pages/index.astro) and the /research index (src/pages/research/index.astro).
// Keeping the data here means a change to a project or its status updates every
// surface at once.

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
  // all mainline narratives (homepage, /research index).
  parked?: boolean;
  // Archived: off the current active focus (only SNG + CAST stay on the
  // mainline). The project page and its record are kept, but the piece is demoted
  // to a secondary "earlier & collaborative work" tier and dropped from the
  // homepage — it is neither parked (still listed) nor mainline.
  archived?: boolean;
}

// Ordered as they should read: the strongest concrete output first (a first-author
// paper), then the DFKI collaboration, then the earlier methods pilot. All three
// are `archived` — i.e. off the modality MAINLINE, which is the identity — but each
// is real, completed or ongoing work. The current mainline (the modality construct)
// is deliberately NOT a project card: it has no results yet, so it lives as the
// narrative "Current case" section on the homepage / research page, per CONTEXT.md.
export const projects: Project[] = [
  {
    title: "Cross-lingual ProtoBias",
    href: "/research/cross-lingual-protobias",
    color: "var(--accent-indigo)",
    glyph: "protobias",
    tags: ["First-author paper", "Multimodal", "Cross-lingual"],
    short: "A first-author paper — Cross-Lingual Prototypicality Bias in Multimodal Evaluation Metrics and VLM Judges (public code; revised version in preparation for arXiv). A controlled cross-lingual audit: hold the image pair fixed, vary only the prompt language, and test whether VLM judges track meaning or a culture-specific prototype shortcut. ~12,600 judgments across seven languages and two model families, item-clustered robust regression, a 90-item human control, and a translation-cache integrity fault found, re-run in full, and reported. The same design logic the thesis applies to modal semantics: structure versus surface.",
    group: "support",
    tier: "group",
    category: "personal",
    status: "Complete",
    node: "crosslingual",
    maturity: "near",
    progress: "paper complete · arXiv in prep",
    output: "First-author paper",
    blurb: "A first-author paper: a controlled cross-lingual audit — hold the image fixed, vary only the language — testing whether VLM judges track meaning or a culture-specific prototype. Seven languages, two model families.",
    domain: "Multimodal evaluation · cross-lingual",
    kind: "paper",
    demo: true,
    archived: true,
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
    progress: "ongoing · DFKI",
    output: "Decision experiment",
    blurb: "Does prompt framing shift a causally relevant latent state, or only the surface?",
    domain: "Mechanistic interp",
    kind: "project",
    archived: true,
  },
  {
    title: "MODUS",
    href: "/research/modus",
    color: "var(--accent-deep-purple)",
    tint: "rgba(176, 156, 219, 0.10)",
    glyph: "xling",
    tags: ["LM pilot", "Methods", "Earlier"],
    desc: "An earlier, exploratory language-model pilot developing methods to separate modal function from modal vocabulary. It constructs a direction from evidence contrasts that contain no modal words, checks whether must and might associate with it, and tests whether intervening on it changes the model's certainty-related behaviour — while exposing the lexical, base-rate, and generic-disruption confounds any such claim has to survive. It is methodological groundwork for the current construct, not a result about modal semantics: it does not show that the model represents worlds, maintains live alternatives, or shares anything with a human mind.",
    group: "core",
    tier: "thesis",
    category: "personal",
    status: "Exploratory",
    node: "certify",
    maturity: "concept",
    progress: "earlier · exploratory pilot",
    output: "Methods pilot",
    blurb: "An earlier exploratory pilot: controlled LM experiments separating modal function from modal vocabulary, with the confounds made explicit. Methods groundwork for the current question, not a verdict.",
    domain: "Epistemic modality · language models",
    kind: "project",
    demo: false,
    archived: true,
  },
];

export interface NowItem {
  label: string;
  text: string;
}

export const now: NowItem[] = [
  {
    label: "The question",
    text: "Working out the linguistic account: whether an epistemic possibility expression such as \"It might be a star\" merely signals uncertainty, or whether it also helps maintain the star as a live alternative for subsequent reasoning — and what would have to hold for that to be a real effect rather than mention, priming, or generic uncertainty.",
  },
  {
    label: "Right now",
    text: "Fixing the construct before any model or behavioural study: the target and the diagnostics — content-specific, persistent, evidence-sensitive — that would separate a real maintenance effect from mention, priming, or generic uncertainty. The construct brief is under review by a formal semanticist.",
  },
  {
    label: "Recent output",
    text: "Cross-Lingual Prototypicality Bias in Multimodal Evaluation Metrics and VLM Judges — a first-author paper with public code, in revision for arXiv. Earlier, MODUS: an exploratory pilot that built the methods for separating modal function from modal vocabulary.",
  },
  {
    label: "Cognitive side",
    text: "Scoping the developmental question — how this linguistic function becomes available in human cognition — against the existing literature on nonverbal modal reasoning and the acquisition of modal language, which have largely stayed separate.",
  },
  {
    label: "Horizon",
    text: "The same question runs on from epistemic modality to attitudes, evidentials, conditionals, and counterfactuals: how a linguistic expression structures the possibilities a system reasons over. Modality is the current case, not the boundary.",
  },
];
