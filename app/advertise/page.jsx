import Link from "next/link";
import SmartForm from "@/components/SmartForm";
import { SITE } from "@/lib/site";

export const metadata = { title: "Advertise, Sponsor & Partner", description: "Reach borrowers at the moment of decision — with labelled sponsorships that never buy rankings or recommendations.", alternates: { canonical: "/advertise" } };

export default function Page() {
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow">Partners</p><h1>Advertise, sponsor &amp; partner</h1><p>Our audience is homeowners and buyers in Canada, the US and India at the exact moment of a mortgage decision — renewals, refinancing, equity, purchase and hardship.</p></div>
      <section className="wrap article" style={{ paddingBottom: 40 }}>
        <div>
          <div className="grid two">
            <div className="card"><h3>Labelled sponsorships</h3><p>Sponsor a calculator, guide section or the daily brief with a clearly marked &ldquo;Sponsored&rdquo; placement.</p></div>
            <div className="card"><h3>Contest prizes</h3><p>Fund financial-literacy contests and be credited as the prize sponsor.</p></div>
            <div className="card"><h3>Partnerships</h3><p>Credit unions, non-profits, housing counsellors, employers and creators: embed our tools or co-create content.</p></div>
            <div className="card"><h3>Research &amp; data</h3><p>Aggregated, anonymous insights on what borrowers ask about — never personal data.</p></div>
          </div>
          <h2 style={{ fontSize: "1.4rem", margin: "36px 0 12px" }}>What we will not accept</h2>
          <ul style={{ margin: "0 0 0 20px", display: "grid", gap: 6, color: "var(--ink-2)" }}>
            <li>Payment for rankings, reviews, recommendations or helpline answers.</li>
            <li>Upfront-fee mortgage relief, &ldquo;guaranteed approval&rdquo; lending, or credit-repair offers.</li>
            <li>Unlabelled native advertising or advertorials.</li>
          </ul>
          <h2 style={{ fontSize: "1.4rem", margin: "36px 0 12px" }}>Start a conversation</h2>
          <SmartForm form="advertise" submitLabel="Send inquiry" successTitle="Inquiry received." successText="We'll reply by email."
            fields={[{ name: "company", label: "Company / organization", required: true }, { name: "name", label: "Your name", required: true }, { name: "email", label: "Work email", type: "email", required: true },
              { name: "interest", label: "Interested in", type: "select", options: ["Sponsorship", "Advertising", "Partnership", "Contest prize", "Website / domain acquisition", "Other"] },
              { name: "budget", label: "Budget range (optional)" }, { name: "message", label: "Details", type: "textarea", required: true }]} />
        </div>
        <aside><div className="toc"><h4>Prefer to talk directly?</h4><p className="small">For website, domain name, sponsorship, advertising or partnership interest you can also use the <a href={SITE.sponsorUrl} target="_blank" rel="noopener">contact link</a> at the top of every page.</p><p className="small" style={{ marginTop: 8 }}>Read our <Link href="/how-we-make-money">revenue rules</Link> first — they apply to every partner.</p></div></aside>
      </section>
    </main>
  );
}
