## Earlier work as one line each; ProtoBias joins; homepage opening shortened, 27 October 2026 — latest XC instruction (pushed 27 Oct 2026)

XC ▸ The two carousel posters on the homepage no longer pleased him ("有点太大 太花哨"). Options offered and tried in order: B, one row of three small covers in the research-card grammar (built, previewed; XC: "不好看呢感觉" — a photo pair, a plot and Chinese characters side by side do not read as one thing); then, asked how other sites do it (a plain reverse-chronological list; or one small thumbnail per entry, every entry alike; seniors show only "selected"), XC chose C: "c吧". Same message: "把首页开头缩短一点，雪球什么的可以不用说，言简意赅". Earlier the same evening: B1 belongs on the homepage as earlier work, the start of the typicality line ("B1其实就是典型性语言在VLM上面的评测啊……跟我的研究方向挺对口的"; the line runs B1 → lingbuzz/010343 → B5 → the "two-level update" branch, Vault B5a21).

AI ▸ Homepage: `WorkCarousel` is replaced by `WorkList … compact` for tier `earlier` (the one-line rows the course projects use on `/research`: title linked, `kind` in mono on the right; no images; the carousel component stays in the repo, unused; the tried `WorkRow.astro` is deleted). The opening keeps the kicker, the lead question, `bioHtml` and `programmeHtml`; `bioHtml` loses its last two sentences (the link between the two projects and the interest sentence; the lead and the paradigm paragraph say it); the snowball paragraph and `SnowballFigure` are removed from the homepage (`snowballHtml` and the component stay in the repo). `portfolio.ts`: the cross-lingual ProtoBias entry moves from tier `course` to `earlier` (so `/research` lists it there too, as a full row with its thumbnail); the `earlier` tier blurb no longer mentions the deleted garden-path design ("A course evaluation of vision–language models, a master’s course experiment with people, and an undergraduate reading assessment."). Not pushed: XC to see the preview first.

XC ▸ Later, from the live page: the compact rows "不太好看 而且不知道每个项目的内容，就只是一个项目名字 下面一句话介绍内容和时间就可以了". AI ▸ `WorkList` gains a `simple` mode (title in the research-card h4 style with the arrow, then one muted line) used for tier `earlier` on the homepage; new `PortfolioEntry.brief` holds that line for the three entries (what the project is, then when): ProtoBias "Whether an explicit description overrides a typical default in vision–language models: two VLM judges, seven languages, the image pairs held fixed. Course paper, 2026."; fact-checking "Whether starting with ChatGPT rather than Wikipedia makes people double-check less; a class experiment with 47 participants. Winter 2025–26."; child reading "How showing a Chinese character alone or inside a word changes access to its pronunciation; a reading assessment with primary-school children in Shenzhen. September–December 2021." The compact rows stay as they were for the course projects on `/research`.

## B18 preprint on Zenodo linked from the site, 26 October 2026 — latest XC instruction

XC ▸ Published the B18 preprint on Zenodo (Li, X. (2026). What Can Be Learned from Vagueness. Zenodo; version DOI 10.5281/zenodo.23677587, concept DOI 10.5281/zenodo.23677586, CC BY 4.0; Vault B18f8) and asked: "把链接同步到个人网站 然后push". AI ▸ The site links the concept DOI everywhere (it always resolves to the latest version): `projects.vagueness.status` is "Preprint · Zenodo, October 2026"; `/research/vagueness-scale` Status gives the citation with the DOI link and its meta description says "Preprint on Zenodo"; the homepage card (`portfolio.ts`) reads "Project · independent · preprint 2026" with a DOI link; the CV entry ends "Preprint." with a doi link (all variants). `public/cv.pdf` printed again from the local build (A4, two pages) and its links rewritten from `http://localhost:4398` to `https://xchuan-li.github.io` (9 links; none left on localhost). The project page is otherwise unchanged (still a project introduction; no results or numbers on the site). The Vault application PDFs (`_Exports/PhD Application/CV-2026-10-18/`) do not carry the DOI.

## Child-reading poster after Paul Rand, 26 October 2026 — latest XC instruction (not pushed)

XC ▸ The two carousel posters still looked made in one go (same Swiss skeleton: title top left, QR top right, four-column foot). Shown two other traditions (Ikko Tanaka's Japanese modernism, Paul Rand's cut-paper modernism), XC chose Rand for the child-reading poster and asked whether Tanaka could become the design language of the whole site (not started; to be tried as a homepage sample first). AI ▸ `reports/posters-rand/` (`make_pieces.py` → seeded hand-cut outlines in `pieces.json`; `build.py` → `child-reading.html`; `render.sh`; local Futura and STKaiti): warm paper, red, black and yellow; a word game: 龄 alone is a red puzzle piece whose knob holds nothing, and inside 年龄 it locks into 年; free composition, no grid band. Replaces `child-reading-poster.jpg` and `child-reading-poster.pdf`; the Swiss child-reading files are deleted. The fact-checking poster stays Swiss.

