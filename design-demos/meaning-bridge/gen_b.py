"""Fig. 1 draft B, "from a human finding to an LM question" (XC, 29 Sep 2026). Standalone demo; the site
is untouched. Same hand-drawn style as the other figures (after Jason Windsor, "The End
of the World", 2003).

Three beats, one per clause of the paradigm:
  1. What people tell apart: "see" -> must, "heard" -> might.
  2. An explicit model states the distinction: one scale vs. two variables
     (strength + source); their predictions for the two items differ.
  3. What explains the LM: same items; the casing opens; is there a source variable
     inside, or just the word "see"?
Illustration only: no results, no winner between the models, no shared mechanism.
Writes meaning-bridge.html next to this file."""
import pathlib
HERE = pathlib.Path(__file__).resolve().parent
CYCLE = 28
kf, rules = [], []

def vis(cls, on, off=99.0):
    kf.append(f"@keyframes mb-{cls} {{ 0%, {on-0.01:.2f}% {{opacity:0}} {on:.2f}%, {off:.2f}% {{opacity:1}} {off+0.01:.2f}%, 100% {{opacity:0}} }}")
    rules.append(f".{cls} {{ animation-name:mb-{cls}; }}")

def vis2(cls, spans):
    pts = ["0% {opacity:0}"]
    for on, off in spans:
        pts += [f"{on-0.01:.2f}% {{opacity:0}}", f"{on:.2f}% {{opacity:1}}", f"{off:.2f}% {{opacity:1}}", f"{off+0.01:.2f}% {{opacity:0}}"]
    pts.append("100% {opacity:0}")
    kf.append(f"@keyframes mb-{cls} {{ {' '.join(pts)} }}"); rules.append(f".{cls} {{ animation-name:mb-{cls}; }}")

def step(cls, on, off):
    """Caption line: dim, full strength during its beat."""
    kf.append(f"@keyframes mb-{cls} {{ 0%, {on-0.01:.2f}% {{opacity:.32}} {on:.2f}%, {off:.2f}% {{opacity:1}} {off+0.01:.2f}%, 100% {{opacity:.32}} }}")
    rules.append(f".{cls} {{ animation-name:mb-{cls}; }}")


# Beat 1 (0–24 %): a finding from human studies.
vis("chart", 1); vis("barA", 4); vis("barB", 8); vis("why", 13)
# Beat 2 (25–50 %): linguistic analysis.
vis("ar12", 25); vis("mA", 28); vis("mB", 34); vis("pred", 41); vis("ring", 46)
# Beat 3 (51–77 %): computational models and LM tests.
vis("ar23", 51); vis("ansA", 55); vis("ansB", 59)
vis2("plate", [(0.02, 64.99)]); vis("door", 65); vis("t1", 68); vis("t2", 73)
# Beat 4 (78–99 %): back.
vis("rev", 79); vis("back", 87)
step("s1", 0, 24); step("s2", 25, 50); step("s3", 51, 77); step("s4", 78, 99)

INK, SKIN, CHALK, CHALK2 = "#141414", "#f2cfa4", "#f4f1e6", "#f2d16b"
ARIA = ("Sketch in four steps. 1: a finding from human studies, a chart where people choose must more often "
        "after seeing evidence than after hearing it, marked why. 2: a blackboard states two rival accounts, one "
        "confidence scale or two variables, strength and source, with predictions that differ. 3: the accounts "
        "are tested on a language model; its casing opens to ask whether a source variable, or just the word saw, "
        "explains its answers. 4: arrows return to revise the account and to raise a new question for human "
        "studies. Illustration, not results.")

