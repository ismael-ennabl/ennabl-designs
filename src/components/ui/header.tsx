import * as React from "react";

type HeaderProps = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Header({ title, children, className }: HeaderProps) {
  return (
    <header className={className}>
      <div className="px-4 py-3 border-b">
        <h1 className="text-xl font-semibold leading-tight">
          {title || children}
        </h1>
      </div>
    </header>
  );
}


