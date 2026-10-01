# Project figures

- `framing-carry.svg` and `framing-carry-mobile.svg`: landscape and portrait renderings of the complete 28-layer × 7-position table in the final project presentation (25 September 2026, slide 6). Frozen rounded values and aggregation definition are in `src/data/figures/framing-carry.json`; regenerate with `node scripts/gen-research-heatmap.mjs`. No cells are omitted. Equal absolute carry has equal colour intensity on either side of zero. Colours locate effective single-site interventions; they do not establish a unique natural pathway.
- `protobias-language.svg`: vector export of the existing language odds-ratio figure used in the ProtoBias course report. Existing points and intervals are preserved.
- `modal-accounts.svg` and `preschool-association.svg`: design schematics based on the current project outlines, not experimental results.
- Street-view and checking-study figures are reused from `public/papers/` without changes.

The homepage and research index share captions and accessible descriptions in `src/data/portfolio.ts`. Keep sample sizes, interval definitions, project status and interpretation limits when changing the layout.

## Compact covers (latest layout)

Listings now show four small right-side covers without visible captions. Planned-study schematics are omitted. `framing-carry-cover.svg` is a viewport of the complete grid body, with the full labelled figure retained as a separate asset. Covers are static and non-clickable. The portrait figure is retained as an asset but is no longer used in listings.