SVG = f'''<svg viewBox="0 0 800 480" role="img" aria-label="{ARIA}">
<defs>
  <filter id="mb-boil" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1" result="n">
      <animate attributeName="seed" values="1;4;8" dur="1.2s" calcMode="discrete" repeatCount="indefinite"/>
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/>
  </filter>
  <marker id="mb-head" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
    <path d="M1 1 L11 6 L1 11" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>
  </marker>
  <marker id="mb-chalk" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M1 1 L11 6 L1 11" fill="none" stroke="{CHALK}" stroke-width="2.2" stroke-linejoin="round"/>
  </marker>
</defs>
<g filter="url(#mb-boil)" stroke="{INK}" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
  <path d="M8 9 L793 5 L795 473 L5 475 Z" fill="#fff"/>
  <g stroke="none">
    <text class="st" x="121" y="36" text-anchor="middle">1 · a human finding</text>
    <text class="st" x="400" y="36" text-anchor="middle">2 · rival accounts</text>
    <text class="st" x="679" y="36" text-anchor="middle">3 · model and LM tests</text>
  </g>

  <!-- ===== 1: a finding from human studies ===== -->
  <g class="a chart">
    <path d="M18 52 L226 49 L228 198 L16 200 Z" fill="#fff8df" stroke-width="2.6"/>
    <text class="sm" x="52" y="74" stroke="none">chose “must”</text>
    <path d="M44 80 L44 170 L212 170" fill="none" stroke-width="2.4"/>
    <text class="sm" x="90" y="191" stroke="none" text-anchor="middle">saw</text>
    <text class="sm" x="160" y="191" stroke="none" text-anchor="middle">heard</text>
  </g>
  <path class="a barA" d="M72 170 L72 92 L108 90 L110 170 Z" fill="#5b7fbf" stroke-width="2.4"/>
  <path class="a barB" d="M142 170 L141 140 L178 139 L180 170 Z" fill="#5b7fbf" stroke-width="2.4"/>
  <text class="why a why" x="198" y="122" stroke="none" text-anchor="middle">why?</text>
  <g transform="translate(-20,-40)">
    <circle cx="150" cy="300" r="21" fill="{SKIN}"/>
    <path d="M131 292 L136 276 L144 288 L150 272 L156 288 L165 276 L169 292" fill="#e8b33c" stroke-width="2.4"/>
    <circle cx="143" cy="301" r="2.4" fill="{INK}" stroke="none"/><circle cx="157" cy="301" r="2.4" fill="{INK}" stroke="none"/>
    <path d="M143 311 Q150 316 157 310" fill="none" stroke-width="2.2"/>
    <path d="M131 322 L169 320 L174 378 L127 380 Z" fill="#e2574c"/>
    <path d="M140 380 L136 426 M162 379 L167 426" fill="none" stroke-width="4"/>
    <path d="M131 330 L114 364 M169 330 L186 364" fill="none" stroke-width="4"/>
  </g>

  <!-- ===== 2: linguistic analysis ===== -->
  <path class="a ar12" d="M230 122 L252 122" fill="none" stroke-width="2.6" marker-end="url(#mb-head)"/>
  <path d="M258 55 L542 52 L545 322 L255 325 Z" fill="#9b6b3d"/>
  <path d="M268 65 L532 63 L534 312 L266 314 Z" fill="#2f4a38" stroke-width="2.4"/>
  <g stroke="none">
    <g class="a mA">
      <text class="chalk sm2" x="340" y="96" text-anchor="middle">one scale</text>
      <text class="chalk" x="340" y="138" text-anchor="middle">evidence</text>
      <text class="chalk" x="340" y="190" text-anchor="middle">confidence</text>
      <text class="chalk" x="340" y="242" text-anchor="middle">must / might</text>
    </g>
    <g class="a mB">
      <text class="chalk sm2" x="462" y="96" text-anchor="middle">two variables</text>
      <text class="chalk" x="462" y="138" text-anchor="middle">evidence</text>
      <text class="chalk" x="422" y="190" text-anchor="middle">strength</text>
      <text class="chalk" x="502" y="190" text-anchor="middle">source</text>
      <text class="chalk" x="462" y="242" text-anchor="middle">must / might</text>
    </g>
    <g class="a pred">
      <text class="chalk hi" x="340" y="288" text-anchor="middle">saw = heard</text>
      <text class="chalk hi" x="462" y="288" text-anchor="middle">saw ≠ heard</text>
    </g>
  </g>
  <g fill="none" stroke="{CHALK}" stroke-width="2.2">
    <g class="a mA"><path d="M340 146 L340 170" marker-end="url(#mb-chalk)"/><path d="M340 198 L340 222" marker-end="url(#mb-chalk)"/></g>
    <g class="a mB"><path d="M452 146 L430 170" marker-end="url(#mb-chalk)"/><path d="M472 146 L495 170" marker-end="url(#mb-chalk)"/>
      <path d="M426 198 L450 222" marker-end="url(#mb-chalk)"/><path d="M498 198 L474 222" marker-end="url(#mb-chalk)"/></g>
    <ellipse class="a ring" cx="502" cy="184" rx="33" ry="18" stroke="{CHALK2}" stroke-width="2.4"/>
  </g>

  <!-- ===== 3: computational model and LM tests ===== -->
  <path class="a ar23" d="M547 92 L570 92" fill="none" stroke-width="2.6" marker-end="url(#mb-head)"/>
  <path d="M576 52 L784 55 L786 132 L574 130 Z" fill="#fff8df" stroke-width="2.6"/>
  <g stroke="none">
    <text class="a ansA rec" x="592" y="86">saw → must</text>
    <text class="a ansB rec" x="592" y="117">heard → might</text>
  </g>
  <g transform="translate(47,-112)">
    <path d="M631 290 L631 276" fill="none"/><circle cx="631" cy="271" r="5" fill="#e03a2f"/>
    <path d="M600 292 L664 290 L666 338 L598 340 Z" fill="#b9bec4"/>
    <path d="M612 306 L622 306 L622 316 L612 316 Z M640 306 L650 306 L650 316 L640 316 Z" fill="{INK}"/>
    <path d="M614 328 L648 327" fill="none" stroke-width="2.4"/>
    <path d="M588 340 L676 338 L678 412 L586 414 Z" fill="#b9bec4"/>
    <path d="M604 355 L633 380 L658 355 M604 355 L611 397 L633 380 L658 398" fill="none" stroke-width="2.4"/>
    <g fill="#fff" stroke-width="2.4">
      <circle cx="604" cy="355" r="6"/><circle cx="658" cy="355" r="6"/>
      <circle cx="633" cy="380" r="6"/><circle cx="611" cy="397" r="6"/><circle cx="658" cy="398" r="6"/>
    </g>
    <g class="a plate"><path d="M588 340 L676 338 L678 412 L586 414 Z" fill="#9aa0a6"/><path d="M664 372 L670 372" fill="none" stroke-width="4"/></g>
    <g class="a door"><path d="M678 338 L722 326 L724 402 L678 412 Z" fill="#9aa0a6" stroke-width="2.6"/></g>
    <path d="M612 414 L610 436 M652 413 L654 436" fill="none" stroke-width="4"/>
  </g>
  <g class="a t1">
    <path d="M536 196 Q592 222 652 258" fill="none" stroke-dasharray="6 7" stroke-width="2.4" marker-end="url(#mb-head)"/>
    <text class="tag" x="598" y="296" stroke="none" text-anchor="middle">a source</text><text class="tag" x="598" y="318" stroke="none" text-anchor="middle">variable?</text>
  </g>
  <g class="a t2">
    <path d="M756 346 Q764 300 722 276" fill="none" stroke-dasharray="6 7" stroke-width="2.4" marker-end="url(#mb-head)"/>
    <text class="tag" x="782" y="372" stroke="none" text-anchor="end">or the word “saw”?</text>
  </g>

  <!-- ===== 4: back ===== -->
  <g class="a rev">
    <path d="M650 344 Q560 396 472 334" fill="none" stroke-width="2.6" marker-end="url(#mb-head)"/>
    <text class="tag" x="566" y="406" stroke="none" text-anchor="middle">revise the account</text>
  </g>
  <g class="a back">
    <path d="M700 400 Q420 492 156 398" fill="none" stroke-dasharray="7 8" stroke-width="2.6" marker-end="url(#mb-head)"/>
    <text class="tag" x="400" y="466" stroke="none" text-anchor="middle">a new question for human studies?</text>
  </g>
</g>
</svg>'''

