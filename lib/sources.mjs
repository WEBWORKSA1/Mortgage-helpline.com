// Shared live-data collectors. Used by the Next.js app (ISR, every 12h) and by
// scripts/refresh.mjs (GitHub Action, daily). Every source fails soft.

const UA = "MortgageHelplineBot/1.0 (+https://www.mortgagehelpline.com/about)";
const REVALIDATE = 43200;

async function get(url, ms = 9000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": UA }, next: { revalidate: REVALIDATE } });
    if (!r.ok) throw new Error(url + " " + r.status);
    return await r.text();
  } finally {
    clearTimeout(t);
  }
}

const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
const num = (v) => (v === undefined || v === null || v === "" || v === "." ? null : Number(v));

// ---------- Canada: Bank of Canada Valet API ----------
export async function bankOfCanada() {
  const ids = { policy: "V39079", prime: "V80691311", posted5: "V80691335", posted3: "V80691334", posted1: "V80691333" };
  const url = `https://www.bankofcanada.ca/valet/observations/${Object.values(ids).join(",")}/json?start_date=${daysAgo(400)}`;
  const j = JSON.parse(await get(url));
  const series = {};
  for (const [k, id] of Object.entries(ids)) {
    series[k] = j.observations
      .filter((o) => o[id] && o[id].v !== undefined && o[id].v !== "")
      .map((o) => [o.d, Number(o[id].v)])
      .sort((a, b) => (a[0] < b[0] ? -1 : 1));
  }
  const latest = (k) => series[k].at(-1);
  const prevDifferent = (k) => {
    const s = series[k]; const cur = s.at(-1)?.[1];
    for (let i = s.length - 2; i >= 0; i--) if (s[i][1] !== cur) return { v: s[i][1], d: s[i][0], changedOn: s[i + 1][0] };
    return null;
  };
  const out = {};
  for (const k of Object.keys(ids)) {
    const l = latest(k);
    if (l) out[k] = { d: l[0], v: l[1], prev: prevDifferent(k) };
  }
  out.history = { posted5: weekly(series.posted5), prime: weekly(series.prime), policy: weekly(series.policy) };
  return out;
}

function weekly(s) {
  // Downsample to one point per ISO week (last value), max 56 points.
  const m = new Map();
  for (const [d, v] of s) {
    const dt = new Date(d + "T00:00:00Z");
    const wk = new Date(dt - ((dt.getUTCDay() + 6) % 7) * 864e5).toISOString().slice(0, 10);
    m.set(wk, [d, v]);
  }
  return [...m.values()].slice(-56);
}

