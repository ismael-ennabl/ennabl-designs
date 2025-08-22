"use client";
import React from "react";
import { Table } from "@/components/ui/table";


// Data loader for tables (mocked via ennabl-design-data)
async function useTableData() {
  const res = await fetch('/api/builder/data/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ table: 'policies' }) });
  const j = await res.json();
  return j.rows || [];
}
export default function GeneratedPage() {
  const [rows, setRows] = React.useState([] as any[]);
  React.useEffect(() => { useTableData().then(setRows); }, []);
  return (
    <div>
      <h1>GeneratedPage</h1>
      <Table />
    </div>
  );
}
