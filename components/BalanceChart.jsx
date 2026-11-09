export default function BalanceChart({ series, height = 180, labels = [] }) {
  // series: [{ name, color, points: [y0, y1, ...] }] — x = year index
  const W = 640, H = height, pad = 30;
  const maxLen = Math.max(...series.map((s) => s.points.length), 2);
  const maxY = Math.max(...series.flatMap((s) => s.points), 1);
  const x = (i) => pad + (i / (maxLen - 1)) * (W - pad * 2);
  const y = (v) => H - pad + 6 - (v / maxY) * (H - pad * 2);
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Balance over time">
      <line x1={pad} x2={W - pad} y1={H - pad + 6} y2={H - pad + 6} stroke="currentColor" opacity=".25" />
      {series.map((s) => (
        <polyline key={s.name} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round"
          points={s.points.map((v, i) => `${x(i)},${y(v)}`).join(" ")} />
      ))}
      {labels.map((l, i) => <text key={i} x={x(l.i)} y={H - 6} fontSize="11" textAnchor="middle" fill="currentColor" opacity=".6">{l.t}</text>)}
      {series.map((s, i) => (
        <g key={s.name + "k"}><rect x={pad + i * 150} y="4" width="12" height="4" fill={s.color} /><text x={pad + 18 + i * 150} y="10" fontSize="11" fill="currentColor" opacity=".8">{s.name}</text></g>
      ))}
    </svg>
  );
}
