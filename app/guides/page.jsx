import { GUIDES } from "@/content/guides";
import { GuideFinder } from "@/components/Finders";
import LeadBand from "@/components/LeadBand";

export const metadata = { title: "Mortgage Guides — Canada, USA & India", description: "Plain-language, sourced guides on renewals, penalties, refinancing, home equity, servicer errors, hardship, PMI, escrow and Indian home loans.", alternates: { canonical: "/guides" } };

export default function Page() {
  const list = GUIDES.map(({ body, sources, ...g }) => g);
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow">{GUIDES.length} guides · sourced to the rules</p><h1>Mortgage guides, explained straight</h1><p>Every guide names the rule behind the advice and links to the official source, so you can check it yourself.</p></div>
      <section className="wrap" style={{ paddingBottom: 30 }}><GuideFinder guides={list} /></section>
      <LeadBand />
    </main>
  );
}
