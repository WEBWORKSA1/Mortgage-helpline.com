"use client";
import { useState } from "react";

const fmt = (n) =>
  n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

function payment(principal, annualRate, years) {
  const i = annualRate / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  if (i === 0) return principal / n;
  return (principal * i) / (1 - Math.pow(1 + i, -n));
}

export default function RenewalCalculator() {
  const [balance, setBalance] = useState(420000);
  const [currentRate, setCurrentRate] = useState(2.1);
  const [newRate, setNewRate] = useState(4.1);
  const [amort, setAmort] = useState(20);

  const b = Number(balance) || 0;
  const cur = payment(b, Number(currentRate) || 0, Number(amort) || 0);
  const nxt = payment(b, Number(newRate) || 0, Number(amort) || 0);
  const delta = nxt - cur;
  const pct = cur > 0 ? (delta / cur) * 100 : 0;

  return (
    <div className="calc wrap">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="rb">Balance at renewal</label>
          <input id="rb" type="number" min="0" step="1000" value={balance}
            onChange={(e) => setBalance(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="cr2">Your current rate (%)</label>
          <input id="cr2" type="number" min="0" step="0.01" value={currentRate}
            onChange={(e) => setCurrentRate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="nr">Renewal rate you&rsquo;re offered (%)</label>
          <input id="nr" type="number" min="0" step="0.01" value={newRate}
            onChange={(e) => setNewRate(e.target.value)} />
          <p className="hint">Your lender&rsquo;s letter is an opening offer. Compare it against at least three other lenders before signing.</p>
        </div>
        <div className="field">
          <label htmlFor="am">Remaining amortization (years)</label>
          <input id="am" type="number" min="1" max="35" step="1" value={amort}
            onChange={(e) => setAmort(e.target.value)} />
        </div>
      </form>

      <aside className="result" aria-live="polite">
        <h2>Your payment change</h2>
        <div className="r-row"><span>Payment at your current rate</span><span>{fmt(cur)}/mo</span></div>
        <div className="r-row"><span>Payment at the offered rate</span><span>{fmt(nxt)}/mo</span></div>
        <div className="r-row"><span>Change</span><span>{pct >= 0 ? "+" : ""}{pct.toFixed(1)}%</span></div>
        <div className="r-big">
          <div className="lbl">{delta >= 0 ? "More per month" : "Less per month"}</div>
          <div className="val">{fmt(Math.abs(delta))}</div>
        </div>
        <p className="r-note">
          Estimate assumes monthly payments and the same amortization. Ways to soften a jump:
          shop the rate 120 days before renewal, ask your lender to match a written competing
          offer, consider extending amortization (raises total interest), or make a lump-sum
          prepayment before renewal. Switching lenders at renewal has no penalty.
        </p>
      </aside>
    </div>
  );
}
