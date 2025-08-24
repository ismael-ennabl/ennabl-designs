"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function FormDemo() {
  const [values, setValues] = React.useState({ name: "", notes: "" })

  return (
    <form
      className="grid gap-4 max-w-md"
      onSubmit={(e) => {
        e.preventDefault()
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Ada Lovelace"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Your notes..."
          value={values.notes}
          onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setValues({ name: "", notes: "" })}
        >
          Reset
        </Button>
      </div>
    </form>
  )
}



