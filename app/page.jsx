import Link from "next/link";
import PulseLine from "@/components/PulseLine";
import Ticker from "@/components/Ticker";
import LeadBand from "@/components/LeadBand";
import LiteYouTube from "@/components/LiteYouTube";
import { getLive, fmtDate } from "@/lib/live";
import { TOOLS } from "@/content/tools";
import { GUIDES } from "@/content/guides";
import { FAQ } from "@/content/faq";

export const revalidate = 43200;
export const metadata = { alternates: { canonical: "/" } };

const JOURNEYS = [
  ["🔁", "Renewing", "Beat your renewal offer and switch without a penalty.", "/guides/renew-mortgage-canada"],
  ["⚖️", "Breaking a mortgage", "Penalties, porting, blend-and-extend, the s.10 rule.", "/guides/break-mortgage-penalty-canada"],
  ["📉", "Refinancing", "The break-even test that decides it.", "/guides/when-to-refinance"],
  ["🔑", "Using equity", "HELOC vs loan vs cash-out — and when to say no.", "/guides/home-equity"],
  ["🏠", "Buying", "Down payments, insurance, stress test, first-time perks.", "/guides/first-time-buyer-canada"],
  ["🆘", "Behind on payments", "Your options, your rights, and free help today.", "/guides/behind-on-mortgage-payments"],
  ["🧾", "Servicer problems", "Letters that force a written answer.", "/guides/mortgage-servicer-errors"],
  ["₹", "Home loans in India", "EMI, repo-linked rates, prepayment, ombudsman.", "/guides/home-loans-india"],
];

