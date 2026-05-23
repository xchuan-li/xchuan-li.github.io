import { useState, type CSSProperties, type KeyboardEvent } from "react";

type ProjectId = "sc" | "isotrace" | "ciy" | "lit" | "protobias";

interface ProjectNode {
  id: ProjectId;
  code: string;
  title: string;
  step: string;
  short: string;
  mobileShort: string;
  detail: string;
  href: string;
  color: string;
  desktop: { x: number; y: number };
  mobile: { x: number; y: number };
}

const projects: ProjectNode[] = [
  {
    id: "sc",
    code: "SC",
    title: "Stable is not grounded",
    step: "1 · certification",
    short: "Separate stable-correct behavior from real grounding.",
    mobileShort: "Separate stability from grounding.",
    detail:
      "The entry point: use licensed interventions to ask whether the structure we cite as the reason is actually load-bearing, or whether accuracy and stability are riding a shortcut.",
    href: "/research/sc-certification",
    color: "var(--accent-coral)",
    desktop: { x: 176, y: 156 },
    mobile: { x: 48, y: 128 },
  },
  {
    id: "isotrace",
    code: "IT",
    title: "Isotrace",
    step: "2a · localization",
    short: "If behavior is shortcut-driven, locate the substitution.",
    mobileShort: "Locate shortcut substitution.",
    detail:
      "After certification exposes a shortcut, Isotrace asks where compositional reasoning is replaced by a surface pattern, hop by hop, without opening the model.",
    href: "/research/isotrace",
    color: "var(--accent-teal)",
    desktop: { x: 316, y: 92 },
    mobile: { x: 48, y: 202 },
  },
  {
    id: "ciy",
    code: "CIY",
    title: "Causal inferential yield",
    step: "2b · measurement",
    short: "If behavior is grounded, measure how much structure is used.",
    mobileShort: "Measure structure use.",
    detail:
      "CIY lives downstream of certification: once an item clears the grounding cut, the next question is how much of the licensing structure the model is actually using.",
    href: "/research/ciy",
    color: "var(--accent-purple)",
    desktop: { x: 316, y: 220 },
    mobile: { x: 48, y: 276 },
  },
  {
    id: "lit",
    code: "LiT",
    title: "LiT",
    step: "3 · mechanism",
    short: "Move from behavioral evidence to activation-space control states.",
    mobileShort: "Inspect activation-space states.",
    detail:
      "LiT asks whether prompt-framing effects correspond to causally relevant latent states, giving the behavioral grounding question a mechanistic counterpart.",
    href: "/research/lit",
    color: "var(--accent-amber)",
    desktop: { x: 464, y: 156 },
    mobile: { x: 48, y: 350 },
  },
  {
    id: "protobias",
    code: "PB",
    title: "Cross-lingual ProtoBias",
    step: "4 · stress test",
    short: "Test the same semantic-vs-shortcut problem in multimodal evaluation.",
    mobileShort: "Stress-test cross-lingual prototypes.",
    detail:
      "ProtoBias extends the program outward: when image-text alignment is judged across languages, does the model track semantic fit, or language- and culture-specific prototypes?",
    href: "/research/cross-lingual-protobias",
    color: "var(--accent-indigo)",
    desktop: { x: 596, y: 156 },
    mobile: { x: 48, y: 424 },
  },
];

const byId = Object.fromEntries(projects.map((project) => [project.id, project])) as Record<ProjectId, ProjectNode>;

const desktopLines: Array<[ProjectId | "start", ProjectId | "claim"]> = [
  ["start", "sc"],
  ["sc", "isotrace"],
  ["sc", "ciy"],
  ["isotrace", "lit"],
  ["ciy", "lit"],
  ["lit", "protobias"],
  ["protobias", "claim"],
];

const mobileLines: Array<[ProjectId | "start", ProjectId | "claim"]> = [
  ["start", "sc"],
  ["sc", "isotrace"],
  ["isotrace", "ciy"],
  ["ciy", "lit"],
  ["lit", "protobias"],
  ["protobias", "claim"],
];

const desktopPoint = (id: ProjectId | "start" | "claim") => {
  if (id === "start") return { x: 64, y: 156 };
  if (id === "claim") return { x: 676, y: 156 };
  return byId[id].desktop;
};

const mobilePoint = (id: ProjectId | "start" | "claim") => {
  if (id === "start") return { x: 48, y: 64 };
  if (id === "claim") return { x: 48, y: 474 };
  return byId[id].mobile;
};

