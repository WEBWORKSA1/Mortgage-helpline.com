import { SITE } from "@/lib/site";
import { GUIDES } from "@/content/guides";

const STATIC = ["", "/helpline", "/get-help", "/tools", "/tools/mortgage-calculator", "/tools/affordability-calculator", "/tools/renewal-calculator", "/tools/penalty-calculator",
  "/tools/refinance-calculator", "/tools/equity-calculator", "/tools/emi-calculator", "/tools/letter-generator", "/guides", "/rates", "/news", "/videos", "/glossary", "/faq",
  "/canada", "/usa", "/india", "/support", "/contests", "/careers", "/advertise", "/contact", "/about", "/how-we-make-money", "/editorial-policy", "/privacy", "/terms", "/disclaimer", "/legal"];

export default function sitemap() {
  const now = new Date();
  const daily = new Set(["", "/rates", "/news", "/videos"]);
  return [
    ...STATIC.map((p) => ({ url: SITE.url + p, lastModified: now, changeFrequency: daily.has(p) ? "daily" : "weekly", priority: p === "" ? 1 : p === "/get-help" || p === "/helpline" ? 0.9 : 0.7 })),
    ...GUIDES.map((g) => ({ url: `${SITE.url}/guides/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "monthly", priority: 0.8 })),
  ];
}
