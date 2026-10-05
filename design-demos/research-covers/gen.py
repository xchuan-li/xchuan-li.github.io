"""Journal-style covers for three homepage projects (XC, 5 Oct 2026: "像期刊插图那样").
Content unchanged from the 3 Oct versions; only design and layout. Grammar taken from
framing-carry-cover.svg: 420 x 286, white, Arial labels in #283648 / #65717e, 1px #87919c
axis lines, square corners, one blue (#17457a, the heatmap's end colour) and its tint.
Linguistic examples set in Georgia, as examples are in papers. Writes to public/images/research/."""
import pathlib
OUT = pathlib.Path(__file__).resolve().parents[2] / "public/images/research"
PREVIEW = pathlib.Path(__file__).resolve().parent / "live"
INK, MUTED, AXIS, BLUE, TINT = "#283648", "#65717e", "#87919c", "#17457a", "rgb(209,218,228)"
HEAD = '<svg xmlns="http://www.w3.org/2000/svg" width="420" height="286" viewBox="0 0 420 286" role="img" aria-labelledby="title desc">'

def arrow(x1, y1, x2, y2):
    """Thin line with a small open head, pointing to (x2, y2); vertical or horizontal only."""
    if x1 == x2:
        d = 1 if y2 > y1 else -1
        head = f"M{x2-4} {y2-5*d}L{x2} {y2}L{x2+4} {y2-5*d}"
    else:
        d = 1 if x2 > x1 else -1
        head = f"M{x2-5*d} {y2-4}L{x2} {y2}L{x2-5*d} {y2+4}"
    return f'<path d="M{x1} {y1}L{x2} {y2}{head}" fill="none" stroke="{AXIS}" stroke-width="1.3"/>'

# 1 · Fact-checking: source-order design, rounds as a y axis.
cx = (178, 330); bw, bh = 128, 44; r1, r2 = 70, 160
fc = [HEAD, '<title id="title">Two source orders in the checking experiment</title>',
 '<desc id="desc">Participants were randomly assigned to Wikipedia first or ChatGPT first. Round 1 offered optional checks while answering ten questions; round 2 offered the other source for optional double-checking. Sources were shown as static screenshots.</desc>',
 '<rect width="420" height="286" fill="white"/>', f'<g font-family="Arial,sans-serif" fill="{INK}">',
 f'<text x="254" y="22" text-anchor="middle" font-size="18">Random assignment</text>',
 f'<path d="M254 30V42M{cx[0]} 42H{cx[1]}" fill="none" stroke="{AXIS}" stroke-width="1.3"/>',
 arrow(cx[0], 42, cx[0], r1 - 2), arrow(cx[1], 42, cx[1], r1 - 2),
 arrow(cx[0], r1 + bh, cx[0], r2 - 2), arrow(cx[1], r1 + bh, cx[1], r2 - 2),
 f'<path d="M92 {r1}V{r2+bh}" stroke="{AXIS}" stroke-width="1"/>',
 f'<path d="M86 {r1+bh/2}H92M86 {r2+bh/2}H92" stroke="{AXIS}" stroke-width="1"/>',
 f'<g font-size="17" text-anchor="end"><text x="81" y="{r1+bh/2+6}">Round 1</text><text x="81" y="{r2+bh/2+6}">Round 2</text></g>']
for (x, y, name) in [(cx[0], r1, "Wikipedia"), (cx[1], r1, "ChatGPT"), (cx[0], r2, "ChatGPT"), (cx[1], r2, "Wikipedia")]:
    fill, stroke = (TINT, BLUE) if name == "ChatGPT" else ("white", AXIS)
    fc.append(f'<rect x="{x-bw/2}" y="{y}" width="{bw}" height="{bh}" fill="{fill}" stroke="{stroke}" stroke-width="1"/>')
    fc.append(f'<text x="{x}" y="{y+bh/2+7}" text-anchor="middle" font-size="19">{name}</text>')
fc += [f'<path d="M92 236H400" stroke="#ccd2d8" stroke-width="1"/>',
 f'<text x="254" y="264" text-anchor="middle" font-size="16" fill="{MUTED}">Optional checking · 10 questions</text>', '</g></svg>']

# 2 · Child reading: a booktabs table, character alone vs. within a word.
cr = [HEAD, '<title id="title">A Chinese character alone and within a word</title>',
 '<desc id="desc">Illustrative character–word pairs: 龄 and 年龄; 筑 and 建筑. The target character is highlighted within each word. These are example materials, not response data.</desc>',
 '<rect width="420" height="286" fill="white"/>',
 f'<path d="M20 14H400" stroke="{INK}" stroke-width="1.4"/><path d="M20 52H400" stroke="{INK}" stroke-width="0.8"/><path d="M20 272H400" stroke="{INK}" stroke-width="1.4"/>',
 f'<g font-family="Arial,sans-serif" font-size="17" fill="{INK}" text-anchor="middle"><text x="100" y="40">Character</text><text x="310" y="40">Word</text></g>']
for base, (ch, ctx, py1, py2) in zip((124, 230), (("龄", "年", "líng", "niánlíng"), ("筑", "建", "zhù", "jiànzhù"))):
    cr += [f'<g font-family="Songti SC,Noto Serif CJK SC,serif" font-size="60" text-anchor="middle">'
           f'<text x="100" y="{base}" fill="{INK}">{ch}</text><text x="280" y="{base}" fill="{MUTED}">{ctx}</text><text x="340" y="{base}" fill="{BLUE}">{ch}</text></g>',
           arrow(166, base - 21, 226, base - 21),
           f'<g font-family="Georgia,serif" font-style="italic" font-size="16" fill="{MUTED}" text-anchor="middle"><text x="100" y="{base+26}">{py1}</text><text x="310" y="{base+26}">{py2}</text></g>']
