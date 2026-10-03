// One source for the CV and its two application variants (XC, 28 September 2026).
// general = /cv (linked, and the PDF on the site); lm and cogsci are unlinked,
// noindex pages printed to PDF for applications. Variants change order, emphasis
// and omissions only — never what an entry says it is.
// Facts: psychology study per Vault A2u1 (design = group of three, adopted by class
// vote; analysis = XC); IT job wording per Vault A3x1 §6 (confirmed 27 Sep 2026).
// Learning-difficulties project per XC’s old CV (1 Oct 2026): autumn 2021,
// test items, response data and individual plans. Included in general and cogsci;
// omitted only from the focused lm variant. Original data no longer survives.

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

export const interests: Record<Variant, string> = {
  general: "Computational cognitive science and language model interpretability. Research interests: language, reasoning, and human and artificial cognition.",
  lm: "Language model interpretability and computational cognitive science. Research interests: language, reasoning, and human and artificial cognition.",
  cogsci: "Computational cognitive science, language development, and interpretability. Research interests: language, reasoning, and human and artificial cognition.",
};

export const education: (Entry & { place: string })[] = [
  {
    id: "msc", title: "University of Technology Nuremberg", place: "Nuremberg, Germany",
    context: "M.Sc. Human and Artificial Intelligence", when: "Oct. 2025 – exp. 2027",
    note: {
      general: "Selected coursework: Cognitive Psychology; Foundations in Psychology & Empirical Study Design; Deep Learning; Interpretability for Natural Language Processing.",
      lm: "Selected coursework: Deep Learning; Interpretability for Natural Language Processing; Deep Learning for Digital Humanities; Foundations in Psychology & Empirical Study Design.",
      cogsci: "Selected coursework: Cognitive Psychology (1.0); Foundations in Psychology & Empirical Study Design (1.0); Epistemology; Deep Learning.",
    },
  },
  {
    id: "marburg", title: "University of Marburg", place: "Marburg, Germany",
    context: "Preparatory studies: German for graduate study", when: "2024 – 2025",
  },
  {
    id: "ba", title: "Shenzhen University", place: "Shenzhen, China",
    context: "B.A. Philosophy", when: "2020 – 2024",
    note: "Selected coursework: Logic; Mathematical Logic; Analytic Philosophy; Psychology of Reading; Cognition and Learning Disabilities.",
  },
];

