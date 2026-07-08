"use client";
import { useState } from "react";

const fmt = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function monthly(principal, annualRate, years) {
  const i = annualRate / 100 / 12;
  const n = Math.round(years * 12);
  if (principal <= 0 || n <= 0) return 0;
  if (i === 0) return principal / n;
  return (principal * i) / (1 - Math.pow(1 + i, -n));
}

// Interest actually paid over the first H years of an amortizing loan.
function interestOver(principal, annualRate, amortYears, horizonYears) {
  const i = annualRate / 100 / 12;
  const n = Math.round(amortYears * 12);
  const k = Math.min(Math.round(horizonYears * 12), n);
  if (principal <= 0 || n <= 0 || k <= 0) return 0;
  if (i === 0) return 0;
  const pmt = monthly(principal, annualRate, amortYears);
  const balAfterK =
    principal * ((Math.pow(1 + i, n) - Math.pow(1 + i, k)) / (Math.pow(1 + i, n) - 1));
  const paid = pmt * k;
  const principalPaid = principal - balAfterK;
  return paid - principalPaid;
}

export default function EquityCalculator() {
  const [homeValue, setHomeValue] = useState(650000);
  const [balance, setBalance] = useState(320000);
  const [firstRate, setFirstRate] = useState(3.25);
  const [amortLeft, setAmortLeft] = useState(22);
  const [cash, setCash] = useState(60000);
  const [helocRate, setHelocRate] = useState(8.5);
  const [heLoanRate, setHeLoanRate] = useState(9.25);
  const [refiRate, setRefiRate] = useState(6.75);
  const [horizon, setHorizon] = useState(10);

  const hv = Number(homeValue) || 0;
  const b = Number(balance) || 0;
  const c = Number(cash) || 0;
  const H = Math.max(1, Number(horizon) || 10);
  const amort = Math.max(1, Number(amortLeft) || 1);

  const maxTap = Math.max(0, hv * 0.8 - b);
  const overTap = c > maxTap;

  // Path 1 & 2: keep the first mortgage, add a second product for the cash.
  const firstInterest = interestOver(b, Number(firstRate) || 0, amort, H);
  const helocPmt = monthly(c, Number(helocRate) || 0, H);
  const helocCost = firstInterest + interestOver(c, Number(helocRate) || 0, H, H);
  const heLoanPmt = monthly(c, Number(heLoanRate) || 0, H);
  const heLoanCost = firstInterest + interestOver(c, Number(heLoanRate) || 0, H, H);

  // Path 3: cash-out refi — reprice everything, ~3% closing costs.
  const newLoan = b + c;
  const closing = newLoan * 0.03;
  const refiPmt = monthly(newLoan, Number(refiRate) || 0, amort);
  const refiCost = interestOver(newLoan, Number(refiRate) || 0, amort, H) + closing;

  const currentPmt = monthly(b, Number(firstRate) || 0, amort);

  const paths = [
    { name: "Keep mortgage + HELOC", extra: helocPmt, cost: helocCost },
    { name: "Keep mortgage + home equity loan", extra: heLoanPmt, cost: heLoanCost },
    { name: "Cash-out refinance (incl. ~3% closing)", extra: refiPmt - currentPmt, cost: refiCost },
  ];
  const best = paths.reduce((a, p) => (p.cost < a.cost ? p : a), paths[0]);
  const worst = paths.reduce((a, p) => (p.cost > a.cost ? p : a), paths[0]);

  return (
    <div className="calc wrap">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="hv">Home value</label>
          <input id="hv" type="number" min="0" step="5000" value={homeValue}
            onChange={(e) => setHomeValue(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="eb">Current mortgage balance</label>
          <input id="eb" type="number" min="0" step="1000" value={balance}
            onChange={(e) => setBalance(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="fr">Current mortgage rate (%)</label>
          <input id="fr" type="number" min="0" step="0.01" value={firstRate}
            onChange={(e) => setFirstRate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="al">Years left on the mortgage</label>
          <input id="al" type="number" min="1" max="35" step="1" value={amortLeft}
            onChange={(e) => setAmortLeft(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="cn">Cash you need</label>
          <input id="cn" type="number" min="0" step="1000" value={cash}
            onChange={(e) => setCash(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="hr">HELOC rate today (%)</label>
          <input id="hr" type="number" min="0" step="0.05" value={helocRate}
            onChange={(e) => setHelocRate(e.target.value)} />
          <p className="hint">Check 2–3 current offers — HELOC rates are variable and move with prime.</p>
        </div>
        <div className="field">
          <label htmlFor="hlr">Home equity loan rate today (%)</label>
          <input id="hlr" type="number" min="0" step="0.05" value={heLoanRate}
            onChange={(e) => setHeLoanRate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="rr">Cash-out refinance rate today (%)</label>
          <input id="rr" type="number" min="0" step="0.05" value={refiRate}
            onChange={(e) => setRefiRate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="hz">Compare costs over how many years?</label>
          <input id="hz" type="number" min="1" max="30" step="1" value={horizon}
            onChange={(e) => setHorizon(e.target.value)} />
          <p className="hint">Use how long you realistically expect to carry the borrowed cash.</p>
        </div>
      </form>

      <aside className="result" aria-live="polite">
        <h2>The three paths, priced</h2>
        <div className="r-row"><span>Tappable at 80% of value</span><span>{fmt(maxTap)}</span></div>
        {overTap && (
          <div className="r-flag" style={{ borderColor: "rgba(245,176,76,.5)", background: "rgba(245,176,76,.12)" }}>
            You need {fmt(c)} but roughly {fmt(maxTap)} is tappable at the common 80% limit.
            Borrowing to the ceiling of your equity is where trouble usually starts — consider
            whether a smaller amount solves the real problem.
          </div>
        )}
        <div className="r-row"><span>HELOC — added monthly</span><span>{fmt(helocPmt)}/mo</span></div>
        <div className="r-row"><span>Home equity loan — added monthly</span><span>{fmt(heLoanPmt)}/mo</span></div>
        <div className="r-row"><span>Cash-out refi — payment change</span><span>{fmt(refiPmt - currentPmt)}/mo</span></div>
        <div className="r-big">
          <div className="lbl">Cheapest over {H} years: {best.name}</div>
          <div className="val">{fmt(worst.cost - best.cost)}</div>
          <div className="lbl" style={{ marginTop: 6 }}>less interest + costs than the most expensive path</div>
        </div>
        <div className="r-row" style={{ marginTop: 14 }}><span>HELOC path — interest over {H}y</span><span>{fmt(helocCost)}</span></div>
        <div className="r-row"><span>Equity loan path — interest over {H}y</span><span>{fmt(heLoanCost)}</span></div>
        <div className="r-row"><span>Refi path — interest + closing over {H}y</span><span>{fmt(refiCost)}</span></div>
        <p className="r-note">
          Estimates only. The comparison includes the interest you keep paying on your current
          mortgage either way, so the paths are apples-to-apples. Key trap: a cash-out refi
          reprices your entire balance — if your current rate is well below today&rsquo;s, you pay
          the new rate on money you already borrowed cheaply. All three options put your home
          up as collateral. Rates, limits (Canada caps revolving HELOCs at 65% of value), and
          closing costs vary — get written quotes before deciding, and if the borrowed money is
          for spending rather than an asset or high-interest debt, the best answer may be none
          of these.
        </p>
      </aside>
    </div>
  );
}
