"use client";
import { useMemo, useState } from "react";

const TYPES = {
  noe: { c: "US", label: "Notice of Error (servicer mistake)", issue: "Describe the error: e.g. my payment of $2,145.30 sent on March 1 was not credited; a $75 late fee was charged on March 17." },
  rfi: { c: "US", label: "Request for Information", issue: "List what you want: e.g. complete payment history for the last 24 months, the current escrow analysis, and the name and address of the owner of my loan." },
  payoff: { c: "US", label: "Payoff statement request", issue: "Payoff date wanted: e.g. good through June 30." },
  pmi: { c: "US", label: "PMI cancellation request", issue: "e.g. my principal balance has reached 80% of the original value based on my scheduled payments / extra payments." },
  escrow: { c: "US", label: "Escrow dispute (Notice of Error)", issue: "e.g. my escrow shortage of $1,240 is based on a homeowners insurance premium of $3,900, but my renewed premium is $2,600." },
  caPenalty: { c: "CA", label: "Penalty calculation request (Canada)", issue: "e.g. I am considering paying out my mortgage on or about June 30 and request a written payout statement." },
  caS10: { c: "CA", label: "Interest Act s.10 — 3 months' interest cap (Canada)", issue: "e.g. my mortgage term is 10 years, it was advanced on May 1, 2019, and you quoted a penalty of $14,200." },
  caComplaint: { c: "CA", label: "Formal complaint to lender (Canada)", issue: "Describe what happened, the dates, and the outcome you want." },
};

const today = () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

function build(t, v) {
  const head = `${v.name || "[Your full name]"}\n${v.address || "[Property address]"}\n${v.contact || "[Phone / email]"}\n\n${today()}\n\n${v.lender || "[Servicer / lender name]"}\n${v.lenderAddr || "[Designated address for errors / information requests, or complaints department]"}\n\nRe: Loan/mortgage number ${v.loan || "[number]"} — ${v.address || "[property address]"}\nBorrower(s): ${v.name || "[name]"}\n\n`;
  const sig = `\n\nPlease send your response in writing to the address above. I am keeping a copy of this letter.\n\nSincerely,\n\n\n${v.name || "[Signature / name]"}`;
  const issue = v.issue || "[Describe the issue]";
  switch (t) {
    case "noe": return head + `NOTICE OF ERROR under 12 C.F.R. § 1024.35 (RESPA / Regulation X)\n\nI am writing to assert that an error has occurred on my mortgage account:\n\n${issue}\n\nPlease correct the error, refund any fees or charges resulting from it, and correct any information reported to consumer reporting agencies. If you believe no error occurred, please explain why in writing and provide the documents you relied on, as required by § 1024.35(e).\n\nI understand you must acknowledge this notice within 5 business days and respond within 30 business days, and that you may not furnish adverse information to any consumer reporting agency regarding the disputed payment for 60 days after receipt of this notice.` + sig;
    case "rfi": return head + `REQUEST FOR INFORMATION under 12 C.F.R. § 1024.36 (RESPA / Regulation X)\n\nPlease provide the following information about my mortgage account:\n\n${issue}\n\nI understand you must acknowledge this request within 5 business days and respond within 30 business days (10 business days for the identity and contact information of the owner or assignee of my loan).` + sig;
    case "payoff": return head + `REQUEST FOR PAYOFF STATEMENT (12 C.F.R. § 1026.36(c)(3))\n\nPlease send an accurate statement of the total outstanding balance required to pay my loan in full. ${issue}\n\nPlease itemize principal, accrued interest, fees, escrow balance and any other charges, and include per-diem interest. I understand the statement must be provided within 7 business days of this request.` + sig;
    case "pmi": return head + `REQUEST TO CANCEL PRIVATE MORTGAGE INSURANCE (Homeowners Protection Act, 12 U.S.C. § 4902)\n\nI request cancellation of private mortgage insurance on my loan. ${issue}\n\nMy account is current and I have a good payment history. Please tell me in writing of any further requirements (such as evidence that the property value has not declined, or certification that there are no subordinate liens) and confirm the date PMI premiums will stop and any refund due.` + sig;
    case "escrow": return head + `NOTICE OF ERROR — ESCROW ACCOUNT (12 C.F.R. §§ 1024.35, 1024.17)\n\nI believe my escrow account has been calculated or administered in error:\n\n${issue}\n\nPlease review my escrow analysis, correct the projected disbursements and monthly escrow payment, refund any surplus required under § 1024.17, and send me a corrected escrow statement.` + sig;
    case "caPenalty": return head + `REQUEST FOR WRITTEN PREPAYMENT PENALTY CALCULATION\n\n${issue}\n\nPlease provide in writing: (1) the total amount required to discharge the mortgage on that date; (2) the prepayment charge and the method used; (3) for an interest rate differential, the comparison rate used, the term it corresponds to, the date it was set, and any discount applied; (4) any discharge, administration or other fees; and (5) any unused prepayment privilege I may apply before the payout. Please also confirm whether porting or a blend-and-extend is available instead.` + sig;
    case "caS10": return head + `REQUEST TO LIMIT PREPAYMENT CHARGE — INTEREST ACT, SECTION 10\n\n${issue}\n\nThe term of my mortgage runs more than five years from the date of the mortgage, and more than five years have now passed. Under section 10 of the Interest Act, I am entitled to repay the principal and interest owing with no more than three months' further interest. Please confirm in writing that the prepayment charge will be limited accordingly, or explain the legal basis for any higher amount.` + sig;
    case "caComplaint": return head + `FORMAL COMPLAINT\n\nI am submitting a formal complaint under your complaint-handling procedure.\n\n${issue}\n\nTo resolve this complaint I am requesting: [the outcome you want — e.g. refund of $X, corrected statement, recalculated penalty].\n\nPlease confirm receipt, the name of the person handling this complaint, and your expected response date. If this complaint is not resolved to my satisfaction, I intend to escalate it to your external complaints body and, where appropriate, the Financial Consumer Agency of Canada or my provincial regulator.` + sig;
    default: return "";
  }
}

