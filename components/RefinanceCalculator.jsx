"use client";
import { useState } from "react";
import Link from "next/link";
import { schedule, money } from "@/lib/calc";

export default function RefinanceCalculator() {
  const [country, setCountry] = useState("US");
  const [bal, setBal] = useState(380000);
  const [cur, setCur] = useState(7.25);
  const [left, setLeft] = useState(27);
  const [newRate, setNewRate] = useState(6.25);
  const [newYears, setNewYears] = useState(27);
  const [costs, setCosts] = useState(7600);
  const [stay, setStay] = useState(7);

  const c = country === "CA" ? "CAD" : "USD", loc = country === "CA" ? "en-CA" : "en-US";
  const f = (n) => money(n, c, loc);
  const B = Number(bal) || 0, H = Math.max(1, Number(stay) || 1);
  const a = schedule({ principal: B, annualPct: Number(cur) || 0, years: Number(left) || 1, country });
  const b = schedule({ principal: B, annualPct: Number(newRate) || 0, years: Number(newYears) || 1, country });
  const save = a.payment - b.payment;
  const breakEven = save > 0 ? (Number(costs) || 0) / save : Infinity;
  const intOver = (s, yrs) => s.rows.slice(0, Math.ceil(yrs)).reduce((t, r) => t + r.interest, 0);
  const net = intOver(a, H) - intOver(b, H) - (Number(costs) || 0);
  const lifetime = a.totalInterest - b.totalInterest - (Number(costs) || 0);

  return (
    <div className="calc wrap">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field"><label>Country</label><div className="seg">{[["US", "United States"], ["CA", "Canada"]].map(([v, l]) => <button type="button" key={v} className={country === v ? "on" : ""} onClick={() => setCountry(v)}>{l}</button>)}</div></div>
        <div className="row2">
          <div className="field"><label htmlFor="rb">Current balance</label><input id="rb" type="number" min="0" step="1000" value={bal} onChange={(e) => setBal(e.target.value)} /></div>
          <div className="field"><label htmlFor="rc">Current rate (%)</label><input id="rc" type="number" min="0" step="0.05" value={cur} onChange={(e) => setCur(e.target.value)} /></div>
          <div className="field"><label htmlFor="rl">Years left</label><input id="rl" type="number" min="1" max="40" value={left} onChange={(e) => setLeft(e.target.value)} /></div>
          <div className="field"><label htmlFor="rn">New rate (%)</label><input id="rn" type="number" min="0" step="0.05" value={newRate} onChange={(e) => setNewRate(e.target.value)} /></div>
          <div className="field"><label htmlFor="ry">New amortization (years)</label><input id="ry" type="number" min="1" max="40" value={newYears} onChange={(e) => setNewYears(e.target.value)} /><p className="hint">Match "years left" to avoid resetting the clock.</p></div>
          <div className="field"><label htmlFor="rk">{country === "CA" ? "Penalty + legal/appraisal fees" : "Closing costs"}</label><input id="rk" type="number" min="0" step="100" value={costs} onChange={(e) => setCosts(e.target.value)} /></div>
          <div className="field"><label htmlFor="rs">Years you'll keep the loan</label><input id="rs" type="number" min="1" max="40" value={stay} onChange={(e) => setStay(e.target.value)} /></div>
        </div>
      </form>
      <aside className="result" aria-live="polite">
        <h2>Does it pay?</h2>
        <div className="r-row"><span>Current payment</span><span>{f(a.payment)}/mo</span></div>
        <div className="r-row"><span>New payment</span><span>{f(b.payment)}/mo</span></div>
        <div className="r-row"><span>Monthly change</span><span>{save >= 0 ? "−" : "+"}{f(Math.abs(save))}</span></div>
        <div className="r-big"><div className="lbl">Break-even</div><div className="val">{Number.isFinite(breakEven) ? `${Math.ceil(breakEven)} mo` : "Never"}</div></div>
        <div className="r-row"><span>Net savings over {H} years</span><span>{f(net)}</span></div>
        <div className="r-row"><span>Net lifetime interest change</span><span>{f(lifetime)}</span></div>
        {net < 0 ? <div className="r-warn">Over your {H}-year horizon this refinance costs more than it saves. Waiting, negotiating costs, or a smaller rate drop may change that.</div>
          : <div className="r-flag">If you keep the loan {H} years, this saves about {f(net)} after costs.</div>}
        {Number(newYears) > Number(left) && <div className="r-warn">You are extending the payoff by {Number(newYears) - Number(left)} years — part of the lower payment is just stretching the debt.</div>}
        <p className="r-note">Estimate that compares interest paid over your horizon minus upfront costs. {country === "CA" ? "Canadian mid-term refinances usually trigger a prepayment penalty — estimate it with our penalty calculator." : "Ask lenders for Loan Estimates to compare real costs."}</p>
        <Link className="r-cta" href={`/get-help?need=refinance&country=${country}&balance=${Math.round(B)}`}>Get real refinance quotes — free match →</Link>
      </aside>
    </div>
  );
}
