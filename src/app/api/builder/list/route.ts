import { NextResponse } from "next/server";
import { getRegistry } from "@/lib/builder/mcp";

export const revalidate = 60;

export async function GET() {
  const components = await getRegistry();
  return NextResponse.json({ components: components.map(c => ({
    id: c.id,
    title: c.title,
    exportName: c.exportName,
    stories: c.stories,
    tags: c.tags || []
  })) });
}



