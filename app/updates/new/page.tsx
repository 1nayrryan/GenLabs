"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ProjectOption = { id: string; title: string };

export default function PostUpdatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      if (!supabase) return;
      const { data } = await supabase.from("projects").select("id,title").order("created_at", { ascending: false });
      setProjects((data ?? []).map((row: any) => ({ id: row.id, title: row.title })));
    }

    loadProjects();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const projectTitle = (data.get("projectTitle") as string).trim();
    const author = (data.get("author") as string).trim();
    const content = (data.get("content") as string).trim();

    if (!supabase) {
      setError("Supabase is not configured yet.");
      setLoading(false);
      return;
    }

    const { data: matches } = await supabase.from("projects").select("id").ilike("title", projectTitle).limit(1);
    const projectId = matches?.[0]?.id ?? null;

    if (!projectId) {
      setError("Choose an existing project title from the dropdown.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("articles").insert({
      project_id: projectId,
      author_name: author,
      content,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

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
            name="projectTitle"
            required
            list="project-options"
            className="field"
            placeholder="Start typing to search posted builds…"
          />
          <datalist id="project-options">
            {projects.map((p) => (
              <option key={p.id} value={p.title} />
            ))}
          </datalist>
        </Field>

        <Field label="Author">
          <input name="author" required className="field" placeholder="Your name" />
        </Field>

        <Field label="Update">
          <textarea
            name="content"
            required
            rows={6}
            className="field"
            placeholder="What's new? What did you ship, learn, or get stuck on?"
          />
        </Field>

        {error && (
          <p className="font-mono text-xs text-red-600 border border-red-200 rounded-card px-4 py-2">
            Error: {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-5 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity disabled:opacity-50"
        >
          {loading ? "Posting…" : "Post update"}
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
