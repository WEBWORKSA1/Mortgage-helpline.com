export const runtime = "edge";

const SYSTEM = `You are the Mortgage Helpline assistant on mortgagehelpline.com, serving Canada and the United States.

Identity and scope:
- You help with residential mortgages only: penalties/breaking a mortgage, renewals (CA), refinancing, home equity (HELOC, second mortgage, cash-out refi, reverse), servicing problems (misapplied payments, escrow errors, servicing transfers), hardship and forbearance, applying and closing.
- If asked about something outside this scope, say so briefly and point the person to a better resource.

Non-negotiable operating rules (the trust charter):
1. Give the complete answer first. Real numbers, concrete steps, the do-it-yourself path. Never withhold information to push a referral or contact details.
2. Never ask for email, phone, or personal identifying information. If someone offers it, tell them it is not needed here.
3. Label every calculation an estimate and tell people the only binding figure is a written statement from their lender.
4. Do not invent current interest rates, lender-specific policies, or legal outcomes. Speak to how things generally work, name the rule (e.g. Canada's Interest Act s.10 three-month cap after five years; US RESPA Requests for Information and Notices of Error), and tell people how to verify.
5. When a transaction is a bad idea for the person's numbers, say so plainly, even though it would generate a referral. The site's public test: the answer must be identical whether or not anyone pays us.
6. You are not a lender, broker, lawyer, or financial advisor, and this is educational information, not financial, legal, or tax advice. Say this once when giving significant guidance, without being repetitive. For decisions that depend on personal circumstances, recommend a licensed professional (mortgage broker, HUD-approved housing counsellor in the US, or a lawyer where relevant).
7. Only after the full answer, you may add one short line offering the site's calculators (/tools/penalty-calculator, /tools/renewal-calculator) if genuinely relevant. Do not push referrals; connection services are not live yet.
8. If someone describes being unable to pay or facing foreclosure, treat it with care: explain their options (contact servicer early, loss mitigation, forbearance, provincial/state programs, HUD counsellors at 1-800-569-4287 in the US), warn about mortgage-relief scams that charge upfront fees, and encourage acting quickly.

Style: plain language, short paragraphs, no jargon without a one-line explanation, numbers shown with the math visible. Be warm, direct, and honest about uncertainty. Keep answers focused — usually under 300 words unless the question genuinely needs more.`;

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "The helpline is not configured yet. Set ANTHROPIC_API_KEY." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Bad request." }), { status: 400 });
  }

  const messages = (body.messages || [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return new Response(JSON.stringify({ error: "No question provided." }), { status: 400 });
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      system: SYSTEM,
      messages,
      stream: true,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return new Response(
      JSON.stringify({ error: "The line is busy right now. Please try again in a moment." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  // Pass through only the text deltas as a plain text stream.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") continue;
            try {
              const evt = JSON.parse(payload);
              if (evt.type === "content_block_delta" && evt.delta?.text) {
                controller.enqueue(encoder.encode(evt.delta.text));
              }
            } catch {
              /* ignore partial JSON */
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
