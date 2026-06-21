import { useState } from "react";

// ArrowheadDemo — the pilot's headline finding made tangible: the causal-direction
// representation is EFFICACIOUS (steering moves the judgment) yet REDUNDANT (ablating
// it, even across eleven layers, does not). Two knobs share one preference scale so the
// asymmetry is visible side by side. Numbers are the pilot's measured averages on base
// Gemma-2-2B: baseline preference Delta = +4.35; steering -v drives it to ~0.22 (k=-16);
// band ablation across layers 8-18 leaves it at ~5.77 (no drop). Illustrative, pooled.

const SCENARIOS = [
  { fwd: "The storm caused the flood.", rev: "The flood caused the storm.", domain: "weather" },
  { fwd: "The infection caused the fever.", rev: "The fever caused the infection.", domain: "medicine" },
  { fwd: "The earthquake caused the tsunami.", rev: "The tsunami caused the earthquake.", domain: "geology" },
  { fwd: "The drought caused the famine.", rev: "The famine caused the drought.", domain: "society" },
];

// steering sweep along the direction v (k = steering coefficient). Anchors -16/-4/0/+2/+4
// are measured; the rest interpolate. Monotonic until +4, which is off-distribution.
const STEER = [
  { k: -16, d: 0.22 },
  { k: -12, d: 0.28 },
  { k: -8, d: 0.54 },
  { k: -4, d: 1.71 },
  { k: -2, d: 2.82 },
  { k: 0, d: 4.35 },
  { k: 2, d: 5.02 },
  { k: 4, d: 4.29 },
];
const K0 = 5; // index of k = 0
const BASELINE = 4.35;
const ABLATE_FULL = 5.77; // band 8-18 fully projected out
const LAYERS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

// shared scale: reverse(-1) ... 0 ... forward(+6)
const SCALE_LO = -1;
const SCALE_HI = 6;
const toPct = (d: number) =>
  Math.max(2, Math.min(98, ((d - SCALE_LO) / (SCALE_HI - SCALE_LO)) * 100));
const zeroPct = toPct(0);

function Gauge({ d, color }: { d: number; color: string }) {
  return (
    <div className="mt-2">
      <div className="flex justify-between text-[10px] text-[var(--color-text-dim)] mb-1">
        <span>reverse</span>
        <span className="font-mono" style={{ color }}>Δ = {d.toFixed(2)}</span>
        <span>forward</span>
      </div>
      <div className="relative h-2 rounded-full bg-[var(--color-border)]">
        <div
          className="absolute top-1/2 w-px h-3 -translate-y-1/2 bg-[var(--color-text-dim)]"
          style={{ left: `${zeroPct}%` }}
        />
        <div
          className="absolute top-1/2 h-3.5 w-3.5 rounded-full -translate-y-1/2 -translate-x-1/2 transition-all duration-300"
          style={{ left: `${toPct(d)}%`, background: color, boxShadow: "0 0 0 3px var(--color-surface)" }}
        />
      </div>
    </div>
  );
}

