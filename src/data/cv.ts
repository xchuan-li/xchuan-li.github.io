// One source for the CV and its two application variants (XC, 28 September 2026).
// general = /cv (linked, and the PDF on the site); lm and cogsci are unlinked,
// noindex pages printed to PDF for applications. Variants change order, emphasis
// and omissions only — never what an entry says it is.
// Facts: psychology study per Vault A2u1 (design = group of three, adopted by class
// vote; analysis = XC); IT job wording per Vault A3x1 §6 (confirmed 27 Sep 2026).
// Learning-difficulties project per XC’s old CV (1 Oct 2026): autumn 2021,
// test items, response data and individual plans. XC confirmed an internship certificate
// on 3 Oct 2026; listed under Employment in general and cogsci;
// omitted only from the focused lm variant. Original data no longer survives.

import { identityLong, programmeHtml } from "./program";

export type Variant = "general" | "lm" | "cogsci";
type ByVariant<T> = T | Partial<Record<Variant, T>> & { default?: T };

export function pick<T>(v: ByVariant<T> | undefined, variant: Variant): T | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v === "object" && !Array.isArray(v) && ("default" in v || "general" in v || "lm" in v || "cogsci" in v)) {
    const o = v as Partial<Record<Variant, T>> & { default?: T };
    return o[variant] ?? o.default;
  }
  return v as T;
}

export interface Entry {
  id: string;
  method?: string;          // programme rows: method label (Formal analysis / Human study / Language models)
  row?: ByVariant<string>;  // programme rows: one HTML line; compact earlier rows: the line after the title
  status?: string;          // programme rows: "In development." etc.
  title: string;
  href?: string;
  context: string;          // italic line: what it is / where
  when: string;             // right-aligned
  note?: ByVariant<string>; // at most one short line
  citation?: string;        // output attached to its research entry, never a separate list
  links?: { label: string; href: string }[];
}

// 12 Oct 2026 (XC): the opening follows the homepage — the lead question, then the paradigm
// paragraph — imported from program.ts so the two cannot drift. Variants add one sentence.
const opening = `${identityLong} ${programmeHtml}`;
export const interests: Record<Variant, string> = {
  general: opening,
  lm: `${opening} Methods: activation patching, low-rank analysis, probing, controlled evaluation.`,
  cogsci: `${opening} Experience with how human data are produced, from children’s language to adult behavioural experiments.`,
};

// 12 Oct 2026 (XC): education notes state what each stage trained, not selected coursework;
// Marburg is listed only as German for graduate study.
export const education: (Entry & { place: string })[] = [
  {
    id: "msc", title: "University of Technology Nuremberg", place: "Nuremberg, Germany",
    context: "M.Sc. Human and Artificial Intelligence", when: "Oct. 2025 – exp. 2027",
    note: {
      general: "Designing and analysing behavioural experiments; cognitive psychology; training neural networks; interpretability methods for language models.",
      lm: "Interpretability methods for language models; training neural networks; designing and analysing behavioural experiments; cognitive psychology.",
      cogsci: "Designing and analysing behavioural experiments; cognitive psychology and cognitive neuroscience; training neural networks; interpretability methods for language models.",
    },
  },
  {
    id: "marburg", title: "University of Marburg", place: "Marburg, Germany",
    context: "German for graduate study", when: "Oct. 2024 – Jul. 2025",
  },
  {
    id: "ba", title: "Shenzhen University", place: "Shenzhen, China",
    context: "B.A. Philosophy", when: "Sep. 2020 – Jun. 2024",
    note: "Formal logic and proof, including modal logic and Gödel’s incompleteness theorems; philosophy of language; psychology of reading.",
  },
];

