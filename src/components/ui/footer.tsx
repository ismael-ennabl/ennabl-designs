import * as React from "react";

type FooterProps = {
  note?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Footer({ note, children, className }: FooterProps) {
  return (
    <footer className={className}>
      <div className="px-4 py-2 border-t">
        <p className="text-[0.75rem] text-muted-foreground">
          {note || children}
        </p>
      </div>
    </footer>
  );
}


