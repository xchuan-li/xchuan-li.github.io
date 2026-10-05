## Bio institution links, 5 October 2026 — latest XC instruction

XC ▸ Restore the MPI and DFKI links lost in the 3 October bio rewrite. AI ▸ One sentence appended to `bioHtml`: the M.Sc. thesis runs within an ongoing PhD project at MPI CBS (linked), and the moral-framing project is co-supervised by UTN and DFKI (linked). The rest of the 3 October bio is unchanged; it still does not open with modality and does not mention the unpublished modal-choice project.

## Fig. 1: two segmentations, 5 October 2026 — current authority for the homepage figure

XC ▸ The person should say a concrete sentence divided by linguistic structure, and the robot the same sentence divided as a tokenizer divides it: different structures, both use language. Chose draft A; no caption.

AI ▸ `MeaningBridgeFigure.astro` keeps the hand-drawn person, robot and boil. Both say *I don't know whether it's the outage.* in speech bubbles sized to the text. Person: bars between units whose height is the depth of the boundary (syntactic distance, Shen et al. 2018), encoding `[I [[do n't] [know [whether [it ['s [the outage]]]]]]]`; do|n't is a morpheme boundary (Zwicky & Pullum 1983), it|'s a clause boundary inside one written word. Robot: real GPT-2 tokens with ids (checked with the gpt2-large tokenizer; Qwen2.5 splits the same way), equal bars. Red bars mark do + n't vs. don + 't. The left label reads **humans** (XC, 5 Oct; pairs with *language models* as two kinds of language users; the homepage question keeps *people*). Positions are frozen from `design-demos/fig1-two-segmentations/draft.html`; change the draft and copy the coordinates. Draft B (dashed linguistic boundaries under the tokens with a question mark: does the model build the hierarchy?) was not chosen. The figure does not claim the model lacks constituent structure; tokens are its input segmentation, not its grammar. This supersedes the person — "language" — model figure.

## 3 October 2026 — ChatGPT checking experiment on homepage
XC requests the ChatGPT/Wikipedia source-order study on the homepage. Include its shared portfolio entry after B3/B4 under Research, keeping its completed course experiment status and the existing procedure diagram. The design was developed by a three-person group, data collection was class-wide, and XC completed the analysis; the report is an individual write-up. Keep the research-index tier as course. Homepage copy describes design, sample and contribution, without adding scientific claims. B7/B10 remain off the public site.

## Undergraduate reports and covers, 3 October 2026 — latest XC instruction

XC ▸ Add the garden-path report, describe project content directly without emphasising recollection, and add title-side schematic covers for both undergraduate projects. AI ▸ Child report now gives project tasks, observation, example pairs and discussion; retrospective/source-reconstruction prose is removed. Preserve the substantive boundaries once: observations are not a matched-item experiment, examples are illustrative, and no quantitative context effect is claimed. Omit unconfirmed timing-unit specifics rather than silently asserting a definite rule.

Garden-path report: /research/garden-path-processing uses PaperArticle, with Chinese/English examples, structural splits, hypotheses and proposed measures. Label Course research design; no experiment administered. The materials are example designs, not alleged recovered original stimuli. Do not invent a precise project date; the header names Psychology of Reading and undergraduate coursework. Homepage and /research list both items under Earlier research experience with static native SVG covers. Existing report publication status is not upgraded; B7/B10 remain absent. No new LM or cognitive-model study is announced publicly.

## Childhood project date clarification, 3 October 2026

AI ▸ Project period is September–December 2021, supported by XC’s old CV and a reflection emailed 13 September 2021. The 2022 spring course is separate. The report header now labels Project period: September–December 2021; remove the 2026 write-up date from the card/header to avoid confusing the project date. Retrospective report status remains explicit, so the new text is not presented as an original 2021 manuscript.

## Childhood report format, 3 October 2026 — latest XC correction

XC ▸ The child-reading page must be an academic report in the same paper format as the other projects, with concrete Chinese character examples, rather than an experience introduction. AI ▸ Replaced it with PaperArticle (author/title block, abstract, numbered sections, two numbered tables, references). Content lives in src/content/papers/child-reading-assessment.html. PaperArticle allows a report without an available PDF; existing PDF links remain unchanged. Added 龄／年龄 and 筑／建筑 as explicitly illustrative examples, not original test materials or observed child responses. Preserve the actual 2021 qualitative observation, retrospective timing uncertainty and missing-data limits; do not manufacture quantitative results or matched-item data. Homepage and index link to the report. This supersedes the prose-page format immediately below.

## Childhood reading assessment, 3 October 2026 — latest XC instruction

XC ▸ Add the undergraduate childhood reading assessment experience to the website, with an actual example. AI ▸ Homepage and /research now have an Earlier research experience entry linking to /research/child-reading-assessment. Keep it distinct from current own research. The example comes from XC's reflection emailed 13 September 2021: unexpectedly stronger recognition in word reading than anticipated from single-character reading. It is one observed case, not a matched-items experiment or established context effect. The reflection supplies no exact characters or words, so none are invented. Materials, on-site testing and alternating data analysis are based on XC's recollection; group timing remains tentative. No millisecond reaction-time, RAN, named standardised test, numerical findings or diagnosis claims. B7/B10 stay off the website.

## Narrative and unpublished projects, 3 October 2026 — latest XC instruction

XC ▸ “去调整网页 B7和10先不要上网页”. This supersedes earlier three-project and modality-programme presentation decisions below. B7 (modal-choice modelling) and B10 (Show and tell) must not appear in public copy, project cards, project content, HTML CV variants or the downloadable CV. The old B7 URL redirects to /research; its source remains recoverable in Git history. Do not restore it from older notes.

AI ▸ Keep the broad homepage question and existing visual language. Homepage research now contains the child-development thesis and moral-framing project. Background copy connects philosophy/logic/Leibniz, language learning and psychology to human and artificial cognition. /approach presents that motivation, the two independent research objects, and evidence standards. Cognitive modelling may appear as a research interest, not an announced unpublished project. Do not claim human research ends at behaviour, that an opened LM automatically reveals its computation, or that unfitted models have already fitted human data. Public CV entries are individual projects, not a modality pipeline. No new findings are added.

## Site-wide consistency pass, 3 October 2026 (XC: “检查网站每一处表述是否一致”)

AI ▸ Aligned every surface with the 3 October lead question and card questions. Project-page lead questions (`question` in `projects.ts`) now equal the research-card questions. Default, Research Program, CV and Contact meta descriptions, the Research Program opening sentence, the Contact copy, JSON-LD `knowsAbout`, and the share card (`og.png`, via `scripts/gen-og.mjs`; the retired “Causal inference × interpretability … grounding” tagline is gone) now state the broad interest instead of formal-semantics or structured-meaning positioning. Modal choice is “in development; nothing has been fitted yet” everywhere and is written as “to be fitted”, never “fits”. Fact-checking study: N = 49 collected, 47 analysed, on every surface.

## Research card blurbs, 3 October 2026 — latest explicit XC decision

XC ▸ Replace the homepage/research-index project blurbs (`short` in `portfolio.ts`) with the question each project pursues. AI ▸ Modal choice: evidence strength vs source vs competition between expressions, and comparable predictions. Thesis: children's modal expressions vs conceptual understanding of possibility, and how comprehension and task demands shape the judgement of that ability. Moral framing: outcome weighing vs action-answer tendency vs another process, and how far internal interventions separate them. These state research concerns, not results; keep them as questions.

## Homepage lead question and bio, 3 October 2026 — latest explicit XC decision

XC ▸ Modality is “一个很小很小的切口”; opening with it makes the interest look too narrow. The research interest is “人和人工系统如何理解语言中的概念、证据与规范，并形成推断和选择”, and it replaces the bold homepage question.

