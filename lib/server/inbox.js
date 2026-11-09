// Server-only. The destination inbox is never sent to the browser.
const ENCODED = "d2Vid29ya3NhMUBnbWFpbC5jb20=";
export function inbox() {
  return process.env.CONTACT_EMAIL || Buffer.from(ENCODED, "base64").toString("utf8");
}

const hits = new Map();
export function rateLimited(ip, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > limit;
}

export async function deliver(subject, fields, replyTo) {
  const to = inbox();
  const rows = Object.entries(fields).filter(([, v]) => v !== "" && v != null);
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:sans-serif">${esc(subject)}</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #ddd;font-weight:600">${esc(k)}</td><td style="padding:6px 12px;border:1px solid #ddd">${esc(String(v))}</td></tr>`).join("")}</table>`;

  if (process.env.RESEND_API_KEY) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.MAIL_FROM || "Mortgage Helpline <onboarding@resend.dev>", to: [to], subject, html, text, reply_to: replyTo || undefined }),
    });
    if (r.ok) return true;
  }
  if (process.env.WEB3FORMS_KEY) {
    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: process.env.WEB3FORMS_KEY, subject, from_name: "Mortgage Helpline", replyto: replyTo, ...Object.fromEntries(rows) }),
    });
    if (r.ok) return true;
  }
  // Zero-config fallback: FormSubmit (first submission sends a one-time activation email to the inbox).
  const r = await fetch(`https://formsubmit.co/ajax/${to}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Origin: "https://www.mortgagehelpline.com", Referer: "https://www.mortgagehelpline.com/" },
    body: JSON.stringify({ _subject: subject, _template: "table", _captcha: "false", _replyto: replyTo || undefined, ...Object.fromEntries(rows) }),
  });
  return r.ok;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
