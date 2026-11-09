import Link from "next/link";
export const metadata = { title: "Page not found", robots: { index: false } };
export default function NotFound() {
  return (
    <main className="wrap page-hd" style={{ paddingBottom: 80 }}>
      <p className="eyebrow">404</p>
      <h1>That page isn&rsquo;t on the line.</h1>
      <p>It may have moved. Try the helpline, the tools, or the guides.</p>
      <div className="hero-cta"><Link className="btn" href="/helpline">Ask the Helpline</Link><Link className="btn ghost" href="/tools">All tools</Link><Link className="btn ghost" href="/guides">All guides</Link></div>
    </main>
  );
}
