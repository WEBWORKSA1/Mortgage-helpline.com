"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem("mh-consent")) setShow(true); } catch { /* storage blocked */ }
  }, []);
  const choose = (v) => {
    try { localStorage.setItem("mh-consent", v); } catch {}
    setShow(false);
    if (v === "essential") window.location.reload();
  };
  if (!show) return null;
  return (
    <div className="consent" role="dialog" aria-label="Cookie choices">
      <strong>Your privacy, your call.</strong> We use essential storage to run the site, and Google AdSense uses cookies to
      show ads that keep this help free. Choose personalized ads or non-personalized ads only. <Link href="/privacy">Privacy policy</Link>.
      <div className="btns">
        <button className="btn gold" onClick={() => choose("all")}>Accept all</button>
        <button className="btn ghost" onClick={() => choose("essential")}>Non-personalized ads only</button>
      </div>
    </div>
  );
}
