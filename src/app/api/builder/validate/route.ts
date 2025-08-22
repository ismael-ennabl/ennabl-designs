import { NextResponse } from "next/server";

type Body = { code: string };

// Very basic validation: ensure imports are from '@/components/ui' and no raw HTML tags with obvious styling
export async function POST(req: Request) {
  const { code } = (await req.json()) as Body;
  if (!code) return NextResponse.json({ error: "missing-code" }, { status: 400 });

  const errors: string[] = [];
  const warnings: string[] = [];

  // Rule: only import UI from '@/components/ui' namespace or explicit hints
  const importLines = code.match(/^import\s+.*?from\s+"([^"]+)";$/gm) || [];
  for (const line of importLines) {
    const m = line.match(/^import\s+.*?from\s+"([^"]+)";$/);
    if (!m) continue;
    const from = m[1];
    if (!(from.startsWith("@/components/ui") || from.startsWith("@/components/") || from.startsWith("@/playground/") || from.startsWith("@/filters/") || from.startsWith("@/features/") )) {
      warnings.push(`Non-design import detected: ${from}`);
    }
  }

  // Rule: discourage inline style attributes
  if (/style=\{/.test(code)) warnings.push("Inline style found; prefer design tokens/components.");

  return NextResponse.json({ ok: errors.length === 0, errors, warnings });
}