const research: Record<string, Entry> = {
  typicality: {
    id: "typicality", title: "Typicality in referent choice: what the description leaves open",
    href: "/research/typicality-in-referent-choice",
    context: "Independent theoretical study", when: "Sep. 2026",
    note: "Distinguishes three conditions for typicality in referent choice and the limits of what a forced-choice task can establish.",
    citation: "Li, X. (2026). Working paper.",
    links: [{ label: "lingbuzz/010343", href: "https://lingbuzz.net/lingbuzz/010343" }, { label: "doi:10.5281/zenodo.22855036", href: "https://doi.org/10.5281/zenodo.22855036" }],
  },
  undergraduate: {
    id: "undergraduate", title: "Leibniz’s logical system and characteristica universalis",
    context: "Undergraduate thesis · Shenzhen University", when: "Dec. 2023 – May 2024",
    note: "Analysed Leibniz’s metaphysics, logic and proposal for a universal symbolic language.",
  },
  threeWays: {
    id: "threeWays", title: "Three Ways of Leaving p Unsettled", href: "/research/three-ways",
    method: "Formal analysis", status: "In development.",
    row: 'compares <i>might p</i>, <i>might p or might not p</i> and <i>I don’t know whether p</i> by the replies each licenses.',
    context: "Formal semantics and pragmatics · analysis in development", when: "2026 –",
    note: "Compares might p, might p or might not p, and I don’t know whether p by the replies each licenses.",
  },
  thesis: {
    id: "thesis", title: "Modal language in preschool children", href: "/research/learnability",
    method: "Human study", status: "In planning.",
    row: 'modal language in preschool children, part of a PhD project at the Max Planck Institute for Human Cognitive and Brain Sciences, Leipzig.',
    context: "M.Sc. thesis, design stage · part of a PhD project at the Max Planck Institute for Human Cognitive and Brain Sciences, Leipzig", when: "Sep. 2026 –",
    note: "Asks how preschool children come to distinguish possibility from necessity in language, and how this relates to their nonlinguistic reasoning about possibilities; a behavioural study; data collection has not started. It lays the groundwork for later work on modal language in language models.",
  },
  modifiers: {
    id: "modifiers", title: "Property updating in modified nouns in language models",
    href: "/research/modified-nouns",
    context: "Independent project", when: "Sep. 2026 –",
    note: "Contrasted properties that depend on an added feature with properties that only co-occur with it (13 feature groups, 477 items, three instruction-tuned models), using predictors fixed outside the models: a dependency table, human feature norms and word-association norms; exploratory activation patching. Manuscript in preparation.",
  },
  lit: {
    id: "lit", title: "Moral framing and dilemma choices in language models",
    href: "/research/latent-control-states",
    row: "supervised at the German Research Center for Artificial Intelligence (DFKI); causal interventions in 7B–14B models, utilitarian-framing branch",
    context: "Supervised at the German Research Center for Artificial Intelligence (DFKI)",
    when: "Apr. 2026 – Mar. 2027",
    note: "Investigated how moral wording affects dilemma choices. Designed and ran controlled experiments and activation interventions in 7B and 14B models for the utilitarian-framing branch, with checks of answer labels, option positions, and task understanding; manuscript in preparation.",
  },
  psy: {
    id: "psy", title: "Fact-checking after ChatGPT exposure", href: "/research/fact-checking-study",
    row: "human study, class-wide experiment (N = 49, 47 analysed); my part: data analysis",
    context: "Course study, Foundations in Psychology and Empirical Study Design", when: "Nov. 2025 – Feb. 2026",
    note: {
      default: "Between-subjects experiment on optional checking after ChatGPT or Wikipedia answers (49 participants, 47 analysed); co-designed the study, ran the data analysis and wrote the report.",
      cogsci: "Between-subjects experiment on optional checking after ChatGPT or Wikipedia answers (49 participants, 47 analysed); co-designed the study, ran the data analysis in JASP and wrote the report.",
    },
  },
  protobias: {
    id: "protobias", title: "Cross-lingual ProtoBias", href: "/research/cross-lingual-protobias",
    row: "VLM evaluation, single-author course project, about 12,600 judgments",
    context: "Single-author course project", when: "May – Aug. 2026",
    note: "Evaluated two VLM families on fixed image pairs across seven prompt languages (about 12,600 judgments); single-author report with code.",
    links: [{ label: "report", href: "https://xchuan-li.github.io/research/cross-lingual-protobias" }, { label: "code", href: "https://github.com/xchuan-li/cross_lingual_protobias" }],
  },
  streetView: {
    id: "streetView", title: "Street-view country classification", href: "/research/street-view-classification",
    row: "team course project, Deep Learning; my part: CNN training and analysis",
    context: "Team course project, Deep Learning", when: "May – Jul. 2026",
    note: "My part: CNN training, ablations, and performance analysis.",
  },
};

