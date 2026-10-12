"""Cover for /research/modified-nouns (12 Oct 2026).

XC asked for a scientific figure instead of the predictions table. Values are the frozen E36
analyses, original phrasing, add set, DiD (target minus common modifiers, nats) with 95% CIs
from a cluster bootstrap over feature groups — the same numbers as Table 2 of the B5 manuscript.
Source (Vault): B-Research/B5-property-constraint-composition/content-layer/alex_v4/results/
E36_combined/analysis_v4.json (Qwen-7B, Llama-8B) and 4504124/analysis_v4.json (Qwen-14B),
keys "<model> / P1_original" -> add -> dependent / bundle -> did.

Run: python3 design-demos/research-covers/gen_modified_nouns.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / "public/images/research/modified-nouns-did-cover.svg"

# model label, colour, x offset, (dependent mean, lo, hi), (co-occurring mean, lo, hi)
MODELS = [
    ("Qwen2.5-14B", "#17457a", -9, (33.00, 25.39, 41.24), (5.03, 2.56, 7.50)),
    ("Qwen2.5-7B", "#5b7fa6", 0, (22.50, 18.12, 27.34), (4.85, 2.05, 7.41)),
    ("Llama-3.1-8B", "#9aa0a8", 9, (7.02, 5.15, 9.21), (3.39, 1.65, 4.97)),
]

X_AXIS, X_DEP, X_COO = 78, 214, 336
Y0, Y_TOP, V_TOP = 226, 36, 42.0


def y(v: float) -> float:
    return round(Y0 - v * (Y0 - Y_TOP) / V_TOP, 2)


parts = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="286" viewBox="0 0 420 286" role="img" aria-labelledby="title desc">',
    '<title id="title">Dependent properties move more than co-occurring ones</title>',
    '<desc id="desc">Mean update (DiD, nats; target minus common modifiers) after adding a feature, with 95% confidence intervals over 13 feature groups, original phrasing. '
    + " ".join(f"{m}: dependent {d[0]:.1f} [{d[1]:.1f}, {d[2]:.1f}], co-occurring {c[0]:.1f} [{c[1]:.1f}, {c[2]:.1f}]." for m, _, _, d, c in MODELS)
    + "</desc>",
    '<rect width="420" height="286" fill="white"/>',
    '<g font-family="Arial,sans-serif" fill="#283648">',
    f'<path d="M{X_AXIS} {Y_TOP - 4}V{Y0}H404" fill="none" stroke="#87919c" stroke-width="1"/>',
]
for v in (0, 20, 40):
    parts.append(f'<path d="M{X_AXIS - 6} {y(v)}H{X_AXIS}" stroke="#87919c"/><text x="{X_AXIS - 11}" y="{y(v) + 6}" text-anchor="end" font-size="17">{v}</text>')
parts.append(f'<text transform="translate(24 {(Y0 + Y_TOP) / 2}) rotate(-90)" text-anchor="middle" font-size="16">Update (nats)</text>')
parts.append(f'<text x="{X_DEP}" y="250" text-anchor="middle" font-size="17">Dependent</text><text x="{X_DEP}" y="270" text-anchor="middle" font-size="15" font-style="italic" fill="#65717e">can fly</text>')
parts.append(f'<text x="{X_COO}" y="250" text-anchor="middle" font-size="17">Co-occurring</text><text x="{X_COO}" y="270" text-anchor="middle" font-size="15" font-style="italic" fill="#65717e">has a beak</text>')

for label, col, dx, d, c in MODELS:
    xd, xc = X_DEP + dx, X_COO + dx
    parts.append(f'<path d="M{xd} {y(d[0])}L{xc} {y(c[0])}" stroke="{col}" stroke-width="1.6"/>')
    for x, (m, lo, hi) in ((xd, d), (xc, c)):
        parts.append(f'<path d="M{x} {y(lo)}V{y(hi)}M{x - 4} {y(lo)}H{x + 4}M{x - 4} {y(hi)}H{x + 4}" stroke="{col}" stroke-width="1"/>')
        parts.append(f'<circle cx="{x}" cy="{y(m)}" r="4.5" fill="{col}"/>')
    parts.append(f'<text x="{xd - 12}" y="{y(d[0]) + 5}" text-anchor="end" font-size="15" fill="{col}">{label}</text>')

parts.append("</g></svg>")
OUT.write_text("\n".join(parts) + "\n", encoding="utf-8")
print("wrote", OUT)