AI ▸ `identityLong` / `identityLongHtml` now read: “How do people and artificial systems understand the concepts, evidence, and norms in language, and turn them into inferences and choices?” This supersedes the 29 September lead question below. The bio no longer opens with modality as the research direction: its first sentence gives only programme and university, and modality follows as “My current work is on epistemic modality…”. Concepts, evidence and norms map onto existing work (typicality and ProtoBias; modality; moral framing) but the homepage does not spell out that mapping.

## Moral-framing wording, 3 October 2026 — latest explicit XC decision

XC ▸ “B4是：道德语言框架如何影响LM的困境选择及其内部过程，不要泛泛说提示词.” Describe the Vault's B4 project as how **moral framing** (a single moral sentence such as “Prioritize the greater good.” vs “Prioritize doing your duty.”) changes language models' **dilemma choices** and the **internal processes** behind them. Do not describe it generically as “prompt framing” or by the group-level label “latent control states”.

AI ▸ Public title is now *Moral framing and dilemma choices in language models* (homepage Research card, bio, Background timeline, CV entry, project page, /approach §7). The URL `/research/latent-control-states` and the internal ids `latentControl` / `lit` are kept so existing links do not break. The project stays independent of the modality programme; this changes its description, not its grouping.

## Homepage sidebar, 2 October 2026 — latest explicit XC decision

XC ▸ Remove the homepage “On this page” directory because the page is short. The sidebar keeps the portrait, name, affiliation, and contact/CV links. Do not restore a homepage table of contents.

AI ▸ Removed the directory markup and its unused styles, title mapping, and scroll-tracking script.

## Project covers, 2 October 2026 — latest explicit XC correction

Homepage contains the original three Research entries only. The agent-added Selected course projects block and its sidebar link have been removed. Do not add homepage sections merely to accommodate covers. Course projects remain on the existing /research index.

Right-side covers remain static and non-clickable: desktop 196 × 134 px; mobile 112 × 91 px. Interpretability uses all 196 frozen heatmap cells WITH layer/token axes and a carry colour scale. ProtoBias uses the original object-domain image pair from dataset row 734 (futon on gray carpet / bed on beige carpet), not a results plot. The psychology study uses a compact source-order flowchart grounded in its report (random assignment; Wikipedia → ChatGPT or reverse; optional checks). XC explicitly chose no CNN cover when the dataset was unavailable. Keep the two planned-study schematics omitted from listings. No long captions.

The full patching heatmap and frozen values remain in `src/data/figures/framing-carry.json`; regenerate the labelled cover with `node scripts/gen-research-heatmap.mjs`. The plot identifies effective intervention sites, not a unique natural pathway. Asset provenance is in `public/images/research/README.md`.

## CV structure, 1 October 2026 — latest user decision

Education presents selected, transcript-backed coursework. Both theses belong in Research experience: the M.Sc. thesis remains within the current modality programme, and the undergraduate thesis is a separate 2024 entry (Leibniz’s metaphysics, logic and universal-language proposal; supervisor Zang Yong). The 2021 invited learning-difficulties project is included in general and cogsci, dated September–December 2021 per XC’s old CV; its work includes materials, testing, response-data analysis and assistance with teaching items and individual learning plans.

Research experience contains each project once, with context, contribution and output together. The independent typicality working paper has its own entry and attached citation/links; the latent-control-states manuscript status stays in that project's entry. There is no separate Papers and manuscripts section. Preserve the modality programme's three related components; do not fold LCS into it. Application variants retain their intended emphasis/omissions and share this structure. Do not shrink useful descriptions merely to force one page. All three PDFs live in Vault Deliverables/CV-2026-10-01; public/cv.pdf is the general version.

# Project context for Claude

**Read this first before suggesting any changes.** It contains everything an LLM needs to understand the project structure, stack, deployment, and design philosophy.

## Homepage lead question, 29 September 2026 (XC) — current authority

The homepage opens with one question that sums up the paradigm, set bold as the page's first visual anchor (`identityLong` in `program.ts`, `.intro` in `index.astro`): "When people’s understanding of language turns on a distinction, can we state it precisely enough to test whether a language model computes it?" The sidebar question ("How does linguistic form shape what we understand and infer?") and the common-question line above Research & Papers are removed, so the page carries one question only.

## Later on 29 September 2026 (XC) — supersedes the item details below