// 12 Oct 2026 (XC): two sections — Research (the trunk) and Other research and course projects.
// No "Writing samples" category (the manuscripts are writing samples too); Three Ways is off the CV.
// 12 Oct 2026: dates are months (XC: no "Summer"/"Winter"). Verified: B.A. (CHSI), Marburg end (DSH
// certificate), typicality (LingBuzz), modified nouns (project opened), ProtoBias end (paper date).
// XC asked for estimates elsewhere: Marburg start, moral framing, thesis start, ProtoBias start,
// street view, fact-checking, undergraduate thesis are semester-based estimates.
export const researchOrder: Record<Variant, { current: string[]; earlier: string[] }> = {
  general: { current: ["lit", "modifiers", "thesis"], earlier: ["typicality", "protobias", "streetView", "psy", "undergraduate"] },
  lm:      { current: ["lit", "modifiers", "thesis"], earlier: ["protobias", "streetView", "typicality", "psy", "undergraduate"] },
  cogsci:  { current: ["lit", "modifiers", "thesis"], earlier: ["typicality", "psy", "protobias", "undergraduate"] },
};
export const researchEntry = (id: string) => research[id];

// Research entries are independent projects; unpublished projects remain off all variants.
export const employment: (Entry & { place: string; variants?: Variant[] })[] = [
  {
    id: "it", title: "University of Technology Nuremberg", place: "Nuremberg, Germany",
    context: "IT Service Desk (part-time)", when: "Apr. 2026 – present",
    note: "Delivered student IT onboarding and individual support; handled system installation, service reporting, and inventory.",
  },
  {
    id: "dyslexia", title: "Shenzhen Learning Disorders Association", place: "Shenzhen, China",
    context: "Internship · Learning assessment at Yucai No. 2 Primary School", when: "Sep. – Dec. 2021",
    note: "Prepared character-reading materials, administered timed assessments, and analysed response data to support the assessment of learning difficulties; contributed to teaching items and individual learning plans.",
    variants: ["general", "cogsci"],
  },
];

// 12 Oct 2026: grouped by the steps of the work; the "working proficiency" qualifier on interpretability is dropped (XC reports the B4 analyses biweekly and can explain every step).
export const skills: Record<Variant, { k: string; v: string }[]> = {
  general: [
    { k: "Language models", v: "Controlled behavioural evaluation, minimal pairs; activation patching, low-rank analysis, probing, steering" },
    { k: "Human data", v: "Experimental design, PsychoPy/Pavlovia, JASP; testing children" },
    { k: "Programming", v: "Python (PyTorch, Hugging Face Transformers, pandas, scikit-learn), Git, LaTeX, Slurm on an HPC cluster" },
  ],
  lm: [
    { k: "Language models", v: "Activation patching, low-rank analysis, probing, steering, LoRA; controlled behavioural evaluation, minimal pairs" },
    { k: "Programming", v: "Python (PyTorch, Hugging Face Transformers, pandas, scikit-learn), Git, LaTeX, Slurm on an HPC cluster" },
    { k: "Human data", v: "Experimental design, PsychoPy/Pavlovia, JASP" },
  ],
  cogsci: [
    { k: "Language models", v: "Controlled behavioural evaluation, minimal pairs; activation patching, low-rank analysis, probing" },
    { k: "Human data", v: "Between-subjects designs, controlled stimuli, PsychoPy/Pavlovia, JASP; testing children" },
    { k: "Programming", v: "Python (pandas, PyTorch, Hugging Face Transformers), Git, LaTeX" },
  ],
};

export const languages = "Mandarin Chinese (native), German (C1), English (C1), Japanese (learning)";
