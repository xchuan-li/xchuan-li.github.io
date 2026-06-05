// Single source of truth for the research program — consumed by the rich
// homepage (src/pages/index.astro) and the plain homepage (src/pages/plain.astro).
// Keeping the data here means a change to a project or its status updates both
// presentations at once.

export type ProjectGroup = "core" | "frontier" | "support";

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
    desc: "Certification — is the behavior licensed by the genuine structure at all? Stable-correct behavior is not counted as grounded unless the stipulated structure survives shortcut-severing audits.",
    group: "core",
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
    desc: "Localization — which part of the structure does the work? Competing routes are made to produce distinct labels; in language, which cue (morphology, syntax, context) a model's reasoning actually leans on.",
    group: "core",
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
    desc: "Quantification — how much genuine structure does the model reliably use, beyond surface cues? Graded on controlled, typologically-varied items rather than on benchmark accuracy.",
    group: "core",
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
    desc: "Where the three methods meet linguistic typology: the same meaning re-encoded by morphology, word order, or context, and the question of whether a model tracks the structure or the surface. The program's flagship application.",
    group: "frontier",
    status: "Exploratory",
  },
  {
    title: "Mini Causal Models",
    href: "/research/mini-causal-models",
    tags: ["Validation sandbox"],
    short: "A planted-ground-truth environment — the three methods checked against a known linguistic target before they're trusted.",
    group: "support",
    status: "Ongoing",
  },
  {
    title: "Latent Control States",
    href: "/research/latent-control-states",
    tags: ["Extension · mechanistic"],
    short: "Does a linguistic distinction such as tense have an activation-space direction, and does it survive a change of form?",
    group: "support",
    status: "Planned",
  },
  {
    title: "Cross-lingual ProtoBias",
    href: "/research/cross-lingual-protobias",
    tags: ["Extension · applied"],
    short: "An applied multimodal stress test: semantic content versus language- and culture-specific prototype shortcuts.",
    group: "support",
    status: "Planned",
  },
];

export interface NowItem {
  label: string;
  text: string;
}

export const now: NowItem[] = [
  {
    label: "Primary",
    text: "Writing Stable Is Not Grounded as a workshop-targeted paper on why stability is not sufficient for grounding.",
  },
  {
    label: "Next",
    text: "Designing Isotrace, a behavioral path-tracing method that upgrades binary grounding certification into hop-level diagnosis.",
  },
  {
    label: "Support",
    text: "Keeping Latent Control States and Cross-lingual ProtoBias as supporting extensions — a mechanistic bridge and an applied stress test — feeding the main line rather than competing with it.",
  },
  {
    label: "Exploring",
    text: "Sketching a direction on typological grounding — what the structure-versus-surface question looks like when the same meaning is marked in grammar in one language and left to context in another.",
  },
];
