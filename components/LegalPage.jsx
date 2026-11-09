import { Markdown } from "@/lib/md";
export default function LegalPage({ title, updated = "November 9, 2026", source, children }) {
  return (
    <main className="wrap" style={{ paddingBottom: 40 }}>
      <div className="page-hd"><h1>{title}</h1><p className="small muted">Last updated {updated}</p></div>
      <div className="prose"><Markdown source={source} />{children}</div>
    </main>
  );
}
