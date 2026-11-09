import Link from "next/link";
import { CONTESTS, QUIZ } from "@/content/community";
import { Quiz } from "@/components/Finders";
import SmartForm from "@/components/SmartForm";

export const metadata = { title: "Contests, Prizes & the Mortgage IQ Quiz", description: "Test your mortgage knowledge, enter skill-based contests for prizes, and sponsor a prize.", alternates: { canonical: "/contests" } };

export default function Page() {
  const open = CONTESTS.filter((c) => c.status === "open");
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow">Learn · play · win</p><h1>Contests &amp; the Mortgage IQ quiz</h1><p>Financial literacy beats fine print. Test yourself for free any time; skill-based contests with prizes are announced here.</p></div>
      <section className="wrap article" style={{ paddingBottom: 30 }}>
        <div>
          <h2 style={{ fontSize: "1.4rem", marginBottom: 14 }}>Mortgage IQ quiz</h2>
          <Quiz questions={QUIZ} />
          <h2 style={{ fontSize: "1.4rem", margin: "40px 0 14px" }}>{open.length ? "Open contests" : "Contests"}</h2>
          {open.length ? open.map((c) => (
            <div key={c.id} className="card" style={{ marginBottom: 18 }}>
              <h3 style={{ marginTop: 0 }}>{c.title}</h3>
              <p><strong>Prize:</strong> {c.prize} · <strong>Closes:</strong> {c.closes}</p>
              <p className="small">{c.how} {c.eligibility}</p>
              <div style={{ marginTop: 14 }}>
                <SmartForm form="contest" extra={{ contest: c.title }} submitLabel="Submit entry" successTitle="Entry received — good luck!" successText="Winners are contacted by email and must correctly answer the skill-testing question."
                  consent="I have read and agree to the official rules, I meet the eligibility requirements, and I consent to being contacted about this contest."
                  fields={[{ name: "name", label: "Full name", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "region", label: "Province / state", required: true }, { name: "answer", label: `Skill-testing question: ${c.skillQuestion}`, required: true }]} />
              </div>
            </div>
          )) : (
            <div className="card"><h3 style={{ marginTop: 0 }}>The next contest is being set up</h3><p>Leave your email to hear when it opens — or sponsor the prize.</p>
              <div style={{ marginTop: 14 }}><SmartForm form="newsletter" extra={{ list: "Contest alerts" }} submitLabel="Notify me" successTitle="You're on the list." successText="We'll email you when the next contest opens."
                fields={[{ name: "email", label: "Email", type: "email", required: true }, { name: "region", label: "Province / state / country" }]} /></div></div>
          )}
          <h2 id="sponsor" style={{ fontSize: "1.4rem", margin: "40px 0 14px" }}>Sponsor a prize</h2>
          <p className="muted" style={{ marginBottom: 14 }}>Fund a prize and get labelled recognition on the contest page. Sponsors never influence questions, answers or guidance.</p>
          <SmartForm form="sponsor" submitLabel="Offer a prize" successTitle="Thank you!" successText="We'll be in touch about your sponsorship."
            fields={[{ name: "company", label: "Company", required: true }, { name: "name", label: "Contact name", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "prize", label: "Prize & value" }, { name: "message", label: "Details", type: "textarea" }]} />
        </div>
        <aside>
          <div className="toc" id="rules"><h4>Official rules (summary)</h4>
            <p className="small">Each contest publishes full rules before opening. Standard terms:</p>
            <ul className="small" style={{ margin: "8px 0 0 16px", display: "grid", gap: 6 }}>
              <li><strong>No purchase necessary.</strong> A purchase does not improve your chances.</li>
              <li>Skill-based. Canadian winners must correctly answer a time-limited, mathematical skill-testing question.</li>
              <li>Open to legal residents of the stated regions who are the age of majority. Void where prohibited.</li>
              <li>One entry per person unless stated. Prizes are not transferable; no cash substitute unless stated.</li>
              <li>Winners are contacted by email and must reply within 7 days or an alternate may be selected.</li>
              <li>Québec residents: any litigation respecting the conduct or organization of a publicity contest may be submitted to the Régie des alcools, des courses et des jeux for a ruling.</li>
              <li>Personal information is used only to run the contest — see our <Link href="/privacy">privacy policy</Link>.</li>
              <li>Mortgage Helpline may modify or cancel a contest if it cannot run as planned, subject to applicable law.</li>
            </ul></div>
        </aside>
      </section>
    </main>
  );
}
