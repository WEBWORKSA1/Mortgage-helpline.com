import "./globals.css";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.mortgagehelpline.com"),
  title: {
    default: "Mortgage Helpline — Straight answers for your mortgage",
    template: "%s | Mortgage Helpline",
  },
  description:
    "Free, unbiased help with mortgage penalties, renewals, refinancing, home equity and servicing problems. Full answers first. No email walls.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=Public+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="hdr">
          <div className="wrap hdr-in">
            <Link href="/" className="brand">
              <span className="brand-dot" aria-hidden="true" />
              Mortgage&nbsp;Helpline
            </Link>
            <nav className="nav" aria-label="Main">
              <Link href="/tools/penalty-calculator">Penalty</Link>
              <Link href="/tools/renewal-calculator">Renewal</Link>
              <Link href="/how-we-make-money">How we make money</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="ftr">
          <div className="wrap">
            <div className="ftr-in">
              <div>© {new Date().getFullYear()} Mortgage Helpline · Canada &amp; United States</div>
              <div style={{ display: "flex", gap: 20 }}>
                <Link href="/how-we-make-money">How we make money</Link>
                <Link href="/tools/penalty-calculator">Tools</Link>
              </div>
            </div>
            <p className="legal">
              Mortgage Helpline provides free educational information and estimates. It is not a
              lender, broker, or financial advisor, and nothing here is financial, legal, or tax
              advice. Figures from our calculators are estimates — always confirm exact amounts
              with your lender in writing before making a decision.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
