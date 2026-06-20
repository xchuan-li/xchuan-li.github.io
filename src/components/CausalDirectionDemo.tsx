import { useState } from "react";

// CausalDirectionDemo — the pilot's core finding as an interactive island: the
// causal-direction representation is EFFICACIOUS (steering moves the judgment) yet
// REDUNDANT (ablating it does not). Numbers are the pilot's measured averages on
// base Gemma-2-2B: baseline preference Delta = +4.35; a steering sweep along the
// direction; band ablation (layers 8-18) leaves Delta ~ 5.77 — no drop.

const SCENARIOS = [
  { fwd: "The storm caused the flood.", rev: "The flood caused the storm." },
  { fwd: "The infection caused the fever.", rev: "The fever caused the infection." },
  { fwd: "The earthquake caused the tsunami.", rev: "The tsunami caused the earthquake." },
  { fwd: "The drought caused the famine.", rev: "The famine caused the drought." },
];

const STEER = [
  { k: -16, d: 0.22 },
  { k: -12, d: 0.28 },
  { k: -8, d: 0.54 },
  { k: -4, d: 1.71 },
  { k: 0, d: 4.35 },
  { k: 4, d: 4.29 },
];
const ABLATE_D = 5.77;

const short = (s: string) => s.replace(/^The /, "").replace(/ caused.*/, "");

export default function CausalDirectionDemo() {
  const [s, setS] = useState(0);
  const [ki, setKi] = useState(4);
  const [ablate, setAblate] = useState(false);

  const sc = SCENARIOS[s];
  const k = STEER[ki].k;
  const delta = ablate ? ABLATE_D : STEER[ki].d;
  const pos = Math.max(3, Math.min(97, 50 + (delta / 6) * 50));
  const pref = delta > 1.5 ? "prefers the correct direction" : delta > 0.6 ? "weakly prefers correct" : "almost indifferent";

  return (
    <div className="my-6 not-prose font-sans">
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
            {short(x.fwd)} → {short(x.rev)}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] mb-2">
          Which ordering does the model prefer?
        </div>
        <p className="m-0 text-base">
          <span style={{ color: "var(--accent-teal)", fontWeight: 600 }}>forward</span> · {sc.fwd}
        </p>
        <p className="m-0 text-base mt-1">
          <span style={{ color: "var(--accent-coral)", fontWeight: 600 }}>reverse</span> · {sc.rev}
        </p>
      </div>

      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 mb-3">
        <div className="flex justify-between text-[11px] text-[var(--color-text-dim)] mb-1">
          <span>prefers reverse</span>
          <span className="font-mono">Δ = {delta.toFixed(2)}</span>
          <span>prefers forward</span>
        </div>
        <div className="relative h-2 rounded-full bg-[var(--color-border)]">
          <div className="absolute top-1/2 left-1/2 w-px h-3.5 -translate-y-1/2 bg-[var(--color-text-dim)]" />
          <div
            className="absolute top-1/2 w-3.5 h-3.5 rounded-full -translate-y-1/2 -translate-x-1/2 transition-all"
            style={{ left: `${pos}%`, background: delta > 0.6 ? "var(--accent-teal)" : "var(--color-text-dim)" }}
          />
        </div>
        <div className="text-[11px] text-[var(--color-text-muted)] mt-2 text-center">{pref}</div>
      </div>

      <div className={`rounded-md border border-[var(--color-border)] p-3 mb-2 transition-opacity ${ablate ? "opacity-40" : ""}`}>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">Steer the direction</span>
          <span className="font-mono text-xs text-[var(--color-text-muted)]">k = {k > 0 ? `+${k}` : k}</span>
        </div>
        <input
          type="range"
          min={0}
          max={STEER.length - 1}
          step={1}
          value={ki}
          disabled={ablate}
          onChange={(e) => setKi(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-[11px] text-[var(--color-text-dim)] mt-1">
          push −v and the preference collapses toward 0; push +v and it strengthens — the direction <strong>moves</strong> the judgment.
        </div>
      </div>

      <button
        onClick={() => setAblate((v) => !v)}
        className={`w-full text-left rounded-md border p-3 transition-all ${
          ablate
            ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
            : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
        }`}
      >
        <span className="block text-sm font-medium">
          {ablate ? "✓ " : ""}Ablate — project the direction out (layers 8–18)
        </span>
        <span className={`block text-[11px] mt-0.5 ${ablate ? "opacity-80" : "text-[var(--color-text-dim)]"}`}>
          {ablate
            ? "removed across eleven layers — yet the preference barely moves (Δ ≈ 5.77). Used, but no single copy is load-bearing: redundant."
            : "remove the direction and see what happens to the judgment"}
        </span>
      </button>

      <p className="text-[11px] text-[var(--color-text-dim)] mt-3 mb-0">
        Illustrative, from the pilot's measured averages on base Gemma-2-2B. Steering moves the judgment
        (efficacious); ablation does not (redundant) — the empirical face of superposition.
      </p>
    </div>
  );
}
