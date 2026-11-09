"use client";
import { useState } from "react";
import Link from "next/link";
import { schedule } from "@/lib/calc";

const inr = (n) => "₹" + Math.round(Number.isFinite(n) ? n : 0).toLocaleString("en-IN");
const lakhCr = (n) => (n >= 1e7 ? (n / 1e7).toFixed(2) + " crore" : (n / 1e5).toFixed(2) + " lakh");

export default function EmiCalculator() {
  const [amt, setAmt] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [yrs, setYrs] = useState(20);
  const [prepay, setPrepay] = useState(0);

  const base = schedule({ principal: Number(amt) || 0, annualPct: Number(rate) || 0, years: Number(yrs) || 1 });
  const pre = schedule({ principal: Number(amt) || 0, annualPct: Number(rate) || 0, years: Number(yrs) || 1, extra: (Number(prepay) || 0) / 12 });
  const saved = base.totalInterest - pre.totalInterest;

  return (
    <div className="calc wrap">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field"><label htmlFor="ea">Loan amount (₹)</label><input id="ea" type="number" min="0" step="100000" value={amt} onChange={(e) => setAmt(e.target.value)} /><p className="hint">{lakhCr(Number(amt) || 0)}</p></div>
        <div className="field"><label htmlFor="er">Interest rate (% per year)</label><input id="er" type="number" min="0" step="0.05" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
        <div className="field"><label htmlFor="ey">Tenure (years)</label><input id="ey" type="number" min="1" max="30" value={yrs} onChange={(e) => setYrs(e.target.value)} /></div>
        <div className="field"><label htmlFor="ep">Part-prepayment per year (₹, optional)</label><input id="ep" type="number" min="0" step="10000" value={prepay} onChange={(e) => setPrepay(e.target.value)} /><p className="hint">RBI rules bar prepayment charges on floating-rate loans to individuals.</p></div>
      </form>
      <aside className="result" aria-live="polite">
        <h2>Your EMI</h2>
        <div className="r-big" style={{ marginTop: 0 }}><div className="lbl">Monthly EMI</div><div className="val">{inr(base.payment)}</div></div>
        <div className="r-row"><span>Total interest</span><span>{inr(base.totalInterest)}</span></div>
        <div className="r-row"><span>Total repaid</span><span>{inr(base.totalInterest + (Number(amt) || 0))}</span></div>
        {prepay > 0 && <div className="r-flag">Prepaying {inr(prepay)} a year saves about <strong>{inr(saved)}</strong> in interest and closes the loan {(base.years - pre.years).toFixed(1)} years early.</div>}
        <p className="r-note">Estimate assuming a constant rate. On floating-rate loans, rate changes alter your EMI or tenure — ask your lender for an updated schedule at each reset.</p>
        <Link className="r-cta" href="/get-help?need=refinance&country=IN">Compare home loan offers — free →</Link>
      </aside>
    </div>
  );
}
