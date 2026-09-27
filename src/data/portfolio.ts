// Output categories are independent of research topics. Publication status is
// explicit on every entry; "forthcoming" is reserved for confirmed acceptance.
// 27 September 2026 (XC): two sections only. Modality shows one question with three
// kinds of evidence; papers and writing samples share the second. Course projects
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
    blurb: "One question about modal expressions, studied through linguistic analysis, a study with children, and language models.",
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
    blurb: "Working papers, manuscripts, and selected reports, with their current status.",
    entries: [
      {
        title: projects.typicality.title,
        field: "Semantics & pragmatics",
        desc: projects.typicality.summary,
        status: projects.typicality.status + " · writing sample",
        links: [
          { label: "Paper overview", href: projects.typicality.href },
          { label: "Read working paper", href: "https://lingbuzz.net/lingbuzz/010343" },
        ],
      },
      {
        title: "Prompt framing and latent control states",
        field: "Mechanistic interpretability",
        desc: projects.latentControl.summary,
        status: projects.latentControl.status,
        links: [{ label: "Research overview", href: projects.latentControl.href }],
      },
      {
        title: "Cross-lingual ProtoBias — project report",
        field: "Course project report",
        desc: "A single-author report on a multilingual vision–language evaluation: the design, corrected results, and limits of the comparison.",
        status: "Completed course project · writing sample",
        links: [
          { label: "Read report", href: projects.protobias.href },
          { label: "Code & data", href: "https://github.com/xchuan-li/cross_lingual_protobias" },
        ],
      },
    ],
  },
];

// Course projects: listed, not showcased.
export const courseProjects = [
  { title: projects.protobias.title, href: projects.protobias.href },
  { title: projects.streetView.title, href: projects.streetView.href },
];
