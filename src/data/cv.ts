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

export type Variant = "general" | "lm" | "cogsci" | "training";
type ByVariant<T> = T | Partial<Record<Variant, T>> & { default?: T };

export function pick<T>(v: ByVariant<T> | undefined, variant: Variant): T | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v === "object" && !Array.isArray(v) && ("default" in v || "general" in v || "lm" in v || "cogsci" in v || "training" in v)) {
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
// 3 Nov 2026 (XC): general opening is XC's own research-interests line, as in the application PDF.
export const interests: Record<Variant, string> = {
  // 5 Nov 2026 (XC): the focus is turning linguistics and cognitive-science questions into LM measurements.
  general: "I study language and cognition, especially how the structure of language shapes learning and thought. I turn questions from linguistics and cognitive science into measurements on language models, where the input can be controlled and the internals can be changed.",
  lm: `${opening} Methods: training language models from scratch under controlled input; controlled behavioural evaluation; activation patching, low-rank analysis, probing.`,
  cogsci: `${opening} Experience with how human data are produced, from children’s language to adult behavioural experiments.`,
  // 3 Nov 2026: training variant for Micha Heilbron (MPI Nijmegen), who asked for a CV for a possible position needing a language-model training background.
  training: `${opening} Methods: training language models from scratch under controlled input, from small transformers and LSTMs to fine-tuning a pretrained model, on a Slurm GPU cluster; controlled behavioural evaluation; activation patching, low-rank analysis, probing.`,
};

// 12 Oct 2026 (XC): education notes state what each stage trained, not selected coursework;
// Marburg is listed as German for graduate study; 5 Nov 2026 (XC): name the DSH-2 result here.
export const education: (Entry & { place: string })[] = [
  {
    id: "msc", title: "University of Technology Nuremberg", place: "Nuremberg, Germany",
    context: "M.Sc. Human and Artificial Intelligence", when: "Oct. 2025 – exp. 2027",
    note: {
      general: "Coursework: deep learning, interpretability of language models, psychology and empirical study design, cognitive neuroscience.",
      lm: "Interpretability methods for language models; training neural networks; designing and analysing behavioural experiments; cognitive psychology.",
      cogsci: "Designing and analysing behavioural experiments; cognitive psychology and cognitive neuroscience; training neural networks; interpretability methods for language models.",
      training: "Training neural networks; interpretability methods for language models; designing and analysing behavioural experiments; cognitive psychology.",
    },
  },
  {
    id: "marburg", title: "University of Marburg", place: "Marburg, Germany",
    context: "German for graduate study; DSH-2 (C1 level)", when: "Oct. 2024 – Jul. 2025",
  },
  {
    id: "ba", title: "Shenzhen University", place: "Shenzhen, China",
    context: "B.A. Philosophy", when: "Sep. 2020 – Jun. 2024",
    note: {
      default: "Formal logic and proof, including modal logic and Gödel’s incompleteness theorems; philosophy of language; psychology of reading.",
      general: "Coursework: formal and modal logic, philosophy of language.",
    },
  },
];

const research: Record<string, Entry> = {
  // 3 Nov 2026 (XC): the general CV follows the application PDF of that day (one Research experience
  // list, language-model work first, then human studies); these entries are general-only so the
  // lm / cogsci / training variants keep their wording.
  // 5 Nov 2026 (XC): each entry says how the question became an experiment, then method keywords; no findings. StemmaLM has its own section.
  gVagueness: {
    id: "gVagueness", title: "The direction of disagreement: what departures from the majority term teach a text-only learner", href: "/research/vagueness-scale",
    context: "Independent project", when: "Oct. 2026 – present",
    note: "Turned vagueness into a learning experiment: models read only naming sentences, with speakers’ disagreement kept or randomly replaced, and are tested on whether they recover the order of categories.<br /><i>Methods:</i> formal proof, transformers and LSTMs trained from scratch, fine-tuning, World Color Survey.",
  },
  gLit: {
    id: "gLit", title: "Moral framing and dilemma choices in language models", href: "/research/latent-control-states",
    context: "Project with the German Research Center for Artificial Intelligence (DFKI)", when: "Apr. – Nov. 2026",
    note: "Led the utilitarian-framing branch: turned moral decisions into minimal pairs to measure how framing shifts language-model choices. Manuscript in preparation.<br /><i>Methods:</i> probing, activation patching, low-rank analysis, steering.",
  },
  gThesis: {
    id: "gThesis", title: "Modal language development in preschoolers", href: "/research/learnability",
    context: "M.Sc. thesis, Max Planck Institute for Human Cognitive and Brain Sciences", when: "Sep. 2026 – present",
    note: "Behavioural study of how preschoolers acquire modal words such as <i>might</i> and <i>must</i>. In design.",
  },
  gPsy: {
    id: "gPsy", title: "How the first information source shapes verification: a between-subjects experiment", href: "/research/fact-checking-study",
    context: "Small-scale psychology experiment", when: "Feb. 2026",
    note: "<i>Methods:</i> between-subjects design, Pavlovia (49 participants, 47 analysed), JASP.",
  },
  gBa: {
    id: "gBa", title: "Leibniz’s logical system and characteristica universalis",
    context: "B.A. thesis, Shenzhen University", when: "May 2024",
    note: "Leibniz’s logic and his proposal for a universal symbolic language in which reasoning becomes calculation.",
  },
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
    id: "modifiers", title: "Feature dependency and property answers for modified nouns in language models",
    href: "/research/modified-nouns",
    context: "Independent project", when: "Sep. 2026 –",
    note: "Contrasted properties that depend on an added feature with properties that only co-occur with it (13 feature groups, 477 items, three instruction-tuned models), using predictors fixed outside the models: a dependency table, human feature norms and word-association norms; exploratory activation patching. Manuscript in preparation.",
  },
  vagueness: {
    id: "vagueness", title: "The direction of disagreement: what departures from the majority term teach a text-only learner",
    href: "/research/vagueness-scale",
    context: "Independent project", when: "Oct. 2026 –",
    note: {
      default: "A proposition on when speakers’ disagreement about word boundaries, a small cost to a listener, gives a text-only learner evidence about the scale, tested with language models trained from scratch on naming text (artificial language; World Color Survey). Preprint.",
      training: "Trained language models only on naming text, from small transformers and LSTMs trained from scratch to a fine-tuned pretrained model, to test when speakers’ disagreement about word boundaries gives a text-only learner evidence about the scale (artificial language with a known scale; World Color Survey). Success criteria fixed before the confirmatory runs; each confirmed result re-implemented independently from the written specification. Preprint.",
    },
    links: [{ label: "lingbuzz/010504", href: "https://lingbuzz.net/lingbuzz/010504" }, { label: "doi:10.5281/zenodo.23677586", href: "https://doi.org/10.5281/zenodo.23677586" }],
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
// 26 Oct 2026 (XC): B18 preprint on Zenodo; the entry links its concept DOI.
// 18 Oct 2026 (XC): B18 (vagueness) added after modified nouns; B5 retitled to match the 18 Oct manuscript wording (no "updating"); training added to methods and skills.
export const researchOrder: Record<Variant, { current: string[]; earlier: string[] }> = {
  general: { current: ["gVagueness", "gThesis", "gLit", "gPsy", "gBa"], earlier: [] },
  lm:      { current: ["lit", "modifiers", "vagueness", "thesis"], earlier: ["protobias", "streetView", "typicality", "psy", "undergraduate"] },
  cogsci:  { current: ["lit", "modifiers", "vagueness", "thesis"], earlier: ["typicality", "psy", "protobias", "undergraduate"] },
  training: { current: ["vagueness", "lit", "typicality", "thesis"], earlier: ["protobias", "streetView"] },
};
export const researchEntry = (id: string) => research[id];

// 3 Nov 2026: a Preprints section, shown only where listed.
export const preprints: Partial<Record<Variant, string[]>> = {
  general: ['Li, X. (2026). <i>The direction of disagreement: What departures from the majority term teach a text-only learner</i> [Preprint]. LingBuzz, lingbuzz/010504. <a href="https://lingbuzz.net/lingbuzz/010504">https://lingbuzz.net/lingbuzz/010504</a>'],
};

// 5 Nov 2026 (XC): StemmaLM is long-term infrastructure, listed apart from research. Add "Used in" once a paper uses it.
export const infrastructure: Partial<Record<Variant, Entry[]>> = {
  general: [{
    id: "stemma", title: "StemmaLM", href: "https://stemmalm.github.io",
    context: "Long-term infrastructure for language-model lineages", when: "", // 5 Nov 2026 (XC): no date; aligned with Preprints
    note: "Turned questions about language development and transmission into model lineages raised on child-scale corpora and controlled variants: 60+ models, up to 98M parameters, public registry.<br /><i>Methods:</i> training from scratch, minimal-pair evaluation, Slurm on an HPC GPU cluster.",
    links: [{ label: "stemmalm.github.io", href: "https://stemmalm.github.io" }],
  }],
};

// Research entries are independent projects; unpublished projects remain off all variants.
export const employment: (Entry & { place: string; variants?: Variant[] })[] = [
  {
    id: "it", title: "University of Technology Nuremberg", place: "Nuremberg, Germany",
    context: "IT Service Desk (part-time)", when: "Apr. 2026 – present",
    note: {
      default: "Delivered student IT onboarding and individual support; handled system installation, service reporting, and inventory.",
      general: "Student IT support; basic HPC user administration (resource allocation, access rights).",
    },
  },
  {
    id: "dyslexia", title: "Shenzhen Learning Disorders Association", place: "Shenzhen, China",
    context: "Internship · Learning assessment at Yucai No. 2 Primary School", when: "Sep. – Dec. 2021",
    note: {
      default: "Prepared character-reading materials, administered timed assessments, and analysed response data to support the assessment of learning difficulties; contributed to teaching items and individual learning plans.",
      general: "Ran reading assessments with primary-school children referred for learning difficulties.",
    },
    variants: ["general", "cogsci"],
  },
];

// 12 Oct 2026: grouped by the steps of the work; the "working proficiency" qualifier on interpretability is dropped (XC reports the B4 analyses biweekly and can explain every step).
export const skills: Record<Variant, { k: string; v: string }[]> = {
  general: [
    { k: "Human data", v: "Experimental design, PsychoPy/Pavlovia, JASP" },
    { k: "Evaluation", v: "Controlled behavioural evaluation, minimal pairs" },
    { k: "Training", v: "Small transformers and LSTMs trained from scratch; fine-tuning" },
    { k: "Interpretability", v: "Activation patching, low-rank analysis, probing, steering" },
    { k: "Tools", v: "Python (PyTorch, Hugging Face Transformers, pandas, scikit-learn), Git, LaTeX, Slurm on an HPC GPU cluster" },
  ],
  lm: [
    { k: "Language models", v: "Training small models from scratch, fine-tuning, LoRA; activation patching, low-rank analysis, probing, steering; controlled behavioural evaluation, minimal pairs" },
    { k: "Programming", v: "Python (PyTorch, Hugging Face Transformers, pandas, scikit-learn), Git, LaTeX, Slurm on an HPC cluster" },
    { k: "Human data", v: "Experimental design, PsychoPy/Pavlovia, JASP" },
  ],
  training: [
    { k: "Training", v: "Small transformers and LSTMs trained from scratch; fine-tuning, LoRA; CNN training and ablations" },
    { k: "Analysis", v: "Activation patching, low-rank analysis, probing, steering; controlled behavioural evaluation, minimal pairs" },
    { k: "Programming", v: "Python (PyTorch, Hugging Face Transformers, pandas, scikit-learn), Git, LaTeX, Slurm on an HPC GPU cluster" },
    { k: "Human data", v: "Experimental design, PsychoPy/Pavlovia, JASP" },
  ],
  cogsci: [
    { k: "Language models", v: "Training small models from scratch; controlled behavioural evaluation, minimal pairs; activation patching, low-rank analysis, probing" },
    { k: "Human data", v: "Between-subjects designs, controlled stimuli, PsychoPy/Pavlovia, JASP; testing children" },
    { k: "Programming", v: "Python (pandas, PyTorch, Hugging Face Transformers), Git, LaTeX" },
  ],
};

export const languages = "Mandarin Chinese (native), German (C1), English (C1), Japanese (learning)";
