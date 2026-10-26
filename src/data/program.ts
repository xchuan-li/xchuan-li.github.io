// Single source of truth for the site's positioning copy (see A3g §14). Everything
// that states what the work IS lives here, so the homepage, Current Work page,
// Research Program page, CV, and the default meta description cannot drift apart.
// Public project records live in `projects.ts`; writing posts in `writing.ts`.

/** The identity claim. Short form. */
export const identity =
  "I study how linguistic meaning guides inference, and how to identify the information used by people and language models.";

/** Homepage lead: the research interest as one question, set bold as the page's first visual anchor (XC, 3 Oct 2026; replaces the 29 Sep paradigm question). Fig. 1 illustrates it. The sidebar question it replaced is gone. */
// 18 Oct 2026 (XC: "定位文字…现在改"): LM as research instrument, not an understanding subject (Vault A2s36, A2s37).
// XC chose candidate A on 18 Oct 2026 (B was "What does the structure of a language carry, and what can be recovered from language alone?"); live 18 Oct 2026.
// 26 Oct 2026 (XC): the lead becomes the direct English of XC's one sentence of 24 Oct (Vault A2 §1:
// “我研究语言内部本身有什么我们还没发现的东西”); first on the homepage, then the same day on the CV and /approach
// ("CV 和 Research Program 页的开头也换成新句子"). The 18 Oct question was "How does linguistic structure organise
// and transform information, and what can people and language models tell us about it?".
export const identityLong =
  "What is there in language itself that we have not yet discovered?";

/** Homepage background and motivation, revised with XC on 3 October 2026; MPI CBS and DFKI links restored 5 October 2026. 12 Oct 2026 (XC): all three homepage paragraphs shortened; the origin clause (logic, learning languages) and the developmental-order sentence dropped (the thesis card under Research still links the thesis to LM work). Late evening (XC): two closing sentences link the two projects and lead into the paradigm paragraph. Live 12 Oct 2026 (XC). */
export const bioHtml =
  "I am a master’s student in Human and Artificial Intelligence at the University of Technology Nuremberg, with a background in philosophy. My master’s thesis, on modal language in preschool children, is run within a PhD project at <a href=\"https://www.cbs.mpg.de/\" rel=\"noopener\">the Max Planck Institute for Human Cognitive and Brain Sciences</a> in Leipzig; my project on moral framing and dilemma choices in language models is supervised at the <a href=\"https://www.dfki.de/en/web\" rel=\"noopener\">German Research Center for Artificial Intelligence (DFKI)</a>. The thesis looks at children and the DFKI project at language models; both ask how a structure in language, a modal word or a moral frame, shapes what is understood and chosen. My interest is in what the structure of language carries, measured in people and tested with language models.";

/** Human and artificial cognition have independent scientific value. */
/** Paradigm sentence (XC, 12 Oct 2026): one trunk, told from the level of the fields, not "I". Candidate 1 of 3, shortened the same evening; live 12 Oct 2026 (XC). */
export const programmeHtml =
  "Linguistics and cognitive science offer precise questions about meaning and decades of measured human behaviour. In language models, those questions become controlled experiments: training shows what can be learned from language alone, behavioural tests show what a model does, and interpretability shows where in the model it happens.";

/** The meaning snowball (XC, 12 Oct 2026; Vault A2s34): shown on the homepage between the paradigm sentence and Research, beside SnowballFigure. English only (XC); opens with the comparison (XC: the bare metaphor was too abrupt) and drops "I study", which repeated the bio. Live 12 Oct 2026 (XC). */
export const snowballHtml =
  "If we think of meaning as a snowball, it grows with each word as a sentence unfolds, and some of it falls away on the way. How far does the structure of a language decide what sticks, when, and what is lost?";

/** The current research question, in plain language. */
export const currentQuestion =
  "How do epistemic expressions differ in what they contribute to a conversation, and do those differences affect later access to a specific possibility?";

// Marked-up variants, for surfaces that carry emphasis (rendered with set:html).
// Keep the prose identical to the plain versions above — only the markup differs.
export const identityLongHtml =
  "What is there in language itself that we have not yet discovered?";

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
  "Xiaochuan Li studies how linguistic structure organises and transforms information, using human data and language models as research instruments: controlled training, behavioural tests and interpretability. Current work: vagueness and learning a scale from text, modified nouns and moral framing in language models, and children’s modal language.";

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
