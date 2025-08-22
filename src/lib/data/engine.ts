import path from "path";
import fs from "fs";
import { faker } from "@faker-js/faker";

type SchemaColumnRule = string | SchemaArrayNode | SchemaObjectNode;
interface SchemaArrayNode { type: 'array'; items: SchemaColumnRule; count?: number; min?: number; max?: number; }
interface SchemaObjectNode { type: 'object'; properties: Record<string, SchemaColumnRule>; }
interface TableSchema { table: string; count: number | { min: number; max: number }; columns: Record<string, SchemaColumnRule>; }

interface GenerationContext { tenantId: string; cache: Record<string, any[]>; }

function schemasPath(): string { return path.resolve(process.cwd(), "../../ennabl-design-data/mock/schemas"); }

function loadSchema(table: string): TableSchema {
  const p = path.join(schemasPath(), `${table}.json`);
  const content = fs.readFileSync(p, "utf-8");
  return JSON.parse(content) as TableSchema;
}

function ensureRelation(table: string, ctx: GenerationContext) {
  if (ctx.cache[table]) return;
  const schema = loadSchema(table);
  // generate a small set for relations
  const original = schema.count;
  schema.count = typeof schema.count === 'number' ? Math.min(schema.count, 10) : { min: 5, max: 10 };
  const rows = generateTable(schema, ctx);
  ctx.cache[table] = rows;
  schema.count = original;
}

function evalRule(rule: SchemaColumnRule, ctx: GenerationContext): any {
  if (typeof rule === 'string') return evalStringRule(rule, ctx);
  if ((rule as SchemaArrayNode).type === 'array') {
    const node = rule as SchemaArrayNode;
    const count = typeof node.count === 'number' ? node.count : faker.number.int({ min: node.min ?? 1, max: node.max ?? 5 });
    return Array.from({ length: count }, () => evalRule(node.items, ctx));
  }
  if ((rule as SchemaObjectNode).type === 'object') {
    const node = rule as SchemaObjectNode;
    const out: any = {};
    for (const [k, v] of Object.entries(node.properties)) out[k] = evalRule(v, ctx);
    return out;
  }
  return null;
}

function byPath(pathStr: string): any {
  const parts = pathStr.split('.');
  let cur: any = faker as any;
  for (const p of parts) { if (cur && p in cur) cur = cur[p]; else return undefined; }
  if (typeof cur === 'function') { try { return cur(); } catch { return undefined; } }
  return cur;
}

function evalStringRule(rule: string, ctx: GenerationContext): any {
  if (rule === 'context.tenant_id') return ctx.tenantId;
  if (rule === 'string.uuid') return faker.string.uuid();
  if (rule.startsWith('relation.')) {
    const [, table, column] = rule.split('.');
    ensureRelation(table, ctx);
    const rows = ctx.cache[table] || [];
    const picked = faker.helpers.arrayElement(rows);
    return picked?.[column];
  }
  if (rule.startsWith('helpers.arrayElement:')) {
    const tokens = rule.replace('helpers.arrayElement:', '').split(':');
    const resolved = tokens.map(t => interpolateToken(t, ctx));
    return faker.helpers.arrayElement(resolved);
  }
  if (rule.startsWith('number.int:')) {
    const [, minStr, maxStr] = rule.split(':');
    return faker.number.int({ min: Number(minStr), max: Number(maxStr) });
  }
  if (rule === 'number.int') return faker.number.int();
  if (rule.startsWith('number.float:')) {
    const [, minStr, maxStr, decStr] = rule.split(':');
    const v = faker.number.float({ min: Number(minStr), max: Number(maxStr) });
    return Number(v.toFixed(Number(decStr ?? '2')));
  }
  if (rule.startsWith('date.between:')) {
    const [, startStr, endStr] = rule.split(':');
    const val = faker.date.between({ from: new Date(startStr), to: new Date(endStr) }) as Date;
    return val.toISOString().slice(0, 10);
  }
  const v = byPath(rule);
  if (v !== undefined) return v;
  return rule;
}

function interpolateToken(token: string, ctx: GenerationContext): string {
  return token.replace(/\$\{([^}]+)\}/g, (_m, inner) => String(evalStringRule(inner, ctx)));
}

function generateTable(schema: TableSchema, ctx: GenerationContext): any[] {
  const count = typeof schema.count === 'number' ? schema.count : faker.number.int({ min: schema.count.min, max: schema.count.max });
  const rows: any[] = [];
  for (let i = 0; i < count; i++) {
    const row: any = {};
    for (const [col, rule] of Object.entries(schema.columns)) row[col] = evalRule(rule, ctx);
    rows.push(row);
  }
  ctx.cache[schema.table] = rows;
  return rows;
}

export async function generateTableRows(table: string, tenantId: string = "tenant-dev"): Promise<any[]> {
  const schema = loadSchema(table);
  const rows = generateTable(schema, { tenantId, cache: {} });
  return rows;
}

export async function listSchemas(): Promise<string[]> {
  try {
    const items = fs.readdirSync(schemasPath()).filter(f => f.endsWith('.json'));
    return items.map(f => f.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}


