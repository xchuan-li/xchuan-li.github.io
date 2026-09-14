// Single source of truth for the site's positioning copy (see A3g §14). Everything
// that states what the work IS lives here, so the homepage, Current Work page,
// Research Program page, CV, and the default meta description cannot drift apart.
// Project records live in `research.ts`; writing posts in `writing.ts`.

/** The identity claim. Short form. */
export const identity =
  "I study how structured meaning is represented, processed, and learned across human and computational systems.";

// The homepage header lede is two paragraphs: a three-question hook (openingQuestions /
// openingQuestionsHtml), then an identity statement that lands on the current research
// question (identityLong / identityLongHtml).

/** Homepage header, paragraph 1 — the shared question across semantics, cognition, and language models. */
export const openingQuestions =
  "How does language organize information for reasoning? How is that structure represented and processed in human cognition? And what can a language model learn from linguistic input alone?";

/** Homepage header, paragraph 2 — the identity claim; the current case is introduced below. */
export const identityLong =
  "My work connects formal semantics with questions from psycholinguistics and computational language research. I study how structured meaning is represented, processed, and learned across human and computational systems.";

/** The current research question, in plain language. */
export const currentQuestion =
  "Does saying that something might be true simply lower a speaker's commitment, or does it keep that particular possibility available for later reasoning?";

// Marked-up variants, for surfaces that carry emphasis (rendered with set:html).
// Keep the prose identical to the plain versions above — only the markup differs.
export const openingQuestionsHtml =
  "How does language organize information for reasoning? How is that structure represented and processed in human cognition? And what can a language model learn from linguistic input alone?";

export const identityLongHtml =
  "My work connects formal semantics with questions from psycholinguistics and computational language research. I study how structured meaning is represented, processed, and learned across human and computational systems.";

export const currentQuestionHtml =
  "Does saying that something <em>might</em> be true simply lower a speaker's commitment, or does it keep that particular possibility available for later reasoning?";

/** How the work proceeds, in one sentence. */
export const approach =
  "I begin with a question about linguistic meaning, work out what it predicts for later reasoning, and then choose a method that can separate those predictions.";

/** The theoretical foundation — what the account is stated in. */
export const foundation =
  "The analysis draws on formal semantics and pragmatics, especially work on epistemic modality, speaker commitment, and discourse update.";

/** The default meta description. */
export const metaDescription =
  "Xiaochuan Li studies how structured meaning is represented, processed, and learned across formal semantics, human cognition, and computational language models.";

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
