import Link from "next/link";
import { EDU_MODULES } from "@/lib/modules";

export function SiteNav() {
  return (
    <header className="site-nav">
      <Link href="/" className="site-nav-brand">
        DersMD
      </Link>
      <nav aria-label="Modüller" className="site-nav-links">
        {EDU_MODULES.filter((m) => m.href.startsWith("/") && !m.href.includes("#")).map(
          (m) => (
            <Link key={m.id} href={m.href}>
              {m.title}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
