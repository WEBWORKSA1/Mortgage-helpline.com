import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

// Called daily by Vercel Cron (vercel.json). Purges cached live data so the
// home, rates, news and videos pages rebuild with fresh numbers and a new brief.
export async function GET(req) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  for (const p of ["/", "/rates", "/news", "/videos"]) revalidatePath(p);
  return Response.json({ ok: true, refreshedAt: new Date().toISOString() });
}
