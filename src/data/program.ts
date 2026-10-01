// Single source of truth for the site's positioning copy (see A3g §14). Everything
// that states what the work IS lives here, so the homepage, Current Work page,
// Research Program page, CV, and the default meta description cannot drift apart.
// Public project records live in `projects.ts`; writing posts in `writing.ts`.

/** The identity claim. Short form. */
export const identity =
  "I study how linguistic meaning guides inference, and how to identify the information used by people and language models.";

/** Homepage lead: the paradigm as one question, set bold as the page's first visual anchor (XC, 29 Sep 2026). Fig. 1 illustrates it. The sidebar question it replaced is gone. */
export const identityLong =
  "When people’s understanding of language turns on a distinction, can we state it precisely enough to test whether a language model computes it?";

/** Homepage bio (XC, 1 Oct 2026): who, where, with whom, and how I got here.
 *  Written after the pattern of Hening Wang's and Polina Tsvilodub's pages:
 *  an identity sentence, then the methods, then the actual projects. */
export const bioHtml =
  "I am a master\u2019s student in Human and Artificial Intelligence at the University of Technology Nuremberg, working on epistemic modality: what <i>must</i> and <i>might</i> contribute, and how people and language models come to choose one over the other. My thesis is on preschool children, run within an ongoing PhD project at <a href=\"https://www.cbs.mpg.de/\" rel=\"noopener\">the Max Planck Institute for Human Cognitive and Brain Sciences</a> in Leipzig. Alongside it I spend the year on prompt framing and latent control states in language models, co-supervised by UTN and <a href=\"https://www.dfki.de/en/web\" rel=\"noopener\">DFKI</a>. I came to this from philosophy, by way of logic and the philosophy of language, and from reading and cognitive development, which I studied at the same time.";

/** The programme, stated on the homepage above the project list (XC, 1 Oct 2026):
 *  the object of study is the language user, and the two methods are one pair. */
export const programmeHtml =
  "Several accounts of how a word is understood will fit the same behaviour. Cognitive modelling states where they come apart, precisely enough to measure. With people, measuring stops there. A language model can be opened, so interpretability can ask whether the account is what the network runs.";

/** The current research question, in plain language. */
export const currentQuestion =
  "How do epistemic expressions differ in what they contribute to a conversation, and do those differences affect later access to a specific possibility?";

// Marked-up variants, for surfaces that carry emphasis (rendered with set:html).
// Keep the prose identical to the plain versions above — only the markup differs.
export const identityLongHtml =
  "When people’s understanding of language turns on a distinction, can we state it precisely enough to test whether a language model computes it?";

export const currentQuestionHtml =
  "How do epistemic expressions differ in what they contribute to a conversation, and do those differences affect later access to a specific possibility?";

/** How the work proceeds, in one sentence. */
export const approach =
  "I begin with a question about linguistic meaning, work out what it predicts for later reasoning, and then choose a method that can separate those predictions.";

/** The theoretical foundation — what the account is stated in. */
export const foundation =
  "The analysis draws on formal semantics and pragmatics, especially work on epistemic modality, speaker commitment, and discourse update.";

/** The default meta description. */
export const metaDescription =
  "Xiaochuan Li studies linguistic meaning and inference through formal analysis and controlled model research, and is planning a master’s thesis on modal language in preschool children.";

export interface Criterion {
  name: string;
  text: string;
}

/**
 * An observable difference between a maintained possibility and ordinary
 * uncertainty (A3g §6.3). Consumed on the Current Work page.
 */
export const criteria: Criterion[] = [
  {
    name: "Content-specific",
    text: "the effect concerns the proposition introduced by the utterance, not uncertainty in general",
  },
  {
    name: "Persistent",
    text: "it remains detectable after the original sentence is gone",
  },
  {
    name: "Evidence-sensitive",
    text: "it disappears when later evidence rules the proposition out",
  },
];

export interface ProgramQuestion {
  label: string;
  text: string;
}

/** The two empirical questions the linguistic analysis leads to (A3g §6.4). */
export const questions: ProgramQuestion[] = [
  {
    label: "Human cognition",
    text: "How is this function represented, processed, and learned by human reasoners?",
  },
  {
    label: "Computational learning",
    text: "Can a learner acquire it from linguistic input alone? If so, what patterns in the input support it?",
  },
];
