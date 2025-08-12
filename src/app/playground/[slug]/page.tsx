import { notFound } from "next/navigation"
import { getExampleBySlug } from "@/playground/examples"

export default async function PlaygroundExamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const example = getExampleBySlug(slug)
  if (!example) return notFound()

  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-lg font-semibold">{example.title}</h2>
        {example.description ? (
          <p className="text-sm text-muted-foreground">{example.description}</p>
        ) : null}
      </div>
      <div className="rounded-lg border p-4">{example.element}</div>
    </div>
  )
}



