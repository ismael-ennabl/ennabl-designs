import { NextResponse } from "next/server";
import { getRegistry } from "@/lib/builder/mcp";
import { suggestComponents } from "ennablux-mcp/api";

export async function POST(req: Request) {
  try {
    const { terms } = (await req.json()) as { terms: string[] };
    if (!terms?.length) return NextResponse.json({ ok: false, error: "missing-terms" }, { status: 400 });
    const registry = await getRegistry();
    const suggestions = suggestComponents(registry as any, terms);
    return NextResponse.json({ ok: true, suggestions });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}


