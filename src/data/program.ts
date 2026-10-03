// Single source of truth for the site's positioning copy (see A3g §14). Everything
// that states what the work IS lives here, so the homepage, Current Work page,
// Research Program page, CV, and the default meta description cannot drift apart.
// Public project records live in `projects.ts`; writing posts in `writing.ts`.

/** The identity claim. Short form. */
export const identity =
  "I study how linguistic meaning guides inference, and how to identify the information used by people and language models.";

/** Homepage lead: the research interest as one question, set bold as the page's first visual anchor (XC, 3 Oct 2026; replaces the 29 Sep paradigm question). Fig. 1 illustrates it. The sidebar question it replaced is gone. */
export const identityLong =
  "How do people and artificial systems understand the concepts, evidence, and norms in language, and turn them into inferences and choices?";

/** Homepage background and motivation, revised with XC on 3 October 2026. */
export const bioHtml =
  "I am a master’s student in Human and Artificial Intelligence at the University of Technology Nuremberg, with a background in philosophy. My interest in language and reasoning grew from studying logic and Leibniz, learning languages, and asking how formal accounts of meaning relate to the processes through which people understand and use language.";

/** Human and artificial cognition have independent scientific value. */
export const programmeHtml =
  "I study human cognition through behavioural experiments and artificial systems through controlled model comparisons and mechanistic interpretability. I am interested in how each system processes information and makes decisions, and in the computational explanations that can account for its behaviour.";

/** The current research question, in plain language. */
export const currentQuestion =
  "How do epistemic expressions differ in what they contribute to a conversation, and do those differences affect later access to a specific possibility?";

// Marked-up variants, for surfaces that carry emphasis (rendered with set:html).
// Keep the prose identical to the plain versions above — only the markup differs.
export const identityLongHtml =
  "How do people and artificial systems understand the concepts, evidence, and norms in language, and turn them into inferences and choices?";

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
  "Xiaochuan Li studies how people and artificial systems understand the concepts, evidence, and norms in language, and turn them into inferences and choices. Current work: children’s understanding of modal language and possibility, and moral framing in language models.";

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
