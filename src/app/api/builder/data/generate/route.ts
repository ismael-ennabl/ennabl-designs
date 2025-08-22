import { NextResponse } from "next/server";
import { generateTableRows, listSchemas } from "@/lib/data/engine";

type Body = { table?: string; tenantId?: string };

export async function POST(req: Request) {
  try {
    const { table, tenantId } = (await req.json()) as Body;
    if (!table) {
      const schemas = await listSchemas();
      return NextResponse.json({ ok: false, error: "missing-table", schemas }, { status: 400 });
    }
    const rows = await generateTableRows(table, tenantId);
    return NextResponse.json({ ok: true, rows });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}


