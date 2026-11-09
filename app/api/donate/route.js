import { inbox } from "@/lib/server/inbox";

export const runtime = "nodejs";

const PURPOSES = {
  operations: "Operations & servers", tools: "Free tools & AI helpline", marketing: "Outreach & promotion",
  talent: "Hiring expert contributors", contests: "Contests & prizes", general: "General support",
};

// Redirects to a hosted checkout. Priority: DONATE_URL (e.g. Stripe Payment Link)
// → PayPal merchant ID → PayPal account inbox (server-side only).
export async function GET(req) {
  const u = new URL(req.url);
  const amount = Math.min(Math.max(Number(u.searchParams.get("amount")) || 0, 0), 10000);
  const currency = ["USD", "CAD", "INR", "EUR", "GBP"].includes(u.searchParams.get("currency")) ? u.searchParams.get("currency") : "USD";
  const purpose = PURPOSES[u.searchParams.get("purpose")] || PURPOSES.general;
  const monthly = u.searchParams.get("monthly") === "1";

  if (process.env.DONATE_URL) return Response.redirect(process.env.DONATE_URL, 302);

  const business = process.env.PAYPAL_MERCHANT_ID || inbox();
  const p = new URLSearchParams({
    business, currency_code: currency, item_name: `Mortgage Helpline — ${purpose}`,
    no_recurring: monthly ? "0" : "1", return: "https://www.mortgagehelpline.com/support?thanks=1",
  });
  if (amount > 0) p.set("amount", amount.toFixed(2));
  return Response.redirect(`https://www.paypal.com/donate/?${p.toString()}`, 302);
}
