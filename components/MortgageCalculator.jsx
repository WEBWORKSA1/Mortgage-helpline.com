"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { schedule, money } from "@/lib/calc";
import BalanceChart from "./BalanceChart";

const FREQ = { monthly: ["Monthly", 12], biweekly: ["Bi-weekly", 26], accel: ["Accelerated bi-weekly", 26], weekly: ["Weekly", 52] };

function caPremiumRate(ltv) { // CMHC purchase premiums (verify current table)
  if (ltv <= 0.8) return 0;
  if (ltv <= 0.85) return 0.028;
  if (ltv <= 0.9) return 0.031;
  return 0.04;
}

export default function MortgageCalculator() {
  const [country, setCountry] = useState("US");
  const [price, setPrice] = useState(550000);
  const [down, setDown] = useState(110000);
  const [rate, setRate] = useState(6.75);
  const [years, setYears] = useState(30);
  const [freq, setFreq] = useState("monthly");
  const [extra, setExtra] = useState(0);
  const [tax, setTax] = useState(4800);
  const [ins, setIns] = useState(1500);
  const [showTable, setShowTable] = useState(false);

  const cur = country === "CA" ? "CAD" : "USD", loc = country === "CA" ? "en-CA" : "en-US";
  const f = (n) => money(n, cur, loc);
  const P0 = Math.max(0, (Number(price) || 0) - (Number(down) || 0));
  const ltv = price > 0 ? P0 / price : 0;
  const caPrem = country === "CA" ? P0 * caPremiumRate(ltv) : 0;
  const principal = P0 + caPrem;
  const minDownCA = price <= 500000 ? price * 0.05 : price < 1500000 ? 25000 + (price - 500000) * 0.1 : price * 0.2;
  const [label, perYear] = FREQ[freq];

  const res = useMemo(() => {
    const base = schedule({ principal, annualPct: Number(rate) || 0, years: Number(years) || 1, perYear: 12, country });
    let pmt;
    if (freq === "accel") pmt = base.payment / 2;
    const s = schedule({ principal, annualPct: Number(rate) || 0, years: Number(years) || 1, perYear, country, pmt, extra: (Number(extra) || 0) * 12 / perYear });
    return { base, s };
  }, [principal, rate, years, perYear, country, freq, extra]);

  const { base, s } = res;
  const pmiMonthly = country === "US" && ltv > 0.8 ? (P0 * 0.006) / 12 : 0; // illustrative ~0.6%/yr
  const escrow = ((Number(tax) || 0) + (Number(ins) || 0)) / 12;
  const totalMonthly = (s.payment * perYear) / 12 + escrow + pmiMonthly;
  const saved = base.totalInterest - s.totalInterest;

  return (
    <>
      <div className="calc wrap">
        <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
          <div className="field"><label>Country</label><div className="seg">{[["US", "United States"], ["CA", "Canada"]].map(([v, l]) => <button type="button" key={v} className={country === v ? "on" : ""} onClick={() => setCountry(v)}>{l}</button>)}</div></div>
          <div className="row2">
            <div className="field"><label htmlFor="mp">Home price</label><input id="mp" type="number" min="0" step="5000" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
            <div className="field"><label htmlFor="md">Down payment</label><input id="md" type="number" min="0" step="1000" value={down} onChange={(e) => setDown(e.target.value)} /><p className="hint">{price > 0 ? ((down / price) * 100).toFixed(1) : 0}% down</p></div>
            <div className="field"><label htmlFor="mr">Interest rate (%)</label><input id="mr" type="number" min="0" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
            <div className="field"><label htmlFor="my">Amortization (years)</label><input id="my" type="number" min="1" max="40" value={years} onChange={(e) => setYears(e.target.value)} /></div>
            <div className="field"><label htmlFor="mf">Payment frequency</label><select id="mf" value={freq} onChange={(e) => setFreq(e.target.value)}>{Object.entries(FREQ).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}</select></div>
            <div className="field"><label htmlFor="mx">Extra toward principal / month</label><input id="mx" type="number" min="0" step="50" value={extra} onChange={(e) => setExtra(e.target.value)} /></div>
            <div className="field"><label htmlFor="mt">Property tax / year</label><input id="mt" type="number" min="0" step="100" value={tax} onChange={(e) => setTax(e.target.value)} /></div>
            <div className="field"><label htmlFor="mi">Home insurance / year</label><input id="mi" type="number" min="0" step="100" value={ins} onChange={(e) => setIns(e.target.value)} /></div>
          </div>
          {country === "CA" && down < minDownCA && <div className="notice">Minimum down payment for this price is about {f(minDownCA)}.</div>}
        </form>

        <aside className="result" aria-live="polite">
          <h2>Your payment</h2>
          <div className="r-big" style={{ marginTop: 0 }}><div className="lbl">{label} principal + interest</div><div className="val">{f(s.payment)}</div></div>
          <div className="r-row"><span>Loan amount{caPrem > 0 ? " (incl. insurance premium)" : ""}</span><span>{f(principal)}</span></div>
          {caPrem > 0 && <div className="r-row"><span>Default insurance premium ({(caPremiumRate(ltv) * 100).toFixed(2)}%)</span><span>{f(caPrem)}</span></div>}
          {pmiMonthly > 0 && <div className="r-row"><span>Est. PMI / month (illustrative)</span><span>{f(pmiMonthly)}</span></div>}
          <div className="r-row"><span>Taxes + insurance / month</span><span>{f(escrow)}</span></div>
          <div className="r-row"><span>All-in monthly housing cost</span><span>{f(totalMonthly)}</span></div>
          <div className="r-row"><span>Total interest</span><span>{f(s.totalInterest)}</span></div>
          <div className="r-row"><span>Paid off in</span><span>{s.years.toFixed(1)} yrs</span></div>
          {saved > 1 && <div className="r-flag">Your {freq === "accel" ? "accelerated schedule" : ""}{freq === "accel" && extra > 0 ? " and " : ""}{extra > 0 ? "extra payments" : ""} save about <strong>{f(saved)}</strong> in interest and {(base.years - s.years).toFixed(1)} years.</div>}
          <p className="r-note">Estimate. {country === "CA" ? "Uses semi-annual compounding (Canadian fixed-rate standard). Premium uses CMHC purchase rates; a 30-year insured amortization adds a surcharge, and some provinces charge PST on the premium." : "PMI varies by credit and lender; it can be cancelled at 80% loan-to-value under federal rules."}</p>
          <Link className="r-cta" href={`/get-help?need=purchase&country=${country}&value=${Math.round(price)}&amount=${Math.round(down)}`}>Get pre-approved with one pro — free →</Link>
        </aside>
      </div>
      <div className="wrap" style={{ paddingBottom: 40 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Balance over time</h3>
          <BalanceChart series={[{ name: "Standard monthly", color: "#9fb3aa", points: [principal, ...base.rows.map((r) => r.balance)] }, { name: "Your plan", color: "#0e6b4f", points: [principal, ...s.rows.map((r) => r.balance)] }]}
            labels={[{ i: 0, t: "Year 0" }, { i: Math.floor(base.rows.length / 2), t: "Year " + Math.floor(base.rows.length / 2) }, { i: base.rows.length, t: "Year " + base.rows.length }]} />
          <button className="btn ghost" style={{ marginTop: 14 }} onClick={() => setShowTable(!showTable)}>{showTable ? "Hide" : "Show"} amortization schedule</button>
          {showTable && (
            <div className="table-wrap" style={{ marginTop: 14 }}>
              <table className="t"><thead><tr><th>Year</th><th>Interest</th><th>Principal</th><th>Balance</th></tr></thead>
                <tbody>{s.rows.map((r) => <tr key={r.year}><td>{r.year}</td><td>{f(r.interest)}</td><td>{f(r.principal)}</td><td>{f(r.balance)}</td></tr>)}</tbody></table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
