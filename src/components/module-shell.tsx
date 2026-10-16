import Link from "next/link";
import type { ReactNode } from "react";

type ModuleShellProps = {
  title: string;
  lede: string;
  children: ReactNode;
};

export function ModuleShell({ title, lede, children }: ModuleShellProps) {
  return (
    <main className="page-pad module-page">
      <Link href="/" className="back-link">
        ← DersMD
      </Link>
      <header className="module-head">
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </header>
      {children}
    </main>
  );
}