- **No spine.** The items are independent projects; each is ruled off on its own.
- **Two types only**, first word of every status line: **Writing sample** (solely XC's own linguistic writing: Three Ways, typicality) or **Project** (everything else, including the single-author ProtoBias paper). The old "writing sample" tag is gone.
- The left label is the **project type**, consistent within a tab: human — Behavioural experiment (MA thesis, fact-checking), EEG experiment; LM — Model evaluation (modal-model project, ProtoBias), Mechanistic interpretability (LCS), Model training · image CNN (street view). Writing samples keep their topic (Modality, Typicality).
- **Logo and favicon**: the robot's head from Fig. 1 (`public/favicon.svg`, same coordinates, heavier strokes), also `favicon-32.png` and a white-backed `apple-touch-icon.png` rendered from it. It replaces the "›" before the name in the header (`.brand-logo`).
- **Homepage**: no "Latest" list, no "// Selected work" heading; Fig. 1 is followed directly by Research & Papers. The sticky sidebar ("On this page") lists the three tabs under Research & Papers; each opens its tab.

## One section in three tabs; new Fig. 1, 29 September 2026 (XC) — current authority

**Section 01 "Current Research: Modality" is gone.** The linguistic analysis, child thesis and modal-model project share a question, not a pipeline (Vault A2v10/A2v11); `ModalityChain.astro` is deleted. All work sits in one section, **Research & Papers** (`id="work"`, `PaperList.astro`), under the common question, in three tabs named by XC. The tab shows the short name; the open panel shows the full heading and subtitle:
- **Meaning & inference** — Linguistic meaning and inference · Theoretical hypotheses and empirical operationalization: Three Ways (Modality), typicality paper (Typicality).
- **Human cognition** — Human cognition and development · Behavioural evidence and hypothesis testing: MA thesis (Modality), fact-checking study (Behavioural experiment), EEG group project in Cognitive Neuroscience (EEG; "planned", Winter 2026–27, no link until it exists).
- **Language models** — Language models: behaviour and mechanisms · Computational modelling and mechanistic tests: modal-model project (Modality), Latent Control States (Mechanistic interpretability), ProtoBias (Model evaluation), street view (**Model training · image CNN** — it is not a language model; say so).
Items keep the former chain's visual form (topic left, spine with square node, status line, title →, one sentence, extra links, thumbnail on the right). The spine groups; it does not mean steps. `#work-meaning`, `#work-human`, `#work-lm` open a tab; project pages link back to their tab. Without JavaScript all three lists show.

**Fig. 1 is `MeaningBridgeFigure.astro`** (generated by `design-demos/meaning-bridge/gen_b.py`, "draft B", chosen by XC over the two-learners and model-in-the-middle drafts). It shows the order of the work: LM research is prompted and constrained by human research. 1 · a human finding (a chart: people say "must" more after seeing than after hearing — why?); 2 · linguistic analysis on a blackboard (one scale vs. two variables, strength + source; predictions saw = heard vs. saw ≠ heard); 3 · model and LM tests (the LM's answers; its casing opens: a source variable, or the word "saw"?); 4 · back (revise the account; a new question for human studies?). Four step captions light up in sync. Items after Degen et al. 2019; bar heights and answers are illustrative, not the paper's numbers. Human–LM comparison is a test step, not the starting point. The homepage intro (`identityLong`) says the same in one sentence. `LclmCartoon.astro` and the two-learners component are removed.

## Papers as web pages, 28 September 2026 (XC: "把论文写到网页上，格式不变")

Typicality, the psychology study and street view render as HTML papers (`PaperArticle.astro`): centred title block, abstract, numbered sections, numbered figures and tables with working cross-references, author–year citations, reference list, "On this page" rail; the PDF is one click away. Fragments in `src/content/papers/*.html` are **generated** by `reports/web/build_web.py` (pandoc + citeproc from `refs.bib`, tectonic for TikZ, pdftocairo for SVG figures in `public/papers/<slug>/`); edit the LaTeX / the Vault Markdown and re-run it. Typicality is built from the Vault's clean English Markdown (B6h output), with the PDF's keyword line added. **ProtoBias stays a PDF preview**: the LaTeX in `Desktop/Projects/B1-ProtoBias/v3/paper/report/` is now the unpublished co-authored arXiv revision ("Fixed Images, Changing Judgments"), and the 30 July single-author source no longer exists; do not publish the revision.

## Papers & Reports, 28 September 2026 (XC) — supersedes the three-line list

XC found the three-line list "太简略". Section 02 is now **Papers & Reports** (`PaperList.astro`): every written output once — typicality working paper, Latent Control States manuscript, ProtoBias course paper, the psychology experiment report, the street-view report — each with a first-page thumbnail (`public/papers/*-thumb.png`; a dashed "in prep." box when there is no public PDF), title, mono meta line, one sentence on what it finds, and links. Writing samples keep a small tag. The "Course projects" line under /research is removed; course report pages link back to `/research#papers`. The street-view team repository is private, so no code link is given for it.

## Project pages are full reports, 28 September 2026 (XC) — current authority

XC: "每一个项目点开都是完整的报告/pdf预览". `src/components/PdfReport.astro` shows the PDF inline on desktop and a first-page preview linking to the PDF below 700 px. PDFs and previews live in `public/papers/`.
- **Typicality**: the LingBuzz PDF (CC BY 4.0) with LingBuzz and DOI links.
- **Cross-lingual ProtoBias**: the single-author course paper, final version of 30 Jul 2026 (12 pages). The earlier web report (timeline, demo) is in git history; `report-1` keeps its URL. The Vault notes Steffen's plan to fold these experiments into the ProtoBias manuscript.
- **Street view**: a new write-up by XC, `reports/street-view/` (LaTeX, tectonic; `make_figs.py` draws from `data/`, copied from github.com/xchuan-li/HAI_DL_Group_Assignment). The submitted model uses the `cls` head only. The "oracle 0.969" figure in the Vault note has no source in the repository and is not used.
- **Psychology study**: a new write-up, `reports/fact-checking/`, from the group protocol (Assignment 7 and its revision), the pilot table, and XC's Assignment 10. Against the protocol's hypothesis (ChatGPT first: more round-1 checks, fewer round-2 checks) both descriptive differences run the other way; Welch tests from summary statistics: t(29.4) = −0.46, p = .65; t(38.1) = 1.44, p = .16. No classmate names.
- Three Ways, the thesis and the modal-LM project keep their short pages until a public full text exists; Latent Control States needs its collaborators' consent.

## Psychology course study added, 28 September 2026 (XC)

`/research/fact-checking-study` (`projects.psyStudy`), listed first in the /research "Course projects" line and in the CV. Facts per the Vault record verified on 19 Sep (A2u1): protocol by a group of three, adopted by class vote and run by the whole class (N = 49, pilot N = 8); XC's own part is the JASP analysis. No teammate or instructor names, no per-group means, and the result is stated only as "matched one of two predictions" until XC confirms the predicted directions.

## CV rebuilt, 28 September 2026 (XC) — current authority for the CV

XC found the CV "太满…很杂乱" and the Research / Papers / Projects sections overlapping. Now one data source, `src/data/cv.ts`, rendered by `src/components/CvDocument.astro` in three variants:
- **general** at `/cv` (linked; `/cv.pdf` is printed from it), **lm** at `/cv/lm`, **cogsci** at `/cv/cogsci` — the last two unlinked, `noindex` (Base prop), excluded from the sitemap; PDFs for applications live in the Vault (`Deliverables/CV-2026-09-28/`).
- Sections: Education · Research (Current · epistemic modality / Earlier) · Papers and manuscripts (citations, own name bold) · Employment · Skills and languages. **Each item appears once**; at most one short note per entry. Layout after Hening Wang's CV (title bold left, context italic, dates right).
- Variants change order, emphasis and omissions only, never what an entry is. LM: modal-LM project first, LCS first among papers, LoRA/Slurm in skills. CogSci: psychology course study first in Earlier with full design details, psychology grades, street view omitted.
- Facts: the course study (W25/26, Foundations in Psychology and Empirical Study Design) was designed by a group of three and adopted for the class-wide study; XC did the analysis (JASP). The IT Service Desk entry uses the wording XC confirmed on 27 Sep (Vault A3x1 §6); duties only, nothing from work data. "Mixed-effects" was dropped (no verified record).

**1 October 2026 (XC) — Research drawn as one programme.** XC found the Research section read as "six parallel things". After comparing Hening Wang's CV (research under positions, one *Methods* line mixing behavioural experiments and LMs) and Polina Tsvilodub's page ("both in humans and machines"), Research is now **one programme entry** — *Epistemic modality in people and language models*, question line "how modal expressions are understood and used, by people and by language models" (XC confirmed) — with one row per method (Formal analysis · Human study · Language models; lm puts Language models first), followed by **Earlier research experience** as one-line rows without notes. Do not split the CV into separate human and LM sections: the combination is the identity. The cogsci variant adds *Reading-difficulty screening in primary-school children* (2022, with the Shenzhen Learning Disorders Association); XC's memory is vague and no documents survive, so it claims only the collaboration. The one-page rule is dropped: early-career academic CVs run 1–2 pages; never pad, never cut useful content to fit. Application PDFs: Vault `Deliverables/CV-2026-10-01/`.

## Modality boundary correction, 27 September 2026 — latest authority

XC explicitly corrected the grouping: “B4跟这些不要连起来，因为B4不是模态”. Latent Control States is an independent prompt-framing / dilemma study. Do not place it in the modality chain or describe it as that chain's method source. Remove the cross-links between it and the modal-model project. It remains in Papers & Writing Samples and on its own page.

The modality programme contains only the linguistic analysis, child study, and modal-model project. Cognitive modelling and planned LM internal interventions belong to the latter, so the hand-drawn device still illustrates that research direction. Keep its current design and evidence-status boundaries.

## Cognitive-model bridge, 27 September 2026 — historical grouping, corrected above

XC asked to connect the linguistic analysis, child study, modal model work, and mechanistic methods, and update the homepage device. This section supersedes conflicting descriptions of the figure and three-step chain below.

- Start from linguistic distinctions, express candidate computations in a simple cognitive model, test human predictions independently, and ask whether corresponding computations can be causally identified in an LM. This is the programme being developed, not a completed evidence chain.
- The homepage's existing hand-drawn `LclmCartoon.astro` now has a **24 s loop**: blackboard → small state model → separate child and LM tests → candidate internal alignment marked with a question → state intervention → observations return to revise the account. Keep the slow 1.2 s line boil, Pause, reduced-motion composite, sticky sidebar, and 720 px main column. Edit `design-demos/approach-cartoon/gen.py` and regenerate both outputs.
- `ModalityChain.astro` now has four roles: linguistic analysis; the independent child thesis; a cognitive account and LM comparison in development; and methods from **Latent Control States**, a separate dilemma task. Its present results do not identify a modal circuit. The manuscript stays in preparation.
- The modal-model project has existing diagnostic materials and mixed, uncalibrated runs. The cognitive account is being specified; controlled training and internal causal alignment remain planned. The child thesis still has no LM component and no data. Human–LM algorithmic identity is not claimed.
- Keep the public site in English, omit internal project IDs and private application deliberations, and retain the three-line Papers & Writing Samples list. The HTML CV content and downloadable PDF are unchanged in this update.

## Modality focus, 27 September 2026 — current authority

XC decided that the master's stage focuses only on modality, and that Cross-lingual ProtoBias is downgraded from a research line to a project on the same footing as the street-view course project. This supersedes the 26 September section below where they conflict, and supersedes the "two faces" framing further down as a description of current work (the typicality paper keeps its own page and its closing link to the modality work).

- Portfolio order (home, /research, sidebar index): 01 Current Research: Modality (Three Ways + MA thesis) → 02 Papers & Manuscripts (typicality, Latent Control States) → 03 Course & Technical Projects (ProtoBias, street view) → 04 Writing Samples.
- ProtoBias is a single-author course project (the August 2026 course paper). Status "Completed course project · project report". Its portfolio entry has no cover image and no margin note, matching street view; its detail page keeps the report, code, timeline and demo, but the aside is "About this project", not "Place in the research trajectory".
- /approach opens with the modality focus; typicality and Latent Control States are "other work", not a parallel programme strand. ProtoBias is not mentioned there.
- CV: "Current research: modality" follows Education; "Course and technical projects" replaces "Research and technical projects".

**Later the same day (XC): two sections only.** 01 Current Research: Modality shows the full LCLM chain on one question — Three Ways (linguistic analysis), the MA thesis (human study), and **Modal expressions in language models** (`projects.modalModels`, `/research/modal-language-models`; the Vault's B7). 02 Papers & Writing Samples merges the typicality paper, Latent Control States and the ProtoBias report. Course projects (ProtoBias, street view) are not a section: they appear as one line on `/research` (`id="projects"`, from `courseProjects` in `portfolio.ts`) and in the CV's "Course and technical projects". XC's instruction to show the model study **supersedes the 17 September rule keeping it private**, for this project only. Its page reports no effect sizes: diagnostic runs are uncalibrated and mixed, controlled training has not begun; keep it separate from the thesis, which has no LM component.

## Homepage rebuilt again, 27 September 2026 (evening, XC) — current authority

- **Fig. 1 is now `src/components/LclmCartoon.astro`**, a hand-drawn 20 s loop in the style of Jason Windsor's "The End of the World" (2003), chosen by XC ("我觉得很好啊…我挺想放在首页的"). It shows how the evidence connects: a linguist's blackboard (*might p ≠ I don't know whether p*) → a prediction that splits → a child ("It might be in the box!") and a model ("It might be the outage.") tested separately → results fly back → the linguist adds "a missing distinction?" → the model pushes its printout into the child's place and it is stamped DIFFERENT EVIDENCE (red line 1). **Generated** by `design-demos/approach-cartoon/gen.py`; edit there and re-run. Loop is CSS + SMIL line boil; JS only adds Pause and freezes it under reduced motion, which shows a static composite. Font: Patrick Hand (added to the Base font link). This deliberately breaks the "flat, print-like" register for this one figure; do not spread the cartoon style to other chrome.
- **The barcode figure (`ModalityFigure`) moved to `/research/three-ways`**, using that page's own example (*Where is the key?* / drawer). Its example is now a prop.
- **Homepage layout**: XC first asked for "更窄、更空的排版"; the sticky left column was removed by mistake and **restored at XC's request** ("我要保留"). Keep the sticky left column (name, affiliation, question, section index, links); the main column is capped at 720 px, like the other pages, with more space between sections.
- **Line boil is slow** (three noise seeds over 1.2 s, displacement 2.2): XC found the faster jitter dizzying ("有点眼晕").

## Selected work layout, 27 September 2026 (XC, later the same day) — current authority

- **01 Current Research: Modality** renders `src/components/ModalityChain.astro`, not portfolio cards. The left column names the question each project answers (What does it contribute? / Do children understand it? / Can it be learned from input alone?), a hairline spine with square nodes joins the three, and a return line closes the loop: "Where children or models depart from the predictions, the analysis is revised." Status lines say what exists (draft derivations; contrast being agreed, no data yet; diagnostic runs, training planned). It shows one analysis tested by two separate studies — not "one theory, two systems" (red line 1).
- **02 Papers & Writing Samples** renders `src/components/PaperList.astro`: exactly one line per item, no left column, no blurb, no description — "**Kind year:** *Title* — link · link", writing samples marked by a small mono tag. XC: "废话太多 和空白面积太多，就是三行就够了". Model: Hening Wang's homepage. Do not add descriptions back.
- The "Course projects" line under /research stays for now (ProtoBias appears there and in the list; XC did not ask to remove it).

## Fig. 1 replaced, 27 September 2026 (XC) — current authority for the homepage figure

`src/components/ModalityFigure.astro` replaces `SpaceFigure` (now orphaned) because the animal figure drew typicality. XC rejected three first drafts as "视觉不够高级", asked for Japanese references, chose Ryoji Ikeda over Hara Design Institute and Takram, then chose the barcode draft from three Ikeda variants. Drafts, generator and XC's words: `design-demos/fig1-modality/` (`direction-approved.md`).

What it shows: after *Why is the internet down?*, a band of 120 equal hairlines, each one way things could be; 36 are the outage. Loop of 14 s, pure CSS (plays without scripts; JS only adds Pause): *It might be the outage.* thickens the 36 and rules nothing out; *I don't know whether it's the outage.* sorts the band into two blocks, p and not p, with a question mark; *It's the outage.* removes the other 84. A mono count line reads the state. Reduced motion holds the *might* state. Binding: pure black on white, hairlines, small mono type, no colour, no typicality (all lines equal), "Illustration, not data" in the caption. This supersedes the Fig. 1 sections further down.

## Output categories updated 26 September 2026

XC requested that the site distinguish non-publication project experience and writing samples (ProtoBias, street-view CNN) from manuscripts being developed for publication. XC explicitly confirmed B4 is **in preparation and not submitted**. This update supersedes older topic-first homepage instructions and ProtoBias arXiv plans below.

- Home and /research use src/data/portfolio.ts: Papers & Manuscripts; Research & Technical Projects; Writing Samples; Work in Development.
- Papers: typicality working paper and Latent Control States manuscript in preparation. No accepted/forthcoming status is claimed.
- Projects: Cross-lingual ProtoBias and the completed team street-view CNN project. ProtoBias retains the report, code and version history; no automatic arXiv promise.
- Writing Samples links the typicality working paper and the ProtoBias web report. It does not revive retired essay/blog routes.
- C3’s contribution is training, experimental runs and performance analysis; core implementation belongs to a teammate. Validation metrics must not be called test results.
- Keep the existing white, serif, flat visual register. /approach retains the research programme; existing detail URLs remain stable.
- Private exploratory projects stay private. Application strategy and internal project numbers stay off the public site.
- HTML CV and downloadable PDF are updated together.

## Current project descriptions (17 September 2026)

This update supersedes older instructions that present the MA as a committed computational-training project. Public project questions, summaries, connections, and statuses now live in `src/data/projects.ts`, shared by the homepage, Current Work, and CV. The common question is how linguistic meaning guides inference and how to identify the information used by people and language models.

- ProtoBias: completed controlled model evaluation; first-author revision in preparation. The author approved this framing on 17 September: the original benchmark asks whether models follow explicit semantic constraints despite prototypicality; the cross-lingual extension asks whether this ability and its failure patterns vary with prompt language. Connect it to the broader question of how linguistic information interacts with prior expectations. Choices, error rates, and score margins are behavioural evidence; they do not separately measure semantic strength and typicality strength or identify an internal mechanism. Typicality is benchmark-defined, not measured for each language community. Use the corrected August course-manuscript results, not the superseded June analysis. Do not claim back-translation eliminated translation effects or that correlation established a prototype mechanism.
- Three Ways: formal analysis and diagnostic materials are in development; draft comparative derivations exist; independent judgments are pending.
- MA / Modal language in preschool children (`projects.thesis`; updated 2026-09-24): **settled by XC on 2026-09-23.** A small study of modal language, planned to run alongside an existing study of how preschool children reason about possibilities. The contrast, ages, materials, measures and the author's own contribution are still being agreed; no data exist. The thesis has **no language-model component**; say that model questions are pursued separately, without announcing an order (red line 8). A link between the two tasks would be an association, not evidence that language drives reasoning. The earlier adult reaction-time design and its model-scoring pilot are retired from the thesis copy. The title is a working title (was "Epistemic possibilities in use"). No collaborator or institution names (red line 6). Preserve `/research/learnability` as the existing project URL.
- Latent Control States: behavioural pilots and controlled materials exist; mechanistic tests are being developed. The author explicitly frames this as training in explaining model decisions: behavioural contrasts, competing explanations, candidate internal representations, and controlled interventions. The method can transfer to future language research. Do not turn a proposed intervention into an established mechanism or equate model mechanisms with human cognition.
- Private exploratory work must remain off the public website, including project lists, research-program copy, and both CV versions. The author's 17 September instruction supersedes the previous permission to list it. Internal research notes remain in the Vault.

**Homepage structure (17 September 2026).** Header → Research program → Selected research → Background timeline → Writing → Playground → Contact. The formal analysis and proposed human thesis must remain two distinct entries, each with its own title, description, status, and link, enclosed together by one subtle outer border to show their relationship. Below them, list Cross-lingual ProtoBias as completed model evaluation and Latent Control States as ongoing mechanistic interpretability training. Use short descriptions and honest status lines. Avoid numbered stage cards, duplicate project-group introductions, and a separate exploratory-work section. Retain the original ProtoBias cover and the Connection/Motive margin annotations. On wide screens, notes sit in the outer margins; on intermediate screens, in the existing left column; on phones, below the associated entry.

**Research-card interaction (17 September 2026).** The author explicitly requested the original cards and their motion back. Each of the four projects is a rounded, clickable card using the original 3px hover lift, soft shadow, border transition, title colour change, and 1.03 cover zoom. Keep the shared outer frame around the two related projects still and subtle. Keyboard focus provides equivalent feedback; reduced-motion preferences disable translation and zoom. Do not flatten the cards into static list rows again.

Present each project's scientific question and contribution to the research trajectory in natural academic prose. Application strategy, internal B-numbers, and private supervisor negotiations are not public website content. Keep the English language and existing visual design. The downloadable CV must match the HTML CV.

## What this is

A personal research website for **Xiaochuan Li**, MSc student in Human and AI at UTN Nürnberg. The site exists to support PhD applications (target: late 2026 application window, fall 2027 start).

**Two faces of one question (added 2026-09-20, XC).** The programme question is **how linguistic structure settles what stays available in later processing, and what revises it**. It has two faces at different stages, measuring different parts of the same event: **typicality in referent choice** — a superordinate description narrowing to one candidate — is the **earlier** face, and the published work (ProtoBias evaluation; the working paper at `lingbuzz/010343`, Zenodo concept DOI `10.5281/zenodo.22855036`, CC BY 4.0) concerns **where the narrowing lands**; **epistemic modality** is the **current** face, asking whether the possibility is **held open in between and revised by later evidence**. Present them as endpoint and course of one event, never as two parallel phenomena — parallel phenomena is what red line 5 rules out. ⚠️ **The "course" reading is a direction, not a result.** The paper states plainly that it has an endpoint but no course, and the behavioural study has not begun; no page may imply the process reading has been tested. Data lives in `src/data/projects.ts` as `projects.typicality`; the paper has a page at `/research/typicality-in-referent-choice` and its own section "A second case" on `/research`.

**Positioning (updated 2026-09-14).** Central question: **how structured meaning is represented, processed, and learned**, connecting formal semantics with psycholinguistics and computational language research. Experimental and computational semantics remains the disciplinary anchor; cognitive psychology, experimental methods, and language-model research broaden the forms of evidence and the PhD application range. The **current case study** (Current Work page + homepage Current-work block, NOT the header) is the three-way distinction — *might p* / *might p or might not p* / *I don't know whether p* — and how each changes the discourse and which replies it licenses. It is at the **construct stage**: the brief is under review by a formal semanticist, with no behavioural or model result yet. Falsifiability rests on three criteria — content-specific / persistent / evidence-sensitive. **Shared positioning copy lives in `src/data/program.ts`**; page-specific framing and project records live in the relevant pages. `src/data/research.ts` was retired (2026-09).

**Homepage and IA rebuilt 2026-09-20 (XC), after comparing sites at the same career stage.** Measured homepages: Hening Wang (PhD candidate, Tübingen) 165 words, Sebastian Walter (postdoc) 395, Leonie Weißweiler (assistant professor) 514, Guifu Liu (PhD student) 811 — against 997 here. Their homepages are an index plus a news feed; none explains a research programme on the front page, because the substance is in listed output. This site was compensating for missing output with exposition. Changes: **Writing retired entirely** (5 essays, index, `writing.ts`, RSS; old routes redirect to `/`, files stay in git history); **Playground moved off the homepage** to `/playground` and into the nav; the duplicated "Research program" block removed from the homepage, since the header already states the question and the method in 35 words and `/approach` carries the long version; **a `Latest` section added** — one line per real event, never padded. Homepage is now header → Latest → Selected research → Background → Contact, 723 words. **Nav: Current Work · Research Program · Playground · CV · Contact.** Do not reintroduce a homepage programme essay, and do not pad `Latest`: an empty list is better than an invented one.

**Homepage rebuilt 2026-09-23 (XC): a sticky left column and a figure.** The left column carries the name, degree and university, the application status, the programme question, the three research groups as an index of this page (§1 Typicality and reference, §2 Epistemic modality, §3 Methods, plus Background, highlighted as the reader scrolls), and contact. The main column runs intro → Fig. 1 → Latest → Selected research → Background → Contact. Below 960px the column becomes an ordinary header and the index is hidden. **The portrait moved to `/contact`.** The Motive/Connection notes now sit in each entry's own left column at every width, because the sidebar occupies the page's left margin. **Fig. 1** (`src/components/MappingFigure.astro`, drawing in `src/scripts/mapping-figure.js`) draws one exchange — *There's an animal perched on that branch.* / *It might be a stick insect.* / *I don't know whether it is.* — as the mapping from *animal* onto four members from the paper's opening sentence (bird, dog, octopus, stick insect). Its rule: only what is said is solid. Unsaid members stay faint and resolve only as far as they come to mind (typicality, illustrative weights), never completely; *perched on that branch* rules out dog and octopus (×, exclusion by the description, not reweighting); *might* makes the stick insect solid (◇); *whether* adds an open question; a compare button shows the assertion *It is a stick insect.*, which settles the mapping (═). XC chose to leave the figure unlabelled as a hypothesis ("本来就是示意图"). It plays once when first in view, stops when the reader takes the step buttons, can be paused, and shows the final state statically under reduced motion. It is flat like the rest of the site: the recessed surface `#f6f7f8`, a 1px border, no radius or shadow, ink glyphs and the figure coral `--accent-coral`; a dark screen version was rejected as too abrupt on the white page. Its styles are global with a `mapfig-` prefix because the script writes the prompt and status lines, which scoped styles cannot reach.

**Fig. 1 replaced 2026-09-23 (XC): the possibility space.** `src/components/SpaceFigure.astro`, drawing in `src/scripts/space-figure.js`; `MappingFigure` is orphaned. XC found the exchange-and-mapping figure hard to read and asked for one idea: *animal* → an arrow carrying the context → a square of candidates. The square is everything *animal* allows, a solid field of the letters *animal* drifting left to right (one step per 420ms); eight kinds are written into it in darker capitals built from the same letters (bird, dog, cat, monkey, pig, insect, cow, fish), each covering exactly its share of the square (shares illustrative). After *animal*, dog, bird and monkey are largest and insect small; *in the tree* shrinks dog sharply, grows bird and monkey a little and insect a lot; *it might be an insect* turns insect black and leaves its area unchanged. XC's constraints, all binding: the animal example ("还是用动物的例子吧"); all words horizontal; no dividing lines; the square completely filled ("一定要全部塞满", later "孔隙还是太大了", hence the solid field rather than words on blank space); an automatic loop with no controls ("inthetree出现，然后might出现 循环播放"); words grow and shrink in place, never reorder ("不要这种换位置重组"); slow drift; ink, not colour, marks what is said ("用透明度来表示might"). How: five fixed rows (bird / dog cat / monkey / pig insect / cow fish), chosen by search so that no word moves more than about 20px and each stays near its natural proportions in both states (horse was dropped for pig because it would have been squeezed to a strip); each word is rasterised stretched to its place, extra width going to letter spacing first, and sampled into one fixed character grid, so the letters stay put while the words change size across them. Pause button only; reduced motion shows the final state. The square is at most 360px, with the term, arrow and square centred as one group (XC: "装置尺寸缩小一点").

**Information architecture (A3g §4–5).** Nav: **Current Work** (`/research`) · **Research Program** (`/approach`) · Writing · CV · Contact. Each page has one job. Home = orientation + evidence, ordered header → current work → selected work → research program → writing → timeline → playground → contact (research evidence before biography). Current Work (`/research`, displayed H1 "Current Work", route unchanged) = the present problem, evidence criteria, two empirical questions, honest status, selected work. Research Program (`/approach`) = how the work proceeds in general — must not repeat the whole modality case. CV = conventional, scannable verification, not a second research essay.

**Status reality (do not overstate).** Current stage is the **construct**: the linguistic construct brief (target + diagnostics) is under review by a formal semanticist, before any model or behavioural study — the modality mainline has **no results yet**, so it stays a narrative "Current case", never a project card. The developmental side is **being scoped** — no experiment running, no ethics/participants, no collaborator named publicly. Since 2026-09-23 it is the MA thesis (see the MA entry at the top). **MODUS** (an earlier exploratory methods pilot) has been **removed from the site** (2026-09): it is not one of the current B1–B4 projects and no longer has a page; `/research/modus` redirects to `/research`. **Cross-lingual ProtoBias** is a **first-author paper** with public code (revised version in prep for arXiv) — the strongest concrete output, but capability/methods evidence, not the research identity. Keep these tiers visibly distinct on `/research`. (Last synced to the vault 2026-09-08.)

**Redirects & retired routes.** `/motivation` → `/writing/logic-of-natural-language`; `/research-program` → `/approach`; older project routes (HanGL, ORDO, SNG, Isotrace, Arrowhead, CIY, etc.) → `/research` (see `astro.config.mjs`). Retired in 2026-09: the scroll-portfolio hero, the `/plain` mirror, and `src/data/research.ts`. Many homepage figure components (`HeroAlternatives`, `ResearchMap`, `DecryptedText`, `HeroModality`, …) are now orphaned; they are kept for possible revert but are not imported by any current page.

**Visual register rebuilt 2026-09-20 (XC): flat, print-like, mono-skeletoned.** Prose is **Source Serif 4**; **IBM Plex Sans was dropped entirely** — it carried most of the product feel. **IBM Plex Mono** is kept for the skeleton only: nav, section rules (`// LATEST`), field labels, dates, status lines, DOIs and identifiers. Counts before → after: `border-radius` 36 → 0 (the single exception is `50%` on timeline dots), `box-shadow` 13 → rings only (`0 0 0 Npx`, which mask the line behind a dot), hover `translateY` 13 → 0, `backdrop-filter` 4 → 0 (the nav is a plain rule). Research entries are separated by hairline top rules, not boxed; the nested `research-pair` frame is gone. One link accent (`#17457a`); the twelve `--accent-*` variables survive only because figures use them, and site chrome must not. **Palette settled 2026-09-20 (XC): the page is pure white.** The first pass used a warm paper white (`--color-bg: #fdfdfb`, `--color-surface-2: #f2f2ee`); XC rejected the warm cast, and a check of the six comparison sites (Hening Wang, Guifu Liu, Sebastian Walter, Leonie Weißweiler, Judith Tonhauser, Michael Hahn) found all six on `#fff` or an undeclared browser default, none on a warm tint. The surface layer inverted with it: `--color-surface` was white-on-warm-page (a lift) and is now `#f6f7f8` (a recess), `--color-surface-2` is `#eeeff1`, `--nav-bg` is `#ffffff`. The `@media print` block keeps its own white surfaces and is not affected. **Do not reintroduce a warm or cream background.** **Do not reintroduce cards, shadows, rounded corners, hover lift or frosted glass.** ⚠️ Astro scoped styles cannot reach elements injected with `set:html` — those need `:global()`, which is why `.latest-text :global(a)` exists. ⚠️ The ProtoBias cover PNG still has rounding and a drop shadow baked into the image; it is an asset, not CSS, and is the one thing still out of register.

**Voice (A3g §13).** Prose should read like a careful early-career researcher, not generated academic branding. Avoid the phrases A3g lists — `throughline`, `the point is`, `the order matters`, `what is actually built`, `the current case, not the boundary`, `a mirror, not a blueprint`, `a model organism` (unless argued), serial em-dashes, repeated adjective triples, dramatic headings that make a claim instead of naming the section. British `behaviour` spelling. Before shipping copy, grep public source for these.

**Red lines — do NOT drift back.** (1) Do NOT reintroduce "one theory, two systems", **"human arm" / "LM arm"**, or anything that reads as a running human experiment. (2) Do NOT claim a model's **internal geometry adjudicates Kratzer-worlds vs. Lassiter-degree** — that framing is retired; behaviour first, representation only if behaviour is there, intervention only to test what it carries. Those two analyses remain the competing explanations, but are separated by what a modal *does* downstream. (3) Keep the identity anchored in **structured linguistic meaning** and the methods in formal semantics, psycholinguistics, and computational language research. Do not use "experimental linguistics" (implies a running programme of human experiments) or a generic list such as "language, cognition, AI, and philosophy". (4) Never frame the site *as* "causal inference" / "grounding certification" / "CIY" — methods, not identity. (5) Do NOT reintroduce the three-case-study framing (modals/compounds/generics). (6) **No collaborator names, no institutions on the developmental side.** (7) **Never write "LiT" publicly** — it is the UTN course name; the project is **Latent Control States · DFKI**. (8) Do not announce the internal work order ("linguistics paper first, then children, then LMs") — the site shows research logic and existing output, not a project-management timeline. (9) ~~No `/writing` or standalone page for the working paper until…~~ **Lifted 2026-09-20 by XC, for the typicality paper only.** It is now published (`lingbuzz/010343`; Zenodo DOI) and has a page. Its abstract is 148 words, just under the old 150 floor, and its theoretical contrast — against Kobrock et al. 2024's specificity manipulation — is explicit, while the I/M opposition stays flagged as an untested application hypothesis and the page must keep saying so. **Still in force for the modality paper and anything else pre-publication.**

Live URL: **https://xchuan-li.github.io**
Repo: **https://github.com/xchuan-li/xchuan-li.github.io**

## Stack

- **Astro 5** with MDX + React integrations
- **React 19** islands, used only for interactive demos (loaded via `client:load`)
- **Tailwind 4** via `@tailwindcss/vite`
- **TypeScript** (strict)
- Package manager: **pnpm**
- Deployed via **GitHub Actions** to **GitHub Pages** on every push to `main` (workflow at `.github/workflows/deploy.yml`)
- Dev server: `pnpm dev` → http://localhost:4321
- Build: `pnpm build` → outputs to `dist/`

## File structure

Verified against the repo on 2026-09-20. The previous version of this tree was almost
entirely fiction — it listed a theme toggle, `research.ts`, `writing.ts`, `plain.astro`,
`motivation.mdx`, `rss.xml.ts`, a `/writing` directory and eight components that no longer
exist. Check the tree before trusting it; re-verify it whenever files move.

```
src/
├── layouts/Base.astro              # Shared shell: fixed nav (wordmark + `nav` array), footer,
│                                   # reading-progress bar, optional "On this page" TOC rail.
│                                   # No theme toggle and no pre-paint theme script — light only.
│                                   # `wide` opts out of the 720px container.
├── components/
│   ├── SpaceFigure.astro           # Homepage Fig. 1 (canvas); drawing in src/scripts/space-figure.js
│   ├── ProgressTimeline.astro      # Vertical milestone timeline.   → cross-lingual-protobias
│   ├── ProtoBiasDemo.tsx           # React island, interactive demo. → cross-lingual-protobias
│   │                               # Live user of --accent-coral / --accent-teal.
│   │  ⚠ ORPHANED — nothing imports these. Kept for revert, not reachable from any page:
│   ├── ResearchMap.astro           # old homepage research map
│   ├── MappingFigure.astro         # homepage Fig. 1 until 2026-09-23 (src/scripts/mapping-figure.js)
│   ├── HeroAlternatives.astro, HeroWorlds.astro, LineageTimeline.astro   # old homepage / motivation
│   ├── Leibniz{Freedom,Language,Parallel}Figure.astro   # were /writing/from-leibniz, retired
│   └── DecryptedText.astro         # old homepage text effect
├── data/
│   ├── projects.ts                 # Single source of truth for the project list
│   │                               # (homepage "Selected research" + /research).
│   └── program.ts                  # criteria, questions, openingQuestionsHtml, identityLongHtml.
├── pages/
│   ├── index.astro                 # Home: sticky left column + intro → Fig. 1 → Latest → Selected research → Background →
│   │                               # Contact. `latest` and `researchGroups` are defined inline.
│   ├── approach.astro              # Research Program (the long version of the programme).
│   ├── playground.astro            # RELAY + Information Machines; moved off the homepage.
│   ├── information-machines.astro  # Standalone piece linked from Playground.
│   ├── cv.astro                    # CV (PDF link → /cv.pdf; @media print styles it). /cv.pdf is
│   │                               # printed from /cv with headless Chrome: one A4 page (2026-09-24).
│   ├── contact.astro, 404.astro
│   └── research/
│       ├── index.astro                        # Current Work
│       ├── typicality-in-referent-choice.astro   # the published working paper (B6)
│       ├── three-ways.astro, learnability.astro, latent-control-states.astro
│       └── cross-lingual-protobias.astro (+ cross-lingual-protobias/report-1.astro)
└── styles/global.css               # Design tokens, nav, prose, print stylesheet for /cv.
```

There is no `/writing` directory and no RSS feed — both were retired on 2026-09-20 and the
old routes redirect. Redirects live in `astro.config.mjs`.

## Identity (do not change without asking)

- Display name: **Xiaochuan Li**
- Email: **xiaochuan.li@utn.de** (UTN, used everywhere — preferred over Gmail for academic context)
- GitHub: **github.com/xchuan-li**
- Domain: `xchuan-li.github.io` (free GitHub Pages; may move to custom domain later)
- Languages: site is in **English only** (international academic audience)
- Undergrad: **B.A. Philosophy, Shenzhen University, College of Humanities (2020–2024)**. Senior thesis on Leibniz's *characteristica universalis* (advisor: Zang Yong). The intellectual bridge from undergrad to current ML/causal-interpretability work is real and explicitly thematized in `/writing/from-leibniz`.
- Graduate: **M.Sc. Human and AI, University of Technology Nuremberg (UTN), 2025–2027.**

## Visual / design philosophy

Rewritten 2026-09-20 to describe the site as it now is. The rationale and the
prohibitions live in **"Visual register rebuilt 2026-09-20"** above; this section is the
inventory. The earlier version of this section described a dark-default scroll portfolio
with Inter, a terracotta accent and a frosted nav — none of that survives, and it is gone
rather than kept as history, because a stale spec here gets acted on.

Flat and print-like. No cards, no shadows, no rounded corners, no hover lift, no frosted
glass, no scroll animation, no theme toggle. Serif prose on white, with a monospace
skeleton carrying the structure. Academic-honest tone: no inflated credentials, no skill
bars, no marketing copy.

- **Theme.** Light only. `<html>` ships clean and there is no toggle and no
  `localStorage('theme')`. Tailwind's `dark:` variant is bound to a `.dark` class that
  never exists (`@custom-variant dark` at the top of global.css), so stray `dark:`
  utilities cannot fire on an OS preference. `.light` survives in exactly one place: the
  `:root, :root.light` selector in the `@media print` block.
- **Palette.** Page `#ffffff`. Recessed surfaces `--color-surface: #f6f7f8` and
  `--color-surface-2: #eeeff1`. Ink `--color-text: #16181d`, muted `#4c515c`, dim
  `#8b919c`. Borders are black at 13% / 24% alpha. One link accent,
  `--color-accent: #17457a`. See the register note above for why the background is pure
  white and why the surface layer recesses rather than lifts. The twelve `--accent-*`
  variables (including the warm coral / amber / champagne) exist **only** for figures that
  encode data with them — `ProtoBiasDemo`, `LeibnizFreedomFigure`, `ResearchMap`. Site
  chrome must never reach for them.
- **Fonts.** **Source Serif 4** for all prose — it is bound to `--font-sans`,
  `--font-serif` and `--font-display` alike, so there is no sans/serif contrast to manage.
  **IBM Plex Mono** for the skeleton only: nav, section rules, field labels, dates, status
  lines, DOIs, identifiers, code. Loaded from Google Fonts in Base.astro. Inter, Crimson
  Pro and JetBrains Mono were all removed.
- **Type scale.** Body 16px / 1.7. Long-form prose 17px / 1.75. Page H1 around 1.6rem —
  the old `clamp()` display sizes are gone; nothing on the site is set at hero scale.
  Mono labels sit at 10–12.5px with wide tracking (0.13–0.3em), uppercase.
- **Nav.** Fixed, 60px, `background: var(--nav-bg)` (`#ffffff`) with a 1px bottom rule. No
  `backdrop-filter`. Brand wordmark left, links right, no toggle. Items come from the
  `nav` array in Base.astro: **Current Work (`/research`) · Research Program (`/approach`)
  · Playground · CV · Contact**. ⚠️ The bottom rule was written `-webkit-border-bottom`,
  which is not a property, so the nav rendered with no border at all until it was fixed on
  2026-09-20; the damage came from a regex that was meant to strip `-webkit-backdrop-filter`.
- **Containers.** `.container-narrow` is 720px; `.container-wide` is 1200px. Page-local
  articles set their own `max-width` (the Current Work page uses 42rem).
- **Section rhythm.** A section opens with a mono rule label — `// LATEST`, `// SELECTED
  RESEARCH` — in uppercase with 0.22em tracking and a hairline under it. Entries below are
  separated by hairline top borders, never boxed.
- **Motion.** None in practice. `.fade-in-up`, `.fade-in` and `.fade-delay-*` are still
  defined in global.css but **no page or component uses them**, and `.fade-in-up` already
  has `transform: none`. They are dead code; delete them rather than reviving them.
- **Buttons.** `.btn-primary` / `.btn-secondary` survive in global.css but are used on
  `404.astro` only. They are not part of the current register — do not spread them.
- **Status labels.** Research pages carry a mono eyebrow above the H1 stating real state:
  `First-author paper · in revision for arXiv`, `Collaboration · DFKI · behavioural
  pilots`, `Semantics paper · construct under review`, `Working paper`. The eyebrow states
  state, not the fact of publication — `· published` was cut on 2026-09-20 because the
  lingbuzz handle and the DOI sit two lines below it. `projects.ts` `status` strings follow
  the same rule and are otherwise pure state (`Study complete · first-author manuscript in
  revision`).
- **Copy register.** Terse. No announcing prefixes (`Working paper out:`), no explanatory
  tails appended to identifier lines, no label that names a registry instead of giving the
  identifier (`Zenodo DOI`). Honesty statements stay, but each appears once, in the place
  built for it. `Latest` entries follow the form peers use — title first, nature of the
  item as trailing metadata: *"Typicality in referent choice: what the description leaves
  open. Working paper, lingbuzz/010343, doi:10.5281/zenodo.22855036."*
- **Figures.** ⚠️ The ProtoBias cover PNG still has rounding and a drop shadow baked into
  the image. It is an asset, not CSS, and is the one thing still out of register.

## The research program (high-level — don't summarize wrong)

> **Superseded (2026-09-08) — legacy, do not restore to the live site.** The paragraphs below are from the pre-2026-07 framing: MODUS-as-thesis-flagship, an "inherited verdict method", **Stable Is Not Grounded**, **Isotrace**, **MiniCausalLang**, **Arrowhead**, **HanGL**, **ORDO**. Those axes are **archived** and off the current mainline (see the vault's §9.7). The authoritative positioning is the top of this file plus `src/data/program.ts`: identity = **structured meaning across formal semantics, psycholinguistics, and computational language research**; the current case is **epistemic modality / alternative-maintenance**; the computational question is **learnability from linguistic input**, not internal-geometry adjudication. The current mainline sits at the **construct stage** (brief under review), and the strongest concrete output is the **first-author Cross-lingual ProtoBias paper**. Kept only as historical context.

Central question: **what must a system's representations be like for it to genuinely grasp possibility and necessity — rather than merely behave as if it does?** Asked of language models, with the formal semantics of modality as the criterion layer. Do not present the roadmap as a list of equal projects, and do not frame it as a causal-inference program — causal/interventional methods are how the question is *measured*, not what it is *about*. It is a modality-centred program with an inherited verdict method, a supporting workbench, and off-mainline collaborations.

**The flagship — modal concepts (the forward center).** The Master's thesis (MODUS) asks whether a learner built from language alone develops rich modal representations (necessity/possibility as quantification over a space of alternatives), and when modal distinctions become load-bearing during training. Modality is where the whole program's structure-vs-surface question gets its sharpest, most falsifiable form (hold the modal word fixed, vary the modal base; sever surface correlates and see whether the capacity survives). Cross-lingual variation (可能/必须/一定 vs. *may/must* vs. *können/müssen/dürfen*) is the natural experiment. The thesis gets **no project card until it has results** — it enters as a milestone note.

**The inherited verdict method (first domain: causal structure).**

- **Stable Is Not Grounded** (workshop paper, in submission): a non-circular certification test — establishes `accuracy ⊋ stability ⊋ grounding`, where the deepest cut `SC → {grounded, spurious}` needs **two-sided observability** (benchmark structure stipulated + model side auditable). The §6.1 controlled demo: TF-IDF + LR reaches 0.912 accuracy, fully stable; `do(class-3)` drops it Δ +.408, negative control `do(class-2)` only Δ +.021. Present this as **the method the modality work inherits, proven in its first (causal-structural) domain** — not as the program's identity.
- **Isotrace** (parked diagnostic): behavioral path-tracing — distinct reasoning paths forced to produce distinct output labels. A hop-level upgrade to the binary verdict; kept on the site but withdrawn from the mainline.

**Supporting workbench.**

- **MiniCausalLang**: a workbench that **stipulates a formal-semantic object and projects it to text**, so structure recovery can be tested against a known target. Its first domain is the causal graph; it is being generalised into a **modal-semantic compiler** (a candidate world-set + a ◇/□ constraint → en/de/zh surfaces → graded for isomorphism to the pre-compilation object). This is what makes the certification cut *decidable* — the space of alternatives is known by construction.

**Off-mainline collaborations / range (kept honestly as such).**

- **Arrowhead** (completed thesis pilot): the mechanistic-tractability proof — a real LLM carries a steerable, genuinely-causal direction. Demonstrated range, not the center.
- **Latent Control States**: mechanistic extension (does prompt framing shift a causally relevant latent state?). **Never call this "LiT" publicly** — that is the UTN course name (Learning in Transformation). Do not foreground collaborators or supervision here.
- **Cross-lingual ProtoBias**: applied multilingual/multimodal stress test (semantic content vs. culture-specific prototype shortcuts).
- **HanGL**: cross-lingual grounding on real LLMs (surface Hangul vs. latent Hanja) — off the modality mainline, but the clearest demonstration of the cross-lingual intervention method the modal-typology stage reuses.

## Editing rules

- **Never reproduce the placeholder `Xiaochuan ___`** — name is always "Xiaochuan Li"
- **Never silently change identity fields** (name, email, monogram, GitHub link) — ask first
- **Never add fake citations or quotes** to writing posts — leave bracketed placeholders if needed
- **Don't propose Tailwind classes that aren't in v4 base** — no plugins are installed, plain utility classes only
- **All colored text on colored backgrounds must use the dark stop from the same color family** (see global.css palette comments)
- **Interactive demos (React islands) take their numbers as props** — keep headline figures in the page/data, not hard-coded inside the component, so the page and the demo update together. Current islands: `HanGLDemo.tsx`, `ProtoBiasDemo.tsx`.
- **Reading-progress bar is opt-in** per page via `showProgress={true}` on the Base layout — only use it on long-form research/writing detail pages
- **Section rail is opt-in** per page via `toc={true}` in Astro pages or `toc: true` in MDX frontmatter. Use it for long-form research/writing detail pages with at least two direct `h2`/`h3` headings inside `.prose`; `Base.astro` builds the desktop "On this page" rail automatically, scroll-spies active headings, and falls back to single-column layout on mobile or sparse pages.
- **Project main pages follow one template:** a few-sentence intro → `## Roadmap` (a `ProgressTimeline`) → `## Latest progress` (the most recent milestone, inline), with everything else below. Each `done` milestone gets its own report subpage under the project's path. Full recipe in README "Adding / updating a project page"
- **Don't use HTML `<form>` tags** in React islands (Astro/Tailwind gotcha)

## How updates happen

1. Local edit (VS Code) on `~/Desktop/PhD_Application/xchuan-li.github.io/`
2. `pnpm dev` for local preview at http://localhost:4321
3. Commit + push via GitHub Desktop
4. GitHub Actions auto-builds + deploys (workflow takes 2-3 min)
5. Live at https://xchuan-li.github.io

For new pages: create the `.astro` or `.mdx` file in `src/pages/`. File path determines URL (`src/pages/foo/bar.astro` → `/foo/bar`).

For new interactive demos: write the React component in `src/components/`, then import it in the page with `client:load`. Always pass paper-specific numbers as props.

## What this site is NOT

- Not a blog with comments / sign-ups / analytics
- Not a portfolio site for client work (the scroll-portfolio aesthetic is the visual chassis; the content is still academic — papers, projects, writing)
- Not a Substack / Medium replacement
- Not a place to host real datasets (Drive / HF for that)
- Not internationalized — English only
- Not a place for inflated credentials: no skill-percentage bars, no "creative developer" copy, no claims about expertise the user doesn't have. The user is an MSc student building toward a PhD; the site reflects that.

## Useful commands

```bash
pnpm dev          # local server
pnpm build        # production build
pnpm preview      # preview production build locally
```

## If asked to make stylistic changes

The site's visual language is established: dark-default scroll-portfolio chassis + academic-honest content. Stay inside it unless the user is explicitly redirecting.

- Reuse the existing tokens and classes (`.section`, `.section-label`, `.section-heading`, `.btn-primary/secondary`, `.fade-in-up`, `.areas-card`, `.contact-cta`) before inventing new ones.
- New figures are boxless, use `var(--color-text-*)` and the `--accent-*` vars for data encoding only, and carry a small monospace caption if one is needed. (This rule used to point at `SCHierarchyFigure` as the model; that component no longer exists.)
- Hero/section heading scale is `clamp(...)`-based; don't hard-code px sizes for the display layer.
- If you need a new "skills"-shaped block, copy the `.areas-card` pattern (uppercase label + monospace status tag + thin colored hairline). Don't introduce percentages.
- Inner pages stay narrow (720px) by default via `<Base>`; only the homepage uses `<Base wide={true}>`. Long-form detail pages may opt into the documented `toc` layout, which adds a left rail and widens `.prose` to 70ch on desktop.
- `prefers-reduced-motion` must continue to disable fade-ins and the scroll-indicator animation.
- Print stylesheet must stay light-themed so `/cv.pdf` exports cleanly regardless of the screen theme.

Out of scope without explicit ask: parallax, animated gradients, "creative" cursors, AI-art backgrounds, marketing-style social cards, hero stock photos.
