"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Section({ title, rows }: { title: string; rows: Array<string[]> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {rows[0]?.map((h, i) => (
                <TableHead key={i}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.slice(1).map((r, idx) => (
              <TableRow key={idx}>
                {r.map((c, i) => (
                  <TableCell key={i}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function CarriersDemo() {
  const sections: Array<{ title: string; rows: string[][] }> = [
    {
      title: "Top Carriers",
      rows: [
        ["Carrier", "Status", "Rating"],
        ["Acme Freight", "Active", "A"],
        ["BlueLine Logistics", "Active", "A-"],
        ["Orbit Trucking", "Onboarding", "B+"],
      ],
    },
    {
      title: "Recent Activity",
      rows: [
        ["Carrier", "Loads", "Updated"],
        ["Acme Freight", "12", "2h ago"],
        ["BlueLine Logistics", "9", "4h ago"],
        ["Orbit Trucking", "3", "yesterday"],
      ],
    },
    {
      title: "Issues",
      rows: [
        ["Carrier", "Issue", "Owner"],
        ["Acme Freight", "Docs expiring", "Ops"],
        ["BlueLine Logistics", "Insurance review", "Risk"],
        ["Orbit Trucking", "Payment hold", "Finance"],
      ],
    },
  ]

  return (
    <div className="grid gap-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Carriers</h1>
          <p className="text-sm text-muted-foreground">Overview and quick stats</p>
        </div>
      </header>

      <main className="grid gap-6">
        {sections.map((s) => (
          <Section key={s.title} title={s.title} rows={s.rows} />)
        )}
      </main>

      <footer className="text-xs text-muted-foreground">© {new Date().getFullYear()} Playground</footer>
    </div>
  )
}


