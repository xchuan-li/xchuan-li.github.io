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
  | "Ongoing";

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
}

export const projects: Project[] = [
  {
    n: "01",
    title: "Stable Is Not Grounded",
    href: "/research/sc-certification",
    color: "var(--accent-coral)",
    tint: "rgba(240, 153, 123, 0.10)",
    glyph: "sc",
    tags: ["Workshop paper", "Certification"],
    desc: "Certification — is the linguistic structure that licenses an inference load-bearing for the model at all? Stable-correct behavior is not counted as grounded unless the stipulated structure survives shortcut-severing audits.",
    group: "core",
    tier: "now",
    category: "personal",
    status: "Drafting",
    node: "certify",
    maturity: "near",
    progress: "certify · workshop submission",
    output: "Workshop paper",
    blurb: "A non-circular test of whether a stable, correct answer is licensed by the real structure — or rides a shortcut.",
  },
  {
    n: "02",
    title: "Isotrace",
    href: "/research/isotrace",
    color: "var(--accent-teal)",
    tint: "rgba(93, 202, 165, 0.10)",
    glyph: "isotrace",
    tags: ["Decision experiment", "Localization"],
    desc: "Localization — which linguistic operation or encoding does the work? Distinct reasoning paths are made to produce distinct output labels, traced on typological minimal pairs that re-encode one causal graph in morphology, word order, or context.",
    group: "core",
    tier: "now",
    category: "personal",
    status: "In design",
    node: "certify",
    spanTo: "mechanism",
    maturity: "concept",
    progress: "localize · in design",
    output: "Decision experiment",
    blurb: "Behavioural path-tracing: which linguistic operation actually carried the inference.",
  },
  {
    n: "03",
    title: "Causal Inferential Yield",
    href: "/research/ciy",
    color: "var(--accent-purple)",
    tint: "rgba(175, 169, 236, 0.10)",
    glyph: "ciy",
    tags: ["Existence check", "Quantification"],
    desc: "Quantification — given the structure a model actually uses (measured by Isotrace), how much of the inference that structure licenses does it productively produce? A yield, not an accuracy.",
    group: "core",
    tier: "thesis",
    category: "personal",
    status: "Planned",
    maturity: "concept",
    progress: "quantify · planned",
    output: "Existence check",
    blurb: "A yield, not an accuracy — how much of the inference a structure licenses does the model actually produce?",
  },
  {
    n: "→",
    title: "Typological Grounding",
    href: "/research/typological-grounding",
    color: "var(--accent-deep-purple)",
    tint: "rgba(176, 156, 219, 0.10)",
    glyph: "xling",
    tags: ["Application frontier", "Cross-lingual"],
    desc: "Where the three methods meet linguistic typology: the same inferential content re-encoded by morphology, word order, or context, and the question of whether a model tracks the structure or the surface. The program's flagship application.",
    group: "frontier",
    tier: "thesis",
    category: "personal",
    status: "Exploratory",
    maturity: "concept",
    progress: "exploratory",
    output: "Through-line",
    blurb: "Does grounding survive when the same inference is re-encoded by each language's grammar?",
  },
  {
    n: "→",
    title: "HanGL · Surface Hangul, Latent Hanja",
    href: "/research/hangl",
    color: "var(--accent-teal-deep)",
    tint: "rgba(15, 110, 86, 0.10)",
    glyph: "hangl",
    tags: ["Application frontier", "Empirical pilot"],
    desc: "The structure-versus-surface question run on real LLMs through a natural phenomenon: Korean Sino-Korean words, where Hangul shares zero characters with its Hanja origin yet corresponds in meaning. A wrong-Hanja intervention shows latent grounding is a function of capability — strong models neither need the explicit cue nor are misled by it; a weak model is both.",
    group: "frontier",
    tier: "now",
    category: "collaborative",
    status: "Ongoing",
    node: "mechanism",
    spanTo: "crosslingual",
    maturity: "active",
    progress: "pilot · scaling",
    output: "Co-authored paper",
    blurb: "Do LLMs ground Korean words to their latent Hanja meaning, or stop at the surface script?",
  },
  {
    title: "MiniCausalLang",
    href: "/research/mini-causal-models",
    color: "var(--accent-slate)",
    glyph: "mcm",
    tags: ["Supporting workbench"],
    short: "A language-to-causal-graph workbench for testing whether grammatical structure, licensed inference, and interventions line up.",
    group: "support",
    tier: "now",
    category: "personal",
    status: "Ongoing",
    node: "certify",
    maturity: "active",
    progress: "workbench · building",
    output: "Shared workbench",
    blurb: "A language-to-causal-graph workbench that makes structure, licensed inference, and interventions observable.",
  },
  {
    title: "Latent Control States",
    href: "/research/latent-control-states",
    color: "var(--accent-amber)",
    glyph: "latent",
    tags: ["Extension · mechanistic"],
    short: "Does prompt framing — urgency, authority, epistemic positioning — only change an LLM's outputs, or shift a causally relevant latent state? A controlled-data pipeline is built; probing and activation patching come next. A collaborative project, advised by a senior researcher at DFKI (the German Research Center for Artificial Intelligence).",
    group: "support",
    tier: "group",
    category: "collaborative",
    status: "Ongoing",
    node: "mechanism",
    maturity: "active",
    progress: "data pipeline built",
    output: "Decision experiment",
    blurb: "Does prompt framing shift a causally relevant latent state, or only the surface?",
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
  },
  {
    title: "Causal Direction",
    href: "/research/causal-direction",
    color: "var(--accent-champagne)",
    glyph: "latent",
    tags: ["Extension · mechanistic", "Pilot"],
    short: "Does a real LLM hold a usable representation of causal direction — which event is the cause? A pilot on Gemma-2-2B finds a steerable, genuinely-causal direction that is nonetheless redundantly distributed. The MSc-thesis pilot.",
    group: "support",
    tier: "now",
    category: "personal",
    status: "Ongoing",
    node: "mechanism",
    maturity: "active",
    progress: "pilot complete",
    output: "Thesis chapter",
    blurb: "On a real LLM, the cause-direction feature is encoded and steerable — yet redundantly distributed.",
  },
];

export interface NowItem {
  label: string;
  text: string;
}

export const now: NowItem[] = [
  {
    label: "Primary",
    text: "Writing Stable Is Not Grounded as a workshop-targeted paper on why stable correctness is not enough to show that a model uses the linguistic structure that licenses an inference.",
  },
  {
    label: "Next",
    text: "Designing Isotrace, a behavioral path-tracing method that upgrades binary grounding certification into hop-level diagnosis of which linguistic operation carried the inference.",
  },
  {
    label: "Alongside",
    text: "Contributing to two collaborative projects in progress — Latent Control States (a mechanistic bridge) and Cross-lingual ProtoBias (an applied stress test) — which feed the main line; group work, so I don't claim their outcome as my own.",
  },
  {
    label: "Exploring",
    text: "Sketching a direction on typological grounding — what the language-and-reasoning question looks like when the same inference is marked in grammar in one language and left to context in another.",
  },
];
