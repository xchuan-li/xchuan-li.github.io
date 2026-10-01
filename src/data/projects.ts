// Public project descriptions, checked against the Vault and XC on 26 September 2026.
// B4: manuscript in preparation, not submitted. B1: project/report, not a promised publication.
// 27 September 2026 (XC): the master's work focuses on modality; ProtoBias is a single-author
// course project on the same footing as the street-view course project, not a research line.
// Modality connects linguistic analysis, human evidence, a proposed cognitive account,
// and LM tests. The prompt-framing project is independent of this modality programme.
// The thesis study is planned, not running. Private exploratory work is not published here.
export const projects = {
  protobias: {
    title: "Cross-lingual ProtoBias",
    href: "/research/cross-lingual-protobias",
    question: "Can models follow explicit semantic constraints despite prototypicality, and does this ability vary across languages?",
    summary: "A single-author course project: a controlled evaluation holding image pairs fixed while varying the prompt language, with approximately 12,600 judgments across seven languages and two VLM systems.",
    connection: "The project developed my experience with controlled behavioural measurement, translation and answer-position checks, and reproducible analysis.",
    status: "Completed course project · project report",
  },
  threeWays: {
    title: "Three Ways of Leaving p Unsettled",
    href: "/research/three-ways",
    question: "What different information do apparently similar expressions of uncertainty contribute?",
    summary: "A formal semantic and pragmatic comparison of might p, might p or might not p, and I don’t know whether p, examining the commitments they create and the responses they license.",
    connection: "The project develops the linguistic analysis and diagnostics needed to formulate a precise empirical question.",
    status: "Analysis in development · independent judgments pending",
  },
  thesis: {
    title: "Modal language in preschool children",
    href: "/research/learnability",
    question: "How do preschool children understand modal expressions, and how does this relate to their reasoning about possibilities?",
    summary: "A small study of modal language, planned to run alongside an existing study of how preschool children reason about possibilities.",
    connection: "The formal analysis specifies what modal expressions contribute; the thesis asks how children come to understand them. It includes no language-model study.",
    status: "Master’s thesis · in planning",
  },
  modalModels: {
    title: "What decides between must and might",
    href: "/research/modal-language-models",
    question: "Controlling for how strong the evidence is, does the source of the evidence still act on must directly, or only through its competition with the bare assertion?",
    summary: "Three competing accounts of how evidence strength and evidence source decide between must and might, fitted and compared on published human data; language models enter later, as a second kind of language user.",
    connection: "The account is stated so that its variables can be measured in a language model as well; that step comes after the comparison on human data. The project remains separate from the thesis.",
    status: "Computational model \u00b7 in development",
  },
  typicality: {
    title: "Typicality in referent choice",
    href: "/research/typicality-in-referent-choice",
    question: "When a description built on a category term fits two candidates, how much of the choice is the description doing, and how much is typicality?",
    summary: "A working paper separating three conditions under which a superordinate description meets two candidates differing in typicality, and stating the limits of what a forced choice between them can report.",
    connection: "The paper gives the linguistic analysis the ProtoBias evaluation needed: it states the distinction that design presupposes but does not itself separate.",
    status: "Working paper · lingbuzz/010343",
  },
  streetView: {
    title: "Street-view country classification",
    href: "/research/street-view-classification",
    question: "How do training choices affect a CNN’s ability to classify street images by country?",
    summary: "An 18-country image-classification course project. My contribution covered model training, controlled experiments, and performance analysis.",
    connection: "The project developed my experience with training neural networks, comparing configurations, and interpreting validation results.",
    status: "Completed team course project",
  },
  psyStudy: {
    title: "Fact-checking after ChatGPT exposure",
    href: "/research/fact-checking-study",
    question: "Does meeting ChatGPT first, rather than Wikipedia, change whether people check an answer and whether they double-check it with another source?",
    summary: "A between-subjects course experiment, designed in a group of three and run by the whole class (47 participants analysed). My part was the data analysis.",
    connection: "The course took me through a full behavioural experiment: design, pilot, revision, online data collection, and analysis.",
    status: "Completed course study · Winter 2025–26",
  },
  latentControl: {
    title: "Latent Control States",
    href: "/research/latent-control-states",
    question: "How does prompt framing change model choices, and can the behavioural effect be explained mechanistically?",
    summary: "A study of prompt framing and model choices, combining controlled dilemma comparisons, residual-stream interventions, and low-rank analysis.",
    connection: "The work connects behavioural controls with interventions on internal representations, while checking alternative explanations involving answer format and outcome comprehension.",
    status: "Manuscript in preparation",
  },
};
