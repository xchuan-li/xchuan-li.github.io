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
  // Archived: off the current active focus (only SNG + MiniCausalLang stay on the
  // mainline). The project page and its record are kept, but the piece is demoted
  // to a secondary "earlier & collaborative work" tier and dropped from the
  // homepage — it is neither parked (still listed) nor mainline.
  archived?: boolean;
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
    domain: "Grounding · certification",
    kind: "paper",
    demo: true,
  },
  {
    n: "02",
    title: "Isotrace",
    href: "/research/isotrace",
    color: "var(--accent-teal)",
    tint: "rgba(93, 202, 165, 0.10)",
    glyph: "isotrace",
    tags: ["Decision experiment", "Localization"],
    desc: "Localization — which linguistic operation or encoding does the work? Distinct reasoning paths are made to produce distinct output labels, traced on typological minimal pairs that re-encode one causal graph in morphology, word order, or context. A design-stage horizon the certified base builds toward, not yet running.",
    group: "frontier",
    tier: "thesis",
    category: "personal",
    status: "In design",
    node: "certify",
    spanTo: "mechanism",
    maturity: "concept",
    progress: "localize · parked",
    output: "Decision experiment",
    blurb: "Behavioural path-tracing: which linguistic operation actually carried the inference.",
    domain: "Localization · typology",
    kind: "project",
    parked: true,
  },
  {
    n: "→",
    title: "Typological Grounding",
    href: "/research/typological-grounding",
    color: "var(--accent-deep-purple)",
    tint: "rgba(176, 156, 219, 0.10)",
    glyph: "xling",
    tags: ["Application frontier", "Modal typology"],
    desc: "Where the program meets linguistic typology, with modality as the flagship case: languages lexicalize possibility and necessity differently — English may/must, German können/müssen/dürfen, Chinese 可能/必须/一定 — so the same modal base is carried by different words and different grammar. Hold the content fixed, re-encode it across languages, and ask whether the model tracks the quantified world-set or the surface habits of each language.",
    group: "frontier",
    tier: "thesis",
    category: "personal",
    status: "Exploratory",
    maturity: "concept",
    progress: "modal typology · exploratory",
    output: "Through-line",
    blurb: "Languages carve modality differently — does a model track the modal base, or each language's surface habits?",
    domain: "Cross-lingual · typology",
    kind: "project",
  },
  {
    n: "→",
    title: "HanGL · Surface Hangul, Latent Hanja",
    href: "/research/hangl",
    color: "var(--accent-teal-deep)",
    tint: "rgba(15, 110, 86, 0.10)",
    glyph: "hangl",
    tags: ["Application frontier", "Empirical pilot"],
    desc: "The structure-versus-surface question run on real LLMs through a natural phenomenon: Korean Sino-Korean words, where Hangul shares zero characters with its Hanja origin yet corresponds in meaning. A wrong-Hanja intervention shows latent grounding is a function of capability — a weak model needs the correct Hanja cue (Hanja gain +0.52) and is misled by a wrong one (cost +0.55); a strong model neither needs it (≈0) nor caves to it (+0.09–0.21). Behavioral and representational probes agree.",
    group: "core",
    tier: "now",
    category: "collaborative",
    status: "Ongoing",
    node: "mechanism",
    spanTo: "crosslingual",
    maturity: "active",
    progress: "pilot · scaling",
    output: "Co-authored paper",
    blurb: "Do LLMs ground Korean words to their latent Hanja meaning, or stop at the surface script?",
    domain: "Cross-lingual grounding",
    kind: "paper",
    demo: true,
    archived: true,
  },
  {
    title: "MiniCausalLang",
    href: "/research/mini-causal-models",
    color: "var(--accent-slate)",
    glyph: "mcm",
    tags: ["Supporting workbench"],
    short: "A workbench that stipulates a formal-semantic object and projects it to text — so grammatical structure, the inference it licenses, and interventions on it can be tested against a known target. First domain: the causal graph; being generalised into a modal-semantic compiler for the thesis.",
    group: "support",
    tier: "now",
    category: "personal",
    status: "Ongoing",
    node: "certify",
    maturity: "active",
    progress: "workbench · building",
    output: "Shared workbench",
    blurb: "A workbench that stipulates a formal-semantic object and projects it to text — first a causal graph, next a modal base — so structure, licensed inference, and interventions are observable.",
    domain: "Eval infrastructure",
    kind: "tool",
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
  {
    title: "Arrowhead",
    href: "/research/arrowhead",
    color: "var(--accent-champagne)",
    glyph: "latent",
    tags: ["Extension · mechanistic", "Pilot"],
    short: "Does a real LLM hold a usable representation of causal direction — which event is the cause? A completed thesis pilot on Gemma-2-2B finds a steerable, genuinely-causal direction — it transfers even to invented, zero-frequency relations — yet redundantly distributed. The evidence that representational-format questions are tractable inside real models: the pilot the modal-concepts thesis builds on.",
    group: "support",
    tier: "thesis",
    category: "personal",
    status: "Complete",
    node: "mechanism",
    maturity: "active",
    progress: "pilot complete",
    output: "Thesis chapter",
    blurb: "On a real LLM, the cause-direction feature is encoded and steerable — yet redundantly distributed.",
    domain: "Causal direction",
    kind: "project",
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
    text: "Writing Stable Is Not Grounded — the program's certification method in its first domain, causal structure — for a mid-July workshop deadline.",
  },
  {
    label: "Next",
    text: "Scoping the Master's thesis at UTN — the planned direction is modal concepts in language models: broadly, whether LMs develop rich modal representations and when modal distinctions emerge in training. Specific questions still being fixed.",
  },
  {
    label: "Then",
    text: "Hardening MiniCausalLang — the workbench where the space of alternatives is stipulated by construction — into a small, releasable bench, and prototyping its modal-base version for the thesis.",
  },
  {
    label: "Horizon",
    text: "Modal typology: the same modal base lexicalized differently across English, German, and Chinese (可能/必须/一定 does not map onto may/must) — the cross-lingual natural experiment the program builds toward.",
  },
];
