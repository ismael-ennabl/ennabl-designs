import Link from "next/link";

export default function PlaygroundThreeCardsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Playground: Three Cards</h1>
          <p className="text-sm text-muted-foreground">
            Form, table, and product cards demo
          </p>
        </div>
        <Link className="text-sm underline underline-offset-4" href="/playground">
          Back to playground
        </Link>
      </header>
      {children}
    </div>
  );
}



