"""Hand-drawn LCLM cartoon for /approach (draft). Pure SVG + CSS + SMIL, no JS.
Style reference (XC): Jason Windsor, "The End of the World" (2003): thick wobbly
outlines, flat fills, choppy low-frame-rate motion, hand lettering.
20 s loop: analysis on a blackboard -> prediction splits to a child and a machine
-> results fly back -> the analysis is revised -> the machine tries to pass its
result off as the child's and gets stamped "different evidence"."""
import pathlib
OUT = pathlib.Path(__file__).resolve().parent / "lclm-cartoon.html"
CYCLE = 20
kf = []   # keyframe CSS
rules = []

def vis(cls, on, off=99.0):
    """Element hidden, pops in at `on`% and out at `off`% of the cycle."""
    kf.append(f"@keyframes lc-{cls} {{ 0%, {on-0.01:.2f}% {{opacity:0}} {on:.2f}%, {off:.2f}% {{opacity:1}} {off+0.01:.2f}%, 100% {{opacity:0}} }}")
    rules.append(f".{cls} {{ animation-name:lc-{cls}; }}")

def vis2(cls, spans):
    """Visible during several spans [(on, off), ...]."""
    pts = ["0% {opacity:0}"]
    for on, off in spans:
        pts += [f"{on-0.01:.2f}% {{opacity:0}}", f"{on:.2f}% {{opacity:1}}", f"{off:.2f}% {{opacity:1}}", f"{off+0.01:.2f}% {{opacity:0}}"]
    pts.append("100% {opacity:0}")
    kf.append(f"@keyframes lc-{cls} {{ {' '.join(pts)} }}"); rules.append(f".{cls} {{ animation-name:lc-{cls}; }}")

def fly(cls, on, off, dx, dy, steps=7):
    kf.append(f"@keyframes lc-{cls} {{ 0%, {on-0.01:.2f}% {{opacity:0; transform:translate(0,0)}} "
              f"{on:.2f}% {{opacity:1; transform:translate(0,0); animation-timing-function:steps({steps},end)}} "
              f"{off:.2f}% {{opacity:1; transform:translate({dx}px,{dy}px)}} {off+0.01:.2f}%, 100% {{opacity:0; transform:translate({dx}px,{dy}px)}} }}")
    rules.append(f".{cls} {{ animation-name:lc-{cls}; }}")

# timeline (percent of 20 s)
vis("c1", 5); vis("c2", 12.5); vis("pred", 17.5); vis("split", 22.5)
vis("kid", 25); vis("bot", 30); vis("bub", 33)
vis2("kidarm0", [(25, 45)]); vis("kidarm1", 45); vis("strip", 47)
fly("planeA", 50, 62, 120, -150); fly("planeB", 50, 62, -120, -150)
vis("rev", 65); vis2("armpoint", [(0.01, 65), (85, 99.9)]); vis2("armscratch", [(65, 85)])
kf.append("@keyframes lc-gag { 0%, 84.99% {opacity:0; transform:translate(0,0)} 85% {opacity:1; transform:translate(0,0); animation-timing-function:steps(5,end)} "
          "90% {opacity:1; transform:translate(-420px,0)} 96.5% {opacity:1; transform:translate(-420px,0); animation-timing-function:steps(3,end)} "
          "99% {opacity:1; transform:translate(0,0)} 99.01%, 100% {opacity:0} }")
rules.append(".gag { animation-name:lc-gag; }")
vis("stamp", 90, 96.5)

