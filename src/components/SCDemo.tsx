import { useState } from "react";

// ============================================================
// SCDemo — Interactive Figure for "Stable is not grounded"
//
// Reproduces §6.1 with three coordinated views:
//  (1) DAG of the data-generating process; do() severs an arrow
//  (2) Regime A vs B accuracy bars under each intervention
//  (3) §6.1 three-model Δ table (TF-IDF, DistilBERT, Qwen LoRA)
//
// All numbers are paper-derived. Override via props if the paper revs.
// ============================================================

export interface RegimeData {
  desc: string;
  base_acc: number;
  base_stab: number;
  d3_acc: number;
  d2_acc: number;
}

export interface ModelRow {
  name: string;
  base_acc: number;
  d3_delta: number;
  d2_delta: number;
}

export interface SCDemoProps {
  modelLabel?: string;
  regimeA?: RegimeData;
  regimeB?: RegimeData;
  modelTable?: ModelRow[];
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
  d3_acc: 0.504,
  d2_acc: 0.891,
};

const DEFAULT_TABLE: ModelRow[] = [
  { name: "TF-IDF + LR",     base_acc: 0.912, d3_delta: 0.408, d2_delta: 0.021 },
  { name: "DistilBERT (FT)", base_acc: 0.939, d3_delta: 0.429, d2_delta: 0.018 },
  { name: "Qwen 2 (LoRA)",   base_acc: 0.961, d3_delta: 0.501, d2_delta: 0.024 },
];

const fmt = (x: number) => x.toFixed(3);

export default function SCDemo({
  modelLabel = "TF-IDF + LR",
  regimeA = DEFAULT_A,
  regimeB = DEFAULT_B,
  modelTable = DEFAULT_TABLE,
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
        Interactive figure · {modelLabel}
      </div>
      <h3 className="text-lg font-medium mb-1">Stable is not grounded</h3>
      <p className="text-sm text-[var(--color-text-muted)] italic mb-6">
        A 91%-accurate, fully stable model that has learned nothing — and the intervention that reveals it.
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
            Regime {r} — <code className="font-mono text-xs">M</code> {r === "A" ? "available" : "suppressed"}
          </button>
        ))}
      </div>

      <div className="text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-md p-3 mb-6 leading-relaxed">
        {d.desc}
      </div>

      {/* === FIGURE 1: DAG === */}
      <DAGFigure regime={regime} d3={d3} d2={d2} />

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
              {d3_drop >= 0 ? "−" : "+"}{fmt(Math.abs(d3_drop))}
            </span>
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">do(class-2) — sever name</span>
            <span className={`text-base font-medium font-mono ${dropColor(d2_drop)}`}>
              {d2_drop >= 0 ? "−" : "+"}{fmt(Math.abs(d2_drop))}
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
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-2">
          Apply a licensed intervention
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { setD3(!d3); if (!d3) setD2(false); }}
            className={`flex-1 min-w-[180px] text-left p-3 rounded-md border transition-all ${
              d3
                ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
            }`}
          >
            <span className="block text-sm font-medium">do(class-3)</span>
            <span className="block text-xs opacity-70 font-mono mt-0.5">Sever color ⊥ label · M intact</span>
          </button>
          <button
            onClick={() => { setD2(!d2); if (!d2) setD3(false); }}
            className={`flex-1 min-w-[180px] text-left p-3 rounded-md border transition-all ${
              d2
                ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
            }`}
          >
            <span className="block text-sm font-medium">do(class-2)</span>
            <span className="block text-xs opacity-70 font-mono mt-0.5">Sever name ⊥ label · negative control</span>
          </button>
        </div>
        <button
          onClick={() => reset()}
          className="mt-3 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline underline-offset-2"
        >
          Reset interventions
        </button>
      </div>

      {/* === FIGURE 2: Regime A vs B accuracy bars === */}
      <BarComparison regimeA={regimeA} regimeB={regimeB} />

      {/* === FIGURE 3: §6.1 three-model Δ table === */}
      <ModelTable rows={modelTable} />
    </div>
  );
}

