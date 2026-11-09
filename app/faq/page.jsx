import Link from "next/link";
import { FAQ } from "@/content/faq";
import JsonLd from "@/components/JsonLd";

export const metadata = { title: "Frequently Asked Questions", description: "How Mortgage Helpline works, how we make money, your privacy, and quick answers to common mortgage questions.", alternates: { canonical: "/faq" } };

export default function Page() {
  return (
    <main className="wrap narrow" style={{ paddingBottom: 60 }}>
      <div className="page-hd"><h1>Frequently asked questions</h1><p>Don&rsquo;t see yours? <Link href="/helpline">Ask the helpline</Link> or <Link href="/contact">contact us</Link>.</p></div>
      {FAQ.map(([q, a]) => <details className="faq" key={q}><summary>{q}</summary><div>{a}</div></details>)}
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
    </main>
  );
}
