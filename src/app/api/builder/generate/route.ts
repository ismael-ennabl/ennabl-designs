import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { composeFromPrompt } from "@/lib/builder/mcp";

type Body = {
  prompt: string;
  pageName?: string;
  target?: "playground" | "app";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const pageName = (body.pageName || "GeneratedPage").replace(/[^A-Za-z0-9_\-]/g, "");
    const target = body.target || "playground";
    if (!body.prompt) return NextResponse.json({ ok: false, error: "missing-prompt" }, { status: 400 });

    const { code, used, unknownIntents } = await composeFromPrompt(pageName, body.prompt, "@/components/ui");
    if (!code) {
      return NextResponse.json({ ok: false, error: "no-matching-components", unknownIntents }, { status: 400 });
    }

    // Decide write path: /src/playground/generated/<pageName>.tsx or /src/app/<pageName>/page.tsx
    const root = process.cwd();
    if (target === "playground") {
      // Write component source
      const compDir = path.join(root, "src", "playground", "generated");
      const compFile = path.join(compDir, `${pageName}.tsx`);
      fs.mkdirSync(compDir, { recursive: true });
      fs.writeFileSync(compFile, code, "utf-8");

      // Write a route wrapper at /app/playground/generated/<pageName>/page.tsx
      const routeDir = path.join(root, "src", "app", "playground", "generated", pageName.toLowerCase());
      const routeFile = path.join(routeDir, "page.tsx");
      fs.mkdirSync(routeDir, { recursive: true });
      const routeCode = `import Page from "@/sandbox/generated/${pageName}";\nexport default function GeneratedRoute() {\n  return <Page />;\n}\n`;
      fs.writeFileSync(routeFile, routeCode, "utf-8");

      return NextResponse.json({ ok: true, path: `src/app/playground/generated/${pageName.toLowerCase()}/page.tsx`, componentPath: `src/playground/generated/${pageName}.tsx`, used, unknownIntents });
    }

    const dir = path.join(root, "src", "app", pageName.toLowerCase());
    const file = path.join(dir, "page.tsx");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, code, "utf-8");
    return NextResponse.json({ ok: true, path: `src/app/${pageName.toLowerCase()}/page.tsx`, used, unknownIntents });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}


