import { unstable_cache } from "next/cache";
import snapshot from "@/data/live.json";
import { collectAll, templateBrief } from "./sources.mjs";
import { EVERGREEN } from "@/content/videos";

// Live data: fresh fetch (cached by Next for 12h) merged over the committed
// daily snapshot, so the site never shows empty or broken numbers.
export async function getLive() {
  let fresh = {};
  if (process.env.MH_OFFLINE !== "1") {
    try { fresh = await collectAll(); } catch { fresh = {}; }
  }
  const pick = (k) => (fresh[k] && (!Array.isArray(fresh[k]) || fresh[k].length) ? fresh[k] : snapshot[k]);
  const data = {
    ca: pick("ca"), us: pick("us"), complaints: pick("complaints"),
    news: pick("news") || [],
    videos: [...(pick("videos") || []), ...EVERGREEN].filter((v, i, a) => a.findIndex((x) => x.id === v.id) === i),
    updatedAt: fresh.ca || fresh.us ? new Date().toISOString() : snapshot.updatedAt,
  };
  const latestDate = data.us?.m30?.d || data.ca?.posted5?.d;
  const template = { text: templateBrief(data), ai: false, for: latestDate };
  if (snapshot.brief?.ai && snapshot.brief.for === latestDate) data.brief = snapshot.brief;
  else if (process.env.ANTHROPIC_API_KEY && process.env.MH_OFFLINE !== "1") {
    try { data.brief = (await aiBrief(latestDate, JSON.stringify(facts(data)))) || template; } catch { data.brief = template; }
  } else data.brief = template;
  return data;
}

const facts = (d) => ({ ca: { ...d.ca, history: undefined }, us: { ...d.us, history: undefined }, complaints: d.complaints, headlines: (d.news || []).slice(0, 8).map((n) => `${n.source}: ${n.title}`) });

// AI-written daily brief, grounded strictly in the fetched numbers. Cached per data date.
const aiBrief = unstable_cache(async (forDate, factsJson) => {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: process.env.BRIEF_MODEL || process.env.HELPLINE_MODEL || "claude-sonnet-5-5",
      max_tokens: 500,
      system: "You write the daily mortgage brief for mortgagehelpline.com, a neutral consumer-help site for Canada and the US. Use ONLY the numbers and headlines provided — never invent figures, forecasts or quotes. 110-160 words of plain prose in one or two short paragraphs, ending with one practical takeaway sentence for borrowers. No markdown, no headings, no advice to buy or sell anything, no hype.",
      messages: [{ role: "user", content: `Today's data (JSON): ${factsJson}` }],
    }),
    cache: "no-store",
  });
  if (!r.ok) return null;
  const j = await r.json();
  const text = j?.content?.map((c) => c.text || "").join("").trim();
  return text ? { text, ai: true, for: forDate } : null;
}, ["mh-brief-v1"], { revalidate: 43200 });

export const fmtPct = (v, dp = 2) => (v == null ? "—" : Number(v).toFixed(dp) + "%");
export const fmtDate = (d) => (d ? new Date(d.length === 10 ? d + "T12:00:00Z" : d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—");
