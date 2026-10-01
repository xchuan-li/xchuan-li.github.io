// One source for the CV and its two application variants (XC, 28 September 2026).
// general = /cv (linked, and the PDF on the site); lm and cogsci are unlinked,
// noindex pages printed to PDF for applications. Variants change order, emphasis
// and omissions only — never what an entry says it is.
// Facts: psychology study per Vault A2u1 (design = group of three, adopted by class
// vote; analysis = XC); IT job wording per Vault A3x1 §6 (confirmed 27 Sep 2026).
// Dyslexia screening per Vault C0 (XC, 1 Oct 2026): memory is vague and no documents
// survive, so the entry claims only the collaboration; cogsci only (off-topic for lm,
// and general keeps its course projects).

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
  links?: { label: string; href: string }[];
}

export const interests: Record<Variant, string> = {
  general: "Computational cognitive science and language model interpretability. Current focus: epistemic modality.",
  lm: "Language model interpretability and computational cognitive science. Current focus: epistemic modality.",
  cogsci: "Computational cognitive science, language development, and interpretability. Current focus: epistemic modality.",
};

export const education: (Entry & { place: string })[] = [
  {
    id: "msc", title: "University of Technology Nuremberg", place: "Nuremberg, Germany",
    context: "M.Sc. Human and Artificial Intelligence", when: "Oct. 2025 – exp. 2027",
    note: {
      general: "Thesis in progress: modal language in preschool children (supervisor: Charlotte Grosse Wiesmann). Coursework: cognitive psychology, experimental design and statistics, interpretability, deep learning.",
      lm: "Thesis in progress: modal language in preschool children (supervisor: Charlotte Grosse Wiesmann). Coursework: deep learning, interpretability, experimental design and statistics.",
      cogsci: "Thesis in progress: modal language in preschool children (supervisor: Charlotte Grosse Wiesmann). Coursework: cognitive psychology, experimental design and statistics (both 1.0), epistemology.",
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
    method: "Formal analysis", status: "In development.",
    row: 'compares <i>might p</i>, <i>might p or might not p</i> and <i>I don’t know whether p</i> by the replies each licenses.',
    context: "Formal semantics and pragmatics · analysis in development", when: "2026 –",
    note: "Compares might p, might p or might not p, and I don’t know whether p by the replies each licenses.",
  },
  thesis: {
    id: "thesis", title: "Modal language in preschool children", href: "/research/learnability",
    method: "Human study", status: "In planning.",
    row: 'modal language in preschool children, added to an ongoing PhD project at MPI CBS Leipzig on how they reason about possibilities.',
    context: "M.Sc. thesis · with C. Grosse Wiesmann (UTN) and T. Hopf (MPI CBS Leipzig)", when: "2026 –",
    note: "Adds a developmental modal-language component to an ongoing PhD project at MPI CBS Leipzig on how preschool children reason about possibilities.",
  },
  modalLM: {
    id: "modalLM", title: "What decides between must and might", href: "/research/modal-language-models",
    method: "Computational model", status: "In development.",
    row: "fits three competing accounts of the choice between <i>must</i> and <i>might</i> to published human data.",
    context: "Computational model \u00b7 in development", when: "2026 \u2013",
    note: "Three accounts of how evidence strength and evidence source decide between must and might, fitted and compared on published human data.",
  },
  lit: {
    id: "lit", title: "Prompt framing and latent control states in language models",
    href: "/research/latent-control-states",
    row: "year-long project course with M. Roth (UTN) and S. Ostermann (DFKI); causal interventions in 7B–14B models, utilitarian-framing branch",
    context: "Year-long project course · with M. Roth (UTN) and S. Ostermann (DFKI), biweekly meetings",
    when: "2026–27",
    note: "Designed and ran the controlled experiments and causal interventions for the utilitarian-framing branch; manuscript in preparation.",
  },
  dyslexia: {
    id: "dyslexia", title: "Reading-difficulty screening in primary-school children",
    row: "human study with the Shenzhen Learning Disorders Association",
    context: "Research project, invited, with the Shenzhen Learning Disorders Association", when: "Spring 2022",
    note: "Helped select homophone-character stimuli and administered a reaction-time task to children at a primary school.",
  },
  psy: {
    id: "psy", title: "Fact-checking after ChatGPT exposure",
    row: "human study, class-wide experiment (N = 49); my part: data analysis",
    context: "Course study, Foundations in Psychology and Empirical Study Design", when: "Winter 2025–26",
    note: {
      default: "Between-subjects experiment (N = 49), group-designed and adopted for the class-wide study; my part: data analysis.",
      cogsci: "Between-subjects experiment designed in a group of three and adopted for the class-wide study; PsychoPy/Pavlovia, pilot N = 8, N = 49; my part: data analysis (JASP).",
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
  general: { current: ["threeWays", "thesis", "modalLM"], earlier: ["lit", "psy", "protobias", "streetView"] },
  lm:      { current: ["modalLM", "threeWays", "thesis"], earlier: ["lit", "protobias", "streetView", "psy"] },
  cogsci:  { current: ["threeWays", "thesis", "modalLM"], earlier: ["lit", "dyslexia", "psy", "protobias"] },
};
export const researchEntry = (id: string) => research[id];

// Research is drawn as one programme (one question, three methods) plus a compact list of
// earlier work, so the page reads as one line of research rather than six parallel items
// (XC, 1 Oct 2026, after comparing Hening Wang's and Polina Tsvilodub's pages).
// Question line confirmed by XC, 1 Oct 2026.
export const programme = {
  title: "Epistemic modality in people and language models",
  when: "2026 –",
  question: "Current focus · how modal expressions are understood and used, by people and by language models",
};
// Link text for each programme row (the rest of the line comes from `row`).
export const programmeLabel: Record<string, string> = {
  threeWays: "Three Ways of Leaving p Unsettled",
  thesis: "M.Sc. thesis",
  modalLM: "Modal choice",
};
export const compactWhen: Record<string, string> = {
  lit: "2026–27", dyslexia: "2022", psy: "2025–26", protobias: "2026", streetView: "2026",
};

export interface Paper { id: string; html: string; }
const papers: Record<string, Paper> = {
  typicality: { id: "typicality", html: '<b>Li, X.</b> (2026). Typicality in referent choice: What the description leaves open. Working paper. <a href="https://lingbuzz.net/lingbuzz/010343">lingbuzz/010343</a>, <a href="https://doi.org/10.5281/zenodo.22855036">doi:10.5281/zenodo.22855036</a>' },
  lcs: { id: "lcs", html: 'Prompt framing and latent control states in language models. Manuscript in preparation with M. Roth (UTN) and S. Ostermann (DFKI).' },
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