export default function ResearchRouteFigure() {
  const [activeId, setActiveId] = useState<ProjectId>("sc");
  const active = byId[activeId];

  const select = (id: ProjectId) => setActiveId(id);

  return (
    <figure className="route-figure not-prose">
      <svg className="route-map desktop-route" viewBox="0 0 720 320" role="img" aria-label="Interactive research route from observed behavior to grounding">
        <RouteLines lines={desktopLines} pointFor={desktopPoint} />

        <Endpoint x={64} y={156} kicker="observed" title="behavior" subtitle="accuracy / stability" align="end" />
        <Endpoint x={676} y={156} kicker="claim" title="grounding" subtitle="licensed by structure" align="start" />

        {projects.map((project) => (
          <DesktopProjectButton
            key={project.id}
            project={project}
            active={activeId === project.id}
            onSelect={select}
          />
        ))}
      </svg>

      <svg className="route-map mobile-route" viewBox="0 0 360 520" role="img" aria-label="Interactive vertical research route from observed behavior to grounding">
        <RouteLines lines={mobileLines} pointFor={mobilePoint} />

        <Endpoint x={48} y={64} kicker="observed" title="behavior" subtitle="accuracy / stability" align="start" />
        <Endpoint x={48} y={474} kicker="claim" title="grounding" subtitle="licensed by structure" align="start" />

        {projects.map((project) => (
          <MobileProjectButton
            key={project.id}
            project={project}
            active={activeId === project.id}
            onSelect={select}
          />
        ))}
      </svg>

      <div className="route-detail" style={{ "--project-color": active.color } as CSSProperties}>
        <div>
          <div className="route-step">{active.step}</div>
          <h2>{active.title}</h2>
          <p className="route-short">{active.short}</p>
          <p>{active.detail}</p>
        </div>
        <a href={active.href}>open project {"->"}</a>
      </div>

      <style>{`
        .route-figure {
          margin: 1.5rem 0 1.25rem;
          padding: 0.75rem 0 0.25rem;
        }

        .route-map {
          width: 100%;
          height: auto;
          color: var(--color-text-muted);
          overflow: visible;
        }

        .mobile-route {
          display: none;
        }

        .route-line {
          stroke: var(--color-text-dim);
          stroke-width: 1;
          stroke-dasharray: 3 4;
          opacity: 0.7;
        }

        .endpoint-dot {
          fill: var(--color-bg);
          stroke-width: 1.5;
        }

        .endpoint-end {
          stroke: var(--color-accent);
        }

        .endpoint-start {
          stroke: var(--color-text-muted);
        }

        .route-kicker {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          fill: var(--color-text-dim);
        }

        .endpoint-title {
          font-size: 15px;
          font-weight: 500;
          fill: var(--color-text);
        }

        .endpoint-subtitle {
          font-size: 11px;
          fill: var(--color-text-muted);
        }

        .project-button {
          cursor: pointer;
          outline: none;
        }

        .hit-area {
          fill: transparent;
          pointer-events: all;
        }

        .project-button text {
          pointer-events: none;
        }

        .project-button:focus-visible .project-node {
          stroke-width: 3;
        }

        .project-button:hover .project-node,
        .project-button.is-active .project-node {
          stroke-width: 2.5;
        }

        .node-halo {
          fill: color-mix(in srgb, var(--project-color) 14%, transparent);
          stroke: none;
        }

        .project-node {
          fill: var(--color-bg);
          stroke: var(--project-color);
          stroke-width: 1.5;
          transition: stroke-width 0.18s ease;
        }

        .project-code {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          fill: var(--color-text);
        }

        .project-title {
          font-size: 12px;
          font-weight: 500;
          fill: var(--color-text);
        }

        .project-copy {
          font-size: 10.5px;
          fill: var(--color-text-muted);
        }

        .route-detail {
          margin-top: 0.25rem;
          border-left: 2px solid var(--project-color);
          padding: 0.75rem 0 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          gap: 1.25rem;
          align-items: flex-end;
        }

        .route-step {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-text-dim);
          margin-bottom: 0.2rem;
        }

        .route-detail h2 {
          font-size: 15px;
          font-weight: 500;
          margin: 0 0 0.25rem;
          color: var(--color-text);
        }

        .route-detail p {
          margin: 0;
          font-size: 13px;
          line-height: 1.55;
          color: var(--color-text-muted);
        }

        .route-detail .route-short {
          color: var(--color-text);
          margin-bottom: 0.25rem;
        }

        .route-detail a {
          color: var(--color-accent);
          font-size: 12px;
          text-decoration: none;
          white-space: nowrap;
        }

        .route-detail a:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .desktop-route {
            display: none;
          }

          .mobile-route {
            display: block;
          }

          .project-title {
            font-size: 12px;
          }

          .project-copy {
            font-size: 10px;
          }

          .route-detail {
            display: block;
            margin-top: 0.5rem;
          }

          .route-detail a {
            display: inline-block;
            margin-top: 0.6rem;
          }
        }
      `}</style>
    </figure>
  );
}