export default function ArrowheadDemo() {
  const [s, setS] = useState(0);
  const [ki, setKi] = useState(K0);
  const [cut, setCut] = useState<boolean[]>(() => LAYERS.map(() => false));

  const sc = SCENARIOS[s];
  const k = STEER[ki].k;
  const steerD = STEER[ki].d;
  const nCut = cut.filter(Boolean).length;
  const ablateD = BASELINE + (ABLATE_FULL - BASELINE) * (nCut / LAYERS.length);

  const steerMoved = Math.abs(k) >= 4;
  const ablateCut = nCut > 0;

  const teal = "var(--accent-teal)";
  const coral = "var(--accent-coral)";
  const champ = "var(--accent-champagne)";
  const dim = "var(--color-text-dim)";
  const steerColor = steerD < 1 ? coral : steerD < 2.5 ? dim : teal;

  return (
    <div className="my-6 not-prose font-sans text-[var(--color-text)]">
      {/* scenario picker */}
      <div className="flex gap-2 flex-wrap mb-3">
        {SCENARIOS.map((x, i) => (
          <button
            key={i}
            onClick={() => setS(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              s === i
                ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                : "bg-[var(--color-surface)] border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {x.domain}
          </button>
        ))}
      </div>

      {/* the minimal pair */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] mb-2">
          Same words, opposite arrow — which does the model prefer?
        </div>
        <p className="m-0 text-base">
          <span style={{ color: teal, fontWeight: 600 }}>forward</span> · {sc.fwd}
        </p>
        <p className="m-0 text-base mt-1">
          <span style={{ color: coral, fontWeight: 600 }}>reverse</span> · {sc.rev}
        </p>
        <div className="text-[11px] text-[var(--color-text-dim)] mt-2">
          The gap holds across all four content domains — so it is not one memorised pair.
        </div>
      </div>

      {/* the two knobs, one scale */}
      <div className="grid md:grid-cols-2 gap-3">
        {/* STEER */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm font-medium">Steer it</span>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
              style={
                steerMoved
                  ? { color: teal, background: "color-mix(in srgb, var(--accent-teal) 14%, transparent)" }
                  : { color: dim }
              }
            >
              {steerMoved ? "✓ judgment moved" : "drag me"}
            </span>
          </div>
          <p className="text-[11px] text-[var(--color-text-dim)] m-0 mb-2">
            Add <span className="font-mono">k·v</span> to the residual stream.
          </p>
          <Gauge d={steerD} color={steerColor} />
          <div className="flex items-center gap-2 mt-3">
            <span className="font-mono text-[10px] text-[var(--color-text-dim)] w-7">−v</span>
            <input
              type="range"
              min={0}
              max={STEER.length - 1}
              step={1}
              value={ki}
              onChange={(e) => setKi(Number(e.target.value))}
              aria-label="steering coefficient"
              className="flex-1"
              style={{ accentColor: champ }}
            />
            <span className="font-mono text-[10px] text-[var(--color-text-dim)] w-7 text-right">+v</span>
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)] mt-2">
            <span className="font-mono">k = {k > 0 ? `+${k}` : k}</span> — push against the direction and
            the preference <strong>collapses toward 0</strong>; it is wired to the output.
          </div>
        </div>

        {/* ABLATE */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm font-medium">Cut it out</span>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
              style={
                ablateCut
                  ? { color: champ, background: "color-mix(in srgb, var(--accent-champagne) 16%, transparent)" }
                  : { color: dim }
              }
            >
              {ablateCut ? "✗ judgment held" : "cut a layer"}
            </span>
          </div>
          <p className="text-[11px] text-[var(--color-text-dim)] m-0 mb-2">
            Project the direction out of layers <span className="font-mono">8–18</span>.
          </p>
          <Gauge d={ablateD} color={champ} />
          <div className="flex gap-1 mt-3" role="group" aria-label="ablate layers 8 to 18">
            {LAYERS.map((L, i) => (
              <button
                key={L}
                onClick={() => setCut((c) => c.map((v, j) => (j === i ? !v : v)))}
                title={`layer ${L}`}
                aria-pressed={cut[i]}
                className="flex-1 h-7 rounded text-[9px] font-mono border transition-all"
                style={
                  cut[i]
                    ? { borderColor: "var(--color-border)", color: dim, background: "transparent", textDecoration: "line-through", opacity: 0.5 }
                    : { borderColor: "color-mix(in srgb, var(--accent-champagne) 45%, var(--color-border))", color: "var(--color-text-muted)", background: "color-mix(in srgb, var(--accent-champagne) 10%, transparent)" }
                }
              >
                {L}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-[var(--color-text-muted)]">
              {nCut === 0 ? "none cut" : `${nCut} of 11 cut`} — still <span className="font-mono">+{ablateD.toFixed(2)}</span>
            </span>
            <span className="flex gap-2">
              <button
                onClick={() => setCut(LAYERS.map(() => true))}
                className="text-[10px] uppercase tracking-wide text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                Cut all
              </button>
              <button
                onClick={() => setCut(LAYERS.map(() => false))}
                className="text-[10px] uppercase tracking-wide text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
              >
                Restore
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* the verdict */}
      <div
        className="mt-3 rounded-lg border p-3 text-sm leading-relaxed"
        style={{ borderColor: "color-mix(in srgb, var(--accent-champagne) 30%, var(--color-border))", background: "color-mix(in srgb, var(--accent-champagne) 6%, transparent)" }}
      >
        <strong>Steering moves it; cutting it out does not.</strong> The direction is genuinely{" "}
        <em>used</em> — yet no single copy is load-bearing, because the same information is{" "}
        <em>redundantly distributed</em> across layers. That asymmetry is the empirical face of{" "}
        <strong>superposition</strong>: you can read the arrowhead out, and still not cut it out.
      </div>

      <p className="text-[11px] text-[var(--color-text-dim)] mt-3 mb-0">
        Illustrative, from the pilot's measured averages on base Gemma-2-2B (Δ = logP(forward) −
        logP(reverse); baseline +4.35, steering to ~0.22 at k=−16, band-8–18 ablation ~5.77).
      </p>
    </div>
  );
}
