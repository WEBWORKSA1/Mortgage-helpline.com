import Link from "next/link";
import LeadWizard from "@/components/LeadWizard";

export const metadata = {
  title: "Get Matched with One Licensed Mortgage Professional — Free",
  description: "Renewal, refinance, home equity, purchase, penalty or hardship — tell us what you need in 60 seconds and we'll match you with one licensed professional. Never auctioned.",
  alternates: { canonical: "/get-help" },
};

export default function Page({ searchParams }) {
  return (
    <main>
      <section className="hero" style={{ paddingTop: 50, paddingBottom: 60 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 30 }}>
          <div className="article" style={{ gridTemplateColumns: "minmax(0,1.15fr) minmax(0,.85fr)", alignItems: "start" }}>
            <div>
              <p className="eyebrow"><span className="live" />Free · 60 seconds · no obligation</p>
              <h1 style={{ fontSize: "clamp(2rem,4.6vw,3.1rem)" }}>One licensed pro. Your numbers. No bidding war.</h1>
              <p className="lede">Lead sites sell your phone number to five lenders at once. We send your request to <strong>one</strong> licensed professional in your province or state — the one best suited to your situation.</p>
              <div style={{ marginTop: 26 }}><LeadWizard initial={searchParams || {}} /></div>
            </div>
            <aside style={{ display: "grid", gap: 14 }}>
              <div className="card"><h3 style={{ marginTop: 0 }}>How it works</h3>
                <ol style={{ margin: "8px 0 0 20px", fontSize: ".92rem", color: "var(--ink-2)", display: "grid", gap: 8 }}>
                  <li>Tell us what you need and roughly where you stand.</li>
                  <li>We match you with one licensed professional who handles that kind of file in your area.</li>
                  <li>They contact you the way you chose. You decide whether to go ahead.</li>
                </ol></div>
              <div className="card"><h3 style={{ marginTop: 0 }}>Our promises</h3>
                <ul className="list" style={{ fontSize: ".9rem" }}>
                  <li>Your details go to one professional, once — never sold or auctioned.</li>
                  <li>No cost to you, ever. If they pay us a referral fee, it never changes our guidance.</li>
                  <li>No credit check to ask.</li>
                  <li>Change your mind? Ask us to delete your request.</li>
                </ul>
                <p className="small" style={{ marginTop: 10 }}><Link href="/how-we-make-money">How we make money →</Link></p></div>
              <div className="card"><h3 style={{ marginTop: 0 }}>Not ready to talk?</h3><p>Get the full answer first with the <Link href="/helpline">AI helpline</Link> or the <Link href="/tools">free tools</Link>.</p></div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
