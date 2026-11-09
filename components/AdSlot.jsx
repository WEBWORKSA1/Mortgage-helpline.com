"use client";
import { useEffect } from "react";
import { SITE } from "@/lib/site";

// Manual ad unit. Renders nothing unless a slot id is configured
// (NEXT_PUBLIC_ADSENSE_SLOT); Auto ads handle placement otherwise.
const SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT || "";

export default function AdSlot({ slot = SLOT }) {
  useEffect(() => {
    if (!slot) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, [slot]);
  if (!slot) return null;
  return (
    <div className="ad-slot">
      <div className="lbl">Advertisement</div>
      <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={SITE.adsenseClient}
        data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    </div>
  );
}
