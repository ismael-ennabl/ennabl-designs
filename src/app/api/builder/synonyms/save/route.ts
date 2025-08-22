import { NextResponse } from "next/server";
import { saveSynonymMapping } from "ennablux-mcp/api";

export async function POST(req: Request) {
  try {
    const { term, componentId } = (await req.json()) as { term: string; componentId: string };
    if (!term || !componentId) return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
    saveSynonymMapping(term, componentId);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}