function RouteLines({
  lines,
  pointFor,
}: {
  lines: Array<[ProjectId | "start", ProjectId | "claim"]>;
  pointFor: (id: ProjectId | "start" | "claim") => { x: number; y: number };
}) {
  return (
    <g>
      {lines.map(([from, to]) => {
        const a = pointFor(from);
        const b = pointFor(to);
        const key = `${from}-${to}`;
        return <line key={key} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="route-line" />;
      })}
    </g>
  );
}

function Endpoint({
  x,
  y,
  kicker,
  title,
  subtitle,
  align,
}: {
  x: number;
  y: number;
  kicker: string;
  title: string;
  subtitle: string;
  align: "start" | "end";
}) {
  const textX = align === "start" ? x + 28 : x - 28;
  return (
    <g>
      <circle cx={x} cy={y} r="5" className={`endpoint-dot endpoint-${align}`} />
      <text x={textX} y={y - 23} textAnchor={align} className="route-kicker">
        {kicker}
      </text>
      <text x={textX} y={y - 2} textAnchor={align} className="endpoint-title">
        {title}
      </text>
      <text x={textX} y={y + 18} textAnchor={align} className="endpoint-subtitle">
        {subtitle}
      </text>
    </g>
  );
}

function DesktopProjectButton({
  project,
  active,
  onSelect,
}: {
  project: ProjectNode;
  active: boolean;
  onSelect: (id: ProjectId) => void;
}) {
  const labelY = project.desktop.y < 156 ? project.desktop.y - 48 : project.desktop.y + 44;
  return (
    <ProjectButton
      project={project}
      active={active}
      onSelect={onSelect}
      x={project.desktop.x}
      y={project.desktop.y}
      labelX={project.desktop.x}
      labelY={labelY}
      textAnchor="middle"
      compact={false}
    />
  );
}

function MobileProjectButton({
  project,
  active,
  onSelect,
}: {
  project: ProjectNode;
  active: boolean;
  onSelect: (id: ProjectId) => void;
}) {
  return (
    <ProjectButton
      project={project}
      active={active}
      onSelect={onSelect}
      x={project.mobile.x}
      y={project.mobile.y}
      labelX={project.mobile.x + 42}
      labelY={project.mobile.y - 8}
      textAnchor="start"
      compact
    />
  );
}

function ProjectButton({
  project,
  active,
  onSelect,
  x,
  y,
  labelX,
  labelY,
  textAnchor,
  compact,
}: {
  project: ProjectNode;
  active: boolean;
  onSelect: (id: ProjectId) => void;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  textAnchor: "middle" | "start";
  compact: boolean;
}) {
  const hitX = compact ? x - 22 : x - 70;
  const hitY = compact ? y - 24 : Math.min(y - 30, labelY - 18);
  const hitWidth = compact ? 300 : 140;
  const hitHeight = compact ? 48 : Math.abs(labelY - y) + 58;

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(project.id);
    }
  };

  return (
    <g
      className={`project-button ${active ? "is-active" : ""}`}
      style={{ "--project-color": project.color } as CSSProperties}
      role="button"
      tabIndex={0}
      aria-label={project.title}
      onClick={() => onSelect(project.id)}
      onKeyDown={handleKeyDown}
    >
      <rect x={hitX} y={hitY} width={hitWidth} height={hitHeight} rx="6" className="hit-area" />
      {active && <circle cx={x} cy={y} r="24" className="node-halo" />}
      <circle cx={x} cy={y} r="17" className="project-node" />
      <text x={x} y={y + 4} textAnchor="middle" className="project-code">
        {project.code}
      </text>
      <text x={labelX} y={labelY} textAnchor={textAnchor} className="project-title">
        {compact ? project.title : project.step.replace(/^[0-9a-z]+ · /, "")}
      </text>
      <text x={labelX} y={labelY + 17} textAnchor={textAnchor} className="project-copy">
        {compact ? project.mobileShort : project.title}
      </text>
    </g>
  );
}
