"""Cut-paper puzzle pieces for the child-reading poster (Paul Rand direction, XC 26 Oct 2026).
Writes pieces.json: SVG path data in mm for a square piece with a knob or socket on a side,
with small seeded irregularities so the edges look cut by hand rather than drawn."""
import json, math, random

def piece(s=230, left=None, right=None, seed=1, wobble=1.3):
    rnd = random.Random(seed)
    pts = []
    def edge(p0, p1, kind, outward):
        (x0, y0), (x1, y1) = p0, p1
        n = 28
        dx, dy = (x1 - x0) / s, (y1 - y0) / s           # unit direction along the edge
        nx, ny = outward                                  # unit outward normal
        for i in range(n):
            t = i / n
            x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
            off = rnd.uniform(-wobble, wobble) + 1.6 * math.sin(t * math.pi * rnd.uniform(1, 2.2))
            if kind and 0.32 < t < 0.68:                  # a round knob (out) or socket (in) mid-edge
                u = (t - 0.32) / 0.36
                bump = 46 * math.sin(math.pi * u) ** 0.9
                off += bump if kind == "knob" else -bump
            pts.append((x + nx * off, y + ny * off))
    edge((0, 0), (s, 0), None, (0, -1))                   # top
    edge((s, 0), (s, s), right, (1, 0))                   # right
    edge((s, s), (0, s), None, (0, 1))                    # bottom
    edge((0, s), (0, 0), left, (-1, 0))                   # left
    return "M " + " L ".join(f"{x:.1f} {y:.1f}" for x, y in pts) + " Z"

out = {
    "lone":  piece(left="knob", seed=3),                 # 龄 on its own: a knob with nothing to hold
    "nian":  piece(right="socket", seed=7),              # 年, waiting on its right
    "ling":  piece(left="knob", seed=11),                # 龄, its knob in 年's socket
    "yellow": piece(s=560, seed=19, wobble=2.4),          # backing paper behind the word
}
json.dump(out, open("pieces.json", "w"))
print({k: len(v) for k, v in out.items()})