INK, SKIN = "#141414", "#f2cfa4"
SVG = f'''<svg viewBox="0 0 800 480" role="img" aria-label="Hand-drawn cartoon. A linguist writes on a blackboard that might p is not the same as I don't know whether p and draws a prediction arrow. The arrow splits: a child is told it might be in the box and points at the box; a machine prints a number. Both results fly back to the blackboard, the linguist scratches their head and adds a missing distinction. Finally the machine pushes its printout into the child's place and it is stamped different evidence.">
<defs>
  <filter id="lc-boil" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1" result="n">
      <animate attributeName="seed" values="1;4;8" dur="1.2s" calcMode="discrete" repeatCount="indefinite"/>
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/>
  </filter>
  <marker id="lc-head" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
    <path d="M1 1 L11 6 L1 11" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>
  </marker>
</defs>
<g filter="url(#lc-boil)" stroke="{INK}" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M8 9 L793 5 L795 473 L5 475 Z" fill="#fff"/>
  <text class="lab" x="24" y="40" stroke="none">the analysis</text>

  <!-- blackboard -->
  <path d="M232 44 L604 40 L608 184 L228 187 Z" fill="#9b6b3d"/>
  <path d="M244 54 L594 51 L596 173 L242 176 Z" fill="#2f4a38" stroke-width="2.4"/>
  <g class="chalk" stroke="none">
    <text class="a c1" x="262" y="92">might p  ≠</text>
    <text class="a c2" x="262" y="128">I don’t know whether p</text>
    <g class="a rev"><text x="262" y="163" class="small">+ a missing distinction?</text></g>
  </g>

  <!-- linguist -->
  <g>
    <path d="M100 96 Q122 66 148 94" fill="none"/>
    <circle cx="122" cy="110" r="26" fill="{SKIN}"/>
    <path d="M97 101 Q110 80 122 86 Q136 78 148 100" fill="#5a3a22"/>
    <circle cx="112" cy="112" r="7" fill="none" stroke-width="2.4"/><circle cx="133" cy="112" r="7" fill="none" stroke-width="2.4"/><path d="M119 112 L126 112" stroke-width="2.4"/>
    <path d="M113 125 Q122 131 131 124" fill="none" stroke-width="2.4"/>
    <path d="M98 138 L146 136 L154 228 L92 231 Z" fill="#5b7fbf"/>
    <path d="M110 231 L104 292 M138 230 L145 292" fill="none" stroke-width="4"/>
    <path d="M100 150 L80 204" fill="none" stroke-width="4"/>
    <g class="a armpoint"><path d="M146 152 L196 124 L224 112" fill="none" stroke-width="4"/><circle cx="226" cy="111" r="5" fill="{SKIN}" stroke-width="2.4"/></g>
    <g class="a armscratch"><path d="M146 152 L174 116 L152 88" fill="none" stroke-width="4"/><circle cx="150" cy="85" r="5" fill="{SKIN}" stroke-width="2.4"/>
      <text x="160" y="72" class="lab" stroke="none">?!</text></g>
  </g>

  <!-- prediction -->
  <g class="a pred"><path d="M418 190 L416 232" fill="none"/><text x="428" y="222" class="lab" stroke="none">prediction</text></g>
  <g class="a split" fill="none"><path d="M416 232 L272 292" marker-end="url(#lc-head)"/><path d="M416 232 L560 292" marker-end="url(#lc-head)"/></g>

  <!-- child -->
  <g class="a kid">
    <path d="M22 240 L236 236 L238 276 L150 278 L170 300 L128 279 L20 281 Z" fill="#fff" class="a bub"/>
    <text x="34" y="266" class="say a bub" stroke="none">It might be in the box!</text>
    <circle cx="150" cy="320" r="21" fill="{SKIN}"/>
    <path d="M131 312 L136 296 L144 308 L150 292 L156 308 L165 296 L169 312" fill="#e8b33c" stroke-width="2.4"/>
    <circle cx="143" cy="321" r="2.4" fill="{INK}" stroke="none"/><circle cx="157" cy="321" r="2.4" fill="{INK}" stroke="none"/>
    <path d="M143 331 Q150 336 157 330" fill="none" stroke-width="2.2"/>
    <path d="M131 342 L169 340 L174 398 L127 400 Z" fill="#e2574c"/>
    <path d="M140 400 L136 440 M162 399 L167 440" fill="none" stroke-width="4"/>
    <path d="M131 350 L114 384" fill="none" stroke-width="4"/>
    <path class="a kidarm0" d="M169 350 L182 386" fill="none" stroke-width="4"/>
    <path class="a kidarm1" d="M169 350 L214 356 L236 360" fill="none" stroke-width="4"/>
    <path d="M244 380 L308 377 L311 438 L241 440 Z" fill="#c89b62"/><path d="M244 380 L230 360 M308 377 L322 358" fill="none" stroke-width="2.6"/>
    <text x="266" y="424" class="big" stroke="none">?</text>
    <text x="186" y="466" class="lab" stroke="none">a child</text>
  </g>

  <!-- machine -->
  <g class="a bot">
    <path d="M556 238 L786 235 L788 276 L690 278 L664 298 L668 278 L554 280 Z" fill="#fff" class="a bub"/>
    <text x="568" y="264" class="say a bub" stroke="none">It might be the outage.</text>
    <path d="M631 300 L631 284" fill="none"/><circle cx="631" cy="279" r="5" fill="#e03a2f"/>
    <path d="M600 302 L664 300 L666 350 L598 352 Z" fill="#b9bec4"/>
    <path d="M612 316 L622 316 L622 326 L612 326 Z M640 316 L650 316 L650 326 L640 326 Z" fill="{INK}"/>
    <path d="M614 338 L648 337" fill="none" stroke-width="2.4"/>
    <path d="M588 352 L676 350 L678 424 L586 426 Z" fill="#b9bec4"/>
    <path d="M604 368 L620 367 M604 380 L628 379" fill="none" stroke-width="2.4"/>
    <path d="M612 426 L608 458 M652 425 L656 458" fill="none" stroke-width="4"/>
    <path d="M676 380 L684 380" fill="none"/>
    <g class="a strip"><path d="M682 368 L752 366 L754 394 L682 396 Z" fill="#fff" stroke-width="2.4"/><text x="694" y="388" class="num" stroke="none">0.71</text></g>
    <text x="672" y="466" class="lab" stroke="none">a model</text>
  </g>

  <!-- results fly back -->
  <g class="a planeA"><path d="M170 300 L204 286 L178 314 L182 302 Z" fill="#fff" stroke-width="2.4"/></g>
  <g class="a planeB"><path d="M640 292 L606 280 L632 306 L628 294 Z" fill="#fff" stroke-width="2.4"/></g>

  <!-- the gag -->
  <g class="a gag"><path d="M682 368 L752 366 L754 394 L682 396 Z" fill="#fff" stroke-width="2.4"/><text x="694" y="388" class="num" stroke="none">0.71</text></g>
  <g class="a stamp" transform="rotate(-9 300 360)"><path d="M186 334 L416 330 L418 386 L184 388 Z" fill="none" stroke="#d22a1e" stroke-width="4"/>
    <text x="198" y="370" class="stampt" stroke="none">DIFFERENT EVIDENCE</text></g>
</g>
</svg>'''

