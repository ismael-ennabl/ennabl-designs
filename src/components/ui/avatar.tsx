"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function letterHashColor(letter?: string): { bg: string; fg: string } {
  const palette = [
    { bg: "bg-red-500", fg: "text-white" },
    { bg: "bg-orange-500", fg: "text-white" },
    { bg: "bg-amber-500", fg: "text-black" },
    { bg: "bg-lime-500", fg: "text-black" },
    { bg: "bg-emerald-500", fg: "text-black" },
    { bg: "bg-teal-500", fg: "text-white" },
    { bg: "bg-sky-500", fg: "text-white" },
    { bg: "bg-indigo-500", fg: "text-white" },
    { bg: "bg-violet-500", fg: "text-white" },
    { bg: "bg-fuchsia-500", fg: "text-white" },
    { bg: "bg-pink-500", fg: "text-white" },
    { bg: "bg-neutral-500", fg: "text-white" },
  ];
  const idx = letter ? (letter.toUpperCase().charCodeAt(0) - 65) % palette.length : 11;
  return palette[Math.max(0, Math.min(palette.length - 1, idx))];
}

function Avatar({
  className,
  children,
  "data-initial": dataInitial,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & { "data-initial"?: string }) {
  const { bg, fg } = letterHashColor((dataInitial || "").charAt(0));
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-initial={dataInitial}
      className={cn(
        "relative flex size-7 shrink-0 overflow-hidden rounded-full",
        bg,
        fg,
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full text-[10px] font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
