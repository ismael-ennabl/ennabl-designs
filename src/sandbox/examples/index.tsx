import type { ReactNode } from "react"
import ButtonDemo from "./button-demo"
import FormDemo from "./form-demo"
import ThreeCardsDemo from "./three-cards-demo"


import CarriersDemo from "./carriers-demo"

export type Example = {
  slug: string
  title: string
  description?: string
  element: ReactNode
  tags?: string[]
}

export const examples: Example[] = [
  {
    slug: "buttons",
    title: "Buttons",
    description: "Common button variants",
    element: <ButtonDemo />,
    tags: ["button", "actions"],
  },
  {
    slug: "form",
    title: "Form",
    description: "Inputs, labels and textarea",
    element: <FormDemo />,
    tags: ["form", "input"],
  },


  {
    slug: "carriers",
    title: "Carriers",
    description: "Header, 3 sections with tables, and footer",
    element: <CarriersDemo />,
    tags: ["table", "layout", "carriers"],
  },
  {
    slug: "three-cards",
    title: "Three Cards",
    description: "Header with three cards: form, table, and product cards",
    element: <ThreeCardsDemo />,
    tags: ["layout", "form", "table", "cards"],
  },
]

export function getExampleBySlug(slug: string) {
  return examples.find((e) => e.slug === slug)
}