const research: Record<string, Entry> = {
  typicality: {
    id: "typicality", title: "Typicality in referent choice: what the description leaves open",
    href: "/research/typicality-in-referent-choice",
    context: "Independent theoretical study", when: "2026",
    note: "Distinguishes three conditions for typicality in referent choice and the limits of what a forced-choice task can establish.",
    citation: "Li, X. (2026). Working paper.",
    links: [{ label: "lingbuzz/010343", href: "https://lingbuzz.net/lingbuzz/010343" }, { label: "doi:10.5281/zenodo.22855036", href: "https://doi.org/10.5281/zenodo.22855036" }],
  },
  undergraduate: {
    id: "undergraduate", title: "Leibniz’s logical system and characteristica universalis",
    context: "Undergraduate thesis · Shenzhen University · supervisor: Zang Yong", when: "2024",
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
    row: 'modal language in preschool children, alongside a possibilities study at MPI CBS Leipzig; supervised by C. Grosse Wiesmann (UTN), with T. Hopf (MPI CBS).',
    context: "M.Sc. thesis · with C. Grosse Wiesmann (UTN) and T. Hopf (MPI CBS Leipzig)", when: "2026 –",
    note: "Adds a developmental modal-language component to an ongoing PhD project at MPI CBS Leipzig on how preschool children reason about possibilities.",
  },
  lit: {
    id: "lit", title: "Moral framing and dilemma choices in language models",
    href: "/research/latent-control-states",
    row: "year-long project course with M. Roth (UTN) and S. Ostermann (DFKI); causal interventions in 7B–14B models, utilitarian-framing branch",
    context: "Year-long project course · with M. Roth (UTN) and S. Ostermann (DFKI)",
    when: "2026–27",
    note: "Designed and ran the controlled experiments and causal interventions for the utilitarian-framing branch; manuscript in preparation.",
  },
  dyslexia: {
    id: "dyslexia", title: "Learning difficulties in primary-school children",
    row: "with the Shenzhen Learning Disorders Association: test items, response data, individual plans",
    context: "Invited research project · Shenzhen Learning Disorders Association and Yucai No. 2 Primary School", when: "Sep.–Dec. 2021",
    note: "Prepared character-reading materials and administered timed tests; analysed response data to identify learning difficulties and helped design teaching items and individual learning plans.",
  },
  psy: {
    id: "psy", title: "Fact-checking after ChatGPT exposure", href: "/research/fact-checking-study",
    row: "human study, class-wide experiment (N = 49, 47 analysed); my part: data analysis",
    context: "Course study, Foundations in Psychology and Empirical Study Design", when: "Winter 2025–26",
    note: {
      default: "Between-subjects experiment (N = 49, 47 analysed), group-designed and adopted for the class-wide study; my part: data analysis.",
      cogsci: "Between-subjects experiment designed in a group of three and adopted for the class-wide study; PsychoPy/Pavlovia, pilot N = 8; N = 49, 47 analysed; my part: data analysis (JASP).",
    },
  },
  protobias: {
    id: "protobias", title: "Cross-lingual ProtoBias", href: "/research/cross-lingual-protobias",
    row: "VLM evaluation, single-author course project, about 12,600 judgments",
    context: "Single-author course project", when: "Summer 2026",
    note: "Evaluation of two VLM families across seven prompt languages, about 12,600 judgments.",
    links: [{ label: "report", href: "https://xchuan-li.github.io/research/cross-lingual-protobias" }, { label: "code", href: "https://github.com/xchuan-li/cross_lingual_protobias" }],
  },
  streetView: {
    id: "streetView", title: "Street-view country classification", href: "/research/street-view-classification",
    row: "team course project, Deep Learning; my part: CNN training and analysis",
    context: "Team course project, Deep Learning", when: "Summer 2026",
    note: "My part: CNN training, ablations, and performance analysis.",
  },
};

export const researchOrder: Record<Variant, { current: string[]; earlier: string[] }> = {
  general: { current: ["thesis", "lit"], earlier: ["threeWays", "typicality", "protobias", "streetView", "psy", "undergraduate", "dyslexia"] },
  lm:      { current: ["lit", "thesis"], earlier: ["threeWays", "protobias", "typicality", "streetView", "psy", "undergraduate"] },
  cogsci:  { current: ["thesis", "lit"], earlier: ["threeWays", "typicality", "protobias", "psy", "undergraduate", "dyslexia"] },
};
export const researchEntry = (id: string) => research[id];

// Research entries are independent projects; unpublished projects remain off all variants.
export const employment: (Entry & { place: string })[] = [
  {
    id: "it", title: "University of Technology Nuremberg", place: "Nuremberg, Germany",
    context: "IT Service Desk (part-time)", when: "Apr. 2026 – present",
    note: "Designed and delivered IT onboarding training for incoming students, with follow-up one-to-one support; also system installation, service reporting, and inventory.",
  },
];

export const skills: Record<Variant, { k: string; v: string }[]> = {
  general: [
    { k: "Programming", v: "Python (PyTorch, Hugging Face Transformers, pandas, scikit-learn), Git, LaTeX" },
    { k: "Methods", v: "PsychoPy/Pavlovia, JASP; probing, activation patching, steering (working proficiency)" },
  ],
  lm: [
    { k: "Programming", v: "Python (PyTorch, Hugging Face Transformers, pandas, scikit-learn), Git, LaTeX, Slurm on an HPC cluster" },
    { k: "Methods", v: "Probing, activation patching, steering, LoRA; minimal-pair evaluation (working proficiency)" },
  ],
  cogsci: [
    { k: "Experiments", v: "Between-subjects designs, PsychoPy/Pavlovia, JASP; controlled stimuli and minimal pairs" },
    { k: "Programming", v: "Python (pandas, PyTorch, Hugging Face Transformers), Git, LaTeX" },
  ],
};

export const languages = "Mandarin Chinese (native), German (C1), English (C1), Japanese (learning)";
