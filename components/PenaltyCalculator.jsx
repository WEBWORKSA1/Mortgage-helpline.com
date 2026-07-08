"use client";
import { useState } from "react";

const fmt = (n) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

export default function PenaltyCalculator() {
  const [balance, setBalance] = useState(450000);
  const [rate, setRate] = useState(5.2);
  const [monthsLeft, setMonthsLeft] = useState(24);
  const [compRate, setCompRate] = useState(4.2);
  const [method, setMethod] = useState("discounted");
  const [discount, setDiscount] = useState(1.5);
  const [yearsSinceStart, setYearsSinceStart] = useState(3);

  const b = Number(balance) || 0;
  const r = Number(rate) || 0;
  const m = Number(monthsLeft) || 0;
  const c = Number(compRate) || 0;
  const d = Number(discount) || 0;

  const threeMonth = (b * (r / 100)) / 4;
  const gap = method === "posted" ? r + d - c : r - c;
  const ird = gap > 0 ? b * (gap / 100) * (m / 12) : 0;
  const penalty = Math.max(threeMonth, ird);
  const fiveYearCapApplies = Number(yearsSinceStart) >= 5;
  const finalPenalty = fiveYearCapApplies ? threeMonth : penalty;

  return (
    <div className="calc wrap">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="bal">Current mortgage balance</label>
          <input id="bal" type="number" min="0" step="1000" value={balance}
            onChange={(e) => setBalance(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="rate">Your mortgage rate (%)</label>
          <input id="rate" type="number" min="0" step="0.01" value={rate}
            onChange={(e) => setRate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="ml">Months left in your term</label>
          <input id="ml" type="number" min="0" step="1" value={monthsLeft}
            onChange={(e) => setMonthsLeft(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="cr">Lender&rsquo;s current rate for that remaining term (%)</label>
          <input id="cr" type="number" min="0" step="0.01" value={compRate}
            onChange={(e) => setCompRate(e.target.value)} />
          <p className="hint">The rate your lender offers today for a term matching your months left.</p>
        </div>
        <div className="field">
          <label htmlFor="meth">How your lender calculates IRD</label>
          <select id="meth" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="discounted">Discounted rate (most monoline lenders)</option>
            <option value="posted">Posted rate (most Big-6 banks)</option>
          </select>
        </div>
        {method === "posted" && (
          <div className="field">
            <label htmlFor="disc">Discount you got off the posted rate (%)</label>
            <input id="disc" type="number" min="0" step="0.05" value={discount}
              onChange={(e) => setDiscount(e.target.value)} />
            <p className="hint">Posted-rate lenders add your original discount back into the gap — this is why bank penalties run larger.</p>
          </div>
        )}
        <div className="field">
          <label htmlFor="yrs">Years since the mortgage money was first advanced</label>
          <input id="yrs" type="number" min="0" step="1" value={yearsSinceStart}
            onChange={(e) => setYearsSinceStart(e.target.value)} />
          <p className="hint">Counts from the original start, not your latest renewal term.</p>
        </div>
      </form>

      <aside className="result" aria-live="polite">
        <h2>Your estimate</h2>
        <div className="r-row"><span>Three months&rsquo; interest</span><span>{fmt(threeMonth)}</span></div>
        <div className="r-row"><span>Interest rate differential (IRD)</span><span>{fmt(ird)}</span></div>
        <div className="r-row"><span>Lender charges the greater</span><span>{fmt(penalty)}</span></div>
        <div className="r-big">
          <div className="lbl">Estimated penalty</div>
          <div className="val">{fmt(finalPenalty)}</div>
        </div>
        {fiveYearCapApplies && (
          <div className="r-flag">
            The federal Interest Act caps your penalty at three months&rsquo; interest once five
            years have passed since the mortgage was advanced. If your lender quotes more,
            ask them in writing to justify it against section 10 of the Interest Act.
          </div>
        )}
        <p className="r-note">
          This is an educational estimate. Every lender uses its own IRD formula, and the only
          binding number is a written payout statement from your lender — always request one
          before deciding. Tip: using your unused annual prepayment privilege first can shrink
          the balance the penalty is calculated on.
        </p>
      </aside>
    </div>
  );
}
