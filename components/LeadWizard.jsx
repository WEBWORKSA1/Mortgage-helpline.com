"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { regionsFor } from "@/lib/regions";
import { submitForm } from "./SmartForm";

const NEEDS = [
  { id: "renewal", label: "Renew my mortgage", sub: "Beat my renewal offer" },
  { id: "refinance", label: "Refinance", sub: "Lower rate or new term" },
  { id: "equity", label: "Use my home equity", sub: "HELOC, loan or cash-out" },
  { id: "purchase", label: "Buy a home", sub: "Pre-approval & best rate" },
  { id: "penalty", label: "Break my mortgage", sub: "Penalty, porting, blend" },
  { id: "hardship", label: "Behind on payments", sub: "Options to keep my home" },
  { id: "servicer", label: "Problem with my lender", sub: "Errors, fees, escrow" },
  { id: "other", label: "Something else", sub: "Tell us in your words" },
];
const TIMES = ["As soon as possible", "Within 30 days", "1–3 months", "3–6 months", "Just researching"];
const COUNTRIES = ["Canada", "United States", "India"];

export default function LeadWizard({ initial = {} }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    need: "", country: "", region: "", city: "", value: "", balance: "", amount: "", timeline: "", renewalDate: "", credit: "",
    firstName: "", lastName: "", email: "", phone: "", contactBy: "Email", bestTime: "", message: "",
  });
  const [consent, setConsent] = useState(false);
  const [optIn, setOptIn] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [t, setT] = useState(0);
  const [hp, setHp] = useState("");

  useEffect(() => {
    setT(Date.now());
    const pick = (k) => (typeof initial[k] === "string" ? initial[k].slice(0, 40) : "");
    const need = NEEDS.find((n) => n.id === pick("need")) ? pick("need") : "";
    const country = { CA: "Canada", US: "United States", IN: "India" }[pick("country")] || "";
    setD((x) => ({ ...x, need, country, value: pick("value").replace(/\D/g, ""), balance: pick("balance").replace(/\D/g, ""), amount: pick("amount").replace(/\D/g, "") }));
    if (need) setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k) => (e) => setD((x) => ({ ...x, [k]: e.target.value }));
  const regions = useMemo(() => regionsFor(d.country), [d.country]);
  const money = d.country === "India" ? "₹" : "$";
  const total = 3;

  function next() {
    setErr("");
    if (step === 0 && !d.need) return setErr("Choose what you need help with.");
    if (step === 1) {
      if (!d.country) return setErr("Choose your country.");
      if (!d.region) return setErr(d.country === "Canada" ? "Choose your province." : "Choose your state.");
      if (!d.timeline) return setErr("Choose your timeline.");
    }
    setStep(step + 1);
    window.scrollTo({ top: document.getElementById("wizard")?.offsetTop - 90 || 0, behavior: "smooth" });
  }

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (!d.firstName.trim()) return setErr("Please add your first name.");
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(d.email)) return setErr("Please add a valid email.");
    if ((d.contactBy === "Phone" || d.contactBy === "Text") && d.phone.replace(/\D/g, "").length < 10) return setErr("Please add a phone number so they can call or text you.");
    if (!consent) return setErr("Please confirm consent so one professional can contact you.");
    setBusy(true);
    try {
      const needLabel = NEEDS.find((n) => n.id === d.need)?.label || d.need;
      await submitForm("lead", { ...d, need: needLabel, consent: String(consent), newsletterOptIn: String(optIn) }, t, hp);
      setDone(true);
      window.scrollTo({ top: document.getElementById("wizard")?.offsetTop - 90 || 0, behavior: "smooth" });
    } catch (x) { setErr(x.message); }
    setBusy(false);
  }

  if (done) {
    return (
      <div className="wizard" id="wizard">
        <div className="ok-box">
          <div className="tickmark">✓</div>
          <h2>You&rsquo;re on the line, {d.firstName}.</h2>
          <p className="muted" style={{ maxWidth: "52ch", margin: "10px auto 0" }}>
            We&rsquo;ll match your request with one licensed professional in {d.region || "your area"}, who will contact you by {d.contactBy.toLowerCase()}. Nobody else gets your details.
          </p>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <Link className="btn" href="/helpline">Ask the helpline while you wait</Link>
            <Link className="btn ghost" href="/tools">Run the numbers</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard" id="wizard">
      <div className="progress" aria-hidden="true"><span style={{ width: `${((step + 1) / total) * 100}%` }} /></div>
      <div className="wiz-top"><span>Step {step + 1} of {total}</span><span>Free · no obligation · ~60 seconds</span></div>
      <form className="wiz-body" onSubmit={submit} noValidate>
        {step === 0 && (
          <>
            <h2>What do you need help with?</h2>
            <p className="muted">Pick the closest — you can add detail later.</p>
            <div className="opts" role="radiogroup">
              {NEEDS.map((n) => (
                <button type="button" key={n.id} role="radio" aria-checked={d.need === n.id} className={"opt" + (d.need === n.id ? " on" : "")}
                  onClick={() => { setD((x) => ({ ...x, need: n.id })); setErr(""); setStep(1); }}>
                  <b>{n.label}</b><small>{n.sub}</small>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2>Where is the property, and what are the numbers?</h2>
            <p className="muted">Rough numbers are fine. Licensing is local, so location decides who can help.</p>
            {d.need === "hardship" && (
              <div className="notice" style={{ margin: "16px 0" }}>
                Free help is available right now: call your servicer or lender first. In the US, a HUD-approved housing counselor is free at <strong>1-800-569-4287</strong>. Never pay an upfront fee for mortgage relief. You can still continue below.
              </div>
            )}
            <div className="row2" style={{ marginTop: 16 }}>
              <div className="field"><label htmlFor="lw-c">Country *</label>
                <select id="lw-c" value={d.country} onChange={(e) => setD((x) => ({ ...x, country: e.target.value, region: "" }))}>
                  <option value="">Select…</option>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select></div>
              <div className="field"><label htmlFor="lw-r">{d.country === "Canada" ? "Province / territory" : "State"} *</label>
                <select id="lw-r" value={d.region} onChange={set("region")} disabled={!d.country}>
                  <option value="">Select…</option>{regions.map((r) => <option key={r}>{r}</option>)}
                </select></div>
              <div className="field"><label htmlFor="lw-city">City</label><input id="lw-city" value={d.city} onChange={set("city")} autoComplete="address-level2" /></div>
              <div className="field"><label htmlFor="lw-t">Timeline *</label>
                <select id="lw-t" value={d.timeline} onChange={set("timeline")}><option value="">Select…</option>{TIMES.map((x) => <option key={x}>{x}</option>)}</select></div>
              <div className="field"><label htmlFor="lw-v">{d.need === "purchase" ? "Target purchase price" : "Approximate home value"} ({money})</label><input id="lw-v" type="number" min="0" inputMode="numeric" value={d.value} onChange={set("value")} /></div>
              {d.need !== "purchase" && <div className="field"><label htmlFor="lw-b">Mortgage balance ({money})</label><input id="lw-b" type="number" min="0" inputMode="numeric" value={d.balance} onChange={set("balance")} /></div>}
              {(d.need === "equity" || d.need === "purchase") && <div className="field"><label htmlFor="lw-a">{d.need === "equity" ? "Cash needed" : "Down payment"} ({money})</label><input id="lw-a" type="number" min="0" inputMode="numeric" value={d.amount} onChange={set("amount")} /></div>}
              {d.need === "renewal" && <div className="field"><label htmlFor="lw-rd">Renewal / maturity date</label><input id="lw-rd" type="month" value={d.renewalDate} onChange={set("renewalDate")} /></div>}
              <div className="field"><label htmlFor="lw-cr">Credit (self-estimate)</label>
                <select id="lw-cr" value={d.credit} onChange={set("credit")}><option value="">Prefer not to say</option><option>Excellent</option><option>Good</option><option>Fair</option><option>Rebuilding</option></select></div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Who should they contact?</h2>
            <p className="muted">One licensed professional — never a list of callers.</p>
            <div className="row2" style={{ marginTop: 16 }}>
              <div className="field"><label htmlFor="lw-fn">First name *</label><input id="lw-fn" value={d.firstName} onChange={set("firstName")} autoComplete="given-name" /></div>
              <div className="field"><label htmlFor="lw-ln">Last name</label><input id="lw-ln" value={d.lastName} onChange={set("lastName")} autoComplete="family-name" /></div>
              <div className="field"><label htmlFor="lw-e">Email *</label><input id="lw-e" type="email" value={d.email} onChange={set("email")} autoComplete="email" /></div>
              <div className="field"><label htmlFor="lw-p">Phone {d.contactBy !== "Email" && "*"}</label><input id="lw-p" type="tel" value={d.phone} onChange={set("phone")} autoComplete="tel" /></div>
              <div className="field"><label>Preferred contact</label>
                <div className="seg">{["Email", "Phone", "Text"].map((m) => <button type="button" key={m} className={d.contactBy === m ? "on" : ""} onClick={() => setD((x) => ({ ...x, contactBy: m }))}>{m}</button>)}</div></div>
              <div className="field"><label htmlFor="lw-bt">Best time</label>
                <select id="lw-bt" value={d.bestTime} onChange={set("bestTime")}><option value="">Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Weekend</option></select></div>
              <div className="field" style={{ gridColumn: "1 / -1" }}><label htmlFor="lw-m">Anything they should know?</label><textarea id="lw-m" value={d.message} onChange={set("message")} placeholder="e.g. renewal letter offers 5.4% for 5 years; want to compare" maxLength={2000} /></div>
            </div>
            <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} name="website" />
            <label className="check"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>I agree that Mortgage Helpline may share the details above with <strong>one</strong> licensed mortgage professional serving my area, and that they may contact me by email, phone or text about this request, including by automated means. Consent is not a condition of any purchase, and I can withdraw it at any time. I have read the <Link href="/privacy">privacy policy</Link>.</span></label>
            <label className="check"><input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} />
              <span>Optional: send me the Mortgage Helpline brief and rate-change alerts. Unsubscribe anytime.</span></label>
          </>
        )}

        {err && <p className="err" role="alert">{err}</p>}
        <div className="wiz-nav">
          {step > 0 ? <button type="button" className="btn ghost" onClick={() => { setErr(""); setStep(step - 1); }}>← Back</button> : <span />}
          {step < 2 ? (step > 0 && <button type="button" className="btn" onClick={next}>Continue →</button>)
            : <button type="submit" className="btn gold lg" disabled={busy}>{busy ? "Sending…" : "Get matched free →"}</button>}
        </div>
        <div className="badges"><span>One professional, never auctioned</span><span>Encrypted in transit</span><span>No credit check to ask</span></div>
      </form>
    </div>
  );
}
