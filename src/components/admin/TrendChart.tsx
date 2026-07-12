"use client";

type SeriesPoint = { month: string; submitted: number; resolved: number };

const WIDTH = 640;
const HEIGHT = 220;
const PADDING_X = 24;
const PADDING_Y = 20;

function buildPath(values: number[], max: number) {
  const stepX = (WIDTH - PADDING_X * 2) / (values.length - 1);
  const points = values.map((value, index) => {
    const x = PADDING_X + stepX * index;
    const y = HEIGHT - PADDING_Y - (value / max) * (HEIGHT - PADDING_Y * 2);
    return { x, y };
  });
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(
    HEIGHT - PADDING_Y
  ).toFixed(1)} L ${points[0].x.toFixed(1)} ${(HEIGHT - PADDING_Y).toFixed(1)} Z`;
  return { linePath, areaPath, points };
}

export function TrendChart({ data }: { data: SeriesPoint[] }) {
  const max = Math.max(...data.map((d) => Math.max(d.submitted, d.resolved))) * 1.15;
  const submitted = buildPath(
    data.map((d) => d.submitted),
    max,
  );
  const resolved = buildPath(
    data.map((d) => d.resolved),
    max,
  );
  const stepX = (WIDTH - PADDING_X * 2) / (data.length - 1);

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="Complaints submitted versus resolved over the last six months"
      >
        <defs>
          <linearGradient id="submittedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* horizontal gridlines */}
        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <line
            key={fraction}
            x1={PADDING_X}
            x2={WIDTH - PADDING_X}
            y1={HEIGHT - PADDING_Y - fraction * (HEIGHT - PADDING_Y * 2)}
            y2={HEIGHT - PADDING_Y - fraction * (HEIGHT - PADDING_Y * 2)}
            stroke="#e2e8f0"
            strokeWidth={1}
          />
        ))}

        <path d={submitted.areaPath} fill="url(#submittedFill)" />
        <path d={submitted.linePath} fill="none" stroke="#0f766e" strokeWidth={2.5} />
        <path
          d={resolved.linePath}
          fill="none"
          stroke="#64748b"
          strokeWidth={2.5}
          strokeDasharray="5 5"
        />

        {submitted.points.map((p, i) => (
          <circle key={`s-${data[i].month}`} cx={p.x} cy={p.y} r={3.5} fill="#0f766e" />
        ))}
        {resolved.points.map((p, i) => (
          <circle key={`r-${data[i].month}`} cx={p.x} cy={p.y} r={3} fill="#64748b" />
        ))}

        {data.map((d, i) => (
          <text
            key={d.month}
            x={PADDING_X + stepX * i}
            y={HEIGHT - 2}
            textAnchor="middle"
            fontSize={11}
            fill="#94a3b8"
          >
            {d.month}
          </text>
        ))}
      </svg>

      <div className="mt-3 flex items-center gap-5 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal-600" /> Submitted
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-400" /> Resolved
        </span>
      </div>
    </div>
  );
}
