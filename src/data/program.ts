// Single source of truth for the site's positioning copy (see A3g §14). Everything
// that states what the work IS lives here, so the homepage, Current Work page,
// Research Program page, CV, and the default meta description cannot drift apart.
// Public project records live in `projects.ts`; writing posts in `writing.ts`.

/** The identity claim. Short form. */
export const identity =
  "I study how linguistic meaning guides inference, and how to identify the information used by people and language models.";

// The homepage header lede names the enduring linguistic question first, then
// explains how distinct empirical paths test predictions from its analysis.

/** Homepage header, paragraph 1 — the shared question across semantics, cognition, and language models. */
export const openingQuestions =
  "How does linguistic form shape what we understand and infer?";

/** Homepage header, paragraph 2 — the identity claim; the current case is introduced below. */
export const identityLong =
  "My work begins with questions in semantics and pragmatics. I develop explicit analyses of linguistic contrasts, then use human behavioural evidence and computational models to test different predictions.";

/** The current research question, in plain language. */
export const currentQuestion =
  "How do epistemic expressions differ in what they contribute to a conversation, and do those differences affect later access to a specific possibility?";

// Marked-up variants, for surfaces that carry emphasis (rendered with set:html).
// Keep the prose identical to the plain versions above — only the markup differs.
export const openingQuestionsHtml =
  "How does linguistic form shape what we understand and infer?";

export const identityLongHtml =
  "My work begins with questions in semantics and pragmatics. I develop explicit analyses of linguistic contrasts, then use human behavioural evidence and computational models to test different predictions.";

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
  "Xiaochuan Li studies linguistic meaning and inference through formal analysis and controlled model research, with a human behavioural thesis proposal in development.";

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
