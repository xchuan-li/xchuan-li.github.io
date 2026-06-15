import { useState } from "react";

// HanGLDemo — the wrong-Hanja intervention as an interactive island. Pick a model
// capability (weak vs strong) and bracket a correct / wrong / placebo Hanja onto a
// rare Sino-Korean word, and watch whether the answer follows the latent meaning or
// the surface cue. Mirrors the Stable-page demos. Numbers are the pilot's anchors:
// weak (Qwen2.5-1.5B) Hanja Gain +0.52, Wrong-Hanja Cost +0.55 (follows the false
// cue 58%); strong/frontier Gain ≈0, Cost +0.09–0.21.

type Cap = "weak" | "strong";
type IV = "none" | "correct" | "wrong" | "placebo";

const WORD = {
  hangul: "췌장",
  q: "Which organ is 췌장?",
  correctHanja: "膵臓",
  wrongHanja: "心臓",
  correct: "pancreas",
  wrong: "heart",
};

const CAP: Record<Cap, { label: string; gain: number; wrongCost: number; followFalse: number }> = {
  weak: { label: "Qwen2.5-1.5B", gain: 0.52, wrongCost: 0.55, followFalse: 0.58 },
  strong: { label: "32B / frontier", gain: 0.01, wrongCost: 0.12, followFalse: 0.12 },
};

const IVS: { id: IV; label: string; bracket: string }[] = [
  { id: "none", label: "Hangul only", bracket: "" },
  { id: "correct", label: "+ correct Hanja", bracket: WORD.correctHanja },
  { id: "wrong", label: "+ wrong Hanja", bracket: WORD.wrongHanja },
  { id: "placebo", label: "+ placebo", bracket: "□□" },
];

function answer(cap: Cap, iv: IV): { text: string; correct: boolean; via: string } {
  if (cap === "strong") {
    if (iv === "wrong") return { text: WORD.correct, correct: true, via: "held against the false Hanja" };
    if (iv === "correct") return { text: WORD.correct, correct: true, via: "context — the cue is redundant" };
    return { text: WORD.correct, correct: true, via: "Hangul alone" };
  }
  if (iv === "correct") return { text: WORD.correct, correct: true, via: "the correct Hanja cue" };
  if (iv === "wrong") return { text: WORD.wrong, correct: false, via: "the false Hanja cue" };
  return { text: "can’t tell", correct: false, via: "neither — it doesn’t know the word" };
}

const pct = (x: number) => `${Math.round(x * 100)}%`;

export default function HanGLDemo() {
  const [cap, setCap] = useState<Cap>("weak");
  const [iv, setIv] = useState<IV>("none");
  const c = CAP[cap];
  const a = answer(cap, iv);
  const bracket = IVS.find((x) => x.id === iv)!.bracket;
  const bracketColor = iv === "correct" ? "var(--accent-teal)" : iv === "wrong" ? "var(--accent-coral)" : "var(--color-text-dim)";

  const verdict = cap === "weak"
    ? { text: "Surface-dependent — it needs the correct Hanja to know the word, and a false one flips its answer.", tint: "var(--accent-coral)" }
    : { text: "Grounded — it resolves the word from Hangul alone; the correct cue is redundant and a false one barely moves it.", tint: "var(--accent-teal)" };

  return (
    <div className="my-6 not-prose font-sans">
      {/* capability toggle */}
      <div className="flex gap-0 border border-[var(--color-border)] rounded-lg p-1 bg-[var(--color-surface)] mb-1">
        {(["weak", "strong"] as Cap[]).map((k) => (
          <button
            key={k}
            onClick={() => setCap(k)}
            className={`flex-1 py-2 px-3 text-sm rounded-md transition-all ${
              cap === k ? "bg-[var(--color-bg)] font-medium shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {k === "weak" ? "Weak model" : "Strong model"} — <code className="font-mono text-xs">{CAP[k].label}</code>
          </button>
        ))}
      </div>
      <p className="text-[11px] text-[var(--color-text-dim)] mb-4 text-center">capability rises Qwen2.5 1.5B → 7B → 14B → 32B → frontier; both surface effects fade by ~7B</p>

      {/* item card */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] mb-2">The item — a rare Sino-Korean word</div>
        <p className="text-2xl m-0 leading-snug">
          <span style={{ fontWeight: 600 }}>{WORD.hangul}</span>
          {bracket && (
            <span className="text-xl"> [<span style={{ color: bracketColor, fontWeight: 600 }}>{bracket}</span>]</span>
          )}
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mt-1 mb-0">{WORD.q} <span className="text-[var(--color-text-dim)]">· Hangul shares zero characters with the Hanja, but the meaning is latent in it.</span></p>
      </div>

      {/* interventions */}
      <div className="flex gap-2 flex-wrap mb-3">
        {IVS.map((b) => {
          const active = iv === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setIv(b.id)}
              className={`flex-1 min-w-[120px] text-left p-2.5 rounded-md border transition-all ${
                active ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]" : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
              }`}
            >
              <span className="block text-sm font-medium">{b.label}</span>
              <span className="block text-[11px] opacity-70 font-mono mt-0.5">{b.id === "none" ? "do() baseline" : b.id === "placebo" ? "empty bracket" : `췌장 [${b.bracket}]`}</span>
            </button>
          );
        })}
      </div>

      {/* model answer */}
      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">{c.label} answers</div>
          <div className="text-base font-medium mt-0.5">{a.text}</div>
          <div className="text-[11px] text-[var(--color-text-dim)] mt-0.5">followed {a.via}</div>
        </div>
        <span className="text-xs font-mono px-2 py-1 rounded shrink-0" style={{ color: a.correct ? "var(--accent-teal)" : "var(--accent-coral)", background: `color-mix(in srgb, ${a.correct ? "var(--accent-teal)" : "var(--accent-coral)"} 14%, transparent)` }}>
          {a.correct ? "correct" : "wrong"}
        </span>
      </div>

      {/* metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Metric label="Hanja Gain" sub="correct cue helps" value={`+${c.gain.toFixed(2)}`} strong={c.gain > 0.2} />
        <Metric label="Wrong-Hanja Cost" sub={cap === "weak" ? `follows false cue ${pct(c.followFalse)}` : "resists the false cue"} value={`+${c.wrongCost.toFixed(2)}`} strong={c.wrongCost > 0.3} />
      </div>

      {/* verdict */}
      <div className="rounded-md p-3 text-sm leading-relaxed" style={{ background: "var(--color-surface)", borderLeft: `3px solid ${verdict.tint}`, color: "var(--color-text-muted)" }}>
        {verdict.text} <span className="text-[var(--color-text-dim)]">Latent Hanja grounding is a function of capability.</span>
      </div>
    </div>
  );
}

function Metric({ label, sub, value, strong }: { label: string; sub: string; value: string; strong: boolean }) {
  const col = strong ? "var(--accent-coral)" : "var(--accent-teal)";
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">{label}</span>
        <span className="text-base font-mono font-medium" style={{ color: col }}>{value}</span>
      </div>
      <div className="text-[11px] text-[var(--color-text-dim)] mt-0.5">{sub}</div>
    </div>
  );
}
