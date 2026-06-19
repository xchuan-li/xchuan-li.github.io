// Single source of truth for the research program — consumed by the rich
// homepage (src/pages/index.astro) and the plain homepage (src/pages/plain.astro).
// Keeping the data here means a change to a project or its status updates both
// presentations at once.

// The argument structure of the program — what each piece IS. Drives the rich
// homepage's sections.
export type ProjectGroup = "core" | "frontier" | "support";

// The commitment/timeline tier — what is actually getting done, and when. Drives
// the plain homepage so a reader never mistakes a thesis-horizon plan or an
// uncertain group project for committed near-term work.
//   now    — solo work I'm building, targeted before PhD applications
//   thesis — the master's-thesis horizon, later
//   group  — collaborative projects in progress, completion not guaranteed
export type ProjectTier = "now" | "thesis" | "group";

// Ownership — my own work vs collaborative/group projects. Drives the filter on
// the homepage "all projects" gallery (All / Personal / Collaborative).
export type ProjectCategory = "personal" | "collaborative";

// Honest delivery state, surfaced verbatim on the plain page so planned work is
// never mistaken for finished work.
export type ProjectStatus =
  | "Drafting"
  | "In design"
  | "Planned"
  | "Exploratory"
  | "Ongoing";

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
}

export const projects: Project[] = [
  {
    n: "01",
    title: "Stable Is Not Grounded",
    href: "/research/sc-certification",
    color: "var(--accent-coral)",
    tint: "rgba(240, 153, 123, 0.10)",
    glyph: "sc",
    tags: ["Paper 1", "Certification"],
    desc: "Certification — is the linguistic structure that licenses an inference load-bearing for the model at all? Stable-correct behavior is not counted as grounded unless the stipulated structure survives shortcut-severing audits.",
    group: "core",
    tier: "now",
    category: "personal",
    status: "Drafting",
  },
  {
    n: "02",
    title: "Isotrace",
    href: "/research/isotrace",
    color: "var(--accent-teal)",
    tint: "rgba(93, 202, 165, 0.10)",
    glyph: "isotrace",
    tags: ["Paper 2", "Localization"],
    desc: "Localization — which linguistic operation or encoding does the work? Distinct reasoning paths are made to produce distinct output labels, traced on typological minimal pairs that re-encode one causal graph in morphology, word order, or context.",
    group: "core",
    tier: "now",
    category: "personal",
    status: "In design",
  },
  {
    n: "03",
    title: "Causal Inferential Yield",
    href: "/research/ciy",
    color: "var(--accent-purple)",
    tint: "rgba(175, 169, 236, 0.10)",
    glyph: "ciy",
    tags: ["Paper 3", "Quantification"],
    desc: "Quantification — given the structure a model actually uses (measured by Isotrace), how much of the inference that structure licenses does it productively produce? A yield, not an accuracy.",
    group: "core",
    tier: "thesis",
    category: "personal",
    status: "Planned",
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
  },
  {
    title: "Latent Control States",
    href: "/research/latent-control-states",
    color: "var(--accent-amber)",
    glyph: "latent",
    tags: ["Extension · mechanistic"],
    short: "Does a linguistic distinction such as tense have an activation-space direction, and does it survive a change of form? A collaborative project, in progress.",
    group: "support",
    tier: "group",
    category: "collaborative",
    status: "Ongoing",
  },
  {
    title: "Cross-lingual ProtoBias",
    href: "/research/cross-lingual-protobias",
    color: "var(--accent-indigo)",
    glyph: "protobias",
    tags: ["Extension · applied"],
    short: "An applied multimodal stress test: semantic content versus language- and culture-specific prototype shortcuts. A collaborative project, in progress.",
    group: "support",
    tier: "group",
    category: "collaborative",
    status: "Ongoing",
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
