import { getLive, fmtDate } from "@/lib/live";
import LiteYouTube from "@/components/LiteYouTube";
import LeadBand from "@/components/LeadBand";
import { TOPIC_SEARCHES } from "@/content/videos";
import { SITE } from "@/lib/site";

export const revalidate = 43200;
export const metadata = { title: "Mortgage Video Library", description: "Mortgage explainers from official sources — forbearance, renewals, penalties, refinancing and more — refreshed daily.", alternates: { canonical: "/videos" } };

export default async function Page() {
  const live = await getLive();
  const vids = live.videos || [];
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow">Watch &amp; learn</p><h1>Mortgage video library</h1><p>Short explainers from regulators and central banks, refreshed automatically as new videos are published.</p>
        {SITE.youtubeChannelUrl && <div className="hero-cta"><a className="btn" href={SITE.youtubeChannelUrl} target="_blank" rel="noopener">Subscribe on YouTube</a></div>}</div>
      <section className="wrap" style={{ paddingBottom: 30 }}>
        <div className="grid three">
          {vids.map((v) => <div key={v.id}><LiteYouTube id={v.id} title={v.title} /><p style={{ marginTop: 8 }}><strong>{v.title}</strong></p><p className="small muted">{v.channel} · {fmtDate(v.date)}</p></div>)}
        </div>
        <h2 style={{ fontSize: "1.4rem", margin: "40px 0 14px" }}>Explore by topic</h2>
        <div className="chips">{TOPIC_SEARCHES.map(([l, q]) => <a key={l} href={"https://www.youtube.com/results?search_query=" + encodeURIComponent(q)} target="_blank" rel="noopener noreferrer">▶ {l}</a>)}</div>
        <p className="small muted" style={{ marginTop: 16 }}>Videos are hosted by YouTube and belong to their creators. Embeds load only when you press play (privacy-enhanced mode).</p>
      </section>
      <LeadBand />
    </main>
  );
}