CSS = f"""
:root {{ --serif:"Source Serif 4", Georgia, serif; --mono:"IBM Plex Mono", ui-monospace, monospace; }}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:#fff; color:#16181d; font-family:var(--serif); }}
.page {{ max-width:720px; margin:56px auto; padding:0 16px; }}
h2 {{ font-size:1.35rem; font-weight:600; margin:0 0 .7rem; }}
.p {{ font-size:1rem; line-height:1.72; color:#4c515c; margin:0 0 1.4rem; }}
figure {{ margin:0; }}
svg {{ display:block; width:100%; height:auto; }}
svg text {{ font-family:"Patrick Hand", "Comic Sans MS", cursive; fill:#141414; }}
.chalk text {{ fill:#f4f1e6; font-size:27px; }} .chalk .small {{ font-size:22px; }}
.lab {{ font-size:19px; }} .say {{ font-size:19px; }} .big {{ font-size:34px; }} .num {{ font-size:20px; }}
.stampt {{ font-size:28px; fill:#d22a1e !important; letter-spacing:1px; }}
figcaption {{ display:flex; gap:12px; margin-top:10px; font-size:.86rem; line-height:1.5; color:#4c515c; }}
figcaption b {{ font-family:var(--mono); font-weight:500; font-size:11px; color:#111; white-space:nowrap; padding-top:2px; }}
.note {{ font-family:var(--mono); font-size:11.5px; color:#8b919c; margin-top:28px; line-height:1.6; }}
.a {{ opacity:0; animation-duration:{CYCLE}s; animation-iteration-count:infinite; animation-timing-function:linear; }}
.armpoint {{ opacity:1; }}
{chr(10).join(kf)}
{chr(10).join(rules)}
@media (prefers-reduced-motion: reduce) {{
  .a {{ animation:none !important; opacity:0; }}
  .c1,.c2,.rev,.pred,.split,.kid,.bot,.bub,.kidarm1,.strip,.armpoint {{ opacity:1; }}
  #lc-boil animate {{ display:none; }}
}}
"""

