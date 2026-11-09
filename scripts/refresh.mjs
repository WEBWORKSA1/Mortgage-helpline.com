// Daily refresh — run by .github/workflows/daily-refresh.yml (or `npm run refresh`).
// Pulls live rates, complaints, news and videos, writes data/live.json, and
// (if ANTHROPIC_API_KEY is set) has Claude write a short, numbers-grounded brief.
import { readFile, writeFile } from "node:fs/promises";
import { collectAll, templateBrief } from "../lib/sources.mjs";

const path = new URL("../data/live.json", import.meta.url);
const prev = JSON.parse(await readFile(path, "utf8"));
const fresh = await collectAll();
const keep = (k) => (fresh[k] && (!Array.isArray(fresh[k]) || fresh[k].length) ? fresh[k] : prev[k]);
const data = {
  updatedAt: new Date().toISOString(),
  ca: keep("ca"), us: keep("us"), complaints: keep("complaints"), news: keep("news"), videos: keep("videos"),
};
const forDate = data.us?.m30?.d || data.ca?.posted5?.d;
let brief = { text: templateBrief(data), ai: false, for: forDate };

if (process.env.ANTHROPIC_API_KEY) {
  try {
    const facts = JSON.stringify({ ca: { ...data.ca, history: undefined }, us: { ...data.us, history: undefined }, complaints: data.complaints, headlines: (data.news || []).slice(0, 8).map((n) => `${n.source}: ${n.title}`) });
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.BRIEF_MODEL || "claude-sonnet-5-5",
        max_tokens: 500,
        system: "You write the daily mortgage brief for mortgagehelpline.com, a neutral consumer-help site for Canada and the US. Use ONLY the numbers and headlines provided — never invent figures, forecasts or quotes. 120-170 words, plain language, two short paragraphs, then one practical takeaway sentence for borrowers. No advice to buy or sell anything; no hype.",
        messages: [{ role: "user", content: `Today's data (JSON): ${facts}` }],
      }),
    });
    const j = await r.json();
    const text = j?.content?.map((c) => c.text || "").join("").trim();
    if (r.ok && text) brief = { text, ai: true, for: forDate };
  } catch (e) {
    console.warn("AI brief skipped:", e.message);
  }
}
data.brief = brief;

await writeFile(path, JSON.stringify(data, null, 2) + "\n");
console.log("Refreshed:", { ca: !!fresh.ca, us: !!fresh.us, complaints: !!fresh.complaints, news: fresh.news?.length, videos: fresh.videos?.length, ai: brief.ai });
