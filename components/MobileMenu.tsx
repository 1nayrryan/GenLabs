"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/projects", label: "Builds" },
  { href: "/updates", label: "Updates" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        className="w-9 h-9 flex items-center justify-center rounded-pill border-2 border-ink"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-16 bg-paper border-b-2 border-ink px-6 py-4 flex flex-col gap-3 z-40">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm py-1"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
