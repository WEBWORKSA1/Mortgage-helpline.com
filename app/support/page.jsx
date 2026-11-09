import Link from "next/link";
import { SupportPicker } from "@/components/Finders";
import SmartForm from "@/components/SmartForm";

export const metadata = { title: "Support Free Mortgage Help", description: "Help keep Mortgage Helpline free: fund tools, the AI helpline, expert contributors, outreach, and contests.", alternates: { canonical: "/support" } };

const USES = [
  ["Operations & servers", "Hosting, data feeds and security that keep the line open 24/7."],
  ["Free tools & AI helpline", "Every helpline answer costs real compute. Your support keeps it free and unmetered for people in trouble."],
  ["Expert contributors", "Paying licensed professionals to review guides in Canada, the US and India."],
  ["Outreach & promotion", "Reaching borrowers before renewal shock or a missed payment — not after."],
  ["Contests & prizes", "Financial-literacy challenges with real prizes."],
];

export default function Page({ searchParams }) {
  const thanks = searchParams?.thanks === "1";
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow">Keep the line free</p><h1>Support straight answers</h1><p>No paywalls, no email walls, no selling your data to five lenders. If Mortgage Helpline saved you money or stress, you can help keep it that way.</p></div>
      {thanks && <div className="wrap"><div className="r-flag" style={{ color: "var(--ink)", marginBottom: 20 }}>Thank you — your support was received. It goes straight into keeping help free.</div></div>}
      <section className="wrap article" style={{ paddingBottom: 40 }}>
        <div>
          <SupportPicker />
          <h2 style={{ fontSize: "1.4rem", margin: "36px 0 12px" }}>Other ways to help</h2>
          <div className="grid two">
            <div className="card"><h3>Share a tool</h3><p>Send the <Link href="/tools/renewal-calculator">renewal calculator</Link> to someone renewing this year. That&rsquo;s the highest-impact help there is.</p></div>
            <div className="card"><h3>Sponsor a prize</h3><p>Businesses can fund contest prizes, with labelled recognition. <Link href="/contests">See contests</Link>.</p></div>
            <div className="card"><h3>Contribute expertise</h3><p>Licensed professionals and writers: <Link href="/careers">join the talent network</Link>.</p></div>
            <div className="card"><h3>Tell us what&rsquo;s missing</h3><p>Every guide on the roadmap started as a reader&rsquo;s question.</p></div>
          </div>
          <h2 style={{ fontSize: "1.4rem", margin: "36px 0 12px" }}>Send feedback or a supporter message</h2>
          <SmartForm form="feedback" submitLabel="Send message" successTitle="Thank you." successText="Your message reached the team."
            fields={[{ name: "name", label: "Name" }, { name: "email", label: "Email (optional)", type: "email" }, { name: "message", label: "Message", type: "textarea", required: true }]} />
        </div>
        <aside>
          <div className="toc"><h4>Where support goes</h4>{USES.map(([t, d]) => <p key={t} className="small" style={{ marginBottom: 10 }}><strong>{t}.</strong> {d}</p>)}</div>
          <p className="small muted" style={{ marginTop: 14 }}>Mortgage Helpline is an independent, for-profit service, not a registered charity; contributions are not tax-deductible and are non-refundable. Support never buys influence over our content. See <Link href="/how-we-make-money">how we make money</Link>.</p>
        </aside>
      </section>
    </main>
  );
}
