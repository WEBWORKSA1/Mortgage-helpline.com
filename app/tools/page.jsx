import Link from "next/link";
import { TOOLS } from "@/content/tools";
import LeadBand from "@/components/LeadBand";

export const metadata = { title: "Free Mortgage Calculators & Tools", description: "Free mortgage calculators for Canada, the US and India: payment, affordability, renewal, penalty, refinance, home equity, EMI and dispute letters. No email required.", alternates: { canonical: "/tools" } };

export default function Page() {
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow">Free · no email · instant</p><h1>Mortgage tools that show their math</h1><p>Every result appears as you type, with the assumptions written down. Nothing is gated, nothing is saved.</p></div>
      <section className="wrap" style={{ paddingBottom: 30 }}>
        <div className="grid">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="card"><div className="ico" aria-hidden="true">{t.ico}</div><span className="tag">{t.tag}</span><h3>{t.title}</h3><p>{t.text}</p><span className="go">Open →</span></Link>
          ))}
        </div>
      </section>
      <LeadBand />
    </main>
  );
}
