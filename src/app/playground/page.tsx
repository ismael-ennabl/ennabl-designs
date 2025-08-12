import Link from "next/link"
import { examples } from "@/playground/examples"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function PlaygroundIndexPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {examples.map((ex) => (
        <Card key={ex.slug}>
          <CardHeader>
            <CardTitle>{ex.title}</CardTitle>
            {ex.description ? <CardDescription>{ex.description}</CardDescription> : null}
          </CardHeader>
          <CardContent>
            <Link className="text-sm underline underline-offset-4" href={`/playground/${ex.slug}`}>
              Open example →
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}






