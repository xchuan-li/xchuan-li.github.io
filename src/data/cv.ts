// One source for the CV and its two application variants (XC, 28 September 2026).
// general = /cv (linked, and the PDF on the site); lm and cogsci are unlinked,
// noindex pages printed to PDF for applications. Variants change order, emphasis
// and omissions only — never what an entry says it is.
// Facts: psychology study per Vault A2u1 (design = group of three, adopted by class
// vote; analysis = XC); IT job wording per Vault A3x1 §6 (confirmed 27 Sep 2026).

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
  title: string;
  href?: string;
  context: string;          // italic line: what it is / where
  when: string;             // right-aligned
  note?: ByVariant<string>; // at most one short line
  links?: { label: string; href: string }[];
}

export const interests: Record<Variant, string> = {
  general: "Formal and experimental semantics, psycholinguistics, language models. Current focus: epistemic modality.",
  lm: "Language models: evaluation, interpretability, and controlled training. Current focus: epistemic modality.",
  cogsci: "Semantics and pragmatics, psycholinguistics, language development. Current focus: epistemic modality.",
};

export const education: (Entry & { place: string })[] = [
  {
    id: "msc", title: "University of Technology Nuremberg", place: "Nuremberg, Germany",
    context: "M.Sc. Human and Artificial Intelligence", when: "Oct. 2025 – exp. 2027",
    note: {
      general: "Coursework: cognitive psychology, experimental design and statistics, interpretability, deep learning.",
      lm: "Coursework: deep learning, interpretability, experimental design and statistics.",
      cogsci: "Coursework: cognitive psychology, experimental design and statistics (both 1.0), epistemology.",
    },
  },
  {
    id: "marburg", title: "University of Marburg", place: "Marburg, Germany",
    context: "Preparatory studies: German for graduate study", when: "2024 – 2025",
  },
  {
    id: "ba", title: "Shenzhen University", place: "Shenzhen, China",
    context: "B.A. Philosophy", when: "2020 – 2024",
    note: {
      default: "Thesis: Leibniz’s characteristica universalis (supervisor: Zang Yong).",
      cogsci: "Thesis: Leibniz’s characteristica universalis (supervisor: Zang Yong). Coursework in logic and philosophy of language.",
    },
  },
];

const research: Record<string, Entry> = {
  threeWays: {
    id: "threeWays", title: "Three Ways of Leaving p Unsettled", href: "/research/three-ways",
    context: "Formal semantics and pragmatics · analysis in development", when: "2026 –",
    note: "Compares might p, might p or might not p, and I don’t know whether p by the replies each licenses.",
  },
  thesis: {
    id: "thesis", title: "Modal language in preschool children", href: "/research/learnability",
    context: "M.Sc. thesis · in planning", when: "2026 –",
    note: "A small study run alongside an existing study of how preschool children reason about possibilities.",
  },
  modalLM: {
    id: "modalLM", title: "Modal expressions in language models", href: "/research/modal-language-models",
    context: "Language-model study · in development", when: "2026 –",
    note: {
      default: "Diagnostics of how models treat ruled-out possibilities; a cognitive account and internal tests are planned.",
      cogsci: "A simple cognitive account of modal reasoning, to be tested against language-model behaviour.",
    },
  },
  psy: {
    id: "psy", title: "Fact-checking after ChatGPT exposure",
    context: "Course study, Foundations in Psychology and Empirical Study Design", when: "Winter 2025–26",
    note: {
      default: "Between-subjects experiment (N = 49), group-designed and adopted for the class-wide study; my part: data analysis.",
      cogsci: "Between-subjects experiment designed in a group of three and adopted for the class-wide study; PsychoPy/Pavlovia, pilot N = 8, N = 49; my part: data analysis (JASP).",
    },
  },
  protobias: {
    id: "protobias", title: "Cross-lingual ProtoBias", href: "/research/cross-lingual-protobias",
    context: "Single-author course project", when: "Summer 2026",
    note: "Evaluation of two VLM families across seven prompt languages, about 12,600 judgments.",
    links: [{ label: "report", href: "https://xchuan-li.github.io/research/cross-lingual-protobias" }, { label: "code", href: "https://github.com/xchuan-li/cross_lingual_protobias" }],
  },
  streetView: {
    id: "streetView", title: "Street-view country classification", href: "/research/street-view-classification",
    context: "Team course project, Deep Learning", when: "Summer 2026",
    note: "My part: CNN training, ablations, and performance analysis.",
  },
};

export const researchOrder: Record<Variant, { current: string[]; earlier: string[] }> = {
  general: { current: ["threeWays", "thesis", "modalLM"], earlier: ["psy", "protobias", "streetView"] },
  lm:      { current: ["modalLM", "threeWays", "thesis"], earlier: ["protobias", "streetView", "psy"] },
  cogsci:  { current: ["threeWays", "thesis", "modalLM"], earlier: ["psy", "protobias"] },
};
export const researchEntry = (id: string) => research[id];

export interface Paper { id: string; html: string; }
const papers: Record<string, Paper> = {
  typicality: { id: "typicality", html: '<b>Li, X.</b> (2026). Typicality in referent choice: What the description leaves open. Working paper. <a href="https://lingbuzz.net/lingbuzz/010343">lingbuzz/010343</a>, <a href="https://doi.org/10.5281/zenodo.22855036">doi:10.5281/zenodo.22855036</a>' },
  lcs: { id: "lcs", html: 'Prompt framing and latent control states in language models. Manuscript in preparation, with collaborators at DFKI.' },
};
export const paperOrder: Record<Variant, string[]> = {
  general: ["typicality", "lcs"], lm: ["lcs", "typicality"], cogsci: ["typicality", "lcs"],
};
export const paper = (id: string) => papers[id];

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
