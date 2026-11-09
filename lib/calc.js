// Shared mortgage math. Canadian fixed mortgages compound semi-annually; US monthly.
export function periodicRate(annualPct, perYear, country = "US") {
  const r = annualPct / 100;
  if (country === "CA") return Math.pow(1 + r / 2, 2 / perYear) - 1;
  return r / perYear;
}
export function payment(principal, i, n) {
  if (principal <= 0 || n <= 0) return 0;
  if (i === 0) return principal / n;
  return (principal * i) / (1 - Math.pow(1 + i, -n));
}
export function monthly(principal, annualPct, years, country = "US") {
  return payment(principal, periodicRate(annualPct, 12, country), Math.round(years * 12));
}
// Simulates the loan; returns yearly rows + totals.
export function schedule({ principal, annualPct, years, perYear = 12, country = "US", extra = 0, pmt }) {
  const i = periodicRate(annualPct, perYear, country);
  const P = pmt ?? payment(principal, i, Math.round(years * perYear));
  let bal = principal, totalInt = 0, k = 0;
  const rows = [];
  let yr = { year: 1, interest: 0, principal: 0 };
  while (bal > 0.005 && k < perYear * 60) {
    const int = bal * i;
    let prin = Math.min(P + extra - int, bal);
    if (prin <= 0) break; // payment doesn't cover interest
    bal -= prin; totalInt += int; k++;
    yr.interest += int; yr.principal += prin;
    if (k % perYear === 0 || bal <= 0.005) { rows.push({ ...yr, balance: Math.max(bal, 0) }); yr = { year: yr.year + 1, interest: 0, principal: 0 }; }
  }
  return { payment: P, rows, totalInterest: totalInt, periods: k, years: k / perYear, perYear };
}
export const money = (n, cur = "USD", loc = "en-US") =>
  (Number.isFinite(n) ? n : 0).toLocaleString(loc, { style: "currency", currency: cur, maximumFractionDigits: 0 });
