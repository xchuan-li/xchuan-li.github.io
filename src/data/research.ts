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
    n: "01",
    title: "GRADUS",
    href: "/research/gradus",
    color: "var(--accent-deep-purple)",
    tint: "rgba(176, 156, 219, 0.10)",
    glyph: "xling",
    tags: ["Dataset + diagnostic", "Modal force"],
    desc: "Does a language model represent epistemic modal force — the necessity in must, the possibility in might — or ride the surface modal word? A force direction built from evidence alone (no modal word); ablate it on a might sentence and its certainty jumps toward must, while a base-rate control does not. GRADUS extends the test into a graded epistemic-force dataset — a calibration diagnostic and a citable resource that the modal-concepts thesis reuses.",
    group: "core",
    tier: "now",
    category: "personal",
    status: "Ongoing",
    node: "certify",
    maturity: "active",
    progress: "pilot run · building GRADUS",
    output: "Dataset + diagnostic paper",
    blurb: "Does a model represent modal force, or ride the modal word? A causal probe plus a graded epistemic-force dataset.",
    domain: "Modal force · calibration",
    kind: "paper",
    demo: false,
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
    parked: true,
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
    title: "CAST",
    href: "/research/mini-causal-models",
    color: "var(--accent-slate)",
    glyph: "mcm",
    tags: ["Supporting workbench", "Modal compiler"],
    short: "Given a modal state — a set of possible worlds and a ◇/□ constraint — CAST projects it to controlled text in English, German, and Chinese, then grades whether the model's behaviour is isomorphic to the world-set it was compiled from. The logical content is fixed by construction, so any difference across the three languages can only come from linguistic form. The workbench the modal thesis runs on.",
    group: "support",
    tier: "now",
    category: "personal",
    status: "Ongoing",
    node: "certify",
    maturity: "active",
    progress: "workbench · building",
    output: "Shared workbench",
    blurb: "Given a modal state, generate controlled language across en/de/zh — then check the model tracks the surviving world-set, not the words.",
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
];

export interface NowItem {
  label: string;
  text: string;
}

export const now: NowItem[] = [
  {
    label: "Primary",
    text: "GRADUS — the modal-force pilot (does a model represent necessity vs. possibility, or ride the modal word?) and building its graded epistemic-force dataset. The one project running now, and the precursor the thesis reuses.",
  },
  {
    label: "Next",
    text: "The Master's thesis at UTN — modal concepts in language models: whether a learner built from language alone develops rich modal representations, and when modal distinctions become load-bearing during training (the emergence question). Reuses the GRADUS instrument.",
  },
  {
    label: "Then",
    text: "Hardening CAST — the compiler that projects a modal state to controlled en/de/zh text, so the space of alternatives is stipulated by construction — into a small, releasable bench the thesis runs on.",
  },
  {
    label: "Horizon",
    text: "Modal typology: the same modal base lexicalized differently across English, German, and Chinese (可能/必须/一定 does not map onto may/must) — the cross-lingual natural experiment the program builds toward.",
  },
];
