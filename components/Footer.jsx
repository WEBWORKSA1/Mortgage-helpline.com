import Link from "next/link";
import { FOOTER, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 12 }}><span className="brand-dot" aria-hidden="true" />Mortgage&nbsp;Helpline</Link>
            <p style={{ marginTop: 12 }}>Straight answers for your mortgage — Canada, the United States and India. Full answers first. No email walls. No pay-to-rank.</p>
            <p style={{ marginTop: 12 }}><Link href="/support">Support free mortgage help →</Link></p>
          </div>
          {FOOTER.map(([h, links]) => (
            <div key={h}>
              <h4>{h}</h4>
              <ul>{links.map(([l, href]) => <li key={href}><Link href={href}>{l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="legal">
          <p>
            © {SITE.year} Mortgage Helpline. All rights reserved. Mortgage Helpline™, MortgageHelpline.com™, the
            pulse-line logo and &ldquo;Straight answers for your mortgage&rdquo;™ are trademarks of Mortgage Helpline.
            All original articles, calculators, software code, data compilations and design on this website are protected
            by copyright. Third-party names, logos and marks belong to their respective owners and are used only for
            identification — no endorsement or affiliation is implied. <Link href="/legal">Trademark &amp; copyright notice</Link>.
          </p>
          <p>
            Mortgage Helpline provides free educational information and estimates. It is not a lender, mortgage broker,
            law firm or financial advisor, and nothing on this site is financial, legal or tax advice. Calculator results are
            estimates; confirm exact figures with your lender in writing. Live rates are averages from public sources
            (Bank of Canada, Freddie Mac via FRED) and are not offers. This site displays ads from Google AdSense and may
            earn referral fees when you choose to be connected with a professional — see <Link href="/how-we-make-money">how we make money</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
