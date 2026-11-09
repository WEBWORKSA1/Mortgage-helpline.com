"use client";
import { useState } from "react";

export default function LiteYouTube({ id, title }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <div className="yt">
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  return (
    <button className="yt" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
      onClick={() => setOn(true)} aria-label={`Play video: ${title}`}>
      <span className="play" />
    </button>
  );
}
