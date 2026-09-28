// Output categories are independent of research topics. Publication status is
// explicit on every entry; "forthcoming" is reserved for confirmed acceptance.
// 27 September 2026 (XC): modality connects three projects: linguistic analysis,
// human study, and cognitive modelling / LM tests. The dilemma paper stays separate. Course projects
// (ProtoBias, street view) are listed on the CV and in a line under /research.
import { projects } from "./projects";

export interface PortfolioEntry {
  title: string;
  field: string;
  desc: string;
  status: string;
  links: { label: string; href: string }[];
  cover?: { src: string; alt: string };
  note?: { label: string; text: string };
  /** Compact list (papers): output type, one sentence, and whether it is a writing sample. */
  kind?: string;
  short?: string;
  sample?: boolean;
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
    blurb: "How do we represent, learn, and revise possibilities? Linguistic analysis and human studies guide a developing cognitive account, with planned tests of its predictions and corresponding computations in language models.",
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
    id: "papers", sec: "02", label: "Papers & Writing Samples",
    blurb: "",
    entries: [
      {
        title: projects.typicality.title,
        field: "Semantics & pragmatics",
        desc: projects.typicality.summary,
        status: projects.typicality.status + " · writing sample",
        kind: "Working paper 2026",
        short: "What a forced choice between two candidates can show about typicality when the description fits both.",
        sample: true,
        links: [
          { label: "paper", href: projects.typicality.href },
          { label: "LingBuzz", href: "https://lingbuzz.net/lingbuzz/010343" },
        ],
      },
      {
        title: "Prompt framing and latent control states",
        field: "Mechanistic interpretability",
        desc: projects.latentControl.summary,
        status: projects.latentControl.status,
        kind: "Manuscript in preparation",
        short: "How prompt framing changes model choices, tested with residual-stream interventions and low-rank analysis.",
        links: [{ label: "overview", href: projects.latentControl.href }],
      },
      {
        title: "Cross-lingual ProtoBias",
        field: "Course project report",
        desc: "A single-author report on a multilingual vision–language evaluation: the design, corrected results, and limits of the comparison.",
        status: "Completed course project · writing sample",
        kind: "Course report 2026",
        short: "Whether vision–language models follow explicit constraints over typicality across seven prompt languages.",
        sample: true,
        links: [
          { label: "report", href: projects.protobias.href },
          { label: "code", href: "https://github.com/xchuan-li/cross_lingual_protobias" },
        ],
      },
    ],
  },
];

// Course projects: listed, not showcased.
export const courseProjects = [
  { title: projects.psyStudy.title, href: projects.psyStudy.href },
  { title: projects.protobias.title, href: projects.protobias.href },
  { title: projects.streetView.title, href: projects.streetView.href },
];
