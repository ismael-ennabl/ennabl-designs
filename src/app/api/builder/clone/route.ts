import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

type Body = {
  pageId: string;
  newName?: string;
};

export async function POST(req: Request) {
  try {
    const { pageId, newName } = (await req.json()) as Body;
    if (!pageId) return NextResponse.json({ ok: false, error: "missing-pageId" }, { status: 400 });

    const supabase = getServerSupabase();
    const { data: page, error: pageErr } = await supabase.from("pages").select("*").eq("id", pageId).maybeSingle();
    if (pageErr) return NextResponse.json({ ok: false, error: pageErr.message }, { status: 500 });
    if (!page) return NextResponse.json({ ok: false, error: "page-not-found" }, { status: 404 });

    const newId = String(Date.now());
    const name = newName || `${page.name || "Page"} Copy`;

    // Clone pages
    const { error: insErr } = await supabase.from("pages").insert({
      id: newId,
      user_id: page.user_id,
      name,
      preview_path: page.preview_path || null,
      component_path: page.component_path || null,
      updated_at: new Date().toISOString(),
    });
    if (insErr) return NextResponse.json({ ok: false, error: insErr.message }, { status: 500 });

    // Clone page_components
    const { data: comps } = await supabase.from("page_components").select("*").eq("page_id", pageId);
    if (Array.isArray(comps) && comps.length) {
      const payload = comps.map((c: any) => ({
        page_id: newId,
        component_id: c.component_id,
        title: c.title,
        export_name: c.export_name,
        import_path: c.import_path,
        storybook_url: c.storybook_url,
      }));
      await supabase.from("page_components").insert(payload);
    }

    // Clone page_code
    const { data: codeRow } = await supabase.from("page_code").select("*").eq("page_id", pageId).maybeSingle();
    if (codeRow) {
      await supabase.from("page_code").upsert({ page_id: newId, file_path: codeRow.file_path, source: codeRow.source, updated_at: new Date().toISOString() });
    }

    // Clone instructions
    const { data: instr } = await supabase.from("page_instructions").select("*").eq("page_id", pageId).maybeSingle();
    if (instr) {
      await supabase.from("page_instructions").upsert({ page_id: newId, steps: instr.steps || [], updated_at: new Date().toISOString() });
    }

    // Clone snapshots (shallow copy)
    const { data: snaps } = await supabase.from("page_snapshots").select("*").eq("page_id", pageId);
    if (Array.isArray(snaps) && snaps.length) {
      const now = Date.now();
      const payload = snaps.map((s: any, i: number) => ({ id: `${now}-${i}`, page_id: newId, source: s.source, used: s.used, note: s.note || null, created_at: new Date().toISOString() }));
      await supabase.from("page_snapshots").insert(payload);
    }

    return NextResponse.json({ ok: true, pageId: newId, name });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}


