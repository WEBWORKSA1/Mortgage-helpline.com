import { ROLES } from "@/content/community";
import SmartForm from "@/components/SmartForm";

export const metadata = { title: "Careers & Talent Network", description: "Join Mortgage Helpline: licensed mortgage professionals, writers, video creators, engineers and growth partners.", alternates: { canonical: "/careers" } };

export default function Page() {
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow">We&rsquo;re hiring talent</p><h1>Help build the most trusted mortgage resource</h1><p>We work with people who put borrowers first. Remote-friendly, across Canada, the US and India.</p></div>
      <section className="wrap" style={{ paddingBottom: 30 }}>
        <div className="grid two">
          {ROLES.map((r) => <div key={r.id} className="card"><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><span className="tag">{r.type}</span><span className="tag">{r.where}</span></div><h3>{r.title}</h3><p>{r.text}</p></div>)}
        </div>
        <h2 style={{ fontSize: "1.5rem", margin: "44px 0 14px" }}>Apply or join the talent network</h2>
        <div style={{ maxWidth: 760 }}>
          <SmartForm form="careers" submitLabel="Send application" successTitle="Application received." successText="Thank you. If there's a fit, we'll reach out by email."
            consent="I consent to Mortgage Helpline storing my application to consider me for current and future roles."
            fields={[{ name: "name", label: "Full name", required: true, auto: "name" }, { name: "email", label: "Email", type: "email", required: true, auto: "email" },
              { name: "role", label: "Role", type: "select", options: ROLES.map((r) => r.title), required: true }, { name: "location", label: "City, province/state, country" },
              { name: "portfolio", label: "LinkedIn, résumé or portfolio link", placeholder: "https://" }, { name: "licence", label: "Licence # and regulator (if licensed)" },
              { name: "message", label: "Why you, in a few sentences", type: "textarea" }]} />
        </div>
      </section>
    </main>
  );
}
