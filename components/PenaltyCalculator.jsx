"use client";
import { useState } from "react";
import Link from "next/link";

const fmt = (n) => n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

export default function PenaltyCalculator() {
  const [type, setType] = useState("fixed");
  const [balance, setBalance] = useState(450000);
  const [rate, setRate] = useState(5.2);
  const [termYears, setTermYears] = useState(5);
  const [elapsed, setElapsed] = useState(3);
  const [compRate, setCompRate] = useState(4.2);
  const [method, setMethod] = useState("discounted");
  const [discount, setDiscount] = useState(1.5);
  const [prepay, setPrepay] = useState(0);

  const b = Math.max(0, (Number(balance) || 0) - (Number(prepay) || 0));
  const r = Number(rate) || 0, T = Number(termYears) || 0, E = Math.min(Number(elapsed) || 0, T);
  const monthsLeft = Math.max(0, Math.round((T - E) * 12));
  const c = Number(compRate) || 0, d = Number(discount) || 0;

  const threeMonth = (b * (r / 100)) / 4;
  const gap = method === "posted" ? r - (c - d) : r - c;
  const ird = type === "fixed" && gap > 0 ? b * (gap / 100) * (monthsLeft / 12) : 0;
  const lenderCharge = type === "fixed" ? Math.max(threeMonth, ird) : threeMonth;
  const s10 = T > 5 && E >= 5;
  const finalPenalty = s10 ? Math.min(lenderCharge, threeMonth) : lenderCharge;

  return (
    <>
      <div className="calc wrap">
        <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
          <div className="field"><label>Mortgage type</label>
            <div className="seg">{[["fixed", "Fixed rate"], ["variable", "Variable rate"]].map(([v, l]) => <button type="button" key={v} className={type === v ? "on" : ""} onClick={() => setType(v)}>{l}</button>)}</div></div>
          <div className="row2">
            <div className="field"><label htmlFor="bal">Current balance</label><input id="bal" type="number" min="0" step="1000" value={balance} onChange={(e) => setBalance(e.target.value)} /></div>
            <div className="field"><label htmlFor="rate">Your rate (%)</label><input id="rate" type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
            <div className="field"><label htmlFor="term">Term length (years)</label><input id="term" type="number" min="1" max="10" step="1" value={termYears} onChange={(e) => setTermYears(e.target.value)} /><p className="hint">The length of your current term, e.g. 5 — not your amortization.</p></div>
            <div className="field"><label htmlFor="el">Years into this term</label><input id="el" type="number" min="0" max="10" step="0.5" value={elapsed} onChange={(e) => setElapsed(e.target.value)} /></div>
          </div>
          {type === "fixed" && (
            <>
              <div className="field"><label htmlFor="meth">How your lender calculates IRD</label>
                <select id="meth" value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option value="discounted">Discounted / actual rates (most monoline lenders)</option>
                  <option value="posted">Posted rate minus original discount (many big banks)</option>
                </select></div>
              <div className="row2">
                <div className="field"><label htmlFor="cr">{method === "posted" ? "Lender's POSTED rate for the remaining term (%)" : "Lender's current rate for the remaining term (%)"}</label>
                  <input id="cr" type="number" min="0" step="0.01" value={compRate} onChange={(e) => setCompRate(e.target.value)} />
                  <p className="hint">Remaining term ≈ {monthsLeft} months. Use the term closest to that.</p></div>
                {method === "posted" && <div className="field"><label htmlFor="disc">Discount you got off posted at signing (%)</label><input id="disc" type="number" min="0" step="0.05" value={discount} onChange={(e) => setDiscount(e.target.value)} /><p className="hint">Posted rate at signing minus your rate.</p></div>}
              </div>
            </>
          )}
          <div className="field"><label htmlFor="pp">Prepayment you'll make first (optional)</label><input id="pp" type="number" min="0" step="1000" value={prepay} onChange={(e) => setPrepay(e.target.value)} /><p className="hint">Unused annual prepayment privilege paid before breaking lowers the balance the penalty is charged on.</p></div>
        </form>

        <aside className="result" aria-live="polite">
          <h2>Your estimate</h2>
          <div className="r-row"><span>Balance used</span><span>{fmt(b)}</span></div>
          <div className="r-row"><span>Three months&rsquo; interest</span><span>{fmt(threeMonth)}</span></div>
          {type === "fixed" && <div className="r-row"><span>Interest rate differential (IRD)</span><span>{fmt(ird)}</span></div>}
          <div className="r-big"><div className="lbl">Estimated penalty</div><div className="val">{fmt(finalPenalty)}</div></div>
          {s10 && <div className="r-flag">Your term is longer than five years and five years have passed, so section 10 of the federal Interest Act generally limits the charge to three months&rsquo; interest for individual borrowers. If your lender quotes more, ask in writing for its justification under s.10.</div>}
          {type === "fixed" && method === "posted" && ird > threeMonth * 1.5 && <div className="r-warn">The posted-rate method adds your original discount back into the gap — that is why this IRD is large. Ask about porting, blend-and-extend, or waiting closer to maturity.</div>}
          <p className="r-note">Educational estimate only. Each lender's contract defines its own formula; the only binding number is a written payout statement, which can change week to week as comparison rates move. Add legal, appraisal and discharge fees when comparing options.</p>
          <Link className="r-cta" href={`/get-help?need=penalty&country=CA&balance=${Math.round(b)}`}>Have a pro check this penalty — free →</Link>
        </aside>
      </div>
    </>
  );
}