HTML = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fig. 1 draft B · from a human finding</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
* {{ box-sizing:border-box; }}
body {{ margin:0; background:#fff; color:#16181d; font-family:"Source Serif 4", Georgia, serif; }}
.page {{ max-width:720px; margin:48px auto 64px; padding:0 16px; }}
.kicker {{ font:500 11px/1.5 "IBM Plex Mono", monospace; letter-spacing:.12em; text-transform:uppercase; color:#8b919c; margin:0 0 .6rem; }}
.intro {{ font-size:1.07rem; line-height:1.7; color:#4c515c; margin:0 0 1.4rem; }}
figure {{ margin:0; }}
svg {{ display:block; width:100%; height:auto; }}
svg text {{ font-family:"Patrick Hand", "Comic Sans MS", cursive; fill:{INK}; }}
.st {{ font-size:20px; }} .sm {{ font-size:17px; }} .why {{ font-size:28px; fill:#d22a1e; }} .chalk.sm2 {{ font-size:17px; fill:#cfd8c9; }} .lab {{ font-size:20px; }} .card {{ font-size:20px; }} .rec {{ font-size:23px; }}
.say {{ font-size:24px; }} .tag {{ font-size:20px; }}
.chalk {{ fill:{CHALK}; font-size:19px; }} .chalk.sm {{ font-size:17px; fill:#cfd8c9; }} .chalk.hi {{ fill:{CHALK2}; }}
.steps {{ list-style:none; margin:12px 0 0; padding:0; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }}
.steps li {{ font-size:.86rem; line-height:1.45; color:#16181d; border-top:2px solid #16181d; padding-top:.45rem; }}
.steps b {{ display:block; font:500 11px/1.5 "IBM Plex Mono", monospace; letter-spacing:.06em; margin-bottom:.15rem; }}
.foot {{ display:flex; justify-content:space-between; align-items:baseline; gap:1rem; margin-top:12px; font-size:.82rem; color:#8b919c; }}
button {{ font:11px/1 "IBM Plex Mono", monospace; letter-spacing:.08em; text-transform:uppercase; color:#8b919c; background:none; border:1px solid rgba(0,0,0,.13); padding:5px 9px; cursor:pointer; }}
button:hover {{ color:#16181d; border-color:rgba(0,0,0,.3); }}
.note {{ margin-top:2.4rem; padding-top:1rem; border-top:1px solid rgba(0,0,0,.13); font:12px/1.7 "IBM Plex Mono", monospace; color:#8b919c; }}
.a, .steps li {{ animation-duration:{CYCLE}s; animation-iteration-count:infinite; animation-timing-function:linear; }}
.a {{ opacity:0; }}
.paused .a, .paused .steps li {{ animation-play-state:paused; }}
{chr(10).join(kf)}
{chr(10).join(rules)}
@media (prefers-reduced-motion: reduce) {{
  .a {{ animation:none !important; opacity:0; }}
  .chart,.barA,.barB,.why,.ar12,.mA,.mB,.pred,.ring,.ar23,.ansA,.ansB,.door,.t1,.t2,.rev,.back {{ opacity:1; }}
  .steps li {{ animation:none; opacity:1; }}
}}
@media (max-width:560px) {{ .steps {{ grid-template-columns:1fr; gap:8px; }} }}
</style></head>
<body><div class="page" id="page">
<p class="kicker">Fig. 1 draft B · not on the site</p>
<p class="intro">I start from findings in human studies, state what they imply in explicit linguistic terms, and test those accounts in computational models and language models.</p>
<figure>
{SVG}
<ol class="steps">
  <li class="s1"><b>1 · Human studies</b>A finding that needs explaining: whether people say “must” depends on how they know.</li>
  <li class="s2"><b>2 · Rival accounts</b>Variables, rival accounts, and predictions that tell them apart.</li>
  <li class="s3"><b>3 · Models and LMs</b>Test the accounts in model fits, in LM behaviour, and inside the LM.</li>
  <li class="s4"><b>4 · Back</b>Results revise the account and can raise new questions for human studies.</li>
</ol>
<div class="foot"><span>Illustration, not results.</span><button type="button" id="pause">Pause</button></div>
</figure>
<p class="note">Draft B · four steps, {CYCLE} s loop · pure SVG/CSS · items after Degen et al. 2019 (strength × source); bar heights and answers are illustrative, not the paper’s findings.</p>
</div>
<script>
  const page = document.getElementById("page"), svg = page.querySelector("svg"), btn = document.getElementById("pause");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {{ svg.pauseAnimations(); btn.hidden = true; }}
  btn.addEventListener("click", () => {{
    const p = page.classList.toggle("paused");
    p ? svg.pauseAnimations() : svg.unpauseAnimations();
    btn.textContent = p ? "Play" : "Pause";
  }});
</script>
</body></html>"""
(HERE / "meaning-bridge-b.html").write_text(HTML)
print(HERE / "meaning-bridge-b.html")

# ---- site component (XC, 29 Sep 2026: "B 上线") ----
STEPS = """<ol class="steps">
    <li class="s1"><b>1 · Human studies</b>A finding that needs explaining: whether people say “must” depends on how they know.</li>
    <li class="s2"><b>2 · Rival accounts</b>Variables, rival accounts, and predictions that tell them apart.</li>
    <li class="s3"><b>3 · Models and LMs</b>Test the accounts in model fits, in LM behaviour, and inside the LM.</li>
    <li class="s4"><b>4 · Back</b>Results revise the account and can raise new questions for human studies.</li>
  </ol>"""
COMP = HERE.parents[1] / "src/components/MeaningBridgeFigure.astro"
COMP.write_text(f"""---
// Homepage Fig. 1 since 29 September 2026 (XC, draft B): LM research is prompted and
// constrained by human research. A finding from human studies -> linguistic analysis
// states variables, rival accounts and predictions -> computational models and LMs test
// them -> results revise the account and can raise new human questions. Items after
// Degen et al. 2019 (strength x source); bar heights and answers are illustrative.
// GENERATED by design-demos/meaning-bridge/gen_b.py — edit there and re-run.
---
<figure class="mbfig" aria-label="Figure 1">
  {SVG}
  {STEPS}
  <figcaption>
    <span class="mbfig-mark">Fig. 1</span>
    <span>Illustration, not results. See the <a href="/approach">research program</a>.</span>
    <button type="button" class="mbfig-pause" data-mb-pause hidden>Pause</button>
  </figcaption>
</figure>

<script>
  document.querySelectorAll<HTMLElement>(".mbfig").forEach((fig) => {{
    const svg = fig.querySelector("svg");
    const btn = fig.querySelector<HTMLButtonElement>("[data-mb-pause]");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {{ svg?.pauseAnimations(); return; }}
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
  .mbfig {{ margin:1.6rem 0 0; }}
  svg {{ display:block; width:100%; height:auto; }}
  svg text {{ font-family:"Patrick Hand", "Comic Sans MS", cursive; fill:{INK}; }}
  /* "svg" prefix: Astro scoping gives "svg text" more weight than a bare class. */
  .st {{ font-size:20px; }} .sm {{ font-size:17px; }} svg text.why {{ font-size:28px; fill:#d22a1e; }} .rec {{ font-size:23px; }} .tag {{ font-size:20px; }}
  svg text.chalk {{ fill:{CHALK}; font-size:19px; }} svg text.chalk.sm2 {{ font-size:17px; fill:#cfd8c9; }} svg text.chalk.hi {{ fill:{CHALK2}; }}
  .steps {{ list-style:none; margin:12px 0 0; padding:0; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }}
  .steps li {{ font-size:.84rem; line-height:1.45; color:var(--color-text); border-top:2px solid var(--color-text); padding-top:.45rem; text-wrap:pretty; }}
  .steps b {{ display:block; font:500 11px/1.5 var(--font-mono); letter-spacing:.06em; margin-bottom:.15rem; }}
  figcaption {{ display:grid; grid-template-columns:auto 1fr auto; gap:14px; align-items:baseline; margin-top:12px; font-size:.86rem; line-height:1.5; color:var(--color-text-muted); }}
  .mbfig-mark {{ font:500 11px/1.5 var(--font-mono); letter-spacing:.06em; color:var(--color-text); white-space:nowrap; }}
  figcaption a {{ color:var(--color-accent); }}
  .mbfig-pause {{ font:11px/1 var(--font-mono); letter-spacing:.08em; text-transform:uppercase; color:var(--color-text-dim); background:none; border:1px solid var(--color-border); padding:4px 8px; cursor:pointer; }}
  .mbfig-pause:hover {{ color:var(--color-text); border-color:var(--color-border-strong); }}
  .mbfig-pause:focus-visible {{ outline:2px solid var(--color-accent); outline-offset:2px; }}
  .a, .steps li {{ animation-duration:{CYCLE}s; animation-iteration-count:infinite; animation-timing-function:linear; }}
  .a {{ opacity:0; }}
  .is-paused .a, .is-paused .steps li {{ animation-play-state:paused; }}
{chr(10).join(kf)}
{chr(10).join(rules)}
  @media (prefers-reduced-motion: reduce) {{
    .a {{ animation:none !important; opacity:0; }}
    .chart,.barA,.barB,.why,.ar12,.mA,.mB,.pred,.ring,.ar23,.ansA,.ansB,.door,.t1,.t2,.rev,.back {{ opacity:1; }}
    .steps li {{ animation:none; opacity:1; }}
  }}
  @media (max-width:600px) {{
    .steps {{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px 12px; }}
    figcaption {{ grid-template-columns:auto 1fr; }}
    .mbfig-pause {{ grid-column:1 / -1; justify-self:start; }}
  }}
</style>
""")
print(COMP)
