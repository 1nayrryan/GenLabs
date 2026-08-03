"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function LoginContent() {
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") ?? "/";

  async function handleGitHubSignIn() {
    if (!supabase) return;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`;

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    });
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wide text-muted mb-4">Access</p>
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-3">Sign in to GenLabs</h1>
      <p className="text-muted mb-8">
        Sign in with GitHub to post projects, share updates, and manage the builds you created.
      </p>
      <button
        onClick={handleGitHubSignIn}
        className="px-6 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity"
      >
        Continue with GitHub
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto px-6 py-24 text-center text-muted">Preparing sign-in…</div>}>
      <LoginContent />
    </Suspense>
  );
}