cr.append('</svg>')

# 3 · Garden path: set like a numbered example in a linguistics paper. The sentence breaks
# where the reader is led astray; a. and b. give the two bracketings, roles as subscripts.
sub = lambda role: f'<tspan font-family="Arial,sans-serif" font-size="12" letter-spacing="0.6" baseline-shift="sub" fill="{BLUE}">{role}</tspan>'
np_ = lambda: f'<tspan fill="{BLUE}">[the students]</tspan>'
gp = [HEAD, '<title id="title">An initial attachment and the complete English sentence structure</title>',
 '<desc id="desc">While the teacher taught the students waited outside. Initially, the students may be attached as the object of taught. In the complete structure, the students is the subject of waited outside. This illustrates a processing hypothesis.</desc>',
 '<rect width="420" height="286" fill="white"/>',
 f'<g font-family="Georgia,serif" font-style="italic" font-size="21" fill="{INK}"><text x="20" y="34">While the teacher taught the students</text><text x="20" y="61">waited outside.</text></g>',
 f'<path d="M20 80H400" stroke="{AXIS}" stroke-width="1"/>',
 f'<g font-family="Arial,sans-serif" font-size="16" fill="{MUTED}"><text x="20" y="110">a. Initial</text><text x="20" y="182">b. Complete</text></g>',
 f'<g font-family="Georgia,serif" font-size="18" fill="{INK}">',
 f'<text x="34" y="140">[While the teacher taught {np_()}{sub("OBJ")}] <tspan fill="{AXIS}">…</tspan></text>',
 f'<text x="34" y="212">[While the teacher taught]</text>',
 f'<text x="34" y="242">{np_()}{sub("SUBJ")} [waited outside]</text>',
 '</g>', f'<path d="M20 266H400" stroke="{AXIS}" stroke-width="1"/>', '</svg>']

# 1b · Fact-checking results: Table 1 of the report drawn as a plot (means ± SD, questions
# checked of 10). Same numbers as the table; no new statistics. Lines join each group's two
# rounds, so the crossing (opposite to both predictions) is visible at thumbnail size.
GREY = "#9aa0a8"
yv = lambda v: 226 - v * 17          # 0 -> 226, 11 -> 39
xr = {1: 150, 2: 290}
groups = [("Wikipedia first", GREY, {1: (6.24, 2.80), 2: (5.38, 3.90)}, -7),
          ("ChatGPT first",   BLUE, {1: (5.78, 3.64), 2: (7.00, 3.65)},  7)]
fm = [HEAD, '<title id="title">Questions checked in each round, by source order</title>',
 '<desc id="desc">Means and standard deviations of the number of questions checked (of 10). Round 1, first tool: Wikipedia first 6.24 (SD 2.80, n = 29), ChatGPT first 5.78 (SD 3.64, n = 18). Round 2, other tool: Wikipedia first 5.38 (SD 3.90), ChatGPT first 7.00 (SD 3.65). Neither difference was reliable.</desc>',
 '<rect width="420" height="286" fill="white"/>', f'<g font-family="Arial,sans-serif" fill="{INK}">',
 f'<path d="M92 {yv(11)}V{yv(0)}H320" fill="none" stroke="{AXIS}" stroke-width="1"/>']
for v in (0, 5, 10):
    fm.append(f'<path d="M86 {yv(v)}H92" stroke="{AXIS}"/><text x="80" y="{yv(v)+6}" text-anchor="end" font-size="17">{v}</text>')
fm.append(f'<text transform="translate(30 {yv(5.5)}) rotate(-90)" text-anchor="middle" font-size="17">Questions checked</text>')
for r, (lab, sub) in {1: ("Round 1", "first tool"), 2: ("Round 2", "other tool")}.items():
    fm.append(f'<text x="{xr[r]}" y="250" text-anchor="middle" font-size="17">{lab}</text>'
              f'<text x="{xr[r]}" y="270" text-anchor="middle" font-size="15" fill="{MUTED}">{sub}</text>')
for name, col, ms, off in groups:
    (m1, s1), (m2, s2) = ms[1], ms[2]
    fm.append(f'<path d="M{xr[1]+off} {yv(m1)}L{xr[2]+off} {yv(m2)}" stroke="{col}" stroke-width="1.6"/>')
    for r in (1, 2):
        m, sd = ms[r]; x = xr[r] + off
        fm.append(f'<path d="M{x} {yv(m-sd)}V{yv(m+sd)}M{x-4} {yv(m-sd)}H{x+4}M{x-4} {yv(m+sd)}H{x+4}" stroke="{col}" stroke-width="1"/>')
        fm.append(f'<circle cx="{x}" cy="{yv(m)}" r="4.5" fill="{col}"/>')
    fm.append(f'<text x="{xr[2]+22}" y="{yv(m2)+6}" font-size="16" fill="{col}">{name}</text>')
fm += ['</g></svg>']

for name, parts in [("fact-checking-procedure", fc), ("fact-checking-means-cover", fm), ("child-reading-cover", cr), ("garden-path-english-cover", gp)]:
    for d in (OUT, PREVIEW):
        d.mkdir(exist_ok=True); (d / f"{name}.svg").write_text("\n".join(parts) + "\n")
    print("wrote", name)
