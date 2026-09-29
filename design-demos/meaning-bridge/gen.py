"""Fig. 1 draft, "the model in the middle" (XC, 29 Sep 2026). Standalone demo; the site
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
CYCLE = 26
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

# Beat 1 (0–31 %): people.
vis("lA", 1, 10); vis("pA", 3.5, 10); vis("lB", 11, 20); vis("pB", 13.5, 20)
vis2("pbub", [(3.5, 10), (13.5, 20)])
vis("lrec", 21)
# Beat 2 (32–60 %): the explicit model.
vis("mA", 33); vis("mB", 40); vis("pred", 48); vis("ring", 53)
# Beat 3 (61–99 %): the language model.
vis("rA", 61, 68); vis("qA", 63.5, 68); vis("rB", 69, 76); vis("qB", 71.5, 76)
vis2("rbub", [(63.5, 68), (71.5, 76)])
vis("rrec", 77)
vis2("plate", [(0.02, 80.99)]); vis("door", 81)
vis("t1", 84); vis("t2", 90)
step("s1", 0, 31); step("s2", 32, 60); step("s3", 61, 99)

INK, SKIN, CHALK, CHALK2 = "#141414", "#f2cfa4", "#f4f1e6", "#f2d16b"
ARIA = ("Sketch in three beats. A person answers must when they see a wet street and might when someone "
        "says it rained. A blackboard in the middle states two candidate models, one confidence scale or two "
        "variables, strength and source, whose predictions for the two items differ. A language model gets the "
        "same items; its casing opens to ask whether a source variable, or just the word see, explains its "
        "answers. Illustration, not results.")

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
  <text class="title" x="400" y="40" stroke="none" text-anchor="middle">What does “must” tell you?</text>

  <!-- ===== left: people ===== -->
  <path d="M18 60 L238 57 L240 132 L16 134 Z" fill="#fff8df" stroke-width="2.6"/>
  <text class="card a lA" x="128" y="102" stroke="none" text-anchor="middle">You see a wet street.</text>
  <text class="card a lB" x="128" y="102" stroke="none" text-anchor="middle">Someone says it rained.</text>
  <g class="a lrec" stroke="none"><text class="rec" x="34" y="91">see → must</text><text class="rec" x="34" y="121">heard → might</text></g>

  <path class="a pbub" d="M86 200 L214 197 L216 238 L166 240 L156 262 L144 240 L84 242 Z" fill="#fff"/>
  <text class="say a pA" x="150" y="228" stroke="none" text-anchor="middle">must</text>
  <text class="say a pB" x="150" y="228" stroke="none" text-anchor="middle">might</text>
  <g>
    <circle cx="150" cy="300" r="21" fill="{SKIN}"/>
    <path d="M131 292 L136 276 L144 288 L150 272 L156 288 L165 276 L169 292" fill="#e8b33c" stroke-width="2.4"/>
    <circle cx="143" cy="301" r="2.4" fill="{INK}" stroke="none"/><circle cx="157" cy="301" r="2.4" fill="{INK}" stroke="none"/>
    <path d="M143 311 Q150 316 157 310" fill="none" stroke-width="2.2"/>
    <path d="M131 322 L169 320 L174 378 L127 380 Z" fill="#e2574c"/>
    <path d="M140 380 L136 432 M162 379 L167 432" fill="none" stroke-width="4"/>
    <path d="M131 330 L114 364 M169 330 L186 364" fill="none" stroke-width="4"/>
  </g>
  <text class="lab" x="24" y="464" stroke="none">people · experiments</text>

  <!-- ===== middle: an explicit model ===== -->
  <path d="M246 56 L554 53 L557 318 L243 321 Z" fill="#9b6b3d"/>
  <path d="M257 66 L544 64 L546 308 L255 310 Z" fill="#2f4a38" stroke-width="2.4"/>
  <g stroke="none">
    <g class="a mA">
      <text class="chalk sm" x="328" y="96" text-anchor="middle">one scale</text>
      <text class="chalk" x="328" y="138" text-anchor="middle">evidence</text>
      <text class="chalk" x="328" y="190" text-anchor="middle">confidence</text>
      <text class="chalk" x="328" y="242" text-anchor="middle">must / might</text>
    </g>
    <g class="a mB">
      <text class="chalk sm" x="472" y="96" text-anchor="middle">two variables</text>
      <text class="chalk" x="472" y="138" text-anchor="middle">evidence</text>
      <text class="chalk" x="432" y="190" text-anchor="middle">strength</text>
      <text class="chalk" x="513" y="190" text-anchor="middle">source</text>
      <text class="chalk" x="472" y="242" text-anchor="middle">must / might</text>
    </g>
    <g class="a pred">
      <text class="chalk hi" x="328" y="288" text-anchor="middle">see = heard</text>
      <text class="chalk hi" x="472" y="288" text-anchor="middle">see ≠ heard</text>
    </g>
  </g>
  <g fill="none" stroke="{CHALK}" stroke-width="2.2">
    <g class="a mA"><path d="M328 146 L328 170" marker-end="url(#mb-chalk)"/><path d="M328 198 L328 222" marker-end="url(#mb-chalk)"/></g>
    <g class="a mB"><path d="M462 146 L440 170" marker-end="url(#mb-chalk)"/><path d="M482 146 L505 170" marker-end="url(#mb-chalk)"/>
      <path d="M436 198 L458 222" marker-end="url(#mb-chalk)"/><path d="M509 198 L486 222" marker-end="url(#mb-chalk)"/></g>
    <path class="a mB" d="M400 84 L400 296" stroke-dasharray="4 8" stroke-width="1.6"/>
    <ellipse class="a ring" cx="513" cy="184" rx="36" ry="18" stroke="{CHALK2}" stroke-width="2.4"/>
  </g>
  <text class="lab" x="400" y="464" stroke="none" text-anchor="middle">an explicit model</text>

  <!-- ===== right: a language model ===== -->
  <path d="M562 57 L782 60 L784 134 L560 132 Z" fill="#fff8df" stroke-width="2.6"/>
  <text class="card a rA" x="672" y="102" stroke="none" text-anchor="middle">You see a wet street.</text>
  <text class="card a rB" x="672" y="102" stroke="none" text-anchor="middle">Someone says it rained.</text>
  <g class="a rrec" stroke="none"><text class="rec" x="578" y="91">see → must</text><text class="rec" x="578" y="121">heard → might</text></g>

  <path class="a rbub" d="M568 196 L696 193 L698 234 L648 236 L638 258 L626 236 L566 238 Z" fill="#fff"/>
  <text class="say a qA" x="632" y="224" stroke="none" text-anchor="middle">must</text>
  <text class="say a qB" x="632" y="224" stroke="none" text-anchor="middle">might</text>
  <g>
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
  <!-- two candidate explanations of the LM's answers -->
  <g class="a t1">
    <path d="M540 196 Q566 300 622 374" fill="none" stroke-dasharray="6 7" stroke-width="2.4" marker-end="url(#mb-head)"/>
    <text class="tag" x="560" y="358" stroke="none" text-anchor="end">a source</text>
    <text class="tag" x="560" y="382" stroke="none" text-anchor="end">variable?</text>
  </g>
  <g class="a t2">
    <path d="M740 262 Q744 340 666 358" fill="none" stroke-dasharray="6 7" stroke-width="2.4" marker-end="url(#mb-head)"/>
    <text class="tag" x="788" y="250" stroke="none" text-anchor="end">or the word “see”?</text>
  </g>
  <text class="lab" x="780" y="464" stroke="none" text-anchor="end">LMs · behaviour + internals</text>
</g>
</svg>'''

HTML = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fig. 1 draft · the model in the middle</title>
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
.title {{ font-size:27px; }} .lab {{ font-size:20px; }} .card {{ font-size:20px; }} .rec {{ font-size:23px; }}
.say {{ font-size:24px; }} .tag {{ font-size:20px; }}
.chalk {{ fill:{CHALK}; font-size:19px; }} .chalk.sm {{ font-size:17px; fill:#cfd8c9; }} .chalk.hi {{ fill:{CHALK2}; }}
.steps {{ list-style:none; margin:12px 0 0; padding:0; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }}
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
  .lrec,.mA,.mB,.pred,.ring,.rrec,.door,.t1,.t2 {{ opacity:1; }}
  .steps li {{ animation:none; opacity:1; }}
}}
@media (max-width:560px) {{ .steps {{ grid-template-columns:1fr; gap:8px; }} }}
</style></head>
<body><div class="page" id="page">
<p class="kicker">Fig. 1 draft · not on the site</p>
<p class="intro">I put the same questions about meaning to two kinds of learners: people, through behavioural experiments, and language models, through controlled tests of their behaviour and internal computations.</p>
<figure>
{SVG}
<ol class="steps">
  <li class="s1"><b>1 · People</b>Which distinctions do people draw, and what do they infer from them?</li>
  <li class="s2"><b>2 · An explicit model</b>State the distinction as variables whose predictions can differ.</li>
  <li class="s3"><b>3 · Language models</b>Which computation explains the model’s answers: the distinction, or a surface cue?</li>
</ol>
<div class="foot"><span>Illustration, not results.</span><button type="button" id="pause">Pause</button></div>
</figure>
<p class="note">Draft · three beats, {CYCLE} s loop · pure SVG/CSS · items after Degen et al. 2019 (strength × source); the choices shown are illustrative, not the paper’s findings.</p>
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
(HERE / "meaning-bridge.html").write_text(HTML)
print(HERE / "meaning-bridge.html")
