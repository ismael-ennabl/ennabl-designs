"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const purchasedItems = [
  { id: "INV-1001", item: "Wireless Mouse", qty: 1, price: 29.99 },
  { id: "INV-1002", item: "Mechanical Keyboard", qty: 1, price: 119.0 },
  { id: "INV-1003", item: "USB-C Hub", qty: 2, price: 24.5 },
];

const products = [
  {
    id: "p-1",
    name: "Noise-cancelling Headphones",
    description: "Over-ear, 32h battery, BT 5.3",
    href: "#",
    image: "/vercel.svg",
  },
  {
    id: "p-2",
    name: "4K Monitor",
    description: "27\" IPS, HDR10, USB-C",
    href: "#",
    image: "/next.svg",
  },
  {
    id: "p-3",
    name: "Ergonomic Chair",
    description: "Adjustable lumbar support",
    href: "#",
    image: "/globe.svg",
  },
];

export default function ThreeCardsDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Personal details form */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Personal details</CardTitle>
          <CardDescription>Enter your information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Jane" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="(555) 000-0000" />
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit">Save</Button>
              <Button type="reset" variant="outline">
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Purchased items table */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Items bought</CardTitle>
          <CardDescription>Recent purchases</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchasedItems.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.item}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell className="text-right">${row.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Products grid */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Browse a few picks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Card key={p.id}>
                <CardContent className="pt-6">
                  <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-md">
                    <Image src={p.image} alt={p.name} fill className="object-contain" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{p.name}</div>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                    <Link href={p.href} className="text-sm underline underline-offset-4">
                      View product
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



