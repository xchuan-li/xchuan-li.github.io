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
    n: "01",
    title: "GRADUS",
    href: "/research/gradus",
    color: "var(--accent-deep-purple)",
    tint: "rgba(176, 156, 219, 0.10)",
    glyph: "xling",
    tags: ["Dataset + diagnostic", "Modal force"],
    desc: "MODUS's instrument: a graded epistemic-force dataset that turns the binary must/might probe into a calibration diagnostic, a citable resource the thesis reuses. A force direction is built from evidence alone (no modal word); ablate it on a might sentence and its certainty jumps toward must, while a base-rate control does not.",
    group: "core",
    tier: "now",
    category: "personal",
    status: "Ongoing",
    node: "certify",
    maturity: "active",
    progress: "pilot run · building GRADUS",
    output: "Dataset + diagnostic paper",
    blurb: "MODUS's graded ruler for modal force: the citable dataset the thesis reuses.",
    domain: "Modal force · calibration",
    kind: "paper",
    demo: false,
  },
  {
    title: "ORDO",
    href: "/research/ordo",
    color: "var(--accent-coral)",
    tint: "rgba(240, 153, 123, 0.10)",
    glyph: "mcm",
    tags: ["Paper", "Ordering source"],
    desc: "Generics (birds fly, except penguins) and modals (you should repay, unless…) are both defaults that tolerate exceptions. Do they share one ordering-source mechanism, or two? A layered novelty-of-exception design where either outcome is a real finding, built on CAST.",
    group: "core",
    tier: "thesis",
    category: "personal",
    status: "In design",
    node: "certify",
    maturity: "concept",
    progress: "ordering source · in design",
    output: "Paper",
    blurb: "Do generics and modals share one ordering source, or two? Either outcome is a finding.",
    domain: "Ordering source · defeasibility",
    kind: "project",
  },
  {
    n: "→",
    title: "Typological Grounding",
    href: "/research/typological-grounding",
    color: "var(--accent-deep-purple)",
    tint: "rgba(176, 156, 219, 0.10)",
    glyph: "xling",
    tags: ["Application frontier", "Modal typology"],
    desc: "Where the program meets linguistic typology, with modality as the flagship case. Languages lexicalize possibility and necessity differently (English may/must, German können/müssen/dürfen, Chinese 可能/必须/一定), so the same modal base is carried by different words and different grammar. Hold the content fixed, re-encode it across languages, and ask whether the model tracks the quantified world-set or the surface habits of each language.",
    group: "frontier",
    tier: "thesis",
    category: "personal",
    status: "Exploratory",
    maturity: "concept",
    progress: "modal typology · exploratory",
    output: "Through-line",
    blurb: "Languages carve modality differently. Does a model track the modal base, or each language's surface habits?",
    domain: "Cross-lingual · typology",
    kind: "project",
    parked: true,
  },
  {
    n: "→",
    title: "HanGL",
    href: "/research/hangl",
    color: "var(--accent-teal-deep)",
    tint: "rgba(15, 110, 86, 0.10)",
    glyph: "hangl",
    tags: ["Word-level", "Morphology"],
    desc: "Is a Sino-Korean word's meaning composed from its Hanja morphemes (學 + 校 → school) or memorized whole? Hangul hides the morphemes; Hanja is the answer key the model never sees. The word-level cut of the program's question, with an existing human-psycholinguistics literature to mirror it against. A grounding pilot is done (grounding scales with capability); the morphological-decomposition direction is the forward step.",
    group: "core",
    tier: "now",
    category: "collaborative",
    status: "Ongoing",
    node: "mechanism",
    spanTo: "crosslingual",
    maturity: "active",
    progress: "pilot · scaling",
    output: "Co-authored paper",
    blurb: "Is a Sino-Korean word composed from its Hanja morphemes, or memorized whole?",
    domain: "Sino-Korean morphology",
    kind: "paper",
    demo: true,
    archived: true,
  },
  {
    title: "CAST",
    href: "/research/mini-causal-models",
    color: "var(--accent-slate)",
    glyph: "mcm",
    tags: ["Supporting workbench", "Modal compiler"],
    short: "Given a modal state (a set of possible worlds and a ◇/□ constraint), CAST projects it to controlled text in English, German, and Chinese, then grades whether the model's behaviour is isomorphic to the world-set it was compiled from. The logical content is fixed by construction, so any difference across the three languages can only come from linguistic form. The workbench MODUS and ORDO run on.",
    group: "support",
    tier: "now",
    category: "personal",
    status: "Ongoing",
    node: "certify",
    maturity: "active",
    progress: "workbench · building",
    output: "Shared workbench",
    blurb: "Given a modal state, generate controlled language across en/de/zh, then check the model tracks the surviving world-set, not the words.",
    domain: "Eval infrastructure",
    kind: "tool",
  },
  {
    title: "Latent Control States",
    href: "/research/latent-control-states",
    color: "var(--accent-amber)",
    glyph: "latent",
    tags: ["Extension · mechanistic"],
    short: "Does prompt framing (urgency, authority, epistemic positioning) only change an LLM's outputs, or shift a causally relevant latent state? A controlled-data pipeline is built; probing and activation patching come next. A collaborative project, advised by a senior researcher at DFKI (the German Research Center for Artificial Intelligence).",
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
    text: "GRADUS, the modal-force pilot (does a model represent necessity vs. possibility, or ride the modal word?) and building its graded epistemic-force dataset. The one project running now, and the precursor the thesis reuses.",
  },
  {
    label: "Next",
    text: "The Master's thesis at UTN on modal concepts in language models: whether a learner built from language alone develops rich modal representations, and when modal distinctions become load-bearing during training (the emergence question). Reuses the GRADUS instrument.",
  },
  {
    label: "Then",
    text: "Hardening CAST, the compiler that projects a modal state to controlled en/de/zh text so the space of alternatives is stipulated by construction, into a small, releasable bench the thesis runs on.",
  },
  {
    label: "Horizon",
    text: "Modal typology: the same modal base lexicalized differently across English, German, and Chinese (可能/必须/一定 does not map onto may/must), the cross-lingual natural experiment the program builds toward.",
  },
];
