// Research grouped by variant of language (XC, 26 Oct 2026): each project looks at one property of language in
// one variant of it. XC's wording: 从统计规律中恢复的语言, 发展中的语言, 部件残缺的语言 (Vault A2s37 §6).
// The idea organises the homepage Research section; a strip and a full table were tried the same day and
// dropped (XC: "太丑 太直白 而且每个不像是一个完整的研究"), so each project stays a complete card.
import { projects } from "./projects";

export interface ResearchGroup { id: string; label: string; who: string; projects: (keyof typeof projects)[]; }

export const researchGroups: ResearchGroup[] = [
  { id: "statistics", label: "Language learned from statistics", who: "language models", projects: ["vagueness", "modifiers", "latentControl"] },
  { id: "developing", label: "Language still developing", who: "children", projects: ["thesis"] },
  // "Language with parts missing" (B17, lesion and EEG) joins when it has a public page.
];
