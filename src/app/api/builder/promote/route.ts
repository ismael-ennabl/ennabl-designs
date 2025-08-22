import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

type Body = { source: string; targetSlug: string };

export async function POST(req: Request) {
  const { source, targetSlug } = (await req.json()) as Body;
  if (!source || !targetSlug) return NextResponse.json({ error: "missing-fields" }, { status: 400 });
  const root = process.cwd();
  const srcPath = path.join(root, source);
  if (!fs.existsSync(srcPath)) return NextResponse.json({ error: "not-found", source }, { status: 404 });

  const dir = path.join(root, "src", "app", targetSlug.toLowerCase());
  const pagePath = path.join(dir, "page.tsx");
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(srcPath, pagePath);

  return NextResponse.json({ ok: true, path: `src/app/${targetSlug.toLowerCase()}/page.tsx` });
}



