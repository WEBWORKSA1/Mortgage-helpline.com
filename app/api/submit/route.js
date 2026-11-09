import { deliver, rateLimited } from "@/lib/server/inbox";

export const runtime = "nodejs";

const FORMS = {
  lead: "New lead — get matched",
  contact: "Contact message",
  advertise: "Advertising / partnership inquiry",
  careers: "Talent application",
  contest: "Contest entry",
  sponsor: "Prize sponsorship offer",
  newsletter: "Newsletter / renewal reminder signup",
  support: "Supporter message",
  feedback: "Site feedback",
};
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[a-z]{2,}$/i;

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "anon";
  if (rateLimited(ip)) return json({ ok: false, error: "Too many submissions. Please try again later." }, 429);

  let body;
  try { body = await req.json(); } catch { return json({ ok: false, error: "Bad request." }, 400); }
  const { form, fields = {}, hp, t } = body || {};
  if (!FORMS[form]) return json({ ok: false, error: "Unknown form." }, 400);
  // Spam traps: hidden field filled, or submitted faster than a human could.
  if (hp || (t && Date.now() - Number(t) < 2500)) return json({ ok: true });

  const clean = {};
  for (const [k, v] of Object.entries(fields).slice(0, 40)) {
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") clean[String(k).slice(0, 60)] = String(v).slice(0, 4000).trim();
  }
  const email = clean.email || clean.Email || "";
  if (email && !EMAIL.test(email)) return json({ ok: false, error: "Please enter a valid email address." }, 400);
  if (["lead", "contact", "advertise", "careers", "contest", "sponsor", "newsletter"].includes(form) && !email)
    return json({ ok: false, error: "Email is required." }, 400);
  if (form === "lead" && clean.consent !== "true") return json({ ok: false, error: "Please confirm consent so a professional can contact you." }, 400);

  clean["Submitted"] = new Date().toISOString();
  clean["Page"] = (req.headers.get("referer") || "").slice(0, 300);
  try {
    const ok = await deliver(`[Mortgage Helpline] ${FORMS[form]}${clean.need ? " — " + clean.need : ""}`, clean, email);
    if (!ok) throw new Error("delivery failed");
    return json({ ok: true });
  } catch (e) {
    console.error("submit failed", form, e.message);
    return json({ ok: false, error: "We couldn't send that just now. Please try again in a minute." }, 502);
  }
}

function json(d, status = 200) {
  return new Response(JSON.stringify(d), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
