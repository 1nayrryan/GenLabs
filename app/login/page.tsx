"use client";

import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleGoogleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wide text-muted mb-4">Access</p>
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-3">Sign in to GenLabs</h1>
      <p className="text-muted mb-8">
        Sign in with Google to post projects, share updates, and manage the builds you created.
      </p>
      <button
        onClick={handleGoogleSignIn}
        className="px-6 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity"
      >
        Continue with Google
      </button>
    </div>
  );
}
