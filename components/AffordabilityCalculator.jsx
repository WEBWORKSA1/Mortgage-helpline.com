"use client";
import { useState } from "react";
import Link from "next/link";
import { monthly, money, payment, periodicRate } from "@/lib/calc";

export default function AffordabilityCalculator() {
  const [country, setCountry] = useState("CA");
  const [income, setIncome] = useState(140000);
  const [debts, setDebts] = useState(600);
  const [down, setDown] = useState(80000);
  const [rate, setRate] = useState(4.6);
  const [years, setYears] = useState(25);
  const [tax, setTax] = useState(400);
  const [other, setOther] = useState(150);

  const cur = country === "CA" ? "CAD" : "USD", loc = country === "CA" ? "en-CA" : "en-US";
  const f = (n) => money(n, cur, loc);
  const inc = (Number(income) || 0) / 12, debt = Number(debts) || 0, housingOther = (Number(tax) || 0) + (Number(other) || 0);
  const r = Number(rate) || 0, n = Math.round((Number(years) || 25) * 12);
  const qualRate = country === "CA" ? Math.max(5.25, r + 2) : r;
  const [gdsCap, tdsCap] = country === "CA" ? [0.39, 0.44] : [0.28, 0.36];

  const maxPmt = Math.max(0, Math.min(inc * gdsCap - housingOther, inc * tdsCap - housingOther - debt));
  const iq = periodicRate(qualRate, 12, country);
  const maxLoan = iq > 0 ? (maxPmt * (1 - Math.pow(1 + iq, -n))) / iq : maxPmt * n;
  const maxPrice = maxLoan + (Number(down) || 0);
  const actualPmt = monthly(maxLoan, r, Number(years) || 25, country);
  const comfortable = Math.max(0, (inc * 0.28 - housingOther));
  const comfyLoan = (() => { const i = periodicRate(r, 12, country); return i > 0 ? (comfortable * (1 - Math.pow(1 + i, -n))) / i : 0; })();

  return (
    <div className="calc wrap">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field"><label>Country</label><div className="seg">{[["CA", "Canada"], ["US", "United States"]].map(([v, l]) => <button type="button" key={v} className={country === v ? "on" : ""} onClick={() => setCountry(v)}>{l}</button>)}</div></div>
        <div className="row2">
          <div className="field"><label htmlFor="ai">Household gross income / year</label><input id="ai" type="number" min="0" step="1000" value={income} onChange={(e) => setIncome(e.target.value)} /></div>
          <div className="field"><label htmlFor="ad">Other debt payments / month</label><input id="ad" type="number" min="0" step="50" value={debts} onChange={(e) => setDebts(e.target.value)} /><p className="hint">Car, student, card minimums, support.</p></div>
          <div className="field"><label htmlFor="adp">Down payment</label><input id="adp" type="number" min="0" step="1000" value={down} onChange={(e) => setDown(e.target.value)} /></div>
          <div className="field"><label htmlFor="ar">Expected rate (%)</label><input id="ar" type="number" min="0" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
          <div className="field"><label htmlFor="ay">Amortization (years)</label><input id="ay" type="number" min="5" max="35" value={years} onChange={(e) => setYears(e.target.value)} /></div>
          <div className="field"><label htmlFor="at">Property tax / month</label><input id="at" type="number" min="0" step="25" value={tax} onChange={(e) => setTax(e.target.value)} /></div>
          <div className="field"><label htmlFor="ao">{country === "CA" ? "Heating + ½ condo fees / month" : "Insurance + HOA / month"}</label><input id="ao" type="number" min="0" step="25" value={other} onChange={(e) => setOther(e.target.value)} /></div>
        </div>
      </form>
      <aside className="result" aria-live="polite">
        <h2>What lenders may approve</h2>
        <div className="r-big" style={{ marginTop: 0 }}><div className="lbl">Maximum home price (estimate)</div><div className="val">{f(maxPrice)}</div></div>
        <div className="r-row"><span>Maximum mortgage</span><span>{f(maxLoan)}</span></div>
        <div className="r-row"><span>{country === "CA" ? `Qualifying (stress-test) rate` : "Rate used"}</span><span>{qualRate.toFixed(2)}%</span></div>
        <div className="r-row"><span>Payment at your actual rate</span><span>{f(actualPmt)}/mo</span></div>
        <div className="r-row"><span>Ratio limits applied</span><span>{country === "CA" ? "GDS 39% · TDS 44%" : "28% / 36%"}</span></div>
        <div className="r-flag">Comfort check: keeping housing at about 28% of gross income points to a mortgage near <strong>{f(comfyLoan)}</strong>. The approval maximum is a ceiling, not a budget.</div>
        <p className="r-note">Estimate. {country === "CA" ? "Federally regulated lenders qualify you at the greater of 5.25% or your rate + 2 points; insured mortgages also cap amortization and price." : "Lenders' DTI limits vary by loan program — some approve up to ~43–50% total DTI with strong files. Conservative 28/36 is used here."} Lenders also review credit, employment and down-payment source.</p>
        <Link className="r-cta" href={`/get-help?need=purchase&country=${country}&value=${Math.round(maxPrice)}&amount=${Math.round(down)}`}>Get a real pre-approval — free match →</Link>
      </aside>
    </div>
  );
}
