"use client";
import { useEffect, useRef, useState } from "react";

const STARTERS = [
  "What will breaking my mortgage cost?",
  "My renewal offer looks high — what can I do?",
  "HELOC vs cash-out refi — which fits my situation?",
  "My servicer misapplied a payment. What are my rights?",
];

export default function Helpline({ initialQuestion = "" }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(initialQuestion);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);
  const sentInitial = useRef(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  useEffect(() => {
    if (initialQuestion && !sentInitial.current) {
      sentInitial.current = true;
      send(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    setError("");
    setInput("");
    const next = [...messages, { role: "user", content: q }];
    setMessages(next);
    setBusy(true);

    try {
      const res = await fetch("/api/helpline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "The line is busy. Please try again.");
      }

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch (e) {
      setError(e.message);
      setMessages((m) => (m[m.length - 1]?.role === "assistant" && !m[m.length - 1].content
        ? m.slice(0, -1) : m));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="hl">
      {messages.length === 0 && (
        <div className="hl-empty">
          <p className="hl-hello">
            Ask anything about a residential mortgage in Canada or the US. Full answer,
            free, nothing required from you.
          </p>
          <div className="hl-starters">
            {STARTERS.map((s) => (
              <button key={s} type="button" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        </div>
      )}

      <div className="hl-thread" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "hl-msg u" : "hl-msg a"}>
            {m.role === "assistant" && <span className="hl-dot" aria-hidden="true" />}
            <div className="hl-bubble">{m.content || (busy && i === messages.length - 1 ? "…" : "")}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {error && <p className="hl-err" role="alert">{error}</p>}

      <form
        className="askbar hl-bar"
        onSubmit={(e) => { e.preventDefault(); send(); }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your mortgage question…"
          aria-label="Ask your mortgage question"
          disabled={busy}
        />
        <button type="submit" disabled={busy}>{busy ? "On the line…" : "Ask"}</button>
      </form>

      <p className="hl-fine">
        Educational information, not financial, legal, or tax advice. Figures are estimates —
        confirm exact amounts with your lender in writing. Nothing you type here is used to
        contact you.
      </p>
    </div>
  );
}