export default async function Home() {
  const live = await getLive();
  const top = live.complaints?.issues?.[0];
  const share = top && live.complaints.total ? Math.round((top.count / live.complaints.total) * 100) : null;
  const featured = ["renew-mortgage-canada", "behind-on-mortgage-payments", "home-equity", "break-mortgage-penalty-canada", "mortgage-servicer-errors", "home-loans-india"].map((s) => GUIDES.find((g) => g.slug === s)).filter(Boolean);
  const news = (live.news || []).slice(0, 6);
  const vids = (live.videos || []).slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow"><span className="live" aria-hidden="true" />The line is open · Canada · USA · India</p>
          <h1>Straight answers for your mortgage.</h1>
          <p className="lede">Renewals, penalties, refinancing, home equity, servicer errors, hardship — get the complete answer first, free, with no email wall. Want a licensed pro after that? We&rsquo;ll match you with one. Your call.</p>
          <form className="askbar" action="/helpline" role="search">
            <input type="text" name="q" placeholder="Ask anything — the line answers in seconds" aria-label="Ask a mortgage question" maxLength={500} />
            <button type="submit">Get help</button>
          </form>
          <div className="chips">
            <Link href="/helpline?q=What%20will%20breaking%20my%20mortgage%20cost%3F">What will breaking my mortgage cost?</Link>
            <Link href="/helpline?q=My%20renewal%20offer%20looks%20high%20%E2%80%94%20what%20can%20I%20do%3F">My renewal offer looks high</Link>
            <Link href="/helpline?q=HELOC%20or%20cash-out%20refinance%3F">HELOC or cash-out refi?</Link>
            <Link href="/helpline?q=I%27m%20behind%20on%20my%20mortgage%20payments.%20What%20are%20my%20options%3F">I&rsquo;m behind on payments</Link>
          </div>
          <div className="hero-cta"><Link className="btn gold lg" href="/get-help">Get matched with one licensed pro — free</Link><span className="muted small">60 seconds · never auctioned</span></div>
        </div>
        <PulseLine />
      </section>

      <Ticker live={live} />

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div><h2>Today&rsquo;s mortgage brief</h2><p className="sub">Refreshed automatically every day from the Bank of Canada, Freddie Mac and the CFPB.</p></div>
            <Link className="btn ghost" href="/rates">Live rates &amp; charts →</Link>
          </div>
          <div className="brief"><p>{live.brief?.text}</p><p className="meta">Data as of {fmtDate(live.brief?.for)} · Updated {fmtDate(live.updatedAt)} · Averages for comparison, not offers.</p></div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2>What do you need help with?</h2>
          <p className="sub">Pick your situation. Each path starts with a plain-language guide and the tool that runs your numbers.</p>
          <div className="grid">
            {JOURNEYS.map(([ico, t, d, h]) => (
              <Link key={h} href={h} className="card"><div className="ico" aria-hidden="true">{ico}</div><h3>{t}</h3><p>{d}</p><span className="go">Start here →</span></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head"><div><h2>Free tools that show their math</h2><p className="sub">No email, no signup, results as you type.</p></div><Link className="btn ghost" href="/tools">All tools →</Link></div>
          <div className="grid">
            {TOOLS.slice(0, 8).map((t) => (
              <Link key={t.href} href={t.href} className="card"><div className="ico" aria-hidden="true">{t.ico}</div><span className="tag">{t.tag}</span><h3>{t.title}</h3><p>{t.text}</p><span className="go">Open →</span></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <h2>Where borrowers get hurt</h2>
          <p className="sub">The problems behind most mortgage complaints — and the free fix for each.</p>
          <div className="grid">
            <Link href="/tools/penalty-calculator" className="card"><div className="k">$4k–25k</div><h3>Breaking a mortgage</h3><p>Typical Canadian fixed-rate penalties. Posted-rate IRD formulas can make them several times larger than three months&rsquo; interest.</p><span className="go">Estimate yours →</span></Link>
            <Link href="/tools/renewal-calculator" className="card"><div className="k">1.15M</div><h3>Renewal shock</h3><p>Canadian mortgages renewing in 2026. The renewal letter is an opening offer — and renewal is your penalty-free exit.</p><span className="go">See your new payment →</span></Link>
            <Link href="/tools/letter-generator" className="card"><div className="k">{share ? share + "%" : "50%+"}</div><h3>Servicer problems</h3><p>{share ? `Share of recent US mortgage complaints to the CFPB about "${top.name.toLowerCase()}" (live data).` : "Of US mortgage complaints involve the payment process."} A written Notice of Error forces a response.</p><span className="go">Build the letter →</span></Link>
            <Link href="/tools/equity-calculator" className="card"><div className="k">3 paths</div><h3>Using home equity</h3><p>A cash-out refi reprices your whole mortgage. A HELOC doesn&rsquo;t. The math decides which costs less.</p><span className="go">Price the paths →</span></Link>
          </div>
        </div>
      </section>

      <LeadBand />

      <section className="section alt">
        <div className="wrap">
          <div className="sec-head"><div><h2>Guides, explained straight</h2><p className="sub">Written for borrowers, sourced to the rules, updated when they change.</p></div><Link className="btn ghost" href="/guides">All {GUIDES.length} guides →</Link></div>
          <div className="grid three">
            {featured.map((g) => (
              <Link key={g.slug} href={"/guides/" + g.slug} className="card"><div><span className={"tag " + g.country.toLowerCase()}>{g.country === "ALL" ? "CA · US" : g.country}</span></div><h3>{g.title}</h3><p>{g.description}</p><span className="go">{g.minutes} min read →</span></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid two" style={{ alignItems: "start", gap: 40 }}>
          <div>
            <div className="sec-head" style={{ marginBottom: 12 }}><h2>Latest mortgage news</h2><Link href="/news">All news →</Link></div>
            {news.length ? (
              <ul className="list">{news.map((n) => <li key={n.link}><a href={n.link} target="_blank" rel="noopener noreferrer">{n.title}</a><div className="meta">{n.source} · {fmtDate(n.date)} · {n.region}</div></li>)}</ul>
            ) : <p className="muted">Headlines from the Bank of Canada, the Federal Reserve, the CFPB and trade press refresh daily.</p>}
          </div>
          <div>
            <div className="sec-head" style={{ marginBottom: 12 }}><h2>Watch &amp; learn</h2><Link href="/videos">Video library →</Link></div>
            <div style={{ display: "grid", gap: 14 }}>
              {vids.map((v) => <div key={v.id}><LiteYouTube id={v.id} title={v.title} /><p className="small" style={{ marginTop: 6 }}><strong>{v.title}</strong> <span className="muted">· {v.channel}</span></p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2>Why you can trust the answer</h2>
          <p className="sub">Three commitments, in force on every page and every conversation.</p>
          <div className="trust">
            <div><h3>The full answer comes first</h3><p>Exact numbers, the letter template, the do-it-yourself path. Talking to a professional is offered after, never required.</p></div>
            <div><h3>No one can pay for a recommendation</h3><p>Rankings and guidance are never for sale. Sponsorships are labelled. <Link href="/how-we-make-money">Our revenue model is public</Link>.</p></div>
            <div><h3>Your details go to one party, once</h3><p>If you ask to be connected, your information goes to one licensed professional — never auctioned or resold.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <h2>Quick answers</h2>
          {FAQ.slice(0, 5).map(([q, a]) => <details className="faq" key={q}><summary>{q}</summary><div>{a}</div></details>)}
          <p style={{ marginTop: 18 }}><Link href="/faq">More questions →</Link></p>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap grid three">
          <Link href="/contests" className="card"><div className="ico">🏆</div><h3>Test your Mortgage IQ</h3><p>Seven questions most borrowers get wrong. Contests with prizes are announced here.</p><span className="go">Play →</span></Link>
          <Link href="/support" className="card"><div className="ico">💚</div><h3>Keep the line free</h3><p>Support free tools, the AI helpline, expert contributors and outreach.</p><span className="go">Support us →</span></Link>
          <Link href="/careers" className="card"><div className="ico">🤝</div><h3>Join the team</h3><p>Licensed pros, writers, video creators and engineers — build the most trusted mortgage resource.</p><span className="go">See roles →</span></Link>
        </div>
      </section>
    </main>
  );
}
