"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthButton() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function signOut() {
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
      <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-pill border-2 border-ink hover:bg-mist transition-colors">
        Sign in
      </Link>
    </div>
  );
}
