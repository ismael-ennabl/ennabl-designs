import type { ComponentMeta } from "ennablux-mcp/api";
import { loadStorybookFromUrl, generateReactPage, ontology } from "ennablux-mcp/api";
import fs from "fs";
import path from "path";

let cachedRegistry: ComponentMeta[] | null = null;
let cachedAt = 0;
const REGISTRY_TTL_MS = 60_000; // 1 minute

function now(): number {
  return Date.now();
}

export async function getRegistry(): Promise<ComponentMeta[]> {
  if (cachedRegistry && now() - cachedAt < REGISTRY_TTL_MS) return cachedRegistry;
  const baseUrl = process.env.ENNABLUI_STORYBOOK_URL || "https://ismael-ennabl.github.io/ennabl-designs";
  const { components } = await loadStorybookFromUrl(baseUrl);
  cachedRegistry = components;
  cachedAt = now();
  return components;
}

function leaf(title: string): string {
  return (title.split("/").pop() || title).trim();
}

export function resolveCanonical(term: string): string | undefined {
  const normalized = term.toLowerCase().trim();
  for (const [canonical, { synonyms }] of Object.entries(ontology)) {
    if (canonical.toLowerCase() === normalized) return canonical;
    if (synonyms.some(s => s.toLowerCase() === normalized)) return canonical;
  }
  return undefined;
}

export function extractFromPrompt(
  prompt: string,
  registry: ComponentMeta[]
): { intents: string[]; includes: string[] } {
  const p = prompt.toLowerCase();
  const intents: string[] = [];
  for (const [canonical, { synonyms }] of Object.entries(ontology)) {
    if (p.includes(canonical.toLowerCase())) intents.push(canonical);
    else if (synonyms.some(s => p.includes(s.toLowerCase()))) intents.push(canonical);
  }
  const includes: string[] = [];
  registry.forEach(c => {
    const leafName = leaf(c.title).toLowerCase();
    const exportName = (c.exportName || "").toLowerCase();
    if (leafName && p.includes(leafName)) includes.push(leafName);
    if (exportName && p.includes(exportName)) includes.push(exportName);
  });
  return { intents: Array.from(new Set(intents)), includes: Array.from(new Set(includes)) };
}

function detectDataset(prompt: string): { table?: string; title?: string } {
  const p = prompt.toLowerCase();
  if (p.includes("incoming renewal")) {
    return { table: "incoming_renewals", title: "Incoming Renewals" };
  }
  return {};
}

export function pickByNames(
  names: string[],
  registry: ComponentMeta[]
): ComponentMeta[] {
  const chosen: ComponentMeta[] = [];
  names.forEach(name => {
    const match =
      registry.find(c => leaf(c.title).toLowerCase() === name.toLowerCase()) ||
      registry.find(c => (c.exportName || "").toLowerCase() === name.toLowerCase());
    if (match && !chosen.find(x => x.id === match.id)) chosen.push(match);
  });
  return chosen;
}

