import Link from "next/link";
import { Markdown } from "@/lib/md";
import { getGuide } from "@/content/guides";
import LeadBand from "./LeadBand";
import AdSlot from "./AdSlot";
import JsonLd from "./JsonLd";
import { SITE } from "@/lib/site";

export default function ToolShell({ title, intro, children, about, related = [], need = "", path }) {
  const guides = related.map(getGuide).filter(Boolean);
  return (
    <main>
      <div className="wrap tool-hd">
        <p className="crumbs"><Link href="/">Home</Link> / <Link href="/tools">Tools</Link></p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {children}
      <div className="wrap">
        <AdSlot />
        <div className="article" style={{ paddingTop: 10 }}>
          <div className="prose">{about && <Markdown source={about} />}</div>
          {!!guides.length && (
            <aside><div className="toc"><h4>Read next</h4>{guides.map((g) => <Link key={g.slug} href={"/guides/" + g.slug}>{g.title}</Link>)}</div></aside>
          )}
        </div>
      </div>
      <LeadBand need={need} />
      {path && <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: title, url: SITE.url + path, applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: SITE.name } }} />}
    </main>
  );
}
