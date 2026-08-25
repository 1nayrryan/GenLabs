"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { mockProjects } from "@/lib/mockProjects";

export default function NewUpdatePage() {
  const [projectTitles, setProjectTitles] = useState<string[]>([]);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    setProjectTitles(mockProjects.map((p) => p.title));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    if (supabase) {
      const projectTitle = form.get("project_title") as string;
      const project = mockProjects.find((p) => p.title === projectTitle);

      await supabase.from("articles").insert({
        project_id: project?.id ?? null,
        author_name: form.get("author"),
        content: form.get("content"),
      });
    }

    setPosted(true);
  }

  if (posted) {
    return (
      <div className="section-padding">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-grass/10 text-grass font-mono text-sm font-medium rounded-pill mb-4">
            [ POSTED ]
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Update posted!
          </h1>
          <p className="text-sm text-muted">
            Your update is now live on the updates page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Post an update
        </h1>
        <p className="text-muted mb-8">
          Share progress on a project with the community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Project title
            </label>
            <input
              name="project_title"
              list="projects-list"
              required
              className="input-field"
              placeholder="Start typing..."
            />
            <datalist id="projects-list">
              {projectTitles.map((title) => (
                <option key={title} value={title} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Author</label>
            <input name="author" required className="input-field" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Content
            </label>
            <textarea
              name="content"
              rows={8}
              required
              className="input-field resize-none"
              placeholder="Write your update..."
            />
          </div>

          <button
            type="submit"
            className="bg-ink text-paper font-semibold px-6 py-3 rounded-pill hover:bg-ink/80 transition-colors"
          >
            Post update
          </button>
        </form>
      </div>
    </div>
  );
}