## New lead on the CV and Research Program page; cv.pdf re-exported, 26 October 2026 — latest XC instruction

XC ▸ "CV 和 Research Program 页的开头也换成新句子，cv.pdf 一起重新导出". AI ▸ `identityLong` / `identityLongHtml` are now "What is there in language itself that we have not yet discovered?", so the homepage, `/approach` and the CV opening share one source again (the homepage-only `homeLeadHtml` is gone). `public/cv.pdf` printed from the local build (A4, two pages) and its links rewritten from `http://localhost:4398` to `https://xchuan-li.github.io` (9 links; none left on localhost). The Vault application PDFs (`_Exports/PhD Application/CV-2026-10-18/`) still carry the 18 October sentence.

## Homepage: research grouped by variant of language; new lead; Fig. 1 removed, 26 October 2026 — latest XC instruction

XC ▸ Asked whether the homepage opening and the two robot figures still fit the research direction (Vault A2 §1, 24 Oct: "我研究语言内部本身有什么我们还没发现的东西。LM、儿童、病理语言都是语言的变体……"; A2v14, 26 Oct: personal projects B18 → B17 → B5). Proposed that every project is a variant of language: 发展中的语言 (B3), 部件残缺的语言 (B17), 从统计规律中恢复的语言 (LM), 模糊的语言 (B18), 动态的语言 (B5). AI ▸ pointed out that vagueness and composition are properties, not variants, so each project = one property × one variant; a homepage strip and a full properties × variants table on /approach were built and dropped (XC: "太丑 太直白 而且每个不像是一个完整的研究"). A Swiss-style restyle of the whole homepage was also tried the same day and not adopted ("不太好看"; kept on the local branch `swiss-redesign`, not pushed).

Adopted: (1) homepage lead `homeLeadHtml` = "What is there in language itself that we have not yet discovered?" (candidate B; homepage only — the CV and /approach still use `identityLong`); (2) the human-and-robot Fig. 1 (`MeaningBridgeFigure`, kept in the repo) is removed, nothing in its place (an LM drawn as a speaker no longer fits A2s36); (3) Research is grouped by `researchGroups` in `src/data/variants.ts`: "Language learned from statistics · language models" (vagueness, modified nouns, moral framing) and "Language still developing · children" (thesis); each project stays a full card. "Language with parts missing" (B17) joins when it has a public page. Still old: the bio's linking sentence ("both ask how a structure in language… shapes what is understood and chosen") and the robot in the snowball figure.

## Swiss-style intro posters, 26 October 2026 — latest XC instruction (not pushed)

XC ▸ The blue research-highlight posters looked made in one go and thin; the next, darker versions were "太AI了"; look at real human design. Shown three references (Morrison #betterposter, Müller-Brockmann's Swiss posters, Cell Press graphical abstracts), XC chose the Swiss International Typographic Style ("B 我很喜欢这种 整个网站都可以按照这个风格"). AI ▸ `reports/posters-swiss/` (`fact-checking.html`, `child-reading.html`, `render.sh`; local Helvetica Neue and Hiragino Sans GB, no web fonts): grid, flush-left Helvetica, two colours, geometric figures, text in a four-column band at the foot. Fact-checking: grey ground, four diagonal bars after the Juni-Festwochen 1959 poster; bar length = mean answers checked (60 mm per answer), red ChatGPT first, black Wikipedia first; XC found bars alone too simple, so a dot matrix of the raw second-check counts (one dot per person, 0–10; 28 of 47 at 0–1 or 9–10) and one real item (Iris / Pupil) were added. Child reading: black ground after the Tonhalle 1953 poster; 龄 alone in a white circle with two arcs, 年龄 as an outlined and a yellow circle overlapping. The carousel uses both (`fact-checking-highlight.jpg`, `child-reading-poster.jpg`); the child-reading PDF and report-page poster are the Swiss version; the fact-checking Poster link and report page keep the academic poster. The earlier highlight sources are deleted. A site-wide restyle in this style is proposed but not started.

## Carousel slides: poster plus one grey line, 26 October 2026 — latest XC instruction (not pushed)

XC ▸ The card text repeated what the poster says; put the image first and one grey line under it ("图片在前面，下面一行灰色的字简单概括"). AI ▸ `WorkCarousel` slides are now the poster (linked to the project page) and `poster.line` with the entry's links (Report · PDF · Poster); the title, kind and short text are gone from the slide (the title stays in the slide's aria-label). The lines say only what the posters do not: "Course experiment at UTN, 2025–26; designed in a group of three; I did the analysis." and "Undergraduate project in Shenzhen, 2021; I helped run the reading assessments." Both fit on one line at 1280 px.

