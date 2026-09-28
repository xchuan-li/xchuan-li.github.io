// Output categories are independent of research topics. Publication status is
// explicit on every entry; "forthcoming" is reserved for confirmed acceptance.
// 27 September 2026 (XC): modality connects three projects: linguistic analysis,
// human study, and cognitive modelling / LM tests. The dilemma paper stays separate.
// 28 September 2026 (XC): the second section is "Papers & Reports" — every written
// output once, course reports included, each with a first-page thumbnail, a meta line,
// one sentence, and links. The separate "Course projects" line under /research is gone.
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
}
export interface PortfolioSection {
  id: string;
  sec: string;
  label: string;
  blurb: string;
  entries: PortfolioEntry[];
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: "current", sec: "01", label: "Current Research: Modality",
    blurb: "How do we represent, learn, and revise possibilities? A linguistic analysis, a study with children, and model tests of a shared account.",
    entries: [
      {
        title: projects.threeWays.title,
        field: "Linguistic analysis",
        desc: projects.threeWays.summary,
        status: projects.threeWays.status,
        links: [{ label: "Question & diagnostics", href: projects.threeWays.href }],
      },
      {
        title: projects.thesis.title,
        field: "Human study",
        desc: projects.thesis.summary,
        status: projects.thesis.status,
        links: [{ label: "Thesis outline", href: projects.thesis.href }],
      },
      {
        title: projects.modalModels.title,
        field: "Language models",
        desc: projects.modalModels.summary,
        status: projects.modalModels.status,
        links: [{ label: "Project outline", href: projects.modalModels.href }],
      },
    ],
  },
  {
    id: "papers", sec: "02", label: "Papers & Reports",
    blurb: "",
    entries: [
      {
        title: "Typicality in referent choice: what the description leaves open",
        field: "Semantics & pragmatics", desc: projects.typicality.summary, status: projects.typicality.status,
        kind: "Working paper · 2026 · lingbuzz/010343", sample: true,
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
        title: "Prompt framing and latent control states in language models",
        field: "Mechanistic interpretability", desc: projects.latentControl.summary, status: projects.latentControl.status,
        kind: "Manuscript in preparation · with collaborators at DFKI",
        short: "How prompt framing changes model choices in dilemmas, examined with residual-stream interventions and low-rank analysis.",
        links: [{ label: "Overview", href: projects.latentControl.href }],
      },
      {
        title: "Cross-lingual prototypicality bias in multimodal evaluation metrics and VLM judges",
        field: "Course paper", desc: projects.protobias.summary, status: projects.protobias.status,
        kind: "Course paper · 2026 · single author", sample: true,
        short: "With each image pair held fixed and only the prompt language changed, both VLM judges changed their answer on about 70% of items in at least one of seven languages.",
        thumb: "/papers/cross-lingual-protobias-thumb.png",
        links: [
          { label: "Paper", href: projects.protobias.href },
          { label: "PDF", href: "/papers/cross-lingual-protobias.pdf" },
          { label: "Code & data", href: "https://github.com/xchuan-li/cross_lingual_protobias" },
        ],
      },
      {
        title: "Does checking with ChatGPT first change how people check and double-check?",
        field: "Course experiment", desc: projects.psyStudy.summary, status: projects.psyStudy.status,
        kind: "Course experiment · 2025–26 · report 2026",
        short: "A complete between-subjects experiment, from design and pilot to data collection (N = 47) and analysis; neither predicted difference was reliable.",
        thumb: "/papers/fact-checking-study-thumb.png",
        links: [
          { label: "Report", href: projects.psyStudy.href },
          { label: "PDF", href: "/papers/fact-checking-study.pdf" },
        ],
      },
      {
        title: "Training choices in a small CNN for street-view country classification",
        field: "Course project", desc: projects.streetView.summary, status: projects.streetView.status,
        kind: "Course project · 2026 · report 2026",
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
