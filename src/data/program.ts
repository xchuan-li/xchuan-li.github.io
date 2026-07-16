// Single source of truth for the research program's POSITIONING copy — the
// identity line, the current question, the operational criteria, the approach,
// and the two explanatory questions.
//
// Everything that states what the work IS lives here and nowhere else, so the
// rich homepage, the plain homepage, the research index, the approach page, the
// CV, and the default meta description cannot drift apart. Project-level records
// live in `research.ts`; writing posts in `writing.ts`.
//
// Deliberate vocabulary (do not "improve" without asking):
//   - "experimental and computational semantics", NOT "experimental linguistics"
//     — the latter implies a running programme of human experiments.
//   - "testable questions for cognitive science and language models", NOT
//     "experiments in both" — the developmental side is being scoped, not run.
//   - two QUESTIONS (developmental / computational), never "two arms".

/** The identity claim. Short form — used where one sentence is all there is room for. */
export const identity =
  "I work in experimental and computational semantics, studying how linguistic expressions structure reasoning.";

/** The identity claim, long form — names the fields the methods come from. */
export const identityLong =
  "I study how linguistic expressions structure reasoning, using ideas and methods from experimental semantics, cognitive science, and language-model research.";

/** The current research question. Follows the identity claim everywhere. */
export const currentQuestion =
  "My current work asks whether epistemic possibility expressions merely weaken commitment, or also keep content-specific alternatives available for subsequent evidence updating.";

// Marked-up variants of the two statements above, for the surfaces that carry
// emphasis (the hero, the plain header). Rendered with `set:html`. Keep the
// prose identical to the plain versions above — only the markup differs, so the
// two never say different things.
export const identityLongHtml =
  "I study <strong>how linguistic expressions structure reasoning</strong>, using ideas and methods from <strong>experimental semantics</strong>, <strong>cognitive science</strong>, and <strong>language-model research</strong>.";

export const currentQuestionHtml =
  "My current work asks whether <strong>epistemic possibility expressions</strong> — <em>might</em>, <em>may</em> — merely <strong>weaken commitment</strong>, or also keep <strong>content-specific alternatives available</strong> for subsequent evidence updating.";

/** The research approach, in one sentence. */
export const approach =
  "Start from a linguistic question, translate it into testable questions for cognitive science and language models, and use the resulting evidence to refine the original linguistic account.";

/** The theoretical foundation — what the account is stated in. */
export const foundation =
  "The theoretical foundation stays linguistic: epistemic modality, speaker commitment, discourse update, and the maintenance of alternatives.";

/** The default meta description, derived from the identity + current question. */
export const metaDescription =
  "Xiaochuan Li — experimental and computational semantics: how linguistic expressions structure reasoning. Current work asks whether epistemic possibility expressions merely weaken commitment, or also keep content-specific alternatives available for subsequent evidence updating.";

export interface Criterion {
  name: string;
  text: string;
}

/**
 * What would have to be true for "keeping an alternative available" to be a real
 * effect rather than mention, priming, memorability, or generic uncertainty.
 * These are the operational definitions that make the hypothesis falsifiable —
 * they belong under the current case, not in the hero figure.
 */
export const criteria: Criterion[] = [
  {
    name: "content-specific",
    text: "it preserves the particular alternative p, not uncertainty in general",
  },
  {
    name: "persistent",
    text: "it continues to affect subsequent reasoning",
  },
  {
    name: "evidence-sensitive",
    text: "it remains open when evidence permits it, but is removed when evidence rules it out",
  },
];

export interface ProgramQuestion {
  label: string;
  /** The technical term for what this side establishes. */
  term: string;
  text: string;
}

/**
 * The two explanatory levels. NOT two arms, NOT two running experiments — two
 * questions the linguistic account gets translated into.
 */
export const questions: ProgramQuestion[] = [
  {
    label: "The developmental question",
    term: "developmental realization",
    text: "How does this linguistic function become available in human cognition?",
  },
  {
    label: "The computational question",
    term: "distributional learnability and computational realization",
    text: "Can it be learned from linguistic input, and how is it realized in language models?",
  },
];
