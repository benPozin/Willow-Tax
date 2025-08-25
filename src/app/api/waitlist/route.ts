// src/app/api/waitlist/route.ts
import { NextResponse, type NextRequest } from "next/server";

// (Optional, but safe on Vercel)
// If you plan to log or use Node libs, keep Node runtime:
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { name, email } = await request.json().catch(() => ({} as any));

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Missing fields" },
      { status: 400 }
    );
  }

  // placeholder "store/send" — visible in Vercel logs
  console.log("[WAITLIST]", { name, email, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}