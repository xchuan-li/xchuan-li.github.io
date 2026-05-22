import { useState } from "react";

// Match the paper's §6.1 Table by default. Override via props to render
// different model rows (TF-IDF, DistilBERT, Qwen LoRA) without code changes.
export interface RegimeData {
  desc: string;
  base_acc: number;
  base_stab: number;
  d3_acc: number;
  d2_acc: number;
}

export interface SCDemoProps {
  modelLabel?: string;
  regimeA?: RegimeData;
  regimeB?: RegimeData;
}

const DEFAULT_A: RegimeData = {
  desc: "Animal type M is observable in the input. The model can learn the licensing structure that genuinely answers 'can X fly?'. Color and name features are present but optional.",
  base_acc: 1.0,
  base_stab: 1.0,
  d3_acc: 1.0,
  d2_acc: 1.0,
};

const DEFAULT_B: RegimeData = {
  desc: "M is hidden — only the color shortcut and the name distractor carry label information. The model has no choice but to read the irrelevant feature.",
  base_acc: 0.912,
  base_stab: 1.0,
  d3_acc: 0.504, // Δ +.408 from base — matches §1 TF-IDF + LR row
  d2_acc: 0.891, // Δ +.021 negative control
};

const fmt = (x: number) => x.toFixed(3);

export default function SCDemo({
  modelLabel = "TF-IDF + LR",
  regimeA = DEFAULT_A,
  regimeB = DEFAULT_B,
}: SCDemoProps) {
  const [regime, setRegime] = useState<"A" | "B">("A");
  const [d3, setD3] = useState(false);
  const [d2, setD2] = useState(false);

  const d = regime === "A" ? regimeA : regimeB;

  const acc_now = d3 ? d.d3_acc : d2 ? d.d2_acc : d.base_acc;
  const stab_now = d3 ? d.d3_acc : d2 ? d.d2_acc : d.base_stab;

  const d3_drop = d.base_acc - d.d3_acc;
  const d2_drop = d.base_acc - d.d2_acc;

  let verdictText: string;
  let verdictKlass: "endorsed" | "spurious" | "grounded";
  if (!d3 && !d2) {
    verdictText = "Endorsed by accuracy + stability — would ship";
    verdictKlass = "endorsed";
  } else if (d3) {
    if (regime === "B") {
      verdictText = "SC-spurious — invariance did not survive severing class-3";
      verdictKlass = "spurious";
    } else {
      verdictText = "SC-grounded — invariance survived severing class-3 (M carried the answer)";
      verdictKlass = "grounded";
    }
  } else {
    verdictText = "Negative control intact — 'any-change-breaks-it' ruled out";
    verdictKlass = regime === "B" ? "spurious" : "endorsed";
  }

  const verdictBg = {
    endorsed: "bg-[#EAF3DE] dark:bg-[#27500A]/40",
    spurious: "bg-[#FAECE7] dark:bg-[#712B13]/40",
    grounded: "bg-[#E1F5EE] dark:bg-[#085041]/40",
  }[verdictKlass];

  const verdictTextColor = {
    endorsed: "text-[#3B6D11] dark:text-[#C0DD97]",
    spurious: "text-[#993C1D] dark:text-[#F0997B]",
    grounded: "text-[#0F6E56] dark:text-[#5DCAA5]",
  }[verdictKlass];

  const reset = (newRegime?: "A" | "B") => {
    if (newRegime) setRegime(newRegime);
    setD3(false);
    setD2(false);
  };

  const dropColor = (drop: number) =>
    drop > 0.05
      ? "text-[#A32D2D] dark:text-[#F09595]"
      : "text-[#0F6E56] dark:text-[#5DCAA5]";

  return (
    <div className="my-8 not-prose font-sans">
      <div className="text-xs uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-1">
        Interactive demo · {modelLabel}
      </div>
      <h3 className="text-lg font-medium mb-1">Stable is not grounded</h3>
      <p className="text-sm text-[var(--color-text-muted)] italic mb-6">
        A 91%-accurate, fully stable model that has learned nothing — and the intervention that
        reveals it.
      </p>

      {/* Regime toggle */}
      <div className="flex gap-0 border border-[var(--color-border)] rounded-lg p-1 bg-[var(--color-surface)] mb-4">
        {(["A", "B"] as const).map((r) => (
          <button
            key={r}
            onClick={() => reset(r)}
            className={`flex-1 py-2 px-3 text-sm rounded-md transition-all ${
              regime === r
                ? "bg-[var(--color-bg)] font-medium shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Regime {r} — <code className="font-mono text-xs">M</code>{" "}
            {r === "A" ? "available" : "suppressed"}
          </button>
        ))}
      </div>

      <div className="text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-md p-3 mb-6 leading-relaxed">
        {d.desc}
      </div>

      {/* Stats panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
          <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-2">
            Level 1–2 (assumption-free)
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">Headline accuracy</span>
            <span className="text-base font-medium font-mono">{fmt(acc_now)}</span>
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">Stability (SC)</span>
            <span className="text-base font-medium font-mono">{fmt(stab_now)}</span>
          </div>
        </div>
        <div className="bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
          <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-2">
            Level 3 (licensed only)
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">do(class-3) — sever color</span>
            <span className={`text-base font-medium font-mono ${dropColor(d3_drop)}`}>
              {d3_drop >= 0 ? "−" : "+"}
              {fmt(Math.abs(d3_drop))}
            </span>
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">do(class-2) — sever name</span>
            <span className={`text-base font-medium font-mono ${dropColor(d2_drop)}`}>
              {d2_drop >= 0 ? "−" : "+"}
              {fmt(Math.abs(d2_drop))}
            </span>
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div className={`p-3 rounded-md mb-6 transition-all ${verdictBg}`}>
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium">
          Current verdict
        </div>
        <div className={`text-sm font-medium mt-1 ${verdictTextColor}`}>{verdictText}</div>
      </div>

      {/* Intervention buttons */}
      <div>
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-2">
          Apply a licensed intervention
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              setD3(!d3);
              if (!d3) setD2(false);
            }}
            className={`flex-1 min-w-[180px] text-left p-3 rounded-md border transition-all ${
              d3
                ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
            }`}
          >
            <span className="block text-sm font-medium">do(class-3)</span>
            <span className="block text-xs opacity-70 font-mono mt-0.5">
              Sever color ⊥ label · M intact
            </span>
          </button>
          <button
            onClick={() => {
              setD2(!d2);
              if (!d2) setD3(false);
            }}
            className={`flex-1 min-w-[180px] text-left p-3 rounded-md border transition-all ${
              d2
                ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
            }`}
          >
            <span className="block text-sm font-medium">do(class-2)</span>
            <span className="block text-xs opacity-70 font-mono mt-0.5">
              Sever name ⊥ label · negative control
            </span>
          </button>
        </div>
        <button
          onClick={() => reset()}
          className="mt-3 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline underline-offset-2"
        >
          Reset interventions
        </button>
      </div>
    </div>
  );
}
