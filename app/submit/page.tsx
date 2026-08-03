"use client";

import SubmitProjectForm from "@/components/SubmitProjectForm";

export default function SubmitPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <div className="mb-6 rounded-card border border-line bg-mist/50 p-4 text-sm text-muted">
        <p className="font-mono text-xs uppercase tracking-wide mb-2">Posting access</p>
        <p>
          If you’re already signed in, you can post right away. If not, we’ll send you back here after GitHub sign-in.
        </p>
      </div>
      <SubmitProjectForm />
    </div>
  );
}