export default function LetterGenerator() {
  const [t, setT] = useState("noe");
  const [v, setV] = useState({ name: "", address: "", contact: "", lender: "", lenderAddr: "", loan: "", issue: "" });
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => build(t, v), [t, v]);
  const set = (k) => (e) => setV((x) => ({ ...x, [k]: e.target.value }));

  const copy = async () => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {} };
  const download = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" })); a.download = `mortgage-letter-${t}.txt`; a.click(); };
  const print = () => { const w = window.open("", "_blank"); if (!w) return; w.document.write(`<pre style="font:14px/1.6 Georgia,serif;white-space:pre-wrap;max-width:700px;margin:40px auto">${text.replace(/[&<]/g, (c) => (c === "&" ? "&amp;" : "&lt;"))}</pre>`); w.document.close(); w.print(); };

  return (
    <div className="calc wrap">
      <form className="calc-form" onSubmit={(e) => e.preventDefault()}>
        <div className="field"><label htmlFor="lt">Letter type</label>
          <select id="lt" value={t} onChange={(e) => setT(e.target.value)}>
            <optgroup label="United States">{Object.entries(TYPES).filter(([, x]) => x.c === "US").map(([k, x]) => <option key={k} value={k}>{x.label}</option>)}</optgroup>
            <optgroup label="Canada">{Object.entries(TYPES).filter(([, x]) => x.c === "CA").map(([k, x]) => <option key={k} value={k}>{x.label}</option>)}</optgroup>
          </select></div>
        <div className="row2">
          <div className="field"><label htmlFor="ln">Your name(s)</label><input id="ln" value={v.name} onChange={set("name")} autoComplete="name" /></div>
          <div className="field"><label htmlFor="lc">Phone / email</label><input id="lc" value={v.contact} onChange={set("contact")} /></div>
          <div className="field" style={{ gridColumn: "1 / -1" }}><label htmlFor="la">Property address</label><input id="la" value={v.address} onChange={set("address")} autoComplete="street-address" /></div>
          <div className="field"><label htmlFor="ll">Servicer / lender</label><input id="ll" value={v.lender} onChange={set("lender")} /></div>
          <div className="field"><label htmlFor="lnum">Loan / mortgage number</label><input id="lnum" value={v.loan} onChange={set("loan")} /></div>
          <div className="field" style={{ gridColumn: "1 / -1" }}><label htmlFor="lad">Lender address</label><input id="lad" value={v.lenderAddr} onChange={set("lenderAddr")} />
            <p className="hint">{TYPES[t].c === "US" ? "Use the servicer's designated address for errors/information requests (on your statement or website) — letters sent elsewhere may not start the legal clock." : "Use the complaints or mortgage servicing address on your lender's website or statement."}</p></div>
          <div className="field" style={{ gridColumn: "1 / -1" }}><label htmlFor="li">Details</label><textarea id="li" value={v.issue} onChange={set("issue")} placeholder={TYPES[t].issue} /></div>
        </div>
        <p className="hint">Private by design: this letter is built in your browser. Nothing you type here is sent to us.</p>
      </form>
      <aside>
        <div className="letter" aria-live="polite">{text}</div>
        <div className="hero-cta" style={{ marginTop: 14 }}>
          <button className="btn" onClick={copy}>{copied ? "Copied ✓" : "Copy letter"}</button>
          <button className="btn ghost" onClick={download}>Download .txt</button>
          <button className="btn ghost" onClick={print}>Print</button>
        </div>
        <p className="hint muted" style={{ marginTop: 12 }}>Send by certified mail with return receipt, or through the servicer&rsquo;s secure portal, and keep proof. This is a template, not legal advice; for foreclosure or litigation, talk to a lawyer or legal aid.</p>
      </aside>
    </div>
  );
}
