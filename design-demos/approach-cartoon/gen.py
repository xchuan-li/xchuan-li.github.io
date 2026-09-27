"""Hand-drawn LCLM cartoon for /approach (draft). Pure SVG + CSS + SMIL, no JS.
Style reference (XC): Jason Windsor, "The End of the World" (2003): thick wobbly
outlines, flat fills, choppy low-frame-rate motion, hand lettering.
24 s loop: analysis on a blackboard -> prediction splits to a child and a machine
-> a small cognitive model supplies an intervention hypothesis -> separate results
return to revise the account. No correspondence is presented as an established result."""
import pathlib
OUT = pathlib.Path(__file__).resolve().parent / "lclm-cartoon.html"
CYCLE = 24
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

# A proposed research route, not experimental results. 24 s loop.
vis("c1", 4); vis("c2", 10); vis("pred", 17.5); vis("split", 24)
vis("kid", 27); vis("bot", 30); vis("bub", 33)
vis2("kidarm0", [(27, 43)]); vis("kidarm1", 43); vis("strip", 55)
vis("align", 40, 84); vis("intervene", 50, 84)
vis2("state-open", [(17.5, 49.99)]); vis("state-updated", 50)
fly("planeA", 76, 87, 120, -150); fly("planeB", 76, 87, -120, -150)
vis("rev", 88); vis2("armpoint", [(0.01, 88)]); vis("armscratch", 88)

