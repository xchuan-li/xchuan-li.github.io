# Homepage project figures — direction study

## Project and objective

This is a visual direction study for Xiaochuan Li’s existing academic website. The homepage is already a restrained, text-led academic profile for a researcher working across experimental semantics, computational semantics, language acquisition, and language-model research. The new work must not turn the site into a generic portfolio grid or a decorative technology landing page. Its purpose is narrower and more useful: give each of the four items in “Selected work” one memorable, paper-like visual that helps a potential PhD supervisor, collaborator, or admissions reader understand the project’s research structure before clicking through.

## Audience and use context

Primary readers are faculty members, potential supervisors, collaborators, and technically literate visitors scanning the homepage on a laptop. They may spend only a few seconds deciding which project to open. Secondary readers include peers and general academic visitors. The figures therefore need to work at two distances: at a glance they must make the four projects visibly different; on closer reading their labels must accurately summarize the question or design. The target canvas for comparing directions is a 1440 × 1000 desktop viewport. The eventual production implementation must also stack cleanly on mobile without tiny labels or horizontal scrolling.

## Content that must appear

The study uses the homepage’s real four projects and current status language:

1. “Three Ways of Leaving p Unsettled” — semantics paper, construct under review. The figure should distinguish one-sided possibility, explicit two-sided openness, and an explicit report of non-resolution. It must look like a working construct, not a result.
2. “Master’s thesis: learning these distinctions” — thesis in design. The figure should show the candidate sequence from evidence audit, through controlled input intervention, to generalization tests. Dashed or open forms should communicate that the design is not frozen.
3. “Cross-lingual ProtoBias” — first-author paper in revision for arXiv. The figure should show that image pairs remain fixed while prompts vary across seven languages and two model families, and that the result separates an attribute pattern from an overall language level. It should not repeat the obsolete four-language interactive claim.
4. “Latent Control States” — DFKI collaboration. The figure should make the causal question visible: whether framing changes a causally relevant latent state or merely changes the output, with intervention as the discriminator.

## Existing design context

The current website is light-only, with a cool paper background (#f8f9fa), white surfaces, near-black text (#1b1e24), muted slate text (#5f6672), hairline borders, and a desaturated slate-blue accent (#3d5a73). It uses restrained sans-serif typography with small monospaced uppercase metadata. The homepage has a fixed, quiet navigation bar, a compact portrait-led introduction, and generous vertical spacing. The direction study must keep this recognizable base. No purple gradients, neon glows, emoji icons, invented statistics, generic “AI” imagery, or decorative illustrations are allowed.

## Image and asset decision

Photographic imagery is not content-essential for these four homepage figures. The subject matter is abstract research structure, so native line diagrams, matrices, and schematics are the correct medium. The existing portrait is not repeated in the study. Third-party product logos are unnecessary: model-family names are supporting labels, not brand comparison content. Each figure must be real HTML/CSS/SVG and contain meaningful research structure rather than placeholders.

## Visual mother theme

The shared mother theme is “a research claim as a visible state transition.” Every project asks what remains stable while one thing changes: an utterance changes the discourse state; an input intervention changes what can be learned; a translated prompt changes the linguistic presentation while images stay fixed; a framing intervention may or may not change a causal internal state. Lines, open and filled nodes, parallel alternatives, and controlled interventions therefore form a coherent visual language that belongs specifically to this research program.

## Required variations

All three directions must use the same four projects and the same 1440 × 1000 frame, but they must differ structurally rather than only by color. Direction A uses editorial scale and oversized numbering; Direction B integrates annotated figures into a Distill-like reading flow; Direction C treats the projects as a strict 2 × 2 atlas of numbered research plates. All labels are at least 12 px, body copy at least 14 px, and contrast must remain suitable for normal reading.

