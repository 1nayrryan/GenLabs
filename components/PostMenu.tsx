"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function PostMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-sm font-medium px-5 py-2 rounded-pill bg-ink text-paper hover:opacity-85 transition-opacity"
      >
        Post
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-card border-2 border-ink bg-paper shadow-lg overflow-hidden z-50">
          <Link
            href="/submit"
            onClick={() => setOpen(false)}
            className="block px-5 py-4 hover:bg-mist transition-colors border-b border-line"
          >
            <p className="font-semibold mb-0.5">Post a build</p>
            <p className="text-xs text-muted">Share a project, find collaborators</p>
          </Link>
          <Link
            href="/updates/new"
            onClick={() => setOpen(false)}
            className="block px-5 py-3 hover:bg-mist transition-colors"
          >
            <p className="text-sm font-medium">Post an update</p>
          </Link>
        </div>
      )}
    </div>
  );
}
