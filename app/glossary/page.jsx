import { GLOSSARY } from "@/content/glossary";
import { GlossarySearch } from "@/components/Finders";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata = { title: "Mortgage Glossary — Plain-Language Definitions", description: `${GLOSSARY.length} mortgage and home loan terms defined in plain language — Canada, US and India.`, alternates: { canonical: "/glossary" } };

export default function Page() {
  const terms = [...GLOSSARY].sort((a, b) => a[0].localeCompare(b[0]));
  return (
    <main className="wrap narrow" style={{ paddingBottom: 60 }}>
      <div className="page-hd"><p className="eyebrow">A–Z</p><h1>Mortgage glossary</h1><p>The words lenders use, translated.</p></div>
      <GlossarySearch terms={terms} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Mortgage Helpline glossary", url: SITE.url + "/glossary", hasDefinedTerm: terms.map(([n, d]) => ({ "@type": "DefinedTerm", name: n, description: d })) }} />
    </main>
  );
}