HTML = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>LCLM cartoon · draft</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body><div class="page">
<h2>How the evidence connects</h2>
<p class="p">The three routes can constrain one another: an analysis guides what to test; human and model results can support, challenge, or refine its predictions; and a mismatch can expose a missing distinction. But they answer different questions. A model result does not establish how people understand language.</p>
<figure>{SVG}
<figcaption><b>Fig. 2</b><span>An analysis makes predictions; children and models are tested separately; a mismatch sends the analysis back for revision. A model’s result is not evidence about children.</span></figcaption></figure>
<p class="note">Draft · hand-drawn style after Jason Windsor’s “The End of the World” (2003) · 20 s loop · pure SVG/CSS, no scripts.</p>
</div></body></html>"""
OUT.write_text(HTML); print(OUT)

COMP = pathlib.Path(__file__).resolve().parents[2] / "src/components/LclmCartoon.astro"
COMP_CSS = "\n".join(kf + rules)
COMP.write_text(f"""---
// Homepage Fig. 1 since 27 September 2026 (XC: "我挺想放在首页的"). Hand-drawn in the
// style of Jason Windsor's "The End of the World" (2003): thick wobbly outlines, flat
// fills, choppy motion. It shows how the evidence connects: an analysis predicts; a
// child and a model are tested separately; results come back and the analysis is
// revised; a model's printout pushed into the child's place is stamped "different
// evidence" (red line 1: separate studies, not one theory in two systems).
// GENERATED by design-demos/approach-cartoon/gen.py — edit there and re-run.
// Loop is CSS + SMIL (no script needed); the script only adds Pause and stops the
// line boil under reduced motion.
---
<figure class="lcfig" aria-label="Figure 1">
  {SVG}
  <figcaption>
    <span class="lcfig-mark">Fig. 1</span>
    <span>How the evidence connects. An analysis makes predictions; children and models are tested separately; a mismatch sends the analysis back for revision. A model’s result is not evidence about children. See the <a href="/approach">research program</a>.</span>
    <button type="button" class="lcfig-pause" data-lc-pause hidden>Pause</button>
  </figcaption>
</figure>

<script>
  document.querySelectorAll<HTMLElement>(".lcfig").forEach((fig) => {{
    const svg = fig.querySelector("svg");
    const btn = fig.querySelector<HTMLButtonElement>("[data-lc-pause]");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {{ svg?.pauseAnimations(); return; }}
    if (!btn) return;
    btn.hidden = false;
    btn.addEventListener("click", () => {{
      const paused = fig.classList.toggle("is-paused");
      if (paused) svg?.pauseAnimations(); else svg?.unpauseAnimations();
      btn.textContent = paused ? "Play" : "Pause";
    }});
  }});
</script>

<style>
  .lcfig {{ margin:1.6rem 0 0; }}
  svg {{ display:block; width:100%; height:auto; }}
  svg text {{ font-family:"Patrick Hand", "Comic Sans MS", cursive; fill:#141414; }}
  .chalk text {{ fill:#f4f1e6; font-size:27px; }} .chalk .small {{ font-size:22px; }}
  .lab {{ font-size:19px; }} .say {{ font-size:19px; }} .big {{ font-size:34px; }} .num {{ font-size:20px; }}
  .stampt {{ font-size:28px; fill:#d22a1e !important; letter-spacing:1px; }}
  figcaption {{ display:grid; grid-template-columns:auto 1fr auto; gap:14px; align-items:baseline; margin-top:10px; font-size:.86rem; line-height:1.5; color:var(--color-text-muted); }}
  .lcfig-mark {{ font:500 11px/1.5 var(--font-mono); letter-spacing:.06em; color:var(--color-text); white-space:nowrap; }}
  figcaption a {{ color:var(--color-accent); }}
  .lcfig-pause {{ font:11px/1 var(--font-mono); letter-spacing:.08em; text-transform:uppercase; color:var(--color-text-dim); background:none; border:1px solid var(--color-border); padding:4px 8px; cursor:pointer; }}
  .lcfig-pause:hover {{ color:var(--color-text); border-color:var(--color-border-strong); }}
  .lcfig-pause:focus-visible {{ outline:2px solid var(--color-accent); outline-offset:2px; }}
  .a {{ opacity:0; animation-duration:{CYCLE}s; animation-iteration-count:infinite; animation-timing-function:linear; }}
  .armpoint {{ opacity:1; }}
  .is-paused .a {{ animation-play-state:paused; }}
  /* keyframes and timeline */
{COMP_CSS}
  @media (prefers-reduced-motion: reduce) {{
    .a {{ animation:none !important; opacity:0; }}
    .c1,.c2,.rev,.pred,.split,.kid,.bot,.bub,.kidarm1,.strip,.armpoint {{ opacity:1; }}
  }}
  @media (max-width:600px) {{
    figcaption {{ grid-template-columns:auto 1fr; }}
    .lcfig-pause {{ grid-column:1 / -1; justify-self:start; }}
  }}
</style>
""")
print(COMP)
