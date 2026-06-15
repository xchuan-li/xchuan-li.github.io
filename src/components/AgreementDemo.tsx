import { useState } from "react";

// ============================================================
// AgreementDemo — Interactive Figure for Experiment 2 of
// "Stable Is Not Grounded": subject–verb agreement (portability regime).
//
// Grammar fixes irrelevance for free — the verb agrees with the syntactic
// SUBJECT, not the linearly closest noun. So the same cut from Exp 1 maps on
// without the investigator choosing the shortcut:
//   do(class-3)  = an attractor: an intervening noun of the OPPOSITE number
//   do(class-2)  = a same-number intervener (negative control)
//   SC-grounded  = high on both aligned AND attractor (tracks the subject)
//   SC-spurious  = high on aligned, collapses on attractor (rides proximity)
//
// Because these are zero-shot pretrained LMs, the training side is dark: the
// proximity–label correlation can't be measured. So this is a PORTABILITY
// diagnosis, not a full certificate. Headline: the cross-lingual flip — the
// same model (XGLM-564M) is SC-spurious in EN but SC-grounded in DE.
//
// All numbers are paper-derived (v5, CLAMS zero-shot, capped 2000/slice).
// ============================================================

export interface LangData {
  lang: "EN" | "DE";
  model: string;
  desc: string;
  // example sentence parts for the dependency figure
  subject: string;
  subjNum: "sg" | "pl";
  intervener: string;
  verbRight: string; // subject-agreeing (correct) form
  verbProx: string; // proximity-rider's (wrong) form under the attractor
  // accuracies
  aligned: number;
  control: number; // CTL — same-number intervener
  attractor: number; // ATT — opposite-number intervener
  control_intact: boolean;
  verdict: "grounded" | "spurious";
}

export interface AgreementRow {
  lang: "EN" | "DE";
  name: string;
  ctl: number;
  att: number;
  intact: boolean;
  verdict: "grounded" | "spurious" | "unresolved";
}

// The cross-lingual flip witness: same model, language changed, verdict flips.
const EN_XGLM: LangData = {
  lang: "EN",
  model: "XGLM-564M",
  desc: "English. The agreement dependency and surface order line up less often, so a model can ride the nearest noun and still look correct on easy items — until an attractor pulls the wrong way.",
  subject: "author",
  subjNum: "sg",
  intervener: "guards",
  verbRight: "is",
  verbProx: "are",
  aligned: 0.975,
  control: 0.899,
  attractor: 0.692,
  control_intact: true,
  verdict: "spurious",
};

const DE_XGLM: LangData = {
  lang: "DE",
  model: "XGLM-564M",
  desc: "German. Richer agreement morphology severs proximity from the subject more saliently, so the same model keeps tracking the head noun even under an opposite-number attractor.",
  subject: "Autor",
  subjNum: "sg",
  intervener: "Lehrer",
  verbRight: "ist",
  verbProx: "sind",
  aligned: 0.987,
  control: 0.986,
  attractor: 0.889,
  control_intact: true,
  verdict: "grounded",
};

// Full zero-shot table across both languages (paper §7).
const DEFAULT_ROWS: AgreementRow[] = [
  { lang: "EN", name: "GPT-2",       ctl: 0.867, att: 0.813, intact: true,  verdict: "grounded" },
  { lang: "EN", name: "DistilGPT-2", ctl: 0.879, att: 0.686, intact: true,  verdict: "spurious" },
  { lang: "EN", name: "XGLM-564M",   ctl: 0.899, att: 0.692, intact: true,  verdict: "spurious" },
  { lang: "EN", name: "Pythia-160M", ctl: 0.750, att: 0.532, intact: false, verdict: "unresolved" },
  { lang: "DE", name: "German GPT-2", ctl: 0.943, att: 0.821, intact: true, verdict: "grounded" },
  { lang: "DE", name: "XGLM-564M",   ctl: 0.986, att: 0.889, intact: true,  verdict: "grounded" },
];

const fmt = (x: number) => x.toFixed(3);
const fmt2 = (x: number) => x.toFixed(2);

export interface AgreementDemoProps {
  en?: LangData;
  de?: LangData;
  rows?: AgreementRow[];
}

