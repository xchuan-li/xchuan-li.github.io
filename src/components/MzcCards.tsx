import { useState } from "react";

// MzcCards - the three variable types, as click-to-reveal cards. Deliberately
// light: click M, Z, or C to read what it is and what the test expects of it.

type Key = "M" | "Z" | "C";

const CARDS: Record<Key, {
  role: string;
  color: string;
  tint: string;
  def: string;
  expects: string;
  egSynthetic: string;
  egAgreement: string;
}> = {
  M: {
    role: "the real structure",
    color: "var(--accent-teal)",
    tint: "rgba(93,202,165,0.12)",
    def: "The feature that genuinely determines the answer. A grounded model must use it.",
    expects: "Changing M should change the answer.",
    egSynthetic: "animal type (bird vs penguin)",
    egAgreement: "the syntactic subject's number",
  },
  Z: {
    role: "the shortcut",
    color: "var(--accent-coral)",
    tint: "rgba(240,153,123,0.12)",
    def: "Irrelevant to the answer, but correlated with the label during training. The cue under suspicion.",
    expects: "Changing Z should not change a grounded answer - if it does, the model rode the shortcut.",
    egSynthetic: "color (red vs blue)",
    egAgreement: "the nearest noun (linear proximity)",
  },
  C: {
    role: "the control",
    color: "var(--color-text-muted)",
    tint: "rgba(150,150,150,0.10)",
    def: "Also irrelevant - but not training-correlated. The negative control that rules out 'any edit breaks it'.",
    expects: "Changing C should do nothing, for any honest model.",
    egSynthetic: "the name (Tweety vs Robin)",
    egAgreement: "a same-number intervener",
  },
};

export default function MzcCards() {
  const [open, setOpen] = useState<Key>("M");
  const d = CARDS[open];

  return (
    <div className="my-6 not-prose font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
        {(Object.keys(CARDS) as Key[]).map((k) => {
          const active = k === open;
          return (
            <button
              key={k}
              onClick={() => setOpen(k)}
              className={`rounded-lg border p-3 text-center transition-all ${
                active
                  ? "border-transparent"
                  : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
              }`}
              style={active ? { background: CARDS[k].tint, borderColor: CARDS[k].color } : undefined}
            >
              <span className="block text-xl font-mono font-medium" style={{ color: CARDS[k].color }}>{k}</span>
              <span className="block text-[11px] text-[var(--color-text-muted)] mt-0.5">{CARDS[k].role}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4" style={{ borderLeftWidth: 3, borderLeftColor: d.color }}>
        <p className="text-sm text-[var(--color-text)] leading-relaxed m-0">{d.def}</p>
        <p className="text-sm font-medium mt-2 mb-3" style={{ color: d.color }}>{d.expects}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
          <div className="rounded-md bg-[var(--color-bg)] px-3 py-2">
            <span className="block text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">Synthetic task</span>
            <span className="text-[var(--color-text-muted)]">{d.egSynthetic}</span>
          </div>
          <div className="rounded-md bg-[var(--color-bg)] px-3 py-2">
            <span className="block text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">Agreement</span>
            <span className="text-[var(--color-text-muted)]">{d.egAgreement}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
