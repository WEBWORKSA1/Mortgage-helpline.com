import Link from "next/link";

export default function LeadBand({ need = "", title = "Want one licensed professional to look at your exact situation?" }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="band">
          <div>
            <p className="eyebrow" style={{ color: "var(--pulse)" }}>Free · 60 seconds · no obligation</p>
            <h2>{title}</h2>
            <p style={{ marginTop: 10 }}>Tell us what you need. We match you with <strong style={{ color: "#fff" }}>one</strong> licensed mortgage professional in your province or state — never a bidding war of callers.</p>
            <div className="hero-cta"><Link className="btn gold lg" href={"/get-help" + (need ? "?need=" + need : "")}>Get matched free →</Link><Link href="/helpline" style={{ color: "#fff" }}>Or ask the AI helpline</Link></div>
          </div>
          <ul>
            <li>Your details go to one professional, once</li>
            <li>Renewals, refinancing, equity, purchase, hardship</li>
            <li>Canada · United States · India</li>
            <li>You choose how you&rsquo;re contacted</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