export default function AgreementDemo({
  en = EN_XGLM,
  de = DE_XGLM,
  rows = DEFAULT_ROWS,
}: AgreementDemoProps) {
  const [lang, setLang] = useState<"EN" | "DE">("EN");
  const [att, setAtt] = useState(false); // do(class-3) — opposite-number attractor
  const [ctl, setCtl] = useState(false); // do(class-2) — same-number intervener

  const d = lang === "EN" ? en : de;
  const acc_now = att ? d.attractor : ctl ? d.control : d.aligned;
  const gap = d.control - d.attractor; // CTL − ATT, the proximity-reliance signal

  let verdictText: string;
  let verdictKlass: "endorsed" | "spurious" | "grounded" | "unresolved";
  if (!att && !ctl) {
    verdictText = "Endorsed by aligned accuracy — would pass a surface robustness check";
    verdictKlass = "endorsed";
  } else if (ctl && !att) {
    verdictText = "Negative control — a same-number intervener barely moves accuracy";
    verdictKlass = "endorsed";
  } else if (!d.control_intact) {
    verdictText = "SC-unresolved — the control itself collapsed (any intervener hurts), so the attractor drop is uninterpretable";
    verdictKlass = "unresolved";
  } else if (d.verdict === "spurious") {
    verdictText = "SC-spurious — accuracy collapsed under the attractor: the model rode linear proximity";
    verdictKlass = "spurious";
  } else {
    verdictText = "SC-grounded — accuracy held under the attractor: the model tracked the syntactic subject";
    verdictKlass = "grounded";
  }

  const verdictBg = {
    endorsed: "bg-[#EAF3DE] dark:bg-[#27500A]/40",
    spurious: "bg-[#FAECE7] dark:bg-[#712B13]/40",
    grounded: "bg-[#E1F5EE] dark:bg-[#085041]/40",
    unresolved: "bg-[var(--color-surface-2)]",
  }[verdictKlass];

  const verdictTextColor = {
    endorsed: "text-[#3B6D11] dark:text-[#C0DD97]",
    spurious: "text-[#993C1D] dark:text-[#F0997B]",
    grounded: "text-[#0F6E56] dark:text-[#5DCAA5]",
    unresolved: "text-[var(--color-text-muted)]",
  }[verdictKlass];

  const reset = (newLang?: "EN" | "DE") => {
    if (newLang) setLang(newLang);
    setAtt(false);
    setCtl(false);
  };

  const dropColor = (drop: number) =>
    drop > 0.1
      ? "text-[#A32D2D] dark:text-[#F09595]"
      : "text-[#0F6E56] dark:text-[#5DCAA5]";

  return (
    <div className="my-8 not-prose font-sans">
      <div className="text-xs uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-1">
        Interactive figure · Experiment 2 · {d.model}
      </div>
      <h3 className="text-lg font-medium mb-1">The same cut, on real grammar</h3>
      <p className="text-sm text-[var(--color-text-muted)] italic mb-4">
        Subject–verb agreement makes the shortcut honest: grammar — not the
        investigator — fixes that linear proximity is irrelevant.
      </p>

      {/* Portability caveat */}
      <div className="text-[12px] text-[var(--color-text-muted)] bg-[var(--color-surface-2)] border-l-2 border-[var(--accent-amber)] rounded-r-md px-3 py-2 mb-5 leading-relaxed">
        <strong className="text-[var(--color-text)]">Portability regime.</strong>{" "}
        These are zero-shot pretrained models, so the training side is dark —
        the proximity–label correlation can&rsquo;t be audited. This is a{" "}
        <em>diagnosis</em>, not the full certificate Experiment&nbsp;1 earns.
      </div>

      {/* Language toggle — same model, language flips the verdict */}
      <div className="flex gap-0 border border-[var(--color-border)] rounded-lg p-1 bg-[var(--color-surface)] mb-2">
        {(["EN", "DE"] as const).map((l) => (
          <button
            key={l}
            onClick={() => reset(l)}
            className={`flex-1 py-2 px-3 text-sm rounded-md transition-all ${
              lang === l
                ? "bg-[var(--color-bg)] font-medium shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {l === "EN" ? "English" : "German"}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-[var(--color-text-dim)] mb-4 text-center">
        same model · <code className="font-mono">{d.model}</code> · only the language changes
      </p>

      <div className="text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] rounded-md p-3 mb-6 leading-relaxed">
        {d.desc}
      </div>

      {/* === FIGURE 1: dependency arcs === */}
      <DependencyFigure d={d} att={att} ctl={ctl} />

      {/* Stats panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
          <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-2">
            Surface check (assumption-free)
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">Current slice accuracy</span>
            <span className="text-base font-medium font-mono">{fmt(acc_now)}</span>
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">Aligned baseline</span>
            <span className="text-base font-medium font-mono">{fmt(d.aligned)}</span>
          </div>
        </div>
        <div className="bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
          <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-2">
            Grounding signal (CTL − ATT)
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">do(class-2) — control</span>
            <span className="text-base font-medium font-mono">{fmt(d.control)}</span>
          </div>
          <div className="flex justify-between items-baseline py-1">
            <span className="text-sm text-[var(--color-text-muted)]">do(class-3) gap</span>
            <span className={`text-base font-medium font-mono ${dropColor(gap)}`}>
              −{fmt(gap)}
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
          Add an intervener
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { setAtt(!att); if (!att) setCtl(false); }}
            className={`flex-1 min-w-[180px] text-left p-3 rounded-md border transition-all ${
              att
                ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
            }`}
          >
            <span className="block text-sm font-medium">do(class-3)</span>
            <span className="block text-xs opacity-70 font-mono mt-0.5">Attractor · opposite-number intervener</span>
          </button>
          <button
            onClick={() => { setCtl(!ctl); if (!ctl) setAtt(false); }}
            className={`flex-1 min-w-[180px] text-left p-3 rounded-md border transition-all ${
              ctl
                ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                : "bg-[var(--color-surface)] border-[var(--color-border-strong)] hover:bg-[var(--color-bg)]"
            }`}
          >
            <span className="block text-sm font-medium">do(class-2)</span>
            <span className="block text-xs opacity-70 font-mono mt-0.5">Same-number intervener · negative control</span>
          </button>
        </div>
        <button
          onClick={() => reset()}
          className="mt-3 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline underline-offset-2"
        >
          Reset interveners
        </button>
      </div>

      {/* === FIGURE 2: EN vs DE accuracy bars === */}
      <SliceBars en={en} de={de} />

      {/* === FIGURE 3: full zero-shot table === */}
      <AgreementTable rows={rows} />
    </div>
  );
}

// ============================================================
// FIGURE 1 — dependency arcs (subject → verb vs proximity → verb)
// ============================================================
function DependencyFigure({ d, att, ctl }: { d: LangData; att: boolean; ctl: boolean }) {
  // intervener number: matches subject under control, opposite under attractor
  const oppNum = d.subjNum === "sg" ? "pl" : "sg";
  const intvNum = att ? oppNum : d.subjNum;
  const showIntervener = att || ctl;
  const conflict = att; // proximity points the wrong way only under the attractor

  // node x-coords
  const subjX = 70;
  const intvX = 195;
  const verbX = 320;
  const baseY = 110;

  const numBadge = (n: "sg" | "pl") => (n === "sg" ? "SG" : "PL");

  return (
    <div className="mb-6 bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-3">
        Agreement dependency · subject vs. nearest noun
      </div>
      <svg viewBox="0 0 380 150" className="w-full h-auto" style={{ maxHeight: 190 }} role="img" aria-label="Subject–verb agreement dependency with an intervening noun">
        <defs>
          <marker id="ag-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* agreement arc: subject → verb (the real structure M), teal */}
        <g style={{ color: "var(--accent-teal)" }}>
          <path
            d={`M ${subjX} ${baseY - 18} C ${subjX} 30, ${verbX} 30, ${verbX} ${baseY - 18}`}
            fill="none" stroke="var(--accent-teal)" strokeWidth="2"
            markerEnd="url(#ag-arrow)"
          />
          <text x={(subjX + verbX) / 2} y="26" textAnchor="middle" fontSize="9" fill="var(--accent-teal)" fontFamily="var(--font-sans)" fontWeight="500">
            agrees with subject (M)
          </text>
        </g>

        {/* proximity arc: intervener → verb (the shortcut), coral when conflicting */}
        {showIntervener && (
          <g style={{ color: conflict ? "var(--accent-coral)" : "var(--color-text-dim)" }}>
            <path
              d={`M ${intvX} ${baseY + 16} C ${intvX} ${baseY + 44}, ${verbX} ${baseY + 44}, ${verbX} ${baseY + 16}`}
              fill="none"
              stroke={conflict ? "var(--accent-coral)" : "var(--color-text-dim)"}
              strokeWidth={conflict ? 2 : 1.25}
              strokeDasharray={conflict ? "none" : "3 3"}
              markerEnd="url(#ag-arrow)"
            />
            <text x={(intvX + verbX) / 2} y={baseY + 52} textAnchor="middle" fontSize="9"
              fill={conflict ? "var(--accent-coral)" : "var(--color-text-dim)"} fontFamily="var(--font-sans)">
              {conflict ? "proximity pulls the wrong way" : "proximity agrees too"}
            </text>
          </g>
        )}

        {/* nodes */}
        {/* subject */}
        <g>
          <rect x={subjX - 38} y={baseY - 18} width="76" height="36" rx="6"
            fill="var(--color-bg)" stroke="var(--accent-teal)" strokeWidth="1.5" />
          <text x={subjX} y={baseY - 2} textAnchor="middle" fontSize="12" fill="var(--color-text)" fontFamily="var(--font-sans)" fontWeight="500">
            {d.subject}
          </text>
          <text x={subjX} y={baseY + 11} textAnchor="middle" fontSize="8.5" fill="var(--accent-teal)" fontFamily="var(--font-mono)">
            subject · {numBadge(d.subjNum)}
          </text>
        </g>

        {/* intervener */}
        {showIntervener ? (
          <g>
            <rect x={intvX - 38} y={baseY - 18} width="76" height="36" rx="6"
              fill="var(--color-bg)"
              stroke={conflict ? "var(--accent-coral)" : "var(--color-text-muted)"}
              strokeWidth="1.5"
              strokeDasharray={conflict ? "none" : "3 3"} />
            <text x={intvX} y={baseY - 2} textAnchor="middle" fontSize="12" fill="var(--color-text)" fontFamily="var(--font-sans)" fontWeight="500">
              {d.intervener}
            </text>
            <text x={intvX} y={baseY + 11} textAnchor="middle" fontSize="8.5"
              fill={conflict ? "var(--accent-coral)" : "var(--color-text-muted)"} fontFamily="var(--font-mono)">
              intervener · {numBadge(intvNum)}
            </text>
          </g>
        ) : (
          <g opacity="0.4">
            <rect x={intvX - 38} y={baseY - 18} width="76" height="36" rx="6"
              fill="none" stroke="var(--color-border-strong)" strokeWidth="1" strokeDasharray="2 3" />
            <text x={intvX} y={baseY + 4} textAnchor="middle" fontSize="9" fill="var(--color-text-dim)" fontFamily="var(--font-sans)">
              (no intervener)
            </text>
          </g>
        )}

        {/* verb */}
        <g>
          <rect x={verbX - 38} y={baseY - 18} width="76" height="36" rx="6"
            fill="var(--color-bg)" stroke="var(--color-text)" strokeWidth="1.5" />
          <text x={verbX} y={baseY - 1} textAnchor="middle" fontSize="12" fill="var(--color-text)" fontFamily="var(--font-mono)" fontWeight="600">
            {d.verbRight}
          </text>
          <text x={verbX} y={baseY + 11} textAnchor="middle" fontSize="8.5" fill="var(--color-text-muted)" fontFamily="var(--font-mono)">
            verb · {numBadge(d.subjNum)}
          </text>
        </g>
      </svg>

      <div className="text-[11px] text-[var(--color-text-muted)] mt-2 leading-relaxed">
        {!att && !ctl && (
          <span>Aligned baseline. The verb <code className="font-mono">{d.verbRight}</code> agrees with the subject <code className="font-mono">{d.subject}</code>; nothing competes.</span>
        )}
        {ctl && (
          <span>Negative control: a <strong>same-number</strong> intervener is present, but it points the same way — a proximity-rider isn&rsquo;t tempted, so accuracy should hold.</span>
        )}
        {att && (
          <span>Attractor: the intervener is now the <strong>opposite</strong> number, so &ldquo;agree with the nearest noun&rdquo; predicts <code className="font-mono">{d.verbProx}</code> — wrong. Only a model that tracks the subject still answers <code className="font-mono">{d.verbRight}</code>.</span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// FIGURE 2 — EN vs DE accuracy bars across the three slices
// ============================================================
function SliceBars({ en, de }: { en: LangData; de: LangData }) {
  const groups = [
    { name: "aligned", a: en.aligned, b: de.aligned },
    { name: "do(class-2)", a: en.control, b: de.control },
    { name: "do(class-3)", a: en.attractor, b: de.attractor },
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
        English vs German · {en.model} · accuracy by slice
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto" role="img" aria-label="Bar chart comparing English and German agreement accuracy across slices">
        {[0, 0.5, 1.0].map((tick) => (
          <g key={tick}>
            <line x1={padL} y1={yFor(tick)} x2={chartW - padR} y2={yFor(tick)} stroke="var(--color-border)" strokeWidth="0.5" />
            <text x={padL - 6} y={yFor(tick) + 3} fontSize="9" textAnchor="end" fill="var(--color-text-dim)" fontFamily="var(--font-mono)">
              {tick.toFixed(1)}
            </text>
          </g>
        ))}

        {groups.map((g, i) => {
          const cx = padL + groupW * (i + 0.5);
          return (
            <g key={g.name}>
              <rect x={cx - barW - gap / 2} y={yFor(g.a)} width={barW} height={innerH - (yFor(g.a) - padT)} fill="var(--accent-coral)" rx="1" />
              <rect x={cx + gap / 2} y={yFor(g.b)} width={barW} height={innerH - (yFor(g.b) - padT)} fill="var(--accent-teal)" rx="1" />
              <text x={cx - barW / 2 - gap / 2} y={yFor(g.a) - 3} fontSize="8" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-mono)">
                {fmt2(g.a)}
              </text>
              <text x={cx + barW / 2 + gap / 2} y={yFor(g.b) - 3} fontSize="8" textAnchor="middle" fill="var(--color-text-muted)" fontFamily="var(--font-mono)">
                {fmt2(g.b)}
              </text>
              <text x={cx} y={chartH - padB + 14} fontSize="9" textAnchor="middle" fill="var(--color-text)" fontFamily="var(--font-mono)">
                {g.name}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex gap-4 mt-2 text-[11px] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--accent-coral)" }}></span>
          English — <code className="font-mono">SC-spurious</code> (collapses on the attractor)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "var(--accent-teal)" }}></span>
          German — <code className="font-mono">SC-grounded</code> (holds)
        </span>
      </div>
    </div>
  );
}

// ============================================================
// FIGURE 3 — full zero-shot agreement table (§7)
// ============================================================
function AgreementTable({ rows }: { rows: AgreementRow[] }) {
  const verdictColor = (v: AgreementRow["verdict"]) =>
    v === "spurious"
      ? "text-[#A32D2D] dark:text-[#F09595]"
      : v === "grounded"
      ? "text-[#0F6E56] dark:text-[#5DCAA5]"
      : "text-[var(--color-text-dim)]";

  const verdictLabel = (v: AgreementRow["verdict"]) =>
    v === "spurious" ? "SC-spurious" : v === "grounded" ? "SC-grounded" : "SC-unresolved";

  return (
    <div className="bg-[var(--color-surface)] rounded-md p-4 border border-[var(--color-border)]">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-3">
        Experiment 2 · all zero-shot runs (CLAMS)
      </div>
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-sans font-medium">
            <th className="text-left py-2 font-medium">lang · model</th>
            <th className="text-right py-2 font-medium">ctl</th>
            <th className="text-right py-2 font-medium">att</th>
            <th className="text-right py-2 font-medium">ctl−att</th>
            <th className="text-right py-2 font-medium">verdict</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const g = r.ctl - r.att;
            return (
              <tr key={`${r.lang}-${r.name}`} className="border-t border-[var(--color-border)]">
                <td className="py-2 font-sans text-[var(--color-text)]">
                  <span className="text-[var(--color-text-dim)]">{r.lang}</span> · {r.name}
                </td>
                <td className="py-2 text-right text-[var(--color-text-muted)]">{fmt(r.ctl)}</td>
                <td className="py-2 text-right text-[var(--color-text-muted)]">{fmt(r.att)}</td>
                <td className={`py-2 text-right ${g > 0.1 ? "text-[#A32D2D] dark:text-[#F09595]" : "text-[#0F6E56] dark:text-[#5DCAA5]"}`}>
                  {fmt(g)}
                </td>
                <td className={`py-2 text-right text-xs font-sans ${verdictColor(r.verdict)}`}>
                  {verdictLabel(r.verdict)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-[11px] text-[var(--color-text-muted)] mt-3 leading-relaxed">
        The clean shortcut contrast is <code className="font-mono">ctl−att</code> (control and
        attractor share structure; aligned does not). <code className="font-mono">XGLM-564M</code> is
        the cross-lingual flip witness — spurious in English, grounded in German.
        Pythia-160M is <code className="font-mono">SC-unresolved</code>: its control already collapsed,
        so the attractor drop can&rsquo;t be read as a clean proximity effect — which is exactly what the
        negative control is for.
      </p>
    </div>
  );
}
