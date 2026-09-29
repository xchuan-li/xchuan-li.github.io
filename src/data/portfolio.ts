// Output categories are independent of research topics. Publication status is
// explicit on every entry; "forthcoming" is reserved for confirmed acceptance.
// 27 September 2026 (XC): modality connects three projects: linguistic analysis,
// human study, and cognitive modelling / LM tests. The dilemma paper stays separate.
// 28 September 2026 (XC): the second section is "Papers & Reports" — every written
// output once, course reports included, each with a first-page thumbnail, a meta line,
// one sentence, and links. The separate "Course projects" line under /research is gone.
// 29 September 2026 (XC): the modality chain (old section 01) is gone — the three
// projects share a question, not a pipeline. All work sits in one section with three
// tabs named by XC: linguistic meaning / human cognition / language models.
// Later the same day (XC): no spine — the items are independent. Each is either a
// "Writing sample" (solely XC's own linguistic writing) or a "Project"; the left label
// is the project type (B7 counts as model evaluation), topics only for writing samples.
import { projects } from "./projects";

export interface PortfolioEntry {
  title: string;
  field: string;
  desc: string;
  status: string;
  links: { label: string; href: string }[];
  cover?: { src: string; alt: string };
  note?: { label: string; text: string };
  /** Papers list: meta line, one sentence, writing-sample flag, first-page thumbnail. */
  kind?: string;
  short?: string;
  sample?: boolean;
  thumb?: string;
  /** Papers list: which tab the entry sits under, and the topic label shown on it. */
  track?: PaperTrack;
  topic?: string;
}
export type PaperTrack = "meaning" | "human" | "lm";
/** Tab label (short), then the full heading and its subtitle shown above the open list. */
export const paperTracks: { id: PaperTrack; label: string; title: string; sub: string }[] = [
  { id: "meaning", label: "Meaning & inference", title: "Linguistic meaning and inference", sub: "Theoretical hypotheses and empirical operationalization" },
  { id: "human", label: "Human cognition", title: "Human cognition and development", sub: "Behavioural evidence and hypothesis testing" },
  { id: "lm", label: "Language models", title: "Language models: behaviour and mechanisms", sub: "Computational modelling and mechanistic tests" },
];
export interface PortfolioSection {
  id: string;
  sec: string;
  label: string;
  blurb: string;
  entries: PortfolioEntry[];
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: "work", sec: "", label: "Research & Papers",
    blurb: "How does language express possibility, knowledge and uncertainty, and how do people and language models use these expressions to understand and infer?",
    entries: [
      {
        track: "meaning", topic: "Modality",
        title: projects.threeWays.title,
        field: "Semantics & pragmatics", desc: projects.threeWays.summary, status: projects.threeWays.status,
        kind: "Writing sample · in development",
        short: "Compares answers that leave a question open, such as might p and I don’t know whether p, by the replies and continuations each one licenses.",
        links: [{ label: "Question & diagnostics", href: projects.threeWays.href }],
      },
      {
        track: "meaning", topic: "Typicality",
        title: "Typicality in referent choice: what the description leaves open",
        field: "Semantics & pragmatics", desc: projects.typicality.summary, status: projects.typicality.status,
        kind: "Writing sample · working paper 2026 · lingbuzz/010343",
        short: "Separates three conditions under which a description meets two candidates that differ in typicality, and what a forced choice between them can and cannot show.",
        thumb: "/papers/typicality-in-referent-choice-thumb.png",
        links: [
          { label: "Paper", href: projects.typicality.href },
          { label: "PDF", href: "/papers/typicality-in-referent-choice.pdf" },
          { label: "LingBuzz", href: "https://lingbuzz.net/lingbuzz/010343" },
          { label: "DOI", href: "https://doi.org/10.5281/zenodo.22855036" },
        ],
      },
      {
        track: "human", topic: "Behavioural experiment",
        title: projects.thesis.title,
        field: "Human study", desc: projects.thesis.summary, status: projects.thesis.status,
        kind: "Project · master’s thesis · in planning, no data yet",
        short: "A small study run alongside an existing study of how preschoolers reason about possibilities.",
        links: [{ label: "Thesis outline", href: projects.thesis.href }],
      },
      {
        track: "human", topic: "Behavioural experiment",
        title: "Does checking with ChatGPT first change how people check and double-check?",
        field: "Course experiment", desc: projects.psyStudy.summary, status: projects.psyStudy.status,
        kind: "Project · course study, Winter 2025–26 · report 2026",
        short: "A complete between-subjects experiment, from design and pilot to data collection (N = 47) and analysis; neither predicted difference was reliable.",
        thumb: "/papers/fact-checking-study-thumb.png",
        links: [
          { label: "Report", href: projects.psyStudy.href },
          { label: "PDF", href: "/papers/fact-checking-study.pdf" },
        ],
      },
      {
        track: "human", topic: "EEG experiment",
        title: "A group EEG study in Cognitive Neuroscience",
        field: "Course project", desc: "", status: "Planned course project · Winter 2026–27",
        kind: "Project · course study, Winter 2026–27 · planned",
        short: "A guided group study covering preregistration, EEG recording, and preprocessing and analysis in MNE-Python.",
        links: [],
      },
      {
        track: "lm", topic: "Model evaluation",
        title: projects.modalModels.title,
        field: "Language models", desc: projects.modalModels.summary, status: projects.modalModels.status,
        kind: "Project · in development",
        short: "From diagnostics of ruled-out possibilities to a cognitive account tested in model behaviour and internals.",
        links: [{ label: "Project outline", href: projects.modalModels.href }],
      },
      {
        track: "lm", topic: "Mechanistic interpretability",
        title: "Prompt framing and latent control states in language models",
        field: "Mechanistic interpretability", desc: projects.latentControl.summary, status: projects.latentControl.status,
        kind: "Project · manuscript in preparation · with collaborators at DFKI",
        short: "How prompt framing changes model choices in dilemmas, examined with residual-stream interventions and low-rank analysis.",
        links: [{ label: "Overview", href: projects.latentControl.href }],
      },
      {
        track: "lm", topic: "Model evaluation",
        title: "Cross-lingual prototypicality bias in multimodal evaluation metrics and VLM judges",
        field: "Course paper", desc: projects.protobias.summary, status: projects.protobias.status,
        kind: "Project · course paper 2026 · single author",
        short: "With each image pair held fixed and only the prompt language changed, both VLM judges changed their answer on about 70% of items in at least one of seven languages.",
        thumb: "/papers/cross-lingual-protobias-thumb.png",
        links: [
          { label: "Paper", href: projects.protobias.href },
          { label: "PDF", href: "/papers/cross-lingual-protobias.pdf" },
          { label: "Code & data", href: "https://github.com/xchuan-li/cross_lingual_protobias" },
        ],
      },
      {
        track: "lm", topic: "Model training · image CNN",
        title: "Training choices in a small CNN for street-view country classification",
        field: "Course project", desc: projects.streetView.summary, status: projects.streetView.status,
        kind: "Project · team course project 2026 · report 2026",
        short: "Training choices alone took a fixed 1.69M-parameter network from 0.62 to 0.82 validation accuracy; the best dropout rate depended on training length.",
        thumb: "/papers/street-view-classification-thumb.png",
        links: [
          { label: "Report", href: projects.streetView.href },
          { label: "PDF", href: "/papers/street-view-classification.pdf" },
        ],
      },
    ],
  },
];