export function generatePageCode(
  pageName: string,
  components: ComponentMeta[],
  importBase?: string,
  options?: { table?: string; sectionTitle?: string }
): string {
  // Prefer our own UI import mapping over Storybook story import hints
  const { mapped } = mapComponentsToUiImports(components);
  let code = generateReactPage(pageName, mapped, importBase);
  // Remove top-level <h1>{pageName}</h1> headings that the generator may add
  const esc = pageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titleRx = new RegExp(`\\n[\\t ]*<h1>[\\t ]*${esc}[\\t ]*<\\/h1>[\\t ]*\\n`, "m");
  code = code.replace(titleRx, "\n");
  code = code.replace(new RegExp(`<h1>[\\t ]*${esc}[\\t ]*<\\/h1>`, "m"), "");
  // Collapse excessive blank lines
  code = code.replace(/\n{3,}/g, "\n\n");
  // If a Table is part of the components, inject a basic data fetcher example
  const hasTable = mapped.some(c => (c.exportName || "").toLowerCase().includes("table"));
  if (hasTable) {
    // Ensure client component since we use hooks
    if (!/^"use client";/.test(code)) {
      code = `"use client";\n${code}`;
    }
    const tableName = options?.table || "policies";
    const sectionTitle = options?.sectionTitle || "Policies";
    const prelude = `\n// Data loader for tables (mock or supabase)\nasync function useTableData() {\n  const preferSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL);\n  const path = preferSupabase ? '/api/builder/data/query' : '/api/builder/data/generate';\n  const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ table: '${tableName}', tenantId: 'design' }) });\n  const j = await res.json();\n  return Array.isArray(j.rows) ? j.rows : [];\n}\n`;
    code = code.replace(/export default function [^{]+\{/, (m) => `${prelude}${m}`);
    code = code.replace(/return \(\n\s*<div>/, `const [rows, setRows] = React.useState([] as any[]);\n  React.useEffect(() => { useTableData().then(setRows); }, []);\n  const cols = rows.length ? Object.keys(rows[0]) : [];\n  return (\n    <div>`);
    // Ensure Table subcomponents are imported
    code = code.replace(/\{\s*Table\s*\}/, '{ Table, TableHeader, TableRow, TableHead, TableBody, TableCell }');
    // Ensure Card imports are present right after React import
    const base = importBase ?? "@/components/ui";
    if (!new RegExp(`from\\s+["']${base}/card["']`).test(code)) {
      code = code.replace(/import\s+React\s+from\s+["']react["'];?/, (m) => `${m}\nimport { Card, CardHeader, CardTitle, CardContent } from "${base}/card";`);
    }
    // Inject Card wrapper with table
    code = code.replace(/<Table \/>/, `<Card>\n        <CardHeader><CardTitle>${sectionTitle}</CardTitle></CardHeader>\n        <CardContent>\n          <div className=\"overflow-x-auto\">\n            <Table>\n              <TableHeader>\n                <TableRow>\n                  {cols.map((c) => (<TableHead key={c}>{c}</TableHead>))}\n                </TableRow>\n              </TableHeader>\n              <TableBody>\n                {rows.map((r, i) => (\n                  <TableRow key={i}>\n                    {cols.map((c) => (<TableCell key={c}>{String(r[c])}</TableCell>))}\n                  </TableRow>\n                ))}\n              </TableBody>\n            </Table>\n          </div>\n        </CardContent>\n      </Card>`);
  }
  return code;
}

export type GeneratedResult = {
  code: string;
  used: { id: string; title: string; exportName?: string; importPath?: string; storybookUrl?: string }[];
  unknownIntents?: string[];
};

export async function composeFromPrompt(
  pageName: string,
  prompt: string,
  importBase?: string,
  options?: { seedIncludes?: string[]; removeNames?: string[] }
): Promise<GeneratedResult> {
  const registry = await getRegistry();
  const { intents, includes } = extractFromPrompt(prompt, registry);
  const resolved: string[] = [];
  intents.forEach(t => { const r = resolveCanonical(t); if (r) resolved.push(r); });
  const unknown = intents.filter(t => !resolved.includes(t));
  const additive = Array.from(new Set([...(options?.seedIncludes || []), ...includes]));
  let chosen = pickByNames([...resolved, ...additive], registry);
  if (options?.removeNames?.length) {
    const toRemove = new Set(options.removeNames.map(s => s.toLowerCase()));
    chosen = chosen.filter(c => !toRemove.has((c.exportName || leaf(c.title)).toLowerCase()));
  }
  if (!chosen.length) {
    return { code: "", used: [], unknownIntents: unknown };
  }
  const { mapped, missing } = mapComponentsToUiImports(chosen);
  if (!mapped.length) {
    return { code: "", used: [], unknownIntents: Array.from(new Set([...unknown, ...missing])) };
  }
  const ds = detectDataset(prompt);
  const code = generatePageCode(pageName, mapped, importBase ?? "@/components/ui", { table: ds.table, sectionTitle: ds.title });
  const unknownOut = Array.from(new Set([...unknown, ...missing]));
  const baseUrl = process.env.ENNABLUI_STORYBOOK_URL || "https://ismael-ennabl.github.io/ennabl-designs";
  const used = mapped.map(c => {
    const storyId = c.stories && c.stories.length ? c.stories[0].id : undefined;
    const storybookUrl = storyId ? `${baseUrl}/?path=/story/${storyId}` : undefined;
    return { id: c.id, title: c.title, exportName: c.exportName, importPath: c.importHint, storybookUrl };
  });
  return { code, used, unknownIntents: unknownOut.length ? unknownOut : undefined };
}

// Build mapping from export name (PascalCase) to '@/components/ui/<fileBase>'
function mapComponentsToUiImports(components: ComponentMeta[]): { mapped: ComponentMeta[]; missing: string[] } {
  const root = process.cwd();
  const uiDir = path.join(root, "src", "components", "ui");
  let files: string[] = [];
  try {
    files = fs.readdirSync(uiDir).filter(f => f.endsWith(".tsx"));
  } catch {
    // leave empty
  }
  const exportToPath = new Map<string, string>();
  for (const file of files) {
    const base = file.replace(/\.tsx$/, "");
    const pascal = kebabToPascal(base);
    exportToPath.set(pascal, `@/components/ui/${base}`);
  }
  // Prefer Storybook "Table" intent to map to our UI table primitives
  // Map commonly requested layout elements to UI scaffolds
  exportToPath.set("Header", `@/components/ui/header`);
  exportToPath.set("Footer", `@/components/ui/footer`);
  exportToPath.set("Section", `@/components/ui/section`);
  exportToPath.set("Table", `@/components/ui/table`);
  const mapped: ComponentMeta[] = [];
  const missing: string[] = [];
  for (const c of components) {
    const name = c.exportName || leaf(c.title).replace(/\s+/g, "");
    const p = exportToPath.get(name);
    if (p) {
      mapped.push({ ...c, importHint: p });
    } else {
      missing.push(name);
    }
  }
  return { mapped, missing };
}

function kebabToPascal(s: string): string {
  return s
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}


