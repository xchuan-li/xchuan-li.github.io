"""Build child-reading.html from pieces.json (Paul Rand direction, XC 26 Oct 2026)."""
import json
P = json.load(open("pieces.json"))
RED, INK, YEL, PAPER = "#e3342f", "#141414", "#f4c430", "#f7f2e8"
html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Child reading poster · Xiaochuan Li</title>
<style>
  /* A0 landscape. After Paul Rand's cut-paper modernism (Sparkle and Spin, 1957; IBM Eye-Bee-M, 1981):
     hand-cut shapes, bright red and black on paper, a word game. A character on its own is a puzzle piece
     with a knob that holds nothing; inside a word it locks into its neighbour. Futura for text, STKaiti
     (the textbook script children learn to read in) for the characters. The characters are examples. */
  @page {{ size: 1189mm 841mm; margin: 0; }}
  html, body {{ margin: 0; padding: 0; }}
  html {{ width: 1189mm; height: 841mm; overflow: hidden; }}
  body {{ width: 1189mm; height: 841mm; overflow: hidden; position: relative; background: {PAPER}; color: {INK};
         font-family: Futura, 'Century Gothic', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
  p {{ margin: 0; }}
  .abs {{ position: absolute; }}
  h1 {{ position: absolute; left: 60mm; top: 56mm; width: 560mm; margin: 0; font-weight: 700; font-size: 122pt; line-height: 1.02; letter-spacing: -0.01em; }}
  h1 span {{ color: {RED}; }}
  .dek {{ left: 60mm; top: 248mm; width: 480mm; font-weight: 500; font-size: 40pt; line-height: 1.3; }}
  .credits {{ left: 60mm; bottom: 46mm; width: 470mm; font-size: 23pt; line-height: 1.35; }}
  .qr {{ right: 55mm; top: 58mm; display: flex; align-items: center; gap: 7mm; font-weight: 700; font-size: 24pt; }}
  .qr img {{ width: 42mm; height: 42mm; }}
  svg.art {{ position: absolute; left: 0; top: 0; width: 1189mm; height: 841mm; }}
</style></head><body>
<svg class="art" viewBox="0 0 1189 841" aria-hidden="true">
  <path d="{P['yellow']}" fill="{YEL}" transform="translate(585 392) scale(0.985 0.73) rotate(-1.5 280 280)"/>
  <g transform="translate(150 420) rotate(-7 115 115)">
    <path d="{P['lone']}" fill="{RED}"/>
    <text x="115" y="118" font-family="STKaiti, Kaiti SC" font-size="150" fill="#fff" text-anchor="middle" dominant-baseline="central">龄</text>
  </g>
  <g font-family="Futura" font-style="italic" font-weight="500" fill="{INK}" text-anchor="end">
    <text x="560" y="520" font-size="13">on its own</text>
    <text x="560" y="540" font-size="11" font-style="normal">líng ‘age’</text>
  </g>
  <g transform="translate(640 468) rotate(-3 233 115)">
    <path d="{P['nian']}" fill="{INK}"/>
    <text x="115" y="118" font-family="STKaiti, Kaiti SC" font-size="150" fill="#fff" text-anchor="middle" dominant-baseline="central">年</text>
    <g transform="translate(234 0)">
      <path d="{P['ling']}" fill="{RED}"/>
      <text x="115" y="118" font-family="STKaiti, Kaiti SC" font-size="150" fill="#fff" text-anchor="middle" dominant-baseline="central">龄</text>
    </g>
  </g>
  <g font-family="Futura" fill="{INK}">
    <text x="652" y="760" font-size="13" font-style="italic" font-weight="500">inside a word</text>
    <text x="652" y="780" font-size="11">nián líng ‘age’</text>
  </g>
</svg>
<h1>Does a <span>word</span> help a child read a character?</h1>
<p class="abs dek">In a 2021 reading assessment, one child could read only the simplest characters on their own, but knew more of them inside words.</p>
<div class="abs qr">Read the report<img src="qr-child-reading.svg" alt="QR code to the report"></div>
<p class="abs credits">Undergraduate project, Shenzhen, 2021. Xiaochuan Li, with the Shenzhen Learning Disorders Association. The characters are examples, not test items.</p>
</body></html>"""
open("child-reading.html", "w").write(html)
print("ok", len(html))
