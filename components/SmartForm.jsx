"use client";
import { useEffect, useState } from "react";

export async function submitForm(form, fields, t, hp = "") {
  const r = await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ form, fields, t, hp }) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.ok) throw new Error(d.error || "Something went wrong. Please try again.");
}

export default function SmartForm({ form, fields, submitLabel = "Send", successTitle = "Received — thank you.", successText = "We read every message.", consent, extra = {} }) {
  const [vals, setVals] = useState(() => Object.fromEntries(fields.map((f) => [f.name, f.default ?? ""])));
  const [agree, setAgree] = useState(false);
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const [t, setT] = useState(0);
  const [hp, setHp] = useState("");
  useEffect(() => setT(Date.now()), []);

  const set = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }));
  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (consent && !agree) { setErr("Please tick the consent box."); return; }
    setState("busy");
    try {
      await submitForm(form, { ...extra, ...vals, ...(consent ? { consent: String(agree) } : {}) }, t, hp);
      setState("done");
    } catch (x) { setErr(x.message); setState("idle"); }
  }

  if (state === "done") {
    return <div className="ok-box card"><div className="tickmark">✓</div><h3>{successTitle}</h3><p className="muted" style={{ marginTop: 8 }}>{successText}</p></div>;
  }
  return (
    <form className="calc-form" onSubmit={onSubmit} noValidate>
      <div className="row2">
        {fields.map((f) => (
          <div className="field" key={f.name} style={f.full || f.type === "textarea" ? { gridColumn: "1 / -1" } : undefined}>
            <label htmlFor={form + f.name}>{f.label}{f.required && " *"}</label>
            {f.type === "select" ? (
              <select id={form + f.name} value={vals[f.name]} onChange={set(f.name)} required={f.required}>
                <option value="">Select…</option>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea id={form + f.name} value={vals[f.name]} onChange={set(f.name)} required={f.required} placeholder={f.placeholder} maxLength={4000} />
            ) : (
              <input id={form + f.name} type={f.type || "text"} value={vals[f.name]} onChange={set(f.name)} required={f.required} placeholder={f.placeholder} autoComplete={f.auto} />
            )}
            {f.hint && <p className="hint">{f.hint}</p>}
          </div>
        ))}
      </div>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} name="website" />
      {consent && (
        <label className="check"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /><span>{consent}</span></label>
      )}
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn lg" type="submit" disabled={state === "busy"} style={{ width: "100%", marginTop: 6 }}>{state === "busy" ? "Sending…" : submitLabel}</button>
      <p className="hint small muted" style={{ marginTop: 10 }}>Sent privately to our team. We never sell your information. See our <a href="/privacy">privacy policy</a>.</p>
    </form>
  );
}
