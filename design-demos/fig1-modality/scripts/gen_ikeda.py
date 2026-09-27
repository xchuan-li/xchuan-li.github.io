"""Generate three Ikeda-direction drafts of Fig. 1 as static HTML (no JS needed).

Same content in all three: after "Why is the internet down?", three utterances
    It might be the outage. / I don't know whether it's the outage. / It's the outage.
Each mark is one way things could be; the p-set are those where it is the outage.
Pure black on white, hairlines, small type. One 14 s CSS cycle = four states.
"""
import random, pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent
UTT = ["", "It might be the outage.", "I don’t know whether it’s the outage.", "It’s the outage."]
CTX = "Why is the internet down?"

HEAD = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<!-- {comment} -->
<style>
:root {{ --ink:#000; --muted:#4c515c; --dim:#8b919c; --serif:"Source Serif 4", Georgia, serif; --mono:"IBM Plex Mono", ui-monospace, monospace; --cycle:14s; }}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:#fff; color:#16181d; font-family:var(--serif); }}
.page {{ max-width:760px; margin:56px auto; padding:0 16px; }}
.intro {{ font-size:1.08rem; line-height:1.6; color:var(--muted); margin:0 0 32px; }}
figure {{ margin:0; }}
svg {{ display:block; width:100%; height:auto; overflow:visible; }}
.mono {{ font-family:var(--mono); }}
.cap {{ display:flex; gap:14px; align-items:baseline; margin-top:14px; padding-top:8px; border-top:1px solid #000; font-size:.84rem; color:var(--muted); }}
.cap b {{ white-space:nowrap; font-family:var(--mono); font-weight:600; font-size:11px; letter-spacing:.06em; color:#000; }}
.note {{ font-family:var(--mono); font-size:11.5px; line-height:1.6; color:var(--dim); margin-top:32px; }}
.a {{ animation-duration:var(--cycle); animation-iteration-count:infinite; animation-timing-function:cubic-bezier(.65,0,.35,1); }}
@keyframes show-0 {{ 0%,22% {{opacity:1}} 25%,97% {{opacity:0}} 100% {{opacity:1}} }}
@keyframes show-1 {{ 0%,25% {{opacity:0}} 28%,47% {{opacity:1}} 50%,100% {{opacity:0}} }}
@keyframes show-2 {{ 0%,50% {{opacity:0}} 53%,72% {{opacity:1}} 75%,100% {{opacity:0}} }}
@keyframes show-3 {{ 0%,75% {{opacity:0}} 78%,97% {{opacity:1}} 100% {{opacity:0}} }}
.s0 {{ animation-name:show-0; }} .s1 {{ animation-name:show-1; }} .s2 {{ animation-name:show-2; }} .s3 {{ animation-name:show-3; }}
.s0,.s1,.s2,.s3 {{ opacity:0; }}
{css}
@media (prefers-reduced-motion: reduce) {{ .a {{ animation:none !important; }} {reduced} }}
</style></head><body><div class="page">
<p class="intro">Formal analysis spells out linguistic contrasts and their predictions. Human studies test how they shape people's understanding; language-model studies test how specific models use controlled input.</p>
<figure>
{body}
<figcaption class="cap"><b>Fig. 1</b><span>What each utterance does to the open possibilities. Each mark is one way things could be. Illustration, not data.</span></figcaption>
</figure>
<p class="note">{note}</p>
</div></body></html>
"""

def layered(texts, x, y, cls, anchor="start"):
    return "".join(f'<text class="a s{k} {cls}" x="{x}" y="{y}" text-anchor="{anchor}">{t}</text>' for k, t in enumerate(texts) if t)

# ---------------------------------------------------------------- I1 barcode
def barcode():
    N, P, W = 120, 36, 720
    pset = set(random.Random(7).sample(range(N), P))
    pitch = 6
    home = {i: i * pitch + 3 for i in range(N)}
    # partition: p block on the left, not-p block on the right, tighter pitch
    pp, qq = sorted(pset), [i for i in range(N) if i not in pset]
    tp, off, gap = 5, 40, 44
    part = {i: off + k * tp for k, i in enumerate(pp)}
    part.update({i: off + P * tp + gap + k * tp for k, i in enumerate(qq)})
    y0, h = 96, 132
    bars = []
    for i in range(N):
        cls = "p" if i in pset else "q"
        dx = part[i] - home[i]
        bars.append(f'<g class="a mv {cls}" style="--dx:{dx}px"><rect x="{home[i]-0.5}" y="{y0}" width="1" height="{h}"/>'
                    + (f'<rect class="a thick" x="{home[i]-2.5}" y="{y0}" width="5" height="{h}"/>' if i in pset else "") + "</g>")
    pb0, pb1 = off, off + (P - 1) * tp
    qb0, qb1 = off + P * tp + gap, off + P * tp + gap + (N - P - 1) * tp
    brk = (f'<g class="a s2"><path d="M{pb0} 238 v6 H{pb1} v-6 M{qb0} 238 v6 H{qb1} v-6" fill="none" stroke="#000" stroke-width="1"/>'
           f'<text class="lab" x="{(pb0+pb1)/2}" y="260" text-anchor="middle">p</text><text class="lab" x="{(qb0+qb1)/2}" y="260" text-anchor="middle">not p</text>'
           f'<text x="{(pb1+qb0)/2}" y="170" text-anchor="middle" class="q">?</text></g>')
    counts = ["120 possibilities · none ruled out", "36 raised · none ruled out", "36 | 84 · a question: p or not p", "36 remain · 84 ruled out"]
    names = ["open", "might p", "whether p", "p"]
    svg = (f'<svg viewBox="0 0 {W} 300" role="img" aria-label="Illustration: a barcode of possibilities. It might be the outage thickens the outage possibilities; I don’t know whether it’s the outage splits them into two blocks; It’s the outage removes the rest.">'
           f'<line x1="0" y1="0.5" x2="{W}" y2="0.5" stroke="#000"/>'
           f'<text class="ctx" x="0" y="26">{CTX}</text>'
           + layered(UTT, 0, 64, "utt") + layered(names, W, 26, "state", "end")
           + '<g fill="#000">' + "".join(bars) + "</g>" + brk
           + layered(counts, 0, 292, "cnt") + "</svg>")
    css = """
.ctx,.lab,.cnt,.state { font-family:var(--mono); font-size:11px; fill:#000; }
.ctx { fill:var(--dim); } .state { font-weight:600; }
.utt { font-family:var(--serif); font-style:italic; font-size:21px; fill:#000; }
.q { font-family:var(--serif); font-style:italic; font-size:30px; fill:#000; }
.mv { animation-name:part; transform-box:view-box; }
@keyframes part { 0%,48% { transform:translateX(0) } 54%,72% { transform:translateX(var(--dx)) } 78%,100% { transform:translateX(0) } }
.q.mv, .p.mv { }
.thick { animation-name:thick; opacity:0; }
@keyframes thick { 0%,23% {opacity:0} 28%,48% {opacity:1} 53%,73% {opacity:0} 78%,95% {opacity:1} 100% {opacity:0} }
g.q { animation-name:part, gone; }
@keyframes gone { 0%,75% {opacity:1} 79%,95% {opacity:0} 100% {opacity:1} }
"""
    reduced = ".thick{opacity:1} .s1{opacity:1}"
    (OUT / "I1-barcode.html").write_text(HEAD.format(title="Fig. 1 · I1 · Barcode", comment="Direction I1 · Ikeda datamatics: the possibility space as one barcode.", css=css, reduced=reduced, body=svg,
        note="Direction I1 · barcode · one band of equal hairlines; might thickens the p-lines, whether sorts the band into two blocks, the assertion erases the rest. Reference: Ryoji Ikeda, datamatics / test pattern."))

# ---------------------------------------------------------------- I2 test-pattern matrix + state list
def matrix():
    C, R, s, g = 36, 13, 10, 4
    rng = random.Random(3)
    cells = [(c, r) for r in range(R) for c in range(C)]
    pset = set(rng.sample(cells, int(len(cells) * 0.3)))
    out = []
    for (c, r) in cells:
        x, y = c * (s + g), 40 + r * (s + g)
        if (c, r) in pset:
            out.append(f'<rect class="a pdot" x="{x+4}" y="{y+4}" width="2" height="2"/><rect class="a pfull" x="{x}" y="{y}" width="{s}" height="{s}"/>')
        else:
            out.append(f'<rect class="a qdot" x="{x+4}" y="{y+4}" width="2" height="2"/>'
                       f'<path class="a qhatch" d="M{x} {y+.5}h{s}M{x} {y+3.5}h{s}M{x} {y+6.5}h{s}M{x} {y+9.5}h{s}" stroke="#000" stroke-width="1"/>')
    gw = C * (s + g) - g
    lx = gw + 34
    names = ["open", "might p", "whether p", "p"]
    utts = ["(before anything is said)", "It might be the outage.", "I don’t know whether it’s the outage.", "It’s the outage."]
    lst = ""
    for k in range(4):
        y = 52 + k * 44
        lst += (f'<g class="a hl{k}"><text class="state" x="{lx}" y="{y}">{k:02d}  {names[k]}</text>'
                f'<text class="lu" x="{lx}" y="{y+17}">{utts[k] if k else utts[0]}</text>'
                f'<line x1="{lx}" y1="{y+26}" x2="760" y2="{y+26}" stroke="#000" stroke-width=".75"/></g>')
    svg = (f'<svg viewBox="0 0 760 240" role="img" aria-label="Illustration: a matrix of possibilities and a list of the four states.">'
           f'<text class="ctx" x="0" y="20">{CTX}</text>'
           + '<g fill="#000">' + "".join(out) + "</g>" + lst + "</svg>")
    css = """
.ctx,.state { font-family:var(--mono); font-size:11px; fill:#000; } .ctx { fill:var(--dim); } .state { font-weight:600; }
.lu { font-family:var(--serif); font-style:italic; font-size:12.5px; fill:#000; }
.pdot { animation-name:pdot; } @keyframes pdot { 0%,23% {opacity:1} 28%,95% {opacity:0} 100% {opacity:1} }
.pfull { animation-name:pfull; opacity:0; } @keyframes pfull { 0%,23% {opacity:0} 28%,95% {opacity:1} 100% {opacity:0} }
.qdot { animation-name:qdot; } @keyframes qdot { 0%,48% {opacity:1} 53%,95% {opacity:0} 100% {opacity:1} }
.qhatch { animation-name:qhatch; opacity:0; } @keyframes qhatch { 0%,48% {opacity:0} 53%,72% {opacity:1} 77%,100% {opacity:0} }
.hl0,.hl1,.hl2,.hl3 { opacity:.22; }
.hl0 { animation-name:hl0 } .hl1 { animation-name:hl1 } .hl2 { animation-name:hl2 } .hl3 { animation-name:hl3 }
@keyframes hl0 { 0%,22% {opacity:1} 25%,97% {opacity:.22} 100% {opacity:1} }
@keyframes hl1 { 0%,25% {opacity:.22} 28%,47% {opacity:1} 50%,100% {opacity:.22} }
@keyframes hl2 { 0%,50% {opacity:.22} 53%,72% {opacity:1} 75%,100% {opacity:.22} }
@keyframes hl3 { 0%,75% {opacity:.22} 78%,97% {opacity:1} 100% {opacity:.22} }
"""
    reduced = ".pdot{opacity:0} .pfull{opacity:1} .hl1{opacity:1}"
    (OUT / "I2-matrix.html").write_text(HEAD.format(title="Fig. 1 · I2 · Matrix", comment="Direction I2 · Ikeda test pattern: a matrix of cells beside an indexed list of states.", css=css, reduced=reduced, body=svg,
        note="Direction I2 · matrix · cells start as dots; might fills the p-cells, whether hatches the rest so both answers are marked, the assertion clears them. The list on the right indexes the state. Reference: Ryoji Ikeda, test pattern / site navigation."))

# ---------------------------------------------------------------- I3 score: four columns, static, red cursor
def score():
    N, P = 34, 11
    pset = set(random.Random(11).sample(range(N), P))
    names = ["open", "might p", "whether p", "p"]
    utts = ["(before anything is said)", "It might be the outage.", "I don’t know whether it’s the outage.", "It’s the outage."]
    colw, L = 190, 150
    def lines(k):
        out = []
        pp, qq = sorted(pset), [i for i in range(N) if i not in pset]
        for i in range(N):
            if k == 2:
                y = (pp.index(i) * 4) if i in pset else (P * 4 + 16 + qq.index(i) * 4)
            else:
                y = i * 4
            y += 2
            isp = i in pset
            if k == 3 and not isp: continue
            w = 3 if (isp and k in (1, 3)) else 0.75
            out.append(f'<line x1="0" x2="{L}" y1="{y}" y2="{y}" stroke="#000" stroke-width="{w}"/>')
        if k == 2:
            out.append(f'<path d="M{L+8} 2 h4 v{(P-1)*4} h-4 M{L+8} {P*4+18} h4 v{(N-P-1)*4} h-4" fill="none" stroke="#000" stroke-width=".75"/>')
        return "".join(out)
    cols = ""
    for k in range(4):
        x = k * colw
        cols += (f'<g transform="translate({x} 0)"><line x1="0" y1="0" x2="0" y2="14" stroke="#000"/>'
                 f'<text class="idx" x="8" y="11">t{k}</text><text class="state" x="8" y="34">{names[k]}</text>'
                 f'<g transform="translate(8 58)">{lines(k)}</g></g>')
    svg = (f'<svg viewBox="0 -26 760 276" role="img" aria-label="Illustration: four columns showing the possibilities before anything is said, after might p, after whether p, and after p.">'
           f'<line x1="0" y1="14.5" x2="760" y2="14.5" stroke="#000"/>' + cols
           + f'<rect class="a cursor" x="8" y="42" width="6" height="6" fill="#e00"/>'
           + "".join(f'<text class="lu" x="{k*colw+8}" y="{58+34*4+26}">{t}</text>' for k, t in enumerate(utts[:2]))
           + f'<text class="lu" x="{2*colw+8}" y="{58+34*4+26}">I don’t know whether</text><text class="lu" x="{2*colw+8}" y="{58+34*4+42}">it’s the outage.</text>'
           + f'<text class="lu" x="{3*colw+8}" y="{58+34*4+26}">{utts[3]}</text>'
           + f'<text class="ctx" x="0" y="-14">{CTX}</text></svg>')
    css = """
.ctx,.idx,.state { font-family:var(--mono); font-size:11px; fill:#000; } .ctx,.idx { fill:var(--dim); } .state { font-weight:600; }
.lu { font-family:var(--serif); font-style:italic; font-size:13px; fill:#000; }
.cursor { animation-name:cursor; animation-timing-function:steps(1,end); }
@keyframes cursor { 0% {transform:translateX(0)} 25% {transform:translateX(190px)} 50% {transform:translateX(380px)} 75% {transform:translateX(570px)} 100% {transform:translateX(0)} }
"""
    (OUT / "I3-score.html").write_text(HEAD.format(title="Fig. 1 · I3 · Score", comment="Direction I3 · Ikeda score: four states side by side, read like a timeline; a red cursor marks the current step.", css=css, reduced="", body=svg,
        note="Direction I3 · score · all four states on the page at once, read left to right like a timeline; the only colour is a red cursor. Reference: Ryoji Ikeda, site index and score layouts."))

barcode(); matrix(); score()
print("ok")
