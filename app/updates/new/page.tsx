"use client";

import { useState } from "react";
import { mockProjects } from "@/lib/mockProjects";

export default function PostUpdatePage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with a Supabase insert into an `articles` table —
    // see supabase/schema.sql. Look up the project's id from the title
    // typed into the input below before inserting.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="font-mono text-sm mb-3 text-muted">[ POSTED ]</p>
        <h1 className="text-2xl font-semibold tracking-tightest2 mb-3">
          Your update is up.
        </h1>
        <p className="text-muted">It'll show on the Updates page and on the project's own page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-2">Post an update</h1>
      <p className="text-muted mb-10">
        Share progress on something you're building — a small step counts.
      </p>

      <form onSubmit={handleSubmit} className="space-y-7">
        <Field label="Project title">
          <input
            required
            list="project-options"
            className="field"
            placeholder="Start typing to search posted builds…"
          />
          <datalist id="project-options">
            {mockProjects.map((p) => (
              <option key={p.id} value={p.title} />
            ))}
          </datalist>
        </Field>

        <Field label="Author">
          <input required className="field" placeholder="Your name" />
        </Field>

        <Field label="Update">
          <textarea
            required
            rows={6}
            className="field"
            placeholder="What's new? What did you ship, learn, or get stuck on?"
          />
        </Field>

        <button
          type="submit"
          className="w-full px-5 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity"
        >
          Post update
        </button>
      </form>

      <style>{`
        .field {
          width: 100%;
          background: #FFFFFF;
          border: 2px solid #0E0E10;
          border-radius: 16px;
          padding: 0.65rem 0.9rem;
          color: #0E0E10;
          font-size: 0.9rem;
        }
        .field::placeholder { color: #71717A; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm text-muted mb-2">{label}</span>
      {children}
    </label>
  );
}
