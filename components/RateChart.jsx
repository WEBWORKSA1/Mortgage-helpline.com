export default function RateChart({ series, title }) {
  // series: [{ name, color, data: [[date, value], ...] }]
  const all = series.flatMap((s) => s.data);
  if (all.length < 2) return <p className="muted small">History builds automatically as daily data arrives.</p>;
  const W = 640, H = 220, L = 40, R = 12, T = 24, B = 28;
  const dates = [...new Set(all.map((d) => d[0]))].sort();
  const t0 = +new Date(dates[0]), t1 = +new Date(dates.at(-1)) || t0 + 1;
  const vals = all.map((d) => d[1]);
  const lo = Math.floor(Math.min(...vals) * 2) / 2 - 0.25, hi = Math.ceil(Math.max(...vals) * 2) / 2 + 0.25;
  const x = (d) => L + ((+new Date(d) - t0) / Math.max(t1 - t0, 1)) * (W - L - R);
  const y = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const ticks = [lo, (lo + hi) / 2, hi];
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
      {ticks.map((v) => <g key={v}><line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="currentColor" opacity=".1" /><text x={L - 6} y={y(v) + 4} fontSize="10" textAnchor="end" fill="currentColor" opacity=".6">{v.toFixed(2)}%</text></g>)}
      {series.map((s) => <polyline key={s.name} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" points={s.data.map(([d, v]) => `${x(d)},${y(v)}`).join(" ")} />)}
      <text x={L} y={H - 8} fontSize="10" fill="currentColor" opacity=".6">{dates[0]}</text>
      <text x={W - R} y={H - 8} fontSize="10" textAnchor="end" fill="currentColor" opacity=".6">{dates.at(-1)}</text>
      {series.map((s, i) => <g key={s.name + "k"}><rect x={L + i * 140} y="6" width="12" height="4" fill={s.color} /><text x={L + 18 + i * 140} y="12" fontSize="11" fill="currentColor" opacity=".8">{s.name}</text></g>)}
    </svg>
  );
}
