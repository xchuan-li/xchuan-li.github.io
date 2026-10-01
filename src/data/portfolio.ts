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
  figure?: { src: string; mobileSrc?: string; alt: string; caption: string; width: number; height: number };
  note?: { label: string; text: string };
  /** Papers list: meta line, one sentence, writing-sample flag, first-page thumbnail. */
  kind?: string;
  short?: string;
  sample?: boolean;
  thumb?: string;
  /** Papers list: which tab the entry sits under, and the topic label shown on it. */
  track?: PaperTrack;
  topic?: string;
  /** How much weight the item carries: own research, writing samples, or coursework. */
  tier?: "research" | "writing" | "course";
}
export type PaperTrack = "langcog" | "lm";
/** Tab label (short), then the full heading and its subtitle shown above the open list. */
export const paperTracks: { id: PaperTrack; label: string; title: string; sub: string }[] = [
  { id: "langcog", label: "Language & cognition", title: "Language and cognition", sub: "Computational models, behavioural evidence, and the analyses behind them" },
  { id: "lm", label: "Language models", title: "Language models: behaviour and mechanisms", sub: "Controlled experiments and mechanistic tests" },
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
    blurb: "",
    entries: [
      {
        tier: "research", track: "langcog", topic: "Computational model",
        title: projects.modalModels.title,
        field: "Cognitive modelling", desc: projects.modalModels.summary, status: projects.modalModels.status,
        kind: "Project · in development",
        short: "Fits three competing accounts to published human data to ask whether the indirectness of must is semantic or arises from competition with the bare assertion.",
        figure: {"src": "/images/research/modal-accounts.svg", "alt": "Planned comparison: published human choices inform three competing accounts, evaluated with recovery and held-out predictions.", "caption": "Planned model comparison. The three accounts will be tested on published human choices; no model has been fitted yet.", "width": 760, "height": 260},
        links: [{ label: "Project outline", href: projects.modalModels.href }],
      },
      {
        tier: "research", track: "langcog", topic: "Behavioural experiment",
        title: projects.thesis.title,
        field: "Human study", desc: projects.thesis.summary, status: projects.thesis.status,
        kind: "Project · master’s thesis · in planning, no data yet",
        short: "A small study run alongside an existing study of how preschoolers reason about possibilities.",
        figure: {"src": "/images/research/preschool-association.svg", "alt": "A planned modal-language task and an existing possibilities-reasoning task, connected by a question about association.", "caption": "Study in planning. Compare language understanding with reasoning about possibilities; an association would not establish causal direction.", "width": 760, "height": 230},
        links: [{ label: "Thesis outline", href: projects.thesis.href }],
      },
      {
        tier: "research", track: "lm", topic: "Mechanistic interpretability",
        title: "Prompt framing and latent control states in language models",
        field: "Mechanistic interpretability", desc: projects.latentControl.summary, status: projects.latentControl.status,
        kind: "Year-long project course, 2026–27 · with M. Roth (UTN) and S. Ostermann (DFKI) · manuscript in preparation",
        short: "How prompt framing changes model choices in dilemmas, examined with residual-stream interventions and low-rank analysis.",
        figure: {"src": "/images/research/framing-carry.svg", "mobileSrc": "/images/research/framing-carry-mobile.svg", "alt": "Qwen2.5-7B patching heatmap across 28 layers and seven token positions. Strong carry is concentrated at the last slogan word in earlier layers and at the decision position in later layers; prefix controls stay at zero.", "caption": "Same-item activation patching in Qwen2.5-7B: 16 items × 2 answer orders per cell. Colour shows reconstruction of the aggregate greater-good vs duty contrast (1 = full contrast). This localizes effective interventions, not a unique transmission pathway.", "width": 860, "height": 365},
        links: [{ label: "Overview", href: projects.latentControl.href }],
      },
      {
        tier: "writing", track: "langcog", topic: "Typicality",
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
        tier: "writing", track: "langcog", topic: "Modality",
        title: projects.threeWays.title,
        field: "Semantics & pragmatics", desc: projects.threeWays.summary, status: projects.threeWays.status,
        kind: "Writing sample · in development",
        short: "Compares answers that leave a question open, such as might p and I don’t know whether p, by the replies and continuations each one licenses.",
        links: [{ label: "Question & diagnostics", href: projects.threeWays.href }],
      },
      {
        tier: "course", track: "lm", topic: "Model evaluation",
        title: "Cross-lingual prototypicality bias in multimodal evaluation metrics and VLM judges",
        field: "Course paper", desc: projects.protobias.summary, status: projects.protobias.status,
        kind: "Project · course paper 2026 · single author",
        short: "With each image pair held fixed and only the prompt language changed, both VLM judges changed their answer on about 70% of items in at least one of seven languages.",
        thumb: "/papers/cross-lingual-protobias-thumb.png",
        figure: {"src": "/images/research/protobias-language.svg", "alt": "Odds of a typicality error relative to English for Qwen2.5-VL-7B and InternVL3-8B across seven prompt languages, with uncertainty intervals.", "caption": "Same image pairs, different prompt languages. Odds ratios relative to English from an item-clustered regression on 300 demography items; bars show 95% confidence intervals.", "width": 660, "height": 400},
        links: [
          { label: "Paper", href: projects.protobias.href },
          { label: "PDF", href: "/papers/cross-lingual-protobias.pdf" },
          { label: "Code & data", href: "https://github.com/xchuan-li/cross_lingual_protobias" },
        ],
      },
      {
        tier: "course", track: "lm", topic: "Model training · image CNN",
        title: "Training choices in a small CNN for street-view country classification",
        field: "Course project", desc: projects.streetView.summary, status: projects.streetView.status,
        kind: "Project · team course project 2026 · report 2026",
        short: "Training choices alone took a fixed 1.69M-parameter network from 0.62 to 0.82 validation accuracy; the best dropout rate depended on training length.",
        thumb: "/papers/street-view-classification-thumb.png",
        figure: {"src": "/papers/street-view-classification/sweeps.svg", "alt": "Validation accuracy across dropout rates and training lengths. The best dropout setting changes with schedule length, and extending mixup training from 200 to 250 epochs lowers accuracy.", "caption": "Validation accuracy under different training settings. The best dropout rate depends on schedule length; extending training beyond 200 epochs did not improve the tested mixup recipe.", "width": 800, "height": 390},
        links: [
          { label: "Report", href: projects.streetView.href },
          { label: "PDF", href: "/papers/street-view-classification.pdf" },
        ],
      },
      {
        tier: "course", track: "langcog", topic: "Behavioural experiment",
        title: "Does checking with ChatGPT first change how people check and double-check?",
        field: "Course experiment", desc: projects.psyStudy.summary, status: projects.psyStudy.status,
        kind: "Project · course study, Winter 2025–26 · report 2026",
        short: "A complete between-subjects experiment, from design and pilot to data collection (N = 47) and analysis; neither predicted difference was reliable.",
        thumb: "/papers/fact-checking-study-thumb.png",
        figure: {"src": "/papers/fact-checking-study/means.svg", "alt": "Mean questions checked in Wikipedia-first and ChatGPT-first groups across two rounds, with one-standard-deviation error bars.", "caption": "Questions checked out of 10, mean ± SD. Wikipedia first: n = 29; ChatGPT first: n = 18. Neither group difference was significant (Welch tests: p = .65 and .16).", "width": 660, "height": 420},
        links: [
          { label: "Report", href: projects.psyStudy.href },
          { label: "PDF", href: "/papers/fact-checking-study.pdf" },
        ],
      },
      {
        tier: "course", track: "langcog", topic: "EEG experiment",
        title: "A group EEG study in Cognitive Neuroscience",
        field: "Course project", desc: "", status: "Planned course project · Winter 2026–27",
        kind: "Project · course study, Winter 2026–27 · planned",
        short: "A guided group study covering preregistration, EEG recording, and preprocessing and analysis in MNE-Python.",
        links: [],
      },
    ],
  },
];

/** The one work section's entries, grouped by weight for the homepage and the research index. */
export const workEntries = portfolioSections[0].entries;
export const workTiers: { id: string; label: string; blurb: string; compact: boolean }[] = [
  { id: "research", label: "Research", blurb: "Projects I am responsible for, with their current state.", compact: false },
  { id: "writing", label: "Writing", blurb: "Analyses written up on their own; used as writing samples.", compact: false },
  { id: "course", label: "Course projects", blurb: "", compact: true },
];
export const entriesOfTier = (t: string) => workEntries.filter((e) => (e.tier ?? "course") === t);