## Fact-checking highlight poster in the carousel, 26 October 2026 — latest XC instruction (not pushed)

XC ▸ Make an F-style intro poster for the fact-checking experiment for the carousel; keep the academic poster as the PDF download. AI ▸ `reports/fact-checking/highlight/poster.html` → `public/images/research/fact-checking-highlight.jpg` (same layout and type sizes as the child-reading poster). The blue block shows the task as participants met it (a real item, Iris / Pupil, the certainty rating, then the two check orders); the right column: title "Taking a language model’s word for it?", one plain sentence (47 people, two checks, order set at random), the question, and what we saw ("No sign of that … the sample was too small to be sure"). In the carousel the image links to the academic poster PDF; the card's Poster link and the report page still use the academic poster.

## Earlier work as a poster carousel; garden path removed, 26 October 2026 — latest XC instruction (not pushed)

XC ▸ Remove the garden-path project. Put the posters somewhere prominent: earlier work as a horizontal carousel that switches between the child-reading project and the fact-checking experiment, one at a time so the poster can be large ("左右滚动切换，这样一次就只展示一个，图就可以大一点"). The full-width poster inline in the list was "太大了". The child-reading poster need not be a research poster; an advertising style was tried (three directions, then B "flash cards" built) and dropped as too childish. XC then asked for something lighter than an academic poster that introduces the study without details, with natural, not AI-sounding, wording, and said the big Chinese characters felt out of place. Chose F ("research highlight") of three (D magazine feature, E exhibition panel, F research highlight).

AI ▸ Garden-path entry, page (`/research/garden-path-processing`), web text and cover deleted (git keeps them). New `src/components/WorkCarousel.astro` replaces the WorkList for tier `earlier` on the homepage only: one slide per entry (topic, kind, title, short, poster image linked to the PDF, links), arrows and dots, autoplay every 7 s that wraps round, paused on hover or focus and off for reduced motion; the dots sync after scrolling settles. Tested in headless Chrome over CDP at 1280 and phone width (next, autoplay wrap, swipe). `PortfolioEntry.poster` (`src`, `pdf`, size, alt) carries the poster; `/research` keeps the WorkList with the old small covers (fact-checking means plot, child-reading table). Child-reading poster: `reports/child-reading/poster/poster.html` → `public/papers/child-reading-poster.pdf` and `public/images/research/child-reading-poster.jpg`; white page, blue block with the example as tiles (龄 on its own, then 年 + 龄 with pinyin and glosses), headline "Does a word help a child read a character?", one plain sentence on the observation, two short points (the question, a fair test), QR to the report; type sized to stay legible at 720 px; facts as in the web report (one observed child, example characters). Both report pages show their poster under the title block and a "Poster ↓" link (`PaperArticle` prop `poster`).

## Fact-checking poster and card, 26 October 2026 — latest XC instruction (not pushed)

XC ▸ Polish how the ChatGPT fact-checking experiment is described, and put a poster on the site; the course poster (5 March 2026) "不是很学术". Follow standard academic poster design; drop the small credit line at bottom left; new title stressing the human–AI relation, without the narrow name "GPT", linked to the research direction. Chose title A ("Taking a Language Model’s Word for It?" / "How people check answers from an AI chatbot and from an encyclopedia") and the same title on the card.

