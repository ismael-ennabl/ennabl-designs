import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const p = searchParams.get("path");
  if (!p) return NextResponse.json({ error: "missing-path" }, { status: 400 });
  const abs = path.join(process.cwd(), p);
  if (!abs.startsWith(process.cwd())) return NextResponse.json({ error: "out-of-root" }, { status: 400 });
  if (!fs.existsSync(abs)) return NextResponse.json({ error: "not-found" }, { status: 404 });
  const code = fs.readFileSync(abs, "utf-8");
  return NextResponse.json({ code });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { path: string; code: string };
  if (!body?.path) return NextResponse.json({ error: "missing-path" }, { status: 400 });
  const abs = path.join(process.cwd(), body.path);
  if (!abs.startsWith(process.cwd())) return NextResponse.json({ error: "out-of-root" }, { status: 400 });
  fs.writeFileSync(abs, body.code ?? "", "utf-8");
  return NextResponse.json({ ok: true });
}



