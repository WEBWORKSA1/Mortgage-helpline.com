import { getLive, fmtDate } from "@/lib/live";
import LeadBand from "@/components/LeadBand";

export const revalidate = 43200;
export const metadata = { title: "Mortgage News — Canada & US (Updated Daily)", description: "Daily mortgage and housing headlines from the Bank of Canada, the Federal Reserve, the CFPB and trade press — with links to the original sources.", alternates: { canonical: "/news" } };

export default async function Page() {
  const live = await getLive();
  const news = live.news || [];
  const col = (r) => news.filter((n) => n.region === r);
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow"><span className="live" />Refreshed daily</p><h1>Mortgage &amp; housing news</h1><p>Headlines from central banks, regulators and trade publications. Click through to read each story at its source.</p></div>
      <section className="wrap grid two" style={{ alignItems: "start", gap: 40, paddingBottom: 40 }}>
        {[["CA", "Canada"], ["US", "United States"]].map(([r, l]) => (
          <div key={r}><h2 style={{ fontSize: "1.4rem" }}>{l}</h2>
            {col(r).length ? <ul className="list">{col(r).slice(0, 20).map((n) => <li key={n.link}><a href={n.link} target="_blank" rel="noopener noreferrer">{n.title}</a><div className="meta">{n.source} · {fmtDate(n.date)}</div></li>)}</ul>
              : <p className="muted">Headlines load automatically from official and trade feeds.</p>}
          </div>
        ))}
      </section>
      <p className="wrap small muted" style={{ paddingBottom: 20 }}>Headlines and links belong to their publishers. Mortgage Helpline is not affiliated with these sources. Sources: Bank of Canada, Canadian Mortgage Trends, Federal Reserve Board, CFPB, HousingWire.</p>
      <LeadBand />
    </main>
  );
}