// ---------- USA: Freddie Mac PMMS via FRED (no key needed) + Fed target ----------
async function fredCsv(ids, start) {
  const csv = await get(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${ids.join(",")}&cosd=${start}`);
  const rows = csv.trim().split(/\r?\n/).map((l) => l.split(","));
  const head = rows.shift();
  return ids.map((id) => {
    const col = head.indexOf(id);
    return rows.map((r) => [r[0], num(r[col])]).filter((r) => r[1] !== null && !Number.isNaN(r[1]));
  });
}

export async function usRates() {
  const [m30, m15] = await fredCsv(["MORTGAGE30US", "MORTGAGE15US"], daysAgo(400));
  let fed = [];
  try { [fed] = await fredCsv(["DFEDTARU"], daysAgo(400)); } catch {}
  const pack = (s) => {
    const l = s.at(-1), p = s.at(-2), y = s.find((r) => r[0] >= daysAgo(372));
    return l ? { d: l[0], v: l[1], weekAgo: p ? p[1] : null, yearAgo: y ? y[1] : null } : null;
  };
  const f = fed.at(-1);
  let fedPrev = null;
  for (let i = fed.length - 2; i >= 0; i--) if (fed[i][1] !== f?.[1]) { fedPrev = { v: fed[i][1], changedOn: fed[i + 1][0] }; break; }
  return {
    m30: pack(m30), m15: pack(m15),
    fedUpper: f ? { d: f[0], v: f[1], prev: fedPrev } : null,
    history: { m30: m30.slice(-56), m15: m15.slice(-56) },
  };
}

// ---------- USA: CFPB consumer complaint database (mortgage, last 30 days) ----------
export async function cfpbComplaints() {
  const since = daysAgo(30);
  const j = JSON.parse(await get(`https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/?product=Mortgage&size=0&date_received_min=${since}`));
  const buckets = j?.aggregations?.issue?.issue?.buckets || [];
  return {
    since,
    total: j?.hits?.total?.value ?? null,
    issues: buckets.slice(0, 6).map((b) => ({ name: b.key, count: b.doc_count })),
  };
}

// ---------- News: official + trade RSS feeds (headline + link only) ----------
export const FEEDS = [
  { url: "https://www.bankofcanada.ca/content_type/press-releases/feed/", source: "Bank of Canada", region: "CA", all: true },
  { url: "https://www.canadianmortgagetrends.com/feed/", source: "Canadian Mortgage Trends", region: "CA", all: true },
  { url: "https://www.federalreserve.gov/feeds/press_monetary.xml", source: "Federal Reserve", region: "US", all: true },
  { url: "https://www.consumerfinance.gov/about-us/newsroom/feed/", source: "CFPB", region: "US" },
  { url: "https://www.housingwire.com/feed/", source: "HousingWire", region: "US" },
];
const KEYWORDS = /mortgage|housing|home|rate|renew|lend|loan|refinanc|foreclos|equity|real estate|inflation|fomc|monetary|servic|borrow|afford/i;

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  if (!m) return "";
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&#8216;/g, "‘").replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&#8211;/g, "–").replace(/&#8212;/g, "—").replace(/&#039;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}

export async function news() {
  const results = await Promise.allSettled(FEEDS.map(async (f) => {
    const xml = await get(f.url);
    const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
    return items.slice(0, 20).map((it) => {
      const title = tag(it, "title");
      const link = tag(it, "link") || (it.match(/rdf:about="([^"]+)"/) || [])[1] || "";
      const date = new Date(tag(it, "pubDate") || tag(it, "dc:date") || Date.now());
      return { title, link, source: f.source, region: f.region, date: isNaN(date) ? null : date.toISOString(), keep: f.all || KEYWORDS.test(title) };
    }).filter((x) => x.title && x.link.startsWith("http") && x.keep);
  }));
  const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  const seen = new Set();
  return all
    .filter((x) => (seen.has(x.link) ? false : seen.add(x.link)))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 40)
    .map(({ keep, ...x }) => x);
}

// ---------- Videos: latest uploads from official channels (YouTube RSS) ----------
export const CHANNELS = [
  { handle: "cfpbvideo", name: "CFPB", filter: true },
  { handle: "federalreserve", name: "Federal Reserve", filter: true },
  { handle: "BankofCanadaofficial", name: "Bank of Canada", filter: true },
  { handle: "FCACan", name: "Financial Consumer Agency of Canada", filter: true },
  { handle: "CMHCca", name: "CMHC", filter: true },
];

export async function videos() {
  const results = await Promise.allSettled(CHANNELS.map(async (c) => {
    let id = c.id;
    for (const path of ["@" + c.handle, "user/" + c.handle, "c/" + c.handle]) {
      if (id) break;
      try {
        const html = await get(`https://www.youtube.com/${path}`);
        id = (html.match(/"externalId":"(UC[\w-]{22})"/) || html.match(/"channelId":"(UC[\w-]{22})"/) || html.match(/channel\/(UC[\w-]{22})/) || [])[1];
      } catch {}
    }
    if (!id) return [];
    const xml = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`);
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
    return entries.map((e) => ({
      id: tag(e, "yt:videoId"), title: tag(e, "title"), channel: c.name, date: tag(e, "published"),
    })).filter((v) => v.id && (!c.filter || KEYWORDS.test(v.title)));
  }));
  const seen = new Set();
  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((v) => (seen.has(v.id) ? false : seen.add(v.id)))
    .sort((a, b) => b.date.localeCompare(a.date)).slice(0, 18);
}

// ---------- Daily brief (deterministic; the GitHub Action may replace it with an AI-written one) ----------
const pct = (v) => (v == null ? "—" : v.toFixed(2) + "%");
export function templateBrief(d) {
  const parts = [];
  const us = d.us || {}, ca = d.ca || {};
  if (us.m30) {
    const ch = us.m30.weekAgo != null ? us.m30.v - us.m30.weekAgo : null;
    parts.push(`US: Freddie Mac's 30-year fixed average is ${pct(us.m30.v)} (week of ${us.m30.d})${ch != null ? `, ${ch === 0 ? "unchanged" : (ch > 0 ? "up " : "down ") + Math.abs(ch).toFixed(2) + " points"} from the prior week` : ""}${us.m30.yearAgo != null ? ` and ${us.m30.v > us.m30.yearAgo ? "above" : "below"} the ${pct(us.m30.yearAgo)} of a year ago` : ""}. The 15-year averages ${pct(us.m15?.v)}.`);
  }
  if (ca.policy) {
    parts.push(`Canada: the Bank of Canada's policy rate is ${pct(ca.policy.v)}${ca.policy.prev ? ` (changed from ${pct(ca.policy.prev.v)} on ${ca.policy.prev.changedOn})` : ""}; big-bank prime is ${pct(ca.prime?.v)} and the 5-year posted fixed rate is ${pct(ca.posted5?.v)}. Posted rates are not what most borrowers pay — they matter because many lenders use them to calculate prepayment penalties.`);
  }
  if (d.complaints?.total) {
    const top = d.complaints.issues?.[0];
    parts.push(`Consumers filed ${d.complaints.total.toLocaleString("en-US")} mortgage complaints with the CFPB since ${d.complaints.since}${top ? `; the most common issue was "${top.name.toLowerCase()}" (${Math.round((top.count / d.complaints.total) * 100)}%)` : ""}.`);
  }
  parts.push("What it means for you: if a renewal, refinance or rate lock is within 120 days, compare at least three written offers — the spread between lenders is routinely larger than a week's market move.");
  return parts.join(" ");
}

export async function collectAll() {
  const [ca, us, complaints, newsItems, vids] = await Promise.allSettled([bankOfCanada(), usRates(), cfpbComplaints(), news(), videos()]);
  const v = (r) => (r.status === "fulfilled" ? r.value : null);
  return { ca: v(ca), us: v(us), complaints: v(complaints), news: v(newsItems), videos: v(vids) };
}
