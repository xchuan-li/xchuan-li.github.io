import { useState } from "react";

// Exp2AgreementTabs - "The key ... is/are on the table." Switch between the aligned,
// control, and attractor slices to see when a subject-tracker and a proximity-rider
// give the same verb, and the one slice where they finally split.

type Slice = "aligned" | "control" | "attractor";

interface Data {
  pre: string; // text before the verb (with the subject + any intervener)
  near: string; // the nearest noun
  nearNum: "SG" | "PL";
  conflict: boolean;
  proxVerb: string; // what "agree with nearest noun" predicts
  verdict: string;
  kind: "neutral" | "split";
}

const SUBJECT = "key";
const CORRECT = "is"; // agrees with the singular subject

const SLICES: Record<Slice, Data> = {
  aligned: {
    pre: "The key",
    near: "key",
    nearNum: "SG",
    conflict: false,
    proxVerb: "is",
    verdict: "Both strategies pick \"is\". Looks correct - but tells you nothing about which one the model used.",
    kind: "neutral",
  },
  control: {
    pre: "The key near the lamp",
    near: "lamp",
    nearNum: "SG",
    conflict: false,
    proxVerb: "is",
    verdict: "A noun intervenes, but it is the same number, so both still pick \"is\". Still indistinguishable - that is exactly why this is only the control.",
    kind: "neutral",
  },
  attractor: {
    pre: "The key to the cabinets",
    near: "cabinets",
    nearNum: "PL",
    conflict: true,
    proxVerb: "are",
    verdict: "Now they split: track the subject -> \"is\"; ride proximity -> \"are\". This is the only slice that separates SC-grounded from SC-spurious.",
    kind: "split",
  },
};

const TABS: Slice[] = ["aligned", "control", "attractor"];

export default function Exp2AgreementTabs() {
  const [slice, setSlice] = useState<Slice>("aligned");
  const d = SLICES[slice];
  const splitC = d.kind === "split" ? "var(--accent-coral)" : "var(--color-text-muted)";

  return (
    <div className="my-6 not-prose font-sans">
      <div className="flex gap-0 border border-[var(--color-border)] rounded-lg p-1 bg-[var(--color-surface)] mb-3">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setSlice(t)}
            className={`flex-1 py-2 px-3 text-sm rounded-md capitalize transition-all ${
              slice === t
                ? "bg-[var(--color-bg)] font-medium shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 mb-3">
        <p className="text-lg m-0 leading-snug">
          <span style={{ color: "var(--accent-teal)", fontWeight: 600 }}>{d.pre.split(" ").slice(0, 2).join(" ")}</span>
          {d.pre.split(" ").length > 2 && (
            <span> {d.pre.split(" ").slice(2, -1).join(" ")} <span style={{ color: d.conflict ? "var(--accent-coral)" : "var(--color-text-muted)", fontWeight: 600 }}>{d.near}</span></span>
          )}{" "}
          <span className="px-1.5 rounded" style={{ background: "color-mix(in srgb, var(--accent-teal) 14%, transparent)", color: "var(--accent-teal)", fontWeight: 600 }}>{CORRECT}</span>{" "}
          on the table.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-[12px]">
        <Cell label="Subject" value={`${SUBJECT} / SG`} color="var(--accent-teal)" />
        <Cell label="Nearest noun" value={`${d.near} / ${d.nearNum}`} color={d.conflict ? "var(--accent-coral)" : "var(--color-text-muted)"} />
        <Cell label="Conflict?" value={d.conflict ? "yes" : "no"} color={d.conflict ? "var(--accent-coral)" : "var(--accent-teal)"} />
        <Cell label="Discriminates?" value={d.conflict ? "yes" : "no"} color={d.conflict ? "var(--accent-coral)" : "var(--color-text-dim)"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <Choice label="Uses the subject" verb={CORRECT} good />
        <Choice label="Uses the nearest noun" verb={d.proxVerb} good={d.proxVerb === CORRECT} />
      </div>

      <div className="rounded-md p-3 text-sm leading-relaxed" style={{ background: "var(--color-surface)", borderLeft: `3px solid ${splitC}`, color: "var(--color-text-muted)" }}>
        {d.verdict}
      </div>
    </div>
  );
}

function Cell({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-md bg-[var(--color-bg)] px-3 py-2">
      <span className="block text-[10px] uppercase tracking-wider text-[var(--color-text-dim)]">{label}</span>
      <span className="font-mono" style={{ color }}>{value}</span>
    </div>
  );
}

function Choice({ label, verb, good }: { label: string; verb: string; good: boolean }) {
  const c = good ? "var(--accent-teal)" : "var(--accent-coral)";
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-3 flex items-center justify-between">
      <span className="text-[12px] text-[var(--color-text-muted)]">{label}</span>
      <span className="text-sm font-mono font-medium px-1.5 py-0.5 rounded" style={{ color: c, background: `color-mix(in srgb, ${c} 14%, transparent)` }}>-&gt; {verb}</span>
    </div>
  );
}
