import Link from "next/link";
import { getLive, fmtPct, fmtDate } from "@/lib/live";
import Ticker from "@/components/Ticker";
import RateChart from "@/components/RateChart";
import LeadBand from "@/components/LeadBand";
import AdSlot from "@/components/AdSlot";

export const revalidate = 43200;
export const metadata = { title: "Today's Mortgage Rates — US & Canada (Updated Daily)", description: "Freddie Mac 30- and 15-year averages, Bank of Canada policy rate, Canadian prime and posted rates — refreshed automatically every day, with charts and a plain-language brief.", alternates: { canonical: "/rates" } };

const chg = (a, b) => (a != null && b != null ? (a - b >= 0 ? "+" : "") + (a - b).toFixed(2) : "—");

export default async function Page() {
  const live = await getLive();
  const { us = {}, ca = {} } = live;
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow"><span className="live" />Updated {fmtDate(live.updatedAt)}</p><h1>Today&rsquo;s mortgage rates</h1><p>Market averages from official sources, refreshed automatically. They show the direction of the market — your own rate depends on your credit, down payment, property and lender.</p></div>
      <Ticker live={live} />
      <section className="section">
        <div className="wrap">
          <div className="brief"><p>{live.brief?.text}</p><p className="meta">{live.brief?.ai ? "Written by our AI from the figures on this page, then published automatically" : "Generated automatically from the figures on this page"} · data as of {fmtDate(live.brief?.for)}</p></div>
          <div className="grid two" style={{ marginTop: 30 }}>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>United States — Freddie Mac PMMS</h3>
              <div className="table-wrap" style={{ margin: "12px 0" }}><table className="t"><thead><tr><th>Product</th><th>Rate</th><th>1-wk</th><th>1-yr ago</th></tr></thead><tbody>
                <tr><td>30-year fixed</td><td>{fmtPct(us.m30?.v)}</td><td>{chg(us.m30?.v, us.m30?.weekAgo)}</td><td>{fmtPct(us.m30?.yearAgo)}</td></tr>
                <tr><td>15-year fixed</td><td>{fmtPct(us.m15?.v)}</td><td>{chg(us.m15?.v, us.m15?.weekAgo)}</td><td>{fmtPct(us.m15?.yearAgo)}</td></tr>
                {us.fedUpper && <tr><td>Fed funds target (upper)</td><td>{fmtPct(us.fedUpper.v)}</td><td>—</td><td>—</td></tr>}
              </tbody></table></div>
              <RateChart title="US mortgage rates" series={[{ name: "30-yr fixed", color: "#0e6b4f", data: us.history?.m30 || [] }, { name: "15-yr fixed", color: "#c97b12", data: us.history?.m15 || [] }]} />
              <p className="small muted" style={{ marginTop: 8 }}>Week of {fmtDate(us.m30?.d)}. Source: Freddie Mac Primary Mortgage Market Survey®, via FRED®, Federal Reserve Bank of St. Louis.</p>
            </div>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Canada — Bank of Canada</h3>
              <div className="table-wrap" style={{ margin: "12px 0" }}><table className="t"><thead><tr><th>Rate</th><th>Now</th><th>Previous</th><th>As of</th></tr></thead><tbody>
                <tr><td>Policy (overnight) rate</td><td>{fmtPct(ca.policy?.v)}</td><td>{fmtPct(ca.policy?.prev?.v)}</td><td>{ca.policy?.d || "—"}</td></tr>
                <tr><td>Prime rate</td><td>{fmtPct(ca.prime?.v)}</td><td>{fmtPct(ca.prime?.prev?.v)}</td><td>{ca.prime?.d || "—"}</td></tr>
                <tr><td>5-yr posted (conventional)</td><td>{fmtPct(ca.posted5?.v)}</td><td>{fmtPct(ca.posted5?.prev?.v)}</td><td>{ca.posted5?.d || "—"}</td></tr>
                <tr><td>3-yr posted</td><td>{fmtPct(ca.posted3?.v)}</td><td>{fmtPct(ca.posted3?.prev?.v)}</td><td>{ca.posted3?.d || "—"}</td></tr>
                <tr><td>1-yr posted</td><td>{fmtPct(ca.posted1?.v)}</td><td>{fmtPct(ca.posted1?.prev?.v)}</td><td>{ca.posted1?.d || "—"}</td></tr>
              </tbody></table></div>
              <RateChart title="Canadian rates" series={[{ name: "5-yr posted", color: "#0e6b4f", data: ca.history?.posted5 || [] }, { name: "Prime", color: "#c97b12", data: ca.history?.prime || [] }, { name: "Policy rate", color: "#23498a", data: ca.history?.policy || [] }]} />
              <p className="small muted" style={{ marginTop: 8 }}>Source: Bank of Canada (Valet API). Posted rates are typical big-bank posted rates — most borrowers pay less, but posted rates drive many penalty calculations.</p>
            </div>
          </div>
          <AdSlot />
          {live.complaints?.total && (
            <div className="card" style={{ marginTop: 24 }}>
              <h3 style={{ marginTop: 0 }}>What US borrowers are complaining about</h3>
              <p className="small muted">{live.complaints.total.toLocaleString("en-US")} mortgage complaints received by the CFPB since {fmtDate(live.complaints.since)}.</p>
              <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                {live.complaints.issues.map((i) => {
                  const p = Math.round((i.count / live.complaints.total) * 100);
                  return <div key={i.name}><div className="small" style={{ display: "flex", justifyContent: "space-between" }}><span>{i.name}</span><span className="mono">{p}%</span></div><div style={{ height: 8, background: "var(--surface)", borderRadius: 4 }}><div style={{ width: p + "%", height: "100%", background: "var(--line)", borderRadius: 4 }} /></div></div>;
                })}
              </div>
              <p className="small" style={{ marginTop: 14 }}>Payment problem? <Link href="/tools/letter-generator">Build a Notice of Error →</Link> · Struggling to pay? <Link href="/guides/behind-on-mortgage-payments">See your options →</Link></p>
              <p className="small muted">Source: CFPB Consumer Complaint Database. Complaints are not verified and are not a statistical sample.</p>
            </div>
          )}
          <p className="small muted" style={{ marginTop: 24 }}>Rates are published averages for information only — not offers or quotes. Mortgage Helpline is not affiliated with Freddie Mac, the Federal Reserve Bank of St. Louis, the Bank of Canada or the CFPB.</p>
        </div>
      </section>
      <LeadBand title="Rates moved? Find out what you'd actually be offered." />
    </main>
  );
}