AI ▸ `public/papers/fact-checking-poster.pdf`, A0 landscape, built by `reports/fact-checking/poster/` (`make_stats_figs.py <raw.csv>` → `stats.json` + figures; `build_poster.py` fills `poster.template.html`; `render.sh` prints with headless Chrome, needs network for Google Fonts). The raw class data (`Data Psych Experiment-1.csv`, XC's course Google Drive) stay out of this public repository. All numbers recomputed from the raw data and identical to the report (means, SDs, Welch t, d). Conventions followed (Reading, Guelph, Argonne, Tufts guides): sans title and headings (Source Sans 3) with serif body (Source Serif 4), title 100 pt, body 30 pt, about 590 words, take-home band at the top, captions that state the finding, UTN logo and a QR code to the report page, contact at the end, no acknowledgements line (XC). The additional analysis (does doubt drive double-checking?) is recomputed with stated coding: accuracy among those who answered all ten (n = 43), certainty among those who rated all ten (n = 45), pairwise complete cases: accuracy–certainty r = .64, accuracy–round-2 r = .05, certainty–round-2 r = −.04. The course poster's accuracy correlations (.632, .166) could not be reproduced from the raw CSV; its certainty–double-check value (−.041, p = .787) could. The two excluded participants declined consent (Consent = n); the report's "lacked a recorded group assignment" is the same two rows. Card: title "Taking a language model’s word for it?", new `short` and `kind`, Poster link; `projects.psyStudy` title and summary updated; report page header gets "Poster ↓". The CV entry and the report title are unchanged.

## B4 and B5 schematic figures, 18 October 2026 (late) — latest XC instruction (pushed 18 Oct 2026)

XC ▸ Liked the B18 concept figure and asked for figures in the same style for B4 and B5; for B5 "就要c" (only the measure panel), for B4 a trolley-problem picture as its own figure; then "B4和5的图更新到网站". AI ▸ `moral-framing-trolley.png` (B4) and `modified-nouns-measure.png` (B5) are added to the project pages under the summary; the homepage cards use title-cropped versions (`…-card.png`) instead of the result covers (`framing-carry*.svg`, `modified-nouns-did-cover.svg`, files kept). Sources and provenance in `public/images/research/README.md`. The B5 card is text-heavy and hard to read at card size; alternative offered to XC: the winged-dog panel (a) of the B5 concept figure. XC ▸ "按现在的预览上线：commit 并推送" — kept as previewed.

## Positioning and B18, 18 October 2026 — latest XC instruction (pushed 18 Oct 2026)

XC ▸ After reading real PhD job ads: language models as a toolbox (training, evaluation, interpretability) for questions from linguistics and cognitive science is the position; cognitive modelling of human data is not a main line (Vault A2s37 §2, A3u18 §7). "定位文字和 B18 都现在改，B18 只写项目介绍不放稿件；上线前给我看预览". XC ▸ After the preview: "开头问题用 A 版，按现在的预览上线：commit、推送，重新生成 cv.pdf 和申请用的三份 CV PDF". AI ▸ Changes:

1. Lead question (`identityLong`, `identityLongHtml`, used on the homepage, /approach and the CV): candidate A, "How does linguistic structure organise and transform information, and what can people and language models tell us about it?" (the old one made people and artificial systems the understanding subjects, against Vault A2s36). Candidate B, kept in a comment: "What does the structure of a language carry, and what can be recovered from language alone?"
2. Kicker above the lead question: "Linguistics & cognitive science × language models as research instruments" (candidate; was "Computational cognitive science × language model interpretability").
3. `programmeHtml` adds training as the third tool ("training shows what can be learned from language alone"); the last bio sentence no longer makes language models subjects ("measured in people and tested with language models"). `metaDescription` lists the current work, B18 first.
4. Cognitive modelling dropped from the contact page and the JSON-LD `knowsAbout` (now computational linguistics, LMs as research instruments, controlled training, interpretability, psycholinguistics, semantics and pragmatics, vagueness, language development, moral framing). `scripts/gen-og.mjs` tagline updated; `og.png` regenerated.
5. B18 on the site: `projects.vagueness`, a Research card after modified nouns (`portfolio.ts`) and `/research/vagueness-scale` — question, idea, four predictions, learners and data, status "Manuscript in preparation"; no manuscript, no results, no numbers. Card cover: panel a of the paper's concept figure ("Who is tall?"; panels a–b were unreadable at card size); the project page shows panels a–b, never panel c (the proposition); provenance in `public/images/research/README.md`. The manuscript goes to a double-blind journal (Open Mind); XC accepted that the page makes the authorship findable.
6. B5 wording follows the 18 October manuscript (no "update" with a model as subject): question and card read "which property answers shift in language models"; the page description and the patching sentence likewise. CV title: "Feature dependency and property answers for modified nouns in language models".
7. CV: B18 entry after modified nouns in all variants (Oct. 2026 –, independent project; note kept to three lines so every variant still prints to two pages); the lm interests sentence adds training from scratch under controlled input, and all three skills lists add "Training small models from scratch". `public/cv.pdf` and the Vault application PDFs (`_Exports/PhD Application/CV-2026-10-18/`) regenerated. Fixed on the way: every CV PDF since 12 October linked the project pages to `http://localhost:4398/…` (printed from the local preview); the PDFs are still printed from the local build, then the link targets are rewritten to `https://xchuan-li.github.io/…` with pypdf.

## Homepage paragraphs shortened, snowball in English, 12 October 2026 (late) — latest XC instruction (pushed 12 Oct 2026)

XC ▸ Shorten all three paragraphs; the snowball in English only, text and figure; a more complex sentence; inside the ball a meaning, a scene, that forms gradually; the robot not opened, shown pushing uphill. AI ▸ `bioHtml` drops the origin clause (logic, learning languages) and the developmental-order sentence (the thesis card under Research still links the thesis to LM work); `programmeHtml` tightened; `snowballHtml` is two sentences without the German/Chinese example. `SnowballFigure.astro` rewritten: the sentence is "The dog that the kids found had wings." (relative clause; ties to the winged-dog project); inside the ball the scene builds word by word (dashed "?" = not yet determined: the dog, who did what to it, what it had), the ball grows with each word, pieces fall off twice and the ball shrinks a little; the robot is closed, leans forward and steps, arms on the ball. XC approved going live ("上线吧"); pushed 12 Oct 2026.

XC ▸ Then: end the first paragraph with two sentences on what links the two projects, that he cares how people and LMs understand and process linguistic structure, so it leads into the next paragraph. AI ▸ Added to `bioHtml` (candidate).

XC ▸ The snowball paragraph opened too abruptly; start with "if we think of meaning as a snowball". AI ▸ `snowballHtml` rewritten that way; "I study … in people and in language models" dropped because the bio now ends on the same point; it closes on a question (candidate).

## Meaning snowball on the homepage, 12 October 2026 — superseded by the entry above

XC ▸ Add a paragraph explaining the concept between the intro and Research, with the animation beside it; shorten the first paragraph a little. AI ▸ `snowballHtml` in `program.ts` (candidate wording, XC to confirm) and `SnowballFigure.astro` (robot pushing a letter-filled snowball uphill along the Fig. 1 tokens; reduced motion shows the final state) sit in `.snowball-block` after the paradigm sentence: text left, figure right, stacked below 680px. `bioHtml` lost the Leibniz / formal-accounts sentence (condensed to one clause; candidate). Fig. 1 unchanged. The art style of the figure is still open (XC asked for style options); superseded the same evening by the English version above.

### Fig. 1 snowball draft, 12 October 2026 — parked, not adopted

XC ▸ Wants the "meaning snowball" (meaning builds up and is lost as a sentence unfolds; Vault A2s34) to run through the applications and the site without giving up the current Fig. 1; proposed a second act: first a robot's head thinking with the snowball rolling in its thought bubble, then a robot pushing the snowball uphill like Sisyphus. Then: the metaphor is good but others may not understand it, and the drafts are not beautiful. AI ▸ Drafts only, in `design-demos/fig1-snowball/` (`gen.py` → `draft.html`; Act 1 copied verbatim from `MeaningBridgeFigure.astro`; Act 2 = thought bubble or pushing scene, snowball as letters or pixels). Nothing in `src/` changed. Fig. 1 stays as it is. Do not iterate the visual in code; first test the metaphor in words (research statement, /approach) and with two or three readers, then collect references or brief a designer.

## CV typography after von der Malsburg, 12 October 2026 — latest XC instruction

XC ▸ Liked the layout of Titus von der Malsburg's CV (LaTeX, TeX Gyre Pagella) and asked for the website CV to follow its font and format. AI ▸ `CvDocument.astro` restyled; content unchanged except date spacing. Font: TeX Gyre Pagella → Palatino → Palatino Linotype → Book Antiqua → URW Palladio L / P052, all system fonts (no webfont is loaded; a device with none of them falls back to the generic serif). E-mail and URLs in the contact table use a typewriter face (Latin Modern Mono / CMU Typewriter → Courier). Centred title block (name, "Curriculum Vitae", month), contact table between two rules (Affiliation and E-mail left, Homepage and GitHub right), the interests paragraph, then regular-weight section headings with no rule. Every section uses one two-column row: date (or skill label) left, entry right. Education: degree bold (`degree: true` in `cv.ts`), non-degree study roman, then institution and country, then the note. Research: bold title, context parts (split at " · ") on their own lines, note, output. Projects stays secondary through roman titles and an italic context run into the note; the smaller grey text of the morning version is gone because the reference sets everything in one size and in black. Employment: **institution**, role, further context lines, note. Dates use spaced en dashes ("2026 – 2027", "2026 –"). Print: A4, 10.6pt, line height 1.3, margins 1.9/2.1/1.8 cm, running head "XIAOCHUAN LI — CV  n" top right from page 2 (Chrome ignores small caps in page-margin boxes, so it is letter-spaced capitals), no footer; all three variants print to two pages. Print overrides sit in the scoped style block because rules in the global block lost on specificity. `public/cv.pdf` regenerated. The Vault application PDFs (`_Exports/PhD Application/CV-2026-10-12/`) are still in the previous layout.

Later the same day, XC ▸ schools were buried in the regular face; in Research the organisation and the project description were set alike; no "Summer"/"Winter" dates, give months; spread the entries out. AI ▸ Three registers now: **bold** = school, project title or employer (Education leads with the school, then country); *italic* = degree, organisation or role, one line (" · " kept inline); roman = what was done. The `degree` flag is gone. More space between entries (screen 0.8rem, print 0.4rem; print margins 1.8/2.1/1.6 cm; still two pages in all variants). Month dates filled only where a record supports them: B.A. Sep. 2020 – Jun. 2024 (CHSI verification), typicality Sep. 2026 (LingBuzz 20 Sep 2026), modified nouns Sep. 2026 – (B5 opened 12 Sep 2026). XC ▸ "差不多估计一下就行" for the rest. AI ▸ Semester-based estimates (not from records): Marburg Oct. 2024 – Jul. 2025 (end per the DSH certificate), moral framing Apr. 2026 – Mar. 2027 (two-semester LiT project), thesis Sep. 2026 –, ProtoBias May – Aug. 2026 (paper dated 2 Aug 2026), street view May – Jul. 2026, fact-checking Nov. 2025 – Feb. 2026, undergraduate thesis Dec. 2023 – May 2024; the internship reads "Sep. – Dec. 2021". Replace any of these when a record turns up. Date column 9.6rem with a 1.1rem gap so the longest ranges do not touch the entry.

Then XC ▸ drop "Curriculum Vitae" and the date under the name; the research statement can be a little longer and should match the homepage. AI ▸ The title block is the name alone. `cv.interests` is now built from `program.ts`: `identityLong` (the homepage lead question) followed by `programmeHtml` (the paradigm paragraph), so the CV and homepage cannot drift; lm adds the methods sentence, cogsci the human-data sentence, general adds nothing (the old "Research interests: …" line repeated the question). Rendered with `set:html`. All variants still print to two pages.

## Trunk and related work, 12 October 2026 — latest XC instruction (pushed 12 Oct 2026)

XC ▸ Present one trunk with related extensions, not parallel fields. The core capability is turning a question from linguistics or cognitive science into language-model experiments (behaviour, interpretability, training); knowing how human data are produced is an added strength. The paradigm sentence must not open with "I" and should speak from the level of the fields. B5 (modified nouns) goes on the site as a project introduction only — no manuscript, no results.

Later the same day, XC ▸ chose paradigm sentence 1; B5 needs a figure; the fact-checking experiment moves to Earlier research experience; the thesis moves to Research, worded so it does not read as "children only": LM work on modality follows but is not part of the thesis. AI ▸ No "Related work" section any more. Research = moral framing → modified nouns → thesis (topic "Modality · human side"; the card says the developmental order is a target for later LM work and that the thesis contains no LM study; same clause added to the CV thesis note). Thesis card wording (XC): first half of option B plus "lays the groundwork for later work on modal language in language models"; no "separate from the thesis" clause on the card (the thesis page still says it includes no LM study). Same groundwork sentence in the CV thesis note. B5 cover (XC: the predictions table was "not scientific enough"): `modified-nouns-did-cover.svg`, generated by `design-demos/research-covers/gen_modified_nouns.py` — mean DiD for dependent vs co-occurring properties in three models, original phrasing, 95% CIs over feature groups; the same numbers as Table 2 of the B5 manuscript. The project page itself still gives no numbers. CV (XC: a "Writing samples" section makes no sense because the manuscripts are writing samples too): two sections, **Research** (moral framing, modified nouns, thesis) and **Projects** — renamed by XC the same day and set in a lighter register (`.projs` in CvDocument: regular-weight titles, smaller muted text, context and note on one line, no indent) to mark it as secondary — (typicality with its citation, ProtoBias, street view, fact-checking, undergraduate thesis; lm and cogsci reorder only). Three Ways is off the CV (no output yet); its web page stays. On the CV, B5 is titled *Property updating in modified nouns in language models* (statement form; the website keeps the question). Research notes are written in parallel: the question, how it is tested, the methods and the state. Education (XC, same day; supersedes the 1 October "selected, transcript-backed coursework" rule): each degree's note states what the stage trained, not a course list — M.Sc.: behavioural experiment design and analysis, cognitive psychology, training neural networks, interpretability methods (order varies by variant); B.A.: formal logic and proof incl. modal logic and Gödel's incompleteness theorems, philosophy of language, psychology of reading. Marburg reads only "German for graduate study". Skills labels no longer wrap (`.kv` key column 8.8rem, nowrap). XC: drop "Year-long project course" and supervisor names. The moral-framing CV context reads "Supervised at DFKI" (homepage card: "Project · 2026–27 · supervised at DFKI · manuscript in preparation"); the thesis CV context reads "M.Sc. thesis, design stage · part of a PhD project at the Max Planck Institute for Human Cognitive and Brain Sciences, Leipzig". XC: unify everywhere — no supervisor names on any page (the undergraduate thesis supervisor is dropped too). Institutions are named in full: "the German Research Center for Artificial Intelligence (DFKI)" on the CV, homepage card, bio and project page; the Max Planck Institute for Human Cognitive and Brain Sciences likewise. Moral-framing page: "supervised at DFKI with biweekly meetings; a manuscript is in preparation"; homepage bio: "is supervised at DFKI" (was "co-supervised by UTN and DFKI"); thesis page: "part of an ongoing PhD project at the Max Planck Institute for Human Cognitive and Brain Sciences in Leipzig", no names. Homepage timeline: Marburg role "German for graduate study", no extra line (`tl-did` renders only when non-empty). The paragraph below describes the first pass of the day.

AI ▸ `programmeHtml` is now the paradigm sentence (candidate 1 of 3, confirmed by XC). Homepage: **Research** = moral framing + modified nouns; **Related work** = thesis + fact-checking experiment; Earlier research experience unchanged. `portfolio.ts` has a new tier `related` (thesis moved there; topic "Human study · children"). New page `/research/modified-nouns` (`projects.modifiers`): question, three accounts, materials and controls, models and measures, exploratory patching, status "Manuscript in preparation"; no numbers, and the human-side companion project is not announced. `/approach` replaces "Understanding human cognition / artificial systems / What connects the work" with four steps (question with a precise contrast → what the human data measure → behaviour under matched controls → inside the model), keeping the limits paragraph. `/research` lede rewritten. CV: same opening line in all variants (variants change the second half), B5 entry added after moral framing, skills grouped as Language models / Human data / Programming, and the "(working proficiency)" qualifier dropped. The `paperTracks` / `PaperList` code is unused leftover. `public/cv.pdf` regenerated from /cv with headless Chrome (A4, two pages); the three application PDFs now live in Vault `_Exports/PhD Application/CV-2026-10-12/` (the 10-01 set was removed).

## B3 narrative extension, 12 October 2026 — latest XC instruction

XC ▸ The thesis should not read as "just a human study": its developmental findings inform later language-model work on modal language, so both the MPI and the DFKI lines lead to language models. Do not say the thesis itself includes language models. Make the developmental order the grammatical subject, not "I plan". AI ▸ `projects.thesis.connection` now says that the order in which children come to distinguish possibility from necessity can serve as a target for studying how language models learn the same distinction; the "Language models" section of `/research/learnability` keeps "includes no language-model study" and says the comparison belongs to separate work. Same wording as the inquiry-email sentence (Vault A3x15 §3, A3x12 2026-10-12). Same day, XC approved the homepage bio too: `bioHtml` inserts the same sentence after the MPI clause; the DFKI sentence is unchanged and now starts a new sentence.

## Project covers as journal figures, 5 October 2026 — latest XC instruction

XC ▸ Covers should look like journal figures, like the moral-framing heatmap; content unchanged. The checking experiment shows its results, not the procedure ("流程图太简单"). AI ▸ Fact-checking cover is Table 1 as a means ± SD plot (`fact-checking-means-cover.svg`); child reading is a booktabs table; garden path is a numbered example with OBJ/SUBJ subscripts. Generator and before-versions: `design-demos/research-covers/`; provenance in `public/images/research/README.md`. A thumbnail table was rejected as unreadable at 196 px. Also fixed: `\cmidrule` leaked into the web report's Table 1 as "2-4(l)5-7"; `build_web.py` now strips it, and the generated HTML was patched the same way.

## Bio institution links, 5 October 2026 — latest XC instruction

XC ▸ Restore the MPI and DFKI links lost in the 3 October bio rewrite. AI ▸ One sentence appended to `bioHtml`: the M.Sc. thesis runs within an ongoing PhD project at MPI CBS (linked), and the moral-framing project is co-supervised by UTN and DFKI (linked). The rest of the 3 October bio is unchanged; it still does not open with modality and does not mention the unpublished modal-choice project.

## Fig. 1: two segmentations, 5 October 2026 — current authority for the homepage figure

XC ▸ The human should say a concrete sentence divided by linguistic structure, and the robot the same sentence divided as a tokenizer divides it: different structures, both use language. Chose draft A; no caption; an everyday sentence with a visible difference; label **humans** (not people).

AI ▸ `MeaningBridgeFigure.astro` keeps the hand-drawn person, robot and boil. Both say *Maybe the kids took my sunglasses.* in speech bubbles sized to the text. Human: bars whose height is the depth of the boundary (syntactic distance, Shen et al. 2018), encoding `[Maybe [[the [kid s]] [took [my [[sun glass] es]]]]]`. Model: real Llama 2 tokens with ids (32k SentencePiece; checked with the tokenizer in TinyLlama-1.1B-Chat-v1.0), equal bars. Red bars are cuts inside a written word: kid|s vs. k|ids, sun|glass|es vs. s|ung|lass|es. GPT-2 was tried first and rejected: it keeps everyday words whole, so the difference was too small. Positions are frozen from `design-demos/fig1-two-segmentations/draft.html`; change the draft and copy the coordinates. No middle element (XC). The figure does not claim the model lacks constituent structure; tokens are its input segmentation, not its grammar. The homepage question keeps *people*. This supersedes the person — "language" — model figure.

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

Research experience contains each project once, with context, contribution and output together. The independent typicality working paper has its own entry and attached citation/links; the latent-control-states manuscript status stays in that project's entry. There is no separate Papers and manuscripts section. Preserve the modality programme's three related components; do not fold LCS into it. Application variants retain their intended emphasis/omissions and share this structure. Do not shrink useful descriptions merely to force one page. All three PDFs live in Vault _Exports/PhD Application/CV-2026-10-01; public/cv.pdf is the general version.

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
- **general** at `/cv` (linked; `/cv.pdf` is printed from it), **lm** at `/cv/lm`, **cogsci** at `/cv/cogsci` — the last two unlinked, `noindex` (Base prop), excluded from the sitemap; PDFs for applications live in the Vault (`_Exports/PhD Application/CV-2026-10-01/`; the 09-28 set was deleted on 2026-10-09).
- Sections: Education · Research (Current · epistemic modality / Earlier) · Papers and manuscripts (citations, own name bold) · Employment · Skills and languages. **Each item appears once**; at most one short note per entry. Layout after Hening Wang's CV (title bold left, context italic, dates right).
- Variants change order, emphasis and omissions only, never what an entry is. LM: modal-LM project first, LCS first among papers, LoRA/Slurm in skills. CogSci: psychology course study first in Earlier with full design details, psychology grades, street view omitted.
- Facts: the course study (W25/26, Foundations in Psychology and Empirical Study Design) was designed by a group of three and adopted for the class-wide study; XC did the analysis (JASP). The IT Service Desk entry uses the wording XC confirmed on 27 Sep (Vault A3x1 §6); duties only, nothing from work data. "Mixed-effects" was dropped (no verified record).

**1 October 2026 (XC) — Research drawn as one programme.** XC found the Research section read as "six parallel things". After comparing Hening Wang's CV (research under positions, one *Methods* line mixing behavioural experiments and LMs) and Polina Tsvilodub's page ("both in humans and machines"), Research is now **one programme entry** — *Epistemic modality in people and language models*, question line "how modal expressions are understood and used, by people and by language models" (XC confirmed) — with one row per method (Formal analysis · Human study · Language models; lm puts Language models first), followed by **Earlier research experience** as one-line rows without notes. Do not split the CV into separate human and LM sections: the combination is the identity. The cogsci variant adds *Reading-difficulty screening in primary-school children* (2022, with the Shenzhen Learning Disorders Association); XC's memory is vague and no documents survive, so it claims only the collaboration. The one-page rule is dropped: early-career academic CVs run 1–2 pages; never pad, never cut useful content to fit. Application PDFs: Vault `_Exports/PhD Application/CV-2026-10-01/`.

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
│   ├── playground.astro            # RELAY + Information Machines + StemmaLM card; moved off the homepage.
│   ├── stemmalm.astro              # StemmaLM (2026-10-28, XC): model-organism registry + chat (chat only
│   │                               # with the local model service; closed on the static site).
│   ├── information-machines.astro  # Standalone piece linked from Playground.
│   ├── cv.astro                    # CV (PDF link → /cv.pdf; @media print styles it). /cv.pdf is
│   │                               # printed from /cv with headless Chrome: two A4 pages (2026-10-12).
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
