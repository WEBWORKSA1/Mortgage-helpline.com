import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: { type: "website", siteName: SITE.name, url: SITE.url, title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description},
  twitter: { card: "summary_large_image", title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description},
  robots: { index: true, follow: true },
  other: { "google-adsense-account": SITE.adsenseClient },
};

export const viewport = { themeColor: "#0e1b16", width: "device-width", initialScale: 1 };

const consentScript = `try{if(localStorage.getItem('mh-consent')==='essential'){(window.adsbygoogle=window.adsbygoogle||[]).requestNonPersonalizedAds=1}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=Public+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: consentScript }} />
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsenseClient}`} crossOrigin="anonymous" />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <div className="topbar">
          <a href={SITE.sponsorUrl} target="_blank" rel="noopener">{SITE.sponsorText}</a>
        </div>
        <Header />
        <div id="main">{children}</div>
        <Footer />
        <nav className="mcta" aria-label="Quick actions">
          <Link href="/helpline">Ask a question</Link>
          <Link href="/get-help">Get matched free</Link>
        </nav>
        <ConsentBanner />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": SITE.url + "/#org", name: SITE.name, url: SITE.url, logo: SITE.url + "/icon.svg", slogan: SITE.tagline },
            { "@type": "WebSite", "@id": SITE.url + "/#site", name: SITE.name, url: SITE.url, publisher: { "@id": SITE.url + "/#org" },
              potentialAction: { "@type": "SearchAction", target: SITE.url + "/helpline?q={search_term_string}", "query-input": "required name=search_term_string" } },
          ],
        }} />
      </body>
    </html>
  );
}