// ============================================================
// FIGURE 1 — DAG (causal graph of data-generating process)
// ============================================================
function DAGFigure({ regime, d3, d2 }: { regime: "A" | "B"; d3: boolean; d2: boolean }) {
  const M_visible = regime === "A";

  // node coords
  const nodes = {
    M:    { x: 100, y: 40, label: "M", sub: "animal type" },
    Y:    { x: 280, y: 40, label: "Y", sub: "label" },
    C:    { x: 100, y: 130, label: "color", sub: "class-3" },
    N:    { x: 280, y: 130, label: "name", sub: "class-2" },
  };

  const arrowSet = [
    { from: "M", to: "Y", id: "MY", severable: false },
    { from: "C", to: "Y", id: "CY", severable: true, class: "3" },
    { from: "N", to: "Y", id: "NY", severable: true, class: "2" },
  ];

  const isSevered = (id: string) =>
    (id === "CY" && d3) || (id === "NY" && d2);

  return (
    <div className="mb-6 bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-3">
        Causal graph · current regime + interventions
      </div>
      <svg viewBox="0 0 380 180" className="w-full h-auto" style={{ maxHeight: 200 }} role="img" aria-label="Causal DAG showing M, label, color, name relationships">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
          <marker id="arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.3" />
          </marker>
        </defs>

        {/* arrows */}
        {arrowSet.map((a) => {
          const from = nodes[a.from as keyof typeof nodes];
          const to = nodes[a.to as keyof typeof nodes];
          const severed = isSevered(a.id);
          const dimmed = a.from === "M" && !M_visible;
          const isShortcutActive = (a.id === "CY" && regime === "B" && !d3);

          // arrow path
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.sqrt(dx*dx + dy*dy);
          const ux = dx/len, uy = dy/len;
          const r = 22; // node radius
          const x1 = from.x + ux*r;
          const y1 = from.y + uy*r;
          const x2 = to.x - ux*r;
          const y2 = to.y - uy*r;

          let stroke = "var(--color-text-muted)";
          let strokeWidth = 1.5;
          let dashArray = "none";
          let opacity = 1;

          if (severed) {
            stroke = "#A32D2D";
            strokeWidth = 1.5;
            dashArray = "4 4";
          } else if (isShortcutActive) {
            stroke = "var(--accent-coral)";
            strokeWidth = 2;
          } else if (dimmed) {
            opacity = 0.25;
          }

          return (
            <g key={a.id}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                opacity={opacity}
                markerEnd={severed || dimmed ? "url(#arrow-dim)" : "url(#arrow)"}
                style={{ color: stroke, transition: "all 0.3s ease" }}
              />
              {severed && (
                <g>
                  <line x1={(x1+x2)/2 - 6} y1={(y1+y2)/2 - 6} x2={(x1+x2)/2 + 6} y2={(y1+y2)/2 + 6} stroke="#A32D2D" strokeWidth="2"/>
                  <line x1={(x1+x2)/2 - 6} y1={(y1+y2)/2 + 6} x2={(x1+x2)/2 + 6} y2={(y1+y2)/2 - 6} stroke="#A32D2D" strokeWidth="2"/>
                </g>
              )}
            </g>
          );
        })}

        {/* nodes */}
        {Object.entries(nodes).map(([k, n]) => {
          const dimmed = k === "M" && !M_visible;
          return (
            <g key={k} opacity={dimmed ? 0.3 : 1} style={{ transition: "opacity 0.3s ease" }}>
              <circle
                cx={n.x} cy={n.y} r="22"
                fill="var(--color-bg)"
                stroke={k === "Y" ? "var(--color-text)" : "var(--color-text-muted)"}
                strokeWidth={k === "Y" ? 1.5 : 1}
                strokeDasharray={dimmed ? "3 3" : "none"}
              />
              <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="13" fontFamily="var(--font-mono)" fill="var(--color-text)" fontWeight="500">
                {n.label}
              </text>
              <text x={n.x} y={n.y + 38} textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="var(--font-sans)">
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="text-[11px] text-[var(--color-text-muted)] mt-2 leading-relaxed">
        {M_visible
          ? <span><code className="font-mono">M</code> is observable; both shortcut features are inert by default. The model <em>can</em> ground its prediction in <code className="font-mono">M</code>.</span>
          : <span><code className="font-mono">M</code> is hidden (dashed). The shortcut arrow <code className="font-mono">color → Y</code> is the only path carrying label information.</span>
        }
        {(d3 || d2) && (
          <span> {" "}The crossed arrow shows the active <code className="font-mono">do</code>-intervention severing the corresponding correlation.</span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// FIGURE 2 — Regime A vs B accuracy bars
// ============================================================
function BarComparison({ regimeA, regimeB }: { regimeA: RegimeData; regimeB: RegimeData }) {
  const groups = [
    { name: "baseline",     a: regimeA.base_acc, b: regimeB.base_acc },
    { name: "do(class-3)",  a: regimeA.d3_acc,   b: regimeB.d3_acc },
    { name: "do(class-2)",  a: regimeA.d2_acc,   b: regimeB.d2_acc },
  ];

  const chartH = 130;
  const chartW = 360;
  const padL = 30, padR = 10, padT = 10, padB = 30;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;
  const groupW = innerW / groups.length;
  const barW = 18;
  const gap = 4;

  const yFor = (v: number) => padT + innerH - v * innerH;

  return (
    <div className="mb-6 bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-3">
        Regime A vs B · accuracy under each intervention
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto" role="img" aria-label="Bar chart comparing accuracy across regimes and interventions">
        {/* y-axis ticks */}
        {[0, 0.5, 1.0].map((tick) => (
          <g key={tick}>
            <line
              x1={padL} y1={yFor(tick)} x2={chartW - padR} y2={yFor(tick)}
              stroke="var(--color-border)" strokeWidth="0.5"
            />
            <text x={padL - 6} y={yFor(tick) + 3} fontSize="9" textAnchor="end" fill="var(--color-text-dim)" fontFamily="var(--font-mono)">
              {tick.toFixed(1)}
            </text>
          </g>
        ))}

        {/* bars */}
        {groups.map((g, i) => {
          const cx = padL + groupW * (i + 0.5);
          return (
            <g key={g.name}>
              <rect
                x={cx - barW - gap/2} y={yFor(g.a)}
                width={barW} height={innerH - (yFor(g.a) - padT)}
                fill="var(--accent-teal)" rx="1"
              />
              <rect
                x={cx + gap/2} y={yFor(g.b)}
                width={barW} height={innerH - (yFor(g.b) - padT)}
                fill="var(--accent-coral)" rx="1"
              />
              <text x={cx - barW/2 - gap/2} y={yFor(g.a) - 3} fontSize="8" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-mono)">
                {g.a.toFixed(2)}
              </text>
              <text x={cx + barW/2 + gap/2} y={yFor(g.b) - 3} fontSize="8" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-mono)">
                {g.b.toFixed(2)}
              </text>
              <text x={cx} y={chartH - padB + 14} fontSize="10" textAnchor="middle" fill="var(--color-text)" fontFamily="var(--font-mono)">
                {g.name}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex gap-4 mt-2 text-[11px] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--accent-teal)" }}></span>
          Regime A — <code className="font-mono">M</code> available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--accent-coral)" }}></span>
          Regime B — <code className="font-mono">M</code> suppressed
        </span>
      </div>
    </div>
  );
}

// ============================================================
// FIGURE 3 — §6.1 three-model Δ table
// ============================================================
function ModelTable({ rows }: { rows: ModelRow[] }) {
  // intensity scale for do(class-3) — paper's key finding
  const maxD3 = Math.max(...rows.map((r) => r.d3_delta));
  const intensity = (v: number) => Math.min(1, v / maxD3);

  return (
    <div className="bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-3">
        §6.1 · three architectures, same pattern
      </div>
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-sans font-medium">
            <th className="text-left py-2 font-medium">model</th>
            <th className="text-right py-2 font-medium">acc</th>
            <th className="text-right py-2 font-medium">Δ do(3)</th>
            <th className="text-right py-2 font-medium">Δ do(2)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-[var(--color-border)]">
              <td className="py-2 font-sans text-[var(--color-text)]">{r.name}</td>
              <td className="py-2 text-right text-[var(--color-text-muted)]">{r.base_acc.toFixed(3)}</td>
              <td className="py-2 text-right">
                <span
                  className="inline-block px-2 py-0.5 rounded text-[#A32D2D] dark:text-[#F09595]"
                  style={{
                    background: `color-mix(in srgb, var(--accent-coral) ${intensity(r.d3_delta) * 28}%, transparent)`,
                    fontWeight: 500,
                  }}
                >
                  +{r.d3_delta.toFixed(3)}
                </span>
              </td>
              <td className="py-2 text-right text-[#0F6E56] dark:text-[#5DCAA5]">
                +{r.d2_delta.toFixed(3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[11px] text-[var(--color-text-muted)] mt-3 leading-relaxed">
        The pattern survives architecture: lexical, BERT-class, and instruction-tuned LLM all collapse under <code className="font-mono">do(class-3)</code> while moving negligibly under the negative control.
      </p>
    </div>
  );
}
