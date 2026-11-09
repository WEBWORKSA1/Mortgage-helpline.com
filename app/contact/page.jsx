import Link from "next/link";
import SmartForm from "@/components/SmartForm";
import { SITE } from "@/lib/site";

export const metadata = { title: "Contact Us", description: "Contact Mortgage Helpline — questions, corrections, privacy requests, partnerships.", alternates: { canonical: "/contact" } };

export default function Page() {
  return (
    <main>
      <div className="wrap page-hd"><h1>Contact us</h1><p>Questions about the site, corrections, privacy requests or partnership ideas — we read every message. For mortgage questions, the <Link href="/helpline">helpline</Link> answers instantly.</p></div>
      <section className="wrap article" style={{ paddingBottom: 50 }}>
        <SmartForm form="contact" submitLabel="Send message" successTitle="Message received." successText="Thanks for writing — we'll reply by email."
          fields={[{ name: "name", label: "Name", required: true, auto: "name" }, { name: "email", label: "Email", type: "email", required: true, auto: "email" },
            { name: "topic", label: "Topic", type: "select", options: ["General question", "Correction to a guide or tool", "Privacy / data request", "Lead or referral follow-up", "Press / media", "Partnership / advertising", "Website / domain inquiry", "Other"], full: true },
            { name: "message", label: "Message", type: "textarea", required: true }]} />
        <aside>
          <div className="toc"><h4>Other ways</h4>
            <p className="small"><Link href="/get-help">Get matched with a licensed pro</Link> — for help with your own mortgage.</p>
            <p className="small" style={{ marginTop: 8 }}><Link href="/advertise">Advertise &amp; partner</Link> — sponsorship inquiries.</p>
            <p className="small" style={{ marginTop: 8 }}>Interested in this website, domain name, sponsorship, advertisement or partnership? <a href={SITE.sponsorUrl} target="_blank" rel="noopener">Contact here</a>.</p>
            <p className="small" style={{ marginTop: 8 }}>We never ask for passwords, card numbers or upfront fees.</p></div>
        </aside>
      </section>
    </main>
  );
}
