"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

export function GuideFinder({ guides }) {
  const [q, setQ] = useState("");
  const [c, setC] = useState("All");
  const list = useMemo(() => guides.filter((g) =>
    (c === "All" || g.country === c || g.country === "ALL") &&
    (!q || (g.title + " " + g.description + " " + g.topic).toLowerCase().includes(q.toLowerCase()))), [guides, q, c]);
  return (
    <>
      <div className="row2" style={{ gridTemplateColumns: "2fr 1fr", marginBottom: 22 }}>
        <input className="search" placeholder="Search guides — e.g. penalty, escrow, renewal, EMI" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search guides" />
        <div className="seg">{[["All", "All"], ["CA", "Canada"], ["US", "USA"], ["IN", "India"]].map(([v, l]) => <button key={v} type="button" className={c === v ? "on" : ""} onClick={() => setC(v)}>{l}</button>)}</div>
      </div>
      <div className="grid three">
        {list.map((g) => (
          <Link key={g.slug} href={"/guides/" + g.slug} className="card">
            <div style={{ display: "flex", gap: 6 }}><span className={"tag " + g.country.toLowerCase()}>{g.country === "ALL" ? "CA · US" : g.country}</span><span className="tag">{g.topic}</span></div>
            <h3>{g.title}</h3><p>{g.description}</p><span className="go">{g.minutes} min read →</span>
          </Link>
        ))}
      </div>
      {!list.length && <p className="muted">No guides match. <Link href={"/helpline?q=" + encodeURIComponent(q)}>Ask the helpline instead →</Link></p>}
    </>
  );
}

export function GlossarySearch({ terms }) {
  const [q, setQ] = useState("");
  const list = terms.filter(([t, d]) => !q || (t + " " + d).toLowerCase().includes(q.toLowerCase()));
  const letters = [...new Set(terms.map(([t]) => t[0].toUpperCase()))];
  return (
    <>
      <input className="search" placeholder={`Search ${terms.length} mortgage terms…`} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search glossary" />
      {!q && <nav className="az" aria-label="Jump to letter">{letters.map((l) => <a key={l} href={"#gl-" + l}>{l}</a>)}</nav>}
      <dl className="gl">
        {list.map(([t, d], i) => {
          const first = !q && (i === 0 || list[i - 1][0][0].toUpperCase() !== t[0].toUpperCase());
          return <div key={t} id={first ? "gl-" + t[0].toUpperCase() : undefined}><dt>{t}</dt><dd>{d}</dd></div>;
        })}
      </dl>
    </>
  );
}

export function Quiz({ questions }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState(null);
  const [score, setScore] = useState(0);
  const done = i >= questions.length;
  if (done) return (
    <div className="card quiz" style={{ textAlign: "center" }}>
      <p className="eyebrow" style={{ justifyContent: "center" }}>Your Mortgage IQ</p>
      <div className="k" style={{ fontSize: "2.4rem" }}>{score} / {questions.length}</div>
      <p className="muted" style={{ margin: "10px 0 16px" }}>{score === questions.length ? "Flawless. You could teach this." : score >= questions.length - 2 ? "Strong — you know more than most borrowers." : "Good start — the guides will close the gaps fast."}</p>
      <div className="hero-cta" style={{ justifyContent: "center" }}><button className="btn" onClick={() => { setI(0); setPick(null); setScore(0); }}>Try again</button><Link className="btn ghost" href="/guides">Read the guides</Link></div>
    </div>
  );
  const q = questions[i];
  return (
    <div className="card quiz">
      <p className="small muted">Question {i + 1} of {questions.length} · Score {score}</p>
      <p className="q" style={{ marginTop: 8 }}>{q.q}</p>
      {q.a.map((a, k) => (
        <button key={k} className={"a" + (pick != null ? (k === q.c ? " right" : k === pick ? " wrong" : "") : "")} disabled={pick != null}
          onClick={() => { setPick(k); if (k === q.c) setScore(score + 1); }}>{a}</button>
      ))}
      {pick != null && (<><p className="small" style={{ margin: "8px 0 14px" }}>{q.why}</p><button className="btn" onClick={() => { setI(i + 1); setPick(null); }}>{i + 1 < questions.length ? "Next question →" : "See my score"}</button></>)}
    </div>
  );
}

export function SupportPicker() {
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [purpose, setPurpose] = useState("general");
  const [monthly, setMonthly] = useState(false);
  const amt = custom ? Number(custom) : amount;
  const href = `/api/donate?amount=${amt || 0}&currency=${currency}&purpose=${purpose}&monthly=${monthly ? 1 : 0}`;
  return (
    <div className="calc-form">
      <div className="field"><label>Choose an amount</label>
        <div className="tiers">{[[5, "Coffee for the line"], [25, "Supporter"], [100, "Champion"], [500, "Founding patron"]].map(([v, l]) => (
          <button key={v} type="button" className={"tier" + (!custom && amount === v ? " on" : "")} onClick={() => { setAmount(v); setCustom(""); }}><b>{v}</b><span className="small muted">{l}</span></button>
        ))}</div></div>
      <div className="row2">
        <div className="field"><label htmlFor="sc">Or custom amount</label><input id="sc" type="number" min="1" value={custom} onChange={(e) => setCustom(e.target.value)} /></div>
        <div className="field"><label htmlFor="scur">Currency</label><select id="scur" value={currency} onChange={(e) => setCurrency(e.target.value)}>{["USD", "CAD", "INR", "EUR", "GBP"].map((c) => <option key={c}>{c}</option>)}</select></div>
        <div className="field" style={{ gridColumn: "1 / -1" }}><label htmlFor="sp">Direct my support to</label>
          <select id="sp" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            <option value="general">Wherever it's needed most</option><option value="operations">Operations &amp; servers</option><option value="tools">Free tools &amp; AI helpline</option>
            <option value="marketing">Outreach &amp; promotion</option><option value="talent">Hiring expert contributors</option><option value="contests">Contests &amp; prizes</option>
          </select></div>
      </div>
      <label className="check"><input type="checkbox" checked={monthly} onChange={(e) => setMonthly(e.target.checked)} /><span>Make it monthly (you can cancel anytime from your PayPal account)</span></label>
      <a className="btn gold lg" style={{ width: "100%" }} href={href} rel="nofollow">Continue to secure checkout →</a>
      <p className="hint muted" style={{ marginTop: 10 }}>Processed by PayPal — we never see your card details. Contributions support a for-profit service, are not tax-deductible, and are non-refundable.</p>
    </div>
  );
}
