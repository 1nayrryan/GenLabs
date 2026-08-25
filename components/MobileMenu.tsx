"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Props = {
  links: { href: string; label: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export default function MobileMenu({ links, open, onToggle, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <div ref={ref} className="md:hidden">
      <button
        onClick={onToggle}
        className="p-2 -ml-2 rounded-lg hover:bg-mist transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {open ? (
            <path d="M5 5l10 10M5 15L15 5" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-paper border-b border-line shadow-lg animate-fade-in">
          <div className="flex flex-col p-5 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-mist transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
