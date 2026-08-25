"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function PostMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-ink text-paper text-sm font-semibold px-4 py-2 rounded-pill hover:bg-ink/80 transition-colors"
      >
        Post
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-paper border border-line rounded-xl shadow-xl p-2 animate-scale-in">
          <Link
            href="/submit"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-mist transition-colors"
          >
            <span className="text-sm font-semibold block">Post a build</span>
            <span className="text-xs text-muted">Share your project</span>
          </Link>
          <Link
            href="/updates/new"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-mist transition-colors"
          >
            <span className="text-sm font-semibold block">Post an update</span>
            <span className="text-xs text-muted">Share progress</span>
          </Link>
        </div>
      )}
    </div>
  );
}
