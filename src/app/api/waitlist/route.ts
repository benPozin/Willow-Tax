import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

type WaitlistBody = { name: string; email: string };

async function parseBody(req: NextRequest): Promise<WaitlistBody | null> {
  try {
    const raw = (await req.json()) as unknown;
    if (typeof raw === "object" && raw !== null) {
      const { name, email } = raw as Record<string, unknown>;
      if (typeof name === "string" && typeof email === "string") {
        return { name, email };
      }
    }
  } catch {
    // ignore malformed JSON
  }
  return null;
}

export async function POST(req: NextRequest) {
  const body = await parseBody(req);
  if (!body) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  const { name, email } = body;

  // Temporary: log to server (visible in Vercel logs)
  console.log("[WAITLIST]", { name, email, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
