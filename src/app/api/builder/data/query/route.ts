import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

type Body = { table: string; tenantId?: string; limit?: number };

export async function POST(req: Request) {
  try {
    const { table, tenantId = 'design', limit = 50 } = (await req.json()) as Body;
    if (!table) return NextResponse.json({ ok: false, error: 'missing-table' }, { status: 400 });
    const supabase = getServerSupabase();
    const { data, error } = await supabase.from(table).select('*').eq('tenant_id', tenantId).limit(limit);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, rows: data || [] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}


