import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide, AUTHOR } from "@/content/guides";
import { Markdown, headings } from "@/lib/md";
import { TOOLS } from "@/content/tools";
import LeadBand from "@/components/LeadBand";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { fmtDate } from "@/lib/live";

export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map((g) => ({ slug: g.slug })); }

export function generateMetadata({ params }) {
  const g = getGuide(params.slug);
  if (!g) return {};
  return { title: g.title, description: g.description, alternates: { canonical: "/guides/" + g.slug },
    openGraph: { type: "article", title: g.title, description: g.description, modifiedTime: g.updated } };
}

const NEED = { Renewal: "renewal", Penalties: "penalty", Refinancing: "refinance", "Home equity": "equity", Buying: "purchase", Hardship: "hardship", "Servicer problems": "servicer" };

export default function Page({ params }) {
  const g = getGuide(params.slug);
  if (!g) notFound();
  const toc = headings(g.body);
  const tools = g.tools.map((h) => TOOLS.find((t) => t.href === h)).filter(Boolean);
  const more = GUIDES.filter((x) => x.slug !== g.slug && (x.country === g.country || x.topic === g.topic)).slice(0, 4);
  const country = { CA: ["Canada", "/canada"], US: ["United States", "/usa"], IN: ["India", "/india"] }[g.country];
  return (
    <main className="wrap">
      <div className="page-hd" style={{ paddingBottom: 0 }}>
        <p className="crumbs"><Link href="/">Home</Link> / <Link href="/guides">Guides</Link>{country && <> / <Link href={country[1]}>{country[0]}</Link></>}</p>
        <span className={"tag " + g.country.toLowerCase()}>{g.country === "ALL" ? "Canada · US" : g.country}</span> <span className="tag">{g.topic}</span>
        <h1 style={{ marginTop: 12 }}>{g.title}</h1>
        <p>{g.description}</p>
        <div className="byline"><span>By {AUTHOR}</span><span>Updated {fmtDate(g.updated)}</span><span>{g.minutes} min read</span><Link href="/editorial-policy">Editorial policy</Link></div>
      </div>
      <div className="article">
        <article className="prose">
          <Markdown source={g.body} />
          <AdSlot />
          {!!g.sources.length && (<><h2 id="sources">Sources</h2><ul>{g.sources.map(([l, u]) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{l}</a></li>)}</ul></>)}
          <p className="small muted">Educational information, not financial, legal or tax advice. Rules and figures change — confirm with the official source or a licensed professional before acting.</p>
        </article>
        <aside>
          <div className="toc"><h4>On this page</h4>{toc.map((h) => <a key={h.id} href={"#" + h.id}>{h.text}</a>)}</div>
          {!!tools.length && <div className="toc" style={{ marginTop: 14 }}><h4>Run your numbers</h4>{tools.map((t) => <Link key={t.href} href={t.href}>{t.ico} {t.title}</Link>)}</div>}
          <div className="toc" style={{ marginTop: 14, background: "var(--ink)", color: "#e9f3ee", borderColor: "var(--ink)" }}>
            <h4 style={{ color: "var(--pulse)" }}>Still stuck?</h4>
            <p className="small" style={{ marginBottom: 10 }}>Ask the helpline, or get matched with one licensed pro — free.</p>
            <Link className="btn gold" style={{ width: "100%", color: "var(--ink)" }} href={"/get-help?need=" + (NEED[g.topic] || "other")}>Get matched free</Link>
            <Link href="/helpline" style={{ color: "#fff", marginTop: 8, textAlign: "center" }}>Ask the AI helpline →</Link>
          </div>
        </aside>
      </div>
      {!!more.length && (
        <section style={{ padding: "20px 0 10px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16 }}>Related guides</h2>
          <div className="grid">{more.map((m) => <Link key={m.slug} href={"/guides/" + m.slug} className="card"><h3>{m.title}</h3><p>{m.description}</p></Link>)}</div>
        </section>
      )}
      <LeadBand need={NEED[g.topic] || ""} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, dateModified: g.updated, datePublished: g.updated,
        author: { "@type": "Organization", name: AUTHOR }, publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: SITE.url + "/icon.svg" } },
        mainEntityOfPage: SITE.url + "/guides/" + g.slug }} />
    </main>
  );
}
