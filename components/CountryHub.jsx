import Link from "next/link";
import { guidesFor } from "@/content/guides";
import { TOOLS } from "@/content/tools";
import LeadBand from "./LeadBand";

export default function CountryHub({ code, name, intro, tools, help, extra }) {
  const guides = guidesFor(code);
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow">{name}</p><h1>Mortgage help for {name}</h1><p>{intro}</p></div>
      <section className="wrap" style={{ paddingBottom: 20 }}>
        <h2 style={{ fontSize: "1.4rem", marginBottom: 14 }}>Tools</h2>
        <div className="grid">{tools.map((h) => TOOLS.find((t) => t.href === h)).filter(Boolean).map((t) => <Link key={t.href} href={t.href} className="card"><div className="ico">{t.ico}</div><h3>{t.title}</h3><p>{t.text}</p></Link>)}</div>
        <h2 style={{ fontSize: "1.4rem", margin: "40px 0 14px" }}>Guides</h2>
        <div className="grid three">{guides.map((g) => <Link key={g.slug} href={"/guides/" + g.slug} className="card"><span className="tag">{g.topic}</span><h3>{g.title}</h3><p>{g.description}</p></Link>)}</div>
        {extra}
        <div className="card" style={{ marginTop: 30 }}><h3 style={{ marginTop: 0 }}>Free official help</h3><ul className="list">{help.map(([l, u]) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{l}</a></li>)}</ul></div>
      </section>
      <LeadBand />
    </main>
  );
}
