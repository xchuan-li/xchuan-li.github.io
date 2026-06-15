import { useState } from "react";

// Exp1Tweety - "Tweety is a red bird. Can Tweety fly?" Press an intervention and
// watch what a grounded model (tracks animal type) vs a shortcut model (rides
// color) predicts, and whether the true answer actually moves.

type IV = "none" | "Z" | "C" | "M";

interface State {
  name: string;
  color: string;
  kind: string;
  changed: "name" | "color" | "kind" | null;
  truthFly: boolean; // the real answer
}

function build(iv: IV): State {
  const s: State = { name: "Tweety", color: "red", kind: "bird", changed: null, truthFly: true };
  if (iv === "Z") { s.color = "blue"; s.changed = "color"; }
  if (iv === "C") { s.name = "Robin"; s.changed = "name"; }
  if (iv === "M") { s.kind = "penguin"; s.changed = "kind"; s.truthFly = false; }
  return s;
}

const BTNS: { id: IV; label: string; sub: string }[] = [
  { id: "Z", label: "do(Z)", sub: "red -> blue" },
  { id: "C", label: "do(C)", sub: "Tweety -> Robin" },
  { id: "M", label: "do(M)", sub: "bird -> penguin" },
];

const VERDICT: Record<IV, { text: string; kind: "neutral" | "good" | "bad" }> = {
  none: { text: "Baseline - both models answer \"can fly\", and both are right. Nothing tells them apart yet.", kind: "neutral" },
  Z: { text: "do(Z): the answer doesn't change, so a grounded model still says \"can fly\". A color-rider flips to \"cannot fly\" - that flip is the SC-spurious signal.", kind: "bad" },
  C: { text: "do(C): nothing relevant changed. An honest model is unmoved; breaking here would be mere fragility, not a shortcut. Negative control.", kind: "neutral" },
  M: { text: "do(M): the answer really changes - penguins can't fly. A grounded model flips with it; a color-rider stubbornly says \"can fly\", wrong for the right-structure reason.", kind: "good" },
};

const fly = (b: boolean) => (b ? "can fly" : "cannot fly");

export default function Exp1Tweety() {
  const [iv, setIv] = useState<IV>("none");
  const s = build(iv);
  const groundedFly = s.truthFly; // tracks M
  const shortcutFly = s.color === "red"; // rides Z (color)
  const v = VERDICT[iv];

  const tint = { good: "var(--accent-teal)", bad: "var(--accent-coral)", neutral: "var(--color-text-muted)" }[v.kind];
  const tok = (label: string, on: boolean) => (
    <span style={on ? { color: "var(--accent-coral)", fontWeight: 600 } : undefined}>{label}</span>
  );

  return (
    <div className="my-6 not-prose font-sans">
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] mb-2">The item</div>
        <p className="text-lg m-0 leading-snug">
          {tok(s.name, s.changed === "name")} is a {tok(s.color, s.changed === "color")} {tok(s.kind, s.changed === "kind")}.{" "}
          <span className="text-[var(--color-text-muted)]">Can {s.name} fly?</span>
        </p>
        <div className="mt-2 text-[12px]">
          <span className="text-[var(--color-text-dim)]">True answer: </span>
          <span className="font-medium" style={{ color: s.truthFly ? "var(--accent-teal)" : "var(--accent-coral)" }}>
            {fly(s.truthFly)}
          </span>
          <span className="text-[var(--color-text-dim)]"> / the label {s.changed === "kind" ? "changed" : "did not change"} under this edit</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {BTNS.map((b) => {
          const active = iv === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setIv(active ? "none" : b.id)}
              className={`flex-1 min-w-[140px] text-left p-2.5 rounded-md border transition-all ${
                active
                  ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                  : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
              }`}
            >
              <span className="block text-sm font-medium">{b.label}</span>
              <span className="block text-[11px] opacity-70 font-mono mt-0.5">{b.sub}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <ModelRow label="Grounded model" sub="tracks animal type (M)" pred={fly(groundedFly)} correct={groundedFly === s.truthFly} />
        <ModelRow label="Shortcut model" sub="rides color (Z)" pred={fly(shortcutFly)} correct={shortcutFly === s.truthFly} />
      </div>

      <div className="rounded-md p-3 text-sm leading-relaxed" style={{ background: "var(--color-surface)", borderLeft: `3px solid ${tint}`, color: "var(--color-text-muted)" }}>
        {v.text}
      </div>
    </div>
  );
}

function ModelRow({ label, sub, pred, correct }: { label: string; sub: string; pred: string; correct: boolean }) {
  const c = correct ? "var(--accent-teal)" : "var(--accent-coral)";
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">{label}</div>
      <div className="text-[11px] text-[var(--color-text-dim)] mb-1.5">{sub}</div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{pred}</span>
        <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ color: c, background: `color-mix(in srgb, ${c} 14%, transparent)` }}>
          {correct ? "correct" : "wrong"}
        </span>
      </div>
    </div>
  );
}
