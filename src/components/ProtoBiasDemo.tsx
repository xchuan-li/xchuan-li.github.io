import { useState } from "react";

// ProtoBiasDemo — the cross-lingual prototype-bias probe as an interactive island.
// An MLLM judge sees a prompt + two images (one semantically correct but atypical,
// one prototypical but wrong) and we measure how often it picks the prototypical-
// but-wrong one. Switch the ATTRIBUTE (bias moves a lot) and the LANGUAGE (it
// barely moves) — Report 1: "the bias follows the attribute, not the language."
// Anchors: Qwen2.5-VL-7B, Wealth .77, Power .67, Morality / Intellect ≈ chance.

type Attr = "Wealth" | "Power" | "Morality" | "Intellect";

const ATTR: Record<Attr, { base: number; prompt: Record<string, string> }> = {
  Wealth: { base: 0.77, prompt: { EN: "Who is wealthier?", ZH: "谁更富有？", AR: "مَن الأغنى؟", HI: "कौन अधिक धनी है?" } },
  Power: { base: 0.67, prompt: { EN: "Who holds more power?", ZH: "谁更有权力？", AR: "مَن الأكثر نفوذًا؟", HI: "किसके पास अधिक शक्ति है?" } },
  Morality: { base: 0.5, prompt: { EN: "Who is more trustworthy?", ZH: "谁更值得信任？", AR: "مَن الأجدر بالثقة؟", HI: "कौन अधिक भरोसेमंद है?" } },
  Intellect: { base: 0.5, prompt: { EN: "Who is more intelligent?", ZH: "谁更聪明？", AR: "مَن الأذكى؟", HI: "कौन अधिक बुद्धिमान है?" } },
};

const LANGS: { id: string; name: string; off: number; rtl?: boolean }[] = [
  { id: "EN", name: "English", off: 0 },
  { id: "ZH", name: "中文", off: 0.01 },
  { id: "AR", name: "العربية", off: -0.01, rtl: true },
  { id: "HI", name: "हिन्दी", off: 0.02 },
];

const ATTRS = Object.keys(ATTR) as Attr[];
const pct = (x: number) => `${Math.round(x * 100)}%`;

export default function ProtoBiasDemo() {
  const [attr, setAttr] = useState<Attr>("Wealth");
  const [lang, setLang] = useState(LANGS[0]);
  const base = ATTR[attr].base;
  const rate = Math.max(0, Math.min(1, base + lang.off));
  const rides = base >= 0.6;
  const tint = rides ? "var(--accent-coral)" : "var(--accent-teal)";

  return (
    <div className="my-6 not-prose font-sans">
      {/* attribute selector */}
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-1.5">Attribute</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[var(--color-border)] rounded-lg p-1 bg-[var(--color-surface)] mb-3">
        {ATTRS.map((a) => (
          <button
            key={a}
            onClick={() => setAttr(a)}
            className={`py-2 px-2 text-sm rounded-md transition-all ${
              attr === a ? "bg-[var(--color-bg)] font-medium shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* language selector */}
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] font-medium mb-1.5">Prompt language <span className="normal-case tracking-normal text-[var(--color-text-dim)]">· images stay fixed</span></div>
      <div className="grid grid-cols-4 gap-0 border border-[var(--color-border)] rounded-lg p-1 bg-[var(--color-surface)] mb-4">
        {LANGS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLang(l)}
            className={`py-2 px-2 text-sm rounded-md transition-all ${
              lang.id === l.id ? "bg-[var(--color-bg)] font-medium shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>

      {/* the judge task: prompt + two images */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)] mb-2">The judge sees</div>
        <p className="text-lg m-0 mb-3" dir={lang.rtl ? "rtl" : "ltr"}>{ATTR[attr].prompt[lang.id]}</p>
        <div className="grid grid-cols-2 gap-2">
          <ImageCard tag="Semantically correct" sub="less prototypical" right pick={!rides} />
          <ImageCard tag="More prototypical" sub="semantically wrong" right={false} pick={rides} />
        </div>
      </div>

      {/* prototype-bias meter */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 mb-3">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-dim)]">Picks the prototypical-but-wrong image</span>
          <span className="text-base font-mono font-medium" style={{ color: tint }}>{pct(rate)}</span>
        </div>
        <div className="relative h-2.5 rounded-full bg-[var(--color-bg)] overflow-hidden">
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${rate * 100}%`, background: tint }}></div>
          <div className="absolute inset-y-0" style={{ left: "50%", width: 1.5, background: "var(--color-text-dim)" }}></div>
        </div>
        <div className="flex justify-between text-[10px] text-[var(--color-text-dim)] mt-1">
          <span>0 · always semantic</span>
          <span>50% · chance</span>
          <span>100% · always prototype</span>
        </div>
      </div>

      {/* verdict */}
      <div className="rounded-md p-3 text-sm leading-relaxed" style={{ background: "var(--color-surface)", borderLeft: `3px solid ${tint}`, color: "var(--color-text-muted)" }}>
        {rides
          ? <><strong style={{ color: "var(--color-text)" }}>Rides the prototype.</strong> On {attr.toLowerCase()}, the judge prefers the typical-but-wrong image well above chance — the shortcut Stable Is Not Grounded certifies, in a multimodal judge.</>
          : <><strong style={{ color: "var(--color-text)" }}>At chance.</strong> On {attr.toLowerCase()} there is no prototype to ride, so the judge sits near 50% — the bias is attribute-specific, not everywhere.</>}
        <div className="mt-1.5 text-[var(--color-text-dim)]">Switch the language: the prompt changes, the rate barely moves. The bias follows the attribute, not the language.</div>
      </div>
    </div>
  );
}

function ImageCard({ tag, sub, right, pick }: { tag: string; sub: string; right: boolean; pick: boolean }) {
  const c = right ? "var(--accent-teal)" : "var(--accent-coral)";
  return (
    <div className="rounded-md border bg-[var(--color-bg)] p-3" style={{ borderColor: pick ? c : "var(--color-border)", borderWidth: pick ? 1.5 : 0.5 }}>
      <div className="flex items-center justify-center h-14 rounded bg-[var(--color-surface)] mb-2 text-[var(--color-text-dim)]" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
      </div>
      <div className="text-[12px] font-medium" style={{ color: pick ? c : "var(--color-text)" }}>{tag}</div>
      <div className="text-[11px] text-[var(--color-text-dim)]">{sub}</div>
      {pick && <div className="text-[10px] font-mono mt-1" style={{ color: c }}>← judge leans here</div>}
    </div>
  );
}
