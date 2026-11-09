import Link from "next/link";

function inline(text, key) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={key + "b" + i++}>{t.slice(2, -2)}</strong>);
    else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/);
      out.push(href.startsWith("/")
        ? <Link key={key + "l" + i++} href={href}>{label}</Link>
        : <a key={key + "l" + i++} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function headings(md) {
  return md.split("\n").filter((l) => l.startsWith("## ")).map((l) => ({ text: l.slice(3), id: slugify(l.slice(3)) }));
}

export function Markdown({ source }) {
  // Line-based: headings, bullet/numbered lists, > callouts, paragraphs (blank line or block change ends a paragraph).
  const lines = source.trim().split("\n");
  const out = [];
  let i = 0, n = 0;
  const kind = (l) => (l.startsWith("## ") ? "h2" : l.startsWith("### ") ? "h3" : /^- /.test(l) ? "ul" : /^\d+\. /.test(l) ? "ol" : l.startsWith("> ") ? "q" : l.trim() === "" ? "blank" : "p");
  while (i < lines.length) {
    const l = lines[i], k = kind(l), key = "m" + n++;
    if (k === "blank") { i++; continue; }
    if (k === "h2") { out.push(<h2 key={key} id={slugify(l.slice(3))}>{inline(l.slice(3), key)}</h2>); i++; continue; }
    if (k === "h3") { out.push(<h3 key={key}>{inline(l.slice(4), key)}</h3>); i++; continue; }
    const group = [];
    while (i < lines.length && kind(lines[i]) === k) { group.push(lines[i]); i++; }
    if (k === "ul") out.push(<ul key={key}>{group.map((g, j) => <li key={j}>{inline(g.slice(2), key + j)}</li>)}</ul>);
    else if (k === "ol") out.push(<ol key={key}>{group.map((g, j) => <li key={j}>{inline(g.replace(/^\d+\. /, ""), key + j)}</li>)}</ol>);
    else if (k === "q") out.push(<div key={key} className="callout">{inline(group.map((g) => g.slice(2)).join(" "), key)}</div>);
    else out.push(<p key={key}>{inline(group.join(" "), key)}</p>);
  }
  return out;
}