INK, SKIN = "#141414", "#f2cfa4"
SVG = f'''<svg viewBox="0 0 800 480" role="img" aria-label="Sketch of a proposed research route. Linguistic distinctions lead to a small cognitive model of open possibilities. Its predictions are tested with a child. A robot reveals candidate internal connections; changing a state asks whether the same update occurs inside the language model. Separate observations return to revise the account. The correspondence is an open question, not a reported result.">
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
  <text class="lab" x="24" y="40" stroke="none">a language question</text>

  <!-- blackboard -->
  <path d="M232 44 L604 40 L608 184 L228 187 Z" fill="#9b6b3d"/>
  <path d="M244 54 L594 51 L596 173 L242 176 Z" fill="#2f4a38" stroke-width="2.4"/>
  <g class="chalk" stroke="none">
    <text class="a c1" x="262" y="92">might p  ≠</text>
    <text class="a c2" x="262" y="128">I don’t know whether p</text>
    <g class="a rev"><text x="262" y="163" class="small">revise the account?</text></g>
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

  <!-- A minimal state model: hypothetical, not an empirical cognitive result. -->
  <g class="a pred">
    <path d="M418 189 L418 206" fill="none"/>
    <path d="M310 207 L512 204 L516 298 L308 301 Z" fill="#fff8df" stroke-width="2.4"/>
    <text x="413" y="230" class="lab" stroke="none" text-anchor="middle">a small model</text>
    <text class="a state-open" x="413" y="266" stroke="none" text-anchor="middle" font-size="29">p or q</text>
    <text class="a state-updated" x="413" y="266" stroke="none" text-anchor="middle" font-size="29">q</text>
    <text class="a intervene" x="413" y="288" stroke="none" text-anchor="middle" font-size="18">new evidence: not p</text>
  </g>
  <g class="a split" fill="none"><path d="M336 302 L280 335" marker-end="url(#lc-head)"/><path d="M489 302 L556 336" marker-end="url(#lc-head)"/></g>

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
    <path d="M604 367 L633 392 L658 367 M604 367 L611 409 L633 392 L658 410" fill="none" stroke-width="2.4"/>
    <g fill="#fff" stroke-width="2.4">
      <circle cx="604" cy="367" r="6"/><circle cx="658" cy="367" r="6"/>
      <circle cx="633" cy="392" r="6"/><circle cx="611" cy="409" r="6"/><circle cx="658" cy="410" r="6"/>
    </g>
    <g class="a intervene"><circle cx="604" cy="367" r="9" fill="#e8b33c"/><path d="M598 361 L610 373 M610 361 L598 373" stroke-width="2"/></g>
    <path d="M612 426 L608 458 M652 425 L656 458" fill="none" stroke-width="4"/>
    <path d="M676 380 L684 380" fill="none"/>
    <g class="a strip"><path d="M682 368 L752 366 L754 394 L682 396 Z" fill="#fff" stroke-width="2.4"/><text x="694" y="388" class="num" stroke="none">?</text></g>
    <text x="578" y="466" class="lab" stroke="none">inside an LM</text>
  </g>

  <!-- results fly back -->
  <g class="a planeA"><path d="M170 300 L204 286 L178 314 L182 302 Z" fill="#fff" stroke-width="2.4"/></g>
  <g class="a planeB"><path d="M640 292 L606 280 L632 306 L628 294 Z" fill="#fff" stroke-width="2.4"/></g>

  <!-- A candidate mapping and a paired intervention, explicitly a question. -->
  <g class="a align">
    <path d="M477 270 Q558 286 593 354" fill="none" stroke-dasharray="6 7" stroke-width="2.4"/>
    <text x="511" y="308" class="big" stroke="none">?</text>
    <text x="411" y="384" class="lab" stroke="none" text-anchor="middle">same computation?</text>
  </g>
  <g class="a intervene">
    <text x="413" y="413" class="lab" stroke="none" text-anchor="middle">change a state</text>
    <path d="M496 406 Q549 404 592 375" fill="none" stroke-width="2.4" marker-end="url(#lc-head)"/>
  </g>
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
  .c1,.c2,.pred,.state-open,.split,.kid,.bot,.bub,.kidarm1,.strip,.armpoint,.align {{ opacity:1; }}
  #lc-boil animate {{ display:none; }}
}}
"""

HTML = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>LCLM cartoon · draft</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body><div class="page">
<h2>How the evidence connects</h2>
<p class="p">Linguistic distinctions guide a simple cognitive account. Human studies test its predictions; LM interventions test proposed internal computations. Each can refine the account, without establishing that humans and language models use the same mechanism.</p>
<figure>{SVG}
<figcaption><b>Fig. 2</b><span>A proposed route from linguistic analysis to a cognitive model, human predictions, and LM interventions. Illustration, not results.</span></figcaption></figure>
<p class="note">Draft · hand-drawn style after Jason Windsor’s “The End of the World” (2003) · 24 s loop · pure SVG/CSS, no scripts.</p>
</div></body></html>"""
OUT.write_text(HTML); print(OUT)

COMP = pathlib.Path(__file__).resolve().parents[2] / "src/components/LclmCartoon.astro"
COMP_CSS = "\n".join(kf + rules)
COMP.write_text(f"""---
// Homepage Fig. 1 since 27 September 2026 (XC: "我挺想放在首页的"). Hand-drawn in the
// style of Jason Windsor's "The End of the World" (2003): thick wobbly outlines, flat
// fills, choppy motion. A cognitive model proposes computations; human predictions
// and LM interventions are separate tests. The candidate correspondence is a question.
// This illustration contains no empirical results or claim of a shared mechanism.
// GENERATED by design-demos/approach-cartoon/gen.py — edit there and re-run.
// Loop is CSS + SMIL (no script needed); the script only adds Pause and stops the
// line boil under reduced motion.
---
<figure class="lcfig" aria-label="Figure 1">
  {SVG}
  <figcaption>
    <span class="lcfig-mark">Fig. 1</span>
    <span>A proposed route: build a cognitive model, test its human predictions, and look for corresponding computations in an LM. Illustration, not results. See the <a href="/approach">research program</a>.</span>
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
    .c1,.c2,.pred,.state-open,.split,.kid,.bot,.bub,.kidarm1,.strip,.armpoint,.align {{ opacity:1; }}
  }}
  @media (max-width:600px) {{
    figcaption {{ grid-template-columns:auto 1fr; }}
    .lcfig-pause {{ grid-column:1 / -1; justify-self:start; }}
  }}
</style>
""")
print(COMP)
