import Link from "next/link";
import { fmtPct } from "@/lib/live";

function Tick({ label, v, ch, href }) {
  const cls = ch == null || ch === 0 ? "" : ch > 0 ? "up" : "down";
  return (
    <Link href={href} className="tick" style={{ color: "inherit" }}>
      <div className="l">{label}</div>
      <div><span className="v">{fmtPct(v)}</span>{ch != null && ch !== 0 && <span className={"c " + cls}>{ch > 0 ? "▲" : "▼"}{Math.abs(ch).toFixed(2)}</span>}</div>
    </Link>
  );
}

export default function Ticker({ live }) {
  const { us = {}, ca = {} } = live;
  const d = (o) => (o && o.weekAgo != null ? o.v - o.weekAgo : null);
  const p = (o) => (o && o.prev ? o.v - o.prev.v : null);
  return (
    <div className="ticker" aria-label="Live mortgage rates">
      <div className="wrap ticker-in">
        <Tick label="US 30-yr fixed avg" v={us.m30?.v} ch={d(us.m30)} href="/rates" />
        <Tick label="US 15-yr fixed avg" v={us.m15?.v} ch={d(us.m15)} href="/rates" />
        <Tick label="Bank of Canada rate" v={ca.policy?.v} ch={p(ca.policy)} href="/rates" />
        <Tick label="Canada prime" v={ca.prime?.v} ch={p(ca.prime)} href="/rates" />
        <Tick label="CA 5-yr posted" v={ca.posted5?.v} ch={p(ca.posted5)} href="/rates" />
        {us.fedUpper && <Tick label="Fed funds (upper)" v={us.fedUpper.v} ch={p(us.fedUpper)} href="/rates" />}
      </div>
    </div>
  );
}
