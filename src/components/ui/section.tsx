import * as React from "react";
import { Card } from "@/components/ui/card";

type SectionProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export function Section({ title, children, className }: SectionProps) {
  return (
    <section className={className}>
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="px-4 pb-4">
        <Card className="p-0">{children}</Card>
      </div>
    </section>
  );
}


