"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef(null);
  const path = usePathname();

  useEffect(() => { setOpen(null); setMobile(false); }, [path]);
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    const esc = (e) => { if (e.key === "Escape") { setOpen(null); setMobile(false); } };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, []);

  return (
    <header className="hdr" ref={ref}>
      <div className="wrap hdr-in">
        <Link href="/" className="brand" aria-label="Mortgage Helpline home">
          <span className="brand-dot" aria-hidden="true" />Mortgage&nbsp;Helpline
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/helpline">Ask the Helpline</Link>
          {NAV.map((g) => (
            <div key={g.label} className={"dd" + (open === g.label ? " open" : "")}>
              <button type="button" aria-expanded={open === g.label} onClick={() => setOpen(open === g.label ? null : g.label)}>{g.label}</button>
              <div className="dd-menu">
                {g.items.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
              </div>
            </div>
          ))}
          <Link className="btn" href="/get-help">Get matched free</Link>
        </nav>
        <button className="burger" type="button" aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <span /><span /><span />
        </button>
      </div>
      <div className={"mnav" + (mobile ? " open" : "")}>
        <Link href="/helpline">Ask the Helpline</Link>
        {NAV.map((g) => (
          <div key={g.label}>
            <h4>{g.label}</h4>
            {g.items.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
          </div>
        ))}
        <Link className="btn" href="/get-help">Get matched with a licensed pro — free</Link>
      </div>
    </header>
  );
}
