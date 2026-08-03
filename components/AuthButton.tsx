"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function AuthButton() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setCurrentPath(`${window.location.pathname}${window.location.search}`);
  }, []);

  useEffect(() => {
    if (!supabase) return;

    const loadUser = async () => {
      if (!supabase) return;
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_: string, session: { user?: { email?: string | null } | null } | null) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  async function signIn() {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUserEmail(null);
  }

  return userEmail ? (
    <div className="flex items-center gap-3">
      <span className="hidden sm:inline text-sm text-muted">{userEmail}</span>
      <button
        onClick={signOut}
        className="text-sm font-medium px-4 py-2 rounded-pill border-2 border-ink hover:bg-mist transition-colors"
      >
        Sign out
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link
        href={`/login?next=${encodeURIComponent(currentPath === "/login" ? "/" : currentPath)}`}
        className="text-sm font-medium px-4 py-2 rounded-pill border-2 border-ink hover:bg-mist transition-colors"
      >
        Sign in
      </Link>
    </div>
  );
}
