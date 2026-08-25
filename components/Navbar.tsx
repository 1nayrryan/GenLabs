"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import AuthButton from "./AuthButton";
import PostMenu from "./PostMenu";

const navLinks = [
  { href: "/projects", label: "Builds" },
  { href: "/updates", label: "Updates" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileMenu
            links={navLinks}
            open={mobileOpen}
            onToggle={() => setMobileOpen(!mobileOpen)}
            onClose={() => setMobileOpen(false)}
          />
          <Link
            href="/"
            className="font-semibold text-lg tracking-tightest2"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            GenLabs
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AuthButton />
          <PostMenu />
        </div>
      </div>
    </header>
  );
}
