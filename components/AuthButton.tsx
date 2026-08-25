"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AuthButton() {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email ?? "" });
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email ?? "" } : null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium px-4 py-2 rounded-pill border-2 border-ink hover:bg-mist transition-colors"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={async () => {
          await supabase?.auth.signOut();
          setUser(null);
        }}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: hovered ? "transparent" : "#0E0E10",
          border: hovered ? "2px solid #EF4444" : "2px solid transparent",
        }}
        title="Sign out"
      >
        {hovered ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        ) : (
          <span className="text-white text-xs font-bold">
            {user.email?.[0]?.toUpperCase() ?? "U"}
          </span>
        )}
      </button>
    </div>
  );
}
