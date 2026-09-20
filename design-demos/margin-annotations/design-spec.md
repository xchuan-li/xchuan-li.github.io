# Homepage margin annotations · design specification

## Purpose

This is a focused design study for Xiaochuan Li's existing academic research website. The production homepage already has a restrained, text-led visual system and a clear content hierarchy. The requested change is not a redesign of the site. It is a test of how short authorial annotations can move out of the main reading column and into the page margin so that the central research sequence becomes easier to scan.

The annotation system must communicate that Cross-lingual ProtoBias and Latent Control States are not two unrelated side projects. They supplied evidential constraints that motivate the current semantics-and-learnability programme. At the same time, the treatment must not make those projects appear to be the main research programme, or turn broad philosophical language about “understanding” into an unsupported empirical claim.

## Audience and use

The primary reader is a potential PhD supervisor, collaborator, or admissions reader viewing the homepage on a laptop or desktop and spending only a few seconds on each section. The design must preserve fast recognition of project names and current project status. Secondary readers include mobile visitors, for whom margin annotations must collapse into a legible inline form without reducing the reading order or creating horizontal scrolling.

## Shared content

All three directions must use the same production copy and may shorten it only where a margin note requires a tighter statement.

- Section: `WHY THIS PROGRAM`
- Introductory question: What would show that a model has learned a linguistic distinction, rather than a shortcut that happens to produce the same answer?
- Project 1: `Cross-lingual ProtoBias`
- Project 1 lesson: `Correct behaviour is not enough`
- Project 2: `Latent Control States`
- Project 2 lesson: `Internal correlation is not enough`
- Motivation annotation: `A model can arrive at the right answer for the wrong reason. My longer-term aim is to understand what would let structured meaning, rather than shortcuts, guide its behaviour in new contexts.`
- Dependency annotation: `Once the linguistic distinction is explicit, its learnability becomes testable.`
- Boundary annotation: `Evidence about what a model learns does not explain how a child acquires language, and vice versa.`

The prototype should show enough surrounding content to demonstrate hierarchy: the end of the current programme, the Why this program section with the two earlier-work cards, and the start of the Research program section.

## Visual and technical constraints

- Output: one self-contained HTML file per direction plus one PNG screenshot.
- Shared comparison viewport: 1440 × 900 pixels.
- Production target remains responsive. The prototype must include a breakpoint showing how notes return inline below approximately 900 pixels.
- Preserve the site's light academic palette: near-white page, white surfaces, dark ink, muted grey text, and one desaturated blue-grey accent. Do not introduce gradients, illustrations, icons, or new decorative colour families.
- Preserve the site's existing typographic logic: sans-serif project names and body copy, small tracked monospace metadata and labels.
- Project names must remain the strongest text inside project cards. The lesson labels are subordinate eyebrows.
- Annotations must read as marginalia rather than cards. Avoid rounded filled containers for margin notes. Prefer open whitespace, hairlines, ticks, brackets, or restrained editorial markers.
- The main content column must remain visually stable. No annotation may make project cards too narrow to read comfortably.
- Annotation text must be at least 12px in the prototype and meet normal contrast requirements.
- No JavaScript is required. No third-party assets or images are required because this is a typographic and structural design question.
- Do not edit production source. Write only the assigned prototype and screenshot paths inside `design-demos/margin-annotations/`.

## Required differentiation

Each direction must embody a structurally distinct interpretation, not a colour or type variation:

1. A paper-like margin-note direction: a stable narrow gutter beside the main column, with concise notes aligned to the content they qualify.
2. An editorial-annotation direction: shorter notes attached to specific transitions or cards with fine connector rules or registration marks.
3. A research-principles rail: a more systemic vertical structure that carries motive, dependency, and boundary as a sequence alongside the programme.

Each HTML file must begin with comments recording assumptions, the direction's reasoning, and the content-derived visual motif. The form must come from scholarly marginalia and the logical relationship between claim, evidence, and boundary, not from a generic portfolio template.

## Evaluation criteria

The winning direction should make the project names visible first, clarify the programme's argumentative structure second, and reward slower reading without adding visual noise. It should feel native to the existing homepage, preserve mobile readability, and be simple enough to implement in Astro/CSS without creating a parallel component system.
