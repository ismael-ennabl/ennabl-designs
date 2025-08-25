"use client";
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


// Data loader for tables (mock or supabase)
async function useTableData() {
  const preferSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const path = preferSupabase ? '/api/builder/data/query' : '/api/builder/data/generate';
  const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ table: 'policies', tenantId: 'design' }) });
  const j = await res.json();
  return Array.isArray(j.rows) ? j.rows : [];
}
export default function testingcardtable() {
  const [rows, setRows] = React.useState([] as any[]);
  React.useEffect(() => { useTableData().then(setRows); }, []);
  const cols = rows.length ? Object.keys(rows[0]) : [];
  return (
    <div>
      <h1>testingcardtable</h1>
      <Card>
        <CardHeader><CardTitle>Policies</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {cols.map((c) => (<TableHead key={c}>{c}</TableHead>))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r, i) => (
                  <TableRow key={i}>
                    {cols.map((c) => (<TableCell key={c}>{String(r[c])}</TableCell>))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
