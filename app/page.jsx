import Link from "next/link";
import PulseLine from "@/components/PulseLine";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">The line is open · Canada &amp; USA</p>
          <h1>Straight answers for your mortgage.</h1>
          <p className="lede">
            Penalties, renewals, refinancing, home equity, servicing problems — get the
            complete answer first, free, with no email wall. If you then want a licensed
            professional, we&rsquo;ll connect you. That part is always your call.
          </p>
          <form className="askbar" action="/helpline" role="search">
            <input
              type="text"
              name="q"
              placeholder="Ask anything — the line answers in seconds"
              aria-label="Ask a mortgage question"
            />
            <button type="submit">Get help</button>
          </form>
          <div className="ask-hints">
            <Link href="/tools/penalty-calculator">Breaking my mortgage — what&rsquo;s the penalty?</Link>
            <Link href="/tools/renewal-calculator">My renewal is coming — what will I pay?</Link>
            <Link href="/how-we-make-money">Is this site actually unbiased?</Link>
          </div>
        </div>
        <PulseLine />
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2>What people call about</h2>
          <p className="sub">
            These are the four problems behind most mortgage complaints in North America.
            Each one has a free tool or guide — the full answer, before anyone asks who you are.
          </p>
          <div className="grid">
            <div className="card">
              <div className="k">$4k–25k</div>
              <h3>Breaking a mortgage</h3>
              <p>
                Fixed-rate penalties in Canada are routinely miscalculated in borrowers&rsquo;
                heads. Big-bank IRD math can be several times the three-month method — and a
                little-known federal cap may apply after year five.
              </p>
              <Link className="go" href="/tools/penalty-calculator">Estimate your penalty →</Link>
            </div>
            <div className="card">
              <div className="k">1.15M</div>
              <h3>Renewal shock</h3>
              <p>
                Over a million Canadian mortgages renew in 2026, most set at pandemic-era
                rates. Your lender&rsquo;s renewal letter is an opening offer, not the final word.
              </p>
              <Link className="go" href="/tools/renewal-calculator">See your new payment →</Link>
            </div>
            <div className="card">
              <div className="k">$11T</div>
              <h3>Using home equity</h3>
              <p>
                US homeowners sit on over eleven trillion dollars of tappable equity. HELOC,
                second mortgage, or cash-out refi — the right choice depends on your first
                mortgage rate, and sometimes the right answer is none of them.
              </p>
              <span className="go" style={{ color: "var(--muted)" }}>Guide coming soon</span>
            </div>
            <div className="card">
              <div className="k">50%+</div>
              <h3>Servicer problems</h3>
              <p>
                Over half of US mortgage complaints are about the payment process itself —
                misapplied payments, escrow errors, no one answering. Federal rules give you
                letters that force a written response.
              </p>
              <span className="go" style={{ color: "var(--muted)" }}>Guide coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Why you can trust the answer</h2>
          <p className="sub">Three commitments, in force on every page and every conversation.</p>
          <div className="trust">
            <div>
              <h3>The full answer comes first</h3>
              <p>
                Exact numbers, the letter template, the do-it-yourself path. Nothing is held
                back to make you fill in a form. Talking to a professional is offered after,
                never required.
              </p>
            </div>
            <div>
              <h3>No one can pay for a recommendation</h3>
              <p>
                Rankings and guidance are never for sale. Anything sponsored is labelled in
                plain sight. Our revenue model is public — read it any time.
              </p>
            </div>
            <div>
              <h3>Your details go to one party, once</h3>
              <p>
                If you ask to be connected, your information goes to a single licensed
                professional you approved. It is never auctioned or resold.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
