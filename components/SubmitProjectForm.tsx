"use client";

import { useState } from "react";
import { CATEGORY_OPTIONS, SKILL_OPTIONS } from "@/lib/mockProjects";
import { supabase } from "@/lib/supabaseClient";

export default function SubmitProjectForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const title = (data.get("title") as string).trim();
    const summary = (data.get("summary") as string).trim();
    const description = (data.get("description") as string).trim();
    const status = data.get("status") as string;
    const lookingFor = (data.get("lookingFor") as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const teamMembers = (data.get("teamMembers") as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const externalLink = (data.get("externalLink") as string).trim() || null;

    if (!supabase) {
      setSubmitted(true);
      setLoading(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setError("Please sign in first.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").upsert(
      { id: userData.user.id },
      { onConflict: "id" }
    );

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("projects").insert({
      title,
      summary,
      description,
      status,
      tags: category,
      looking_for: [...skills, ...lookingFor],
      team_members: teamMembers,
      external_link: externalLink,
      owner_id: userData.user.id,
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
        <h1 className="text-2xl font-semibold tracking-tightest2 mb-3">Your build is up.</h1>
        <p className="text-muted">
          It’ll show on the board right away. We’ll reach out if a collaborator or mentor is a good fit.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-2">Post a build</h1>
      <p className="text-muted mb-10">Share what you’re building, what you need, and where you’re at.</p>

      <form onSubmit={handleSubmit} className="space-y-7">
        <Field label="Project title">
          <input name="title" required className="field" placeholder="Campus Tutor Match" />
        </Field>

        <Field label="One-line summary">
          <input
            name="summary"
            required
            className="field"
            placeholder="A web app that matches BCA students with peer tutors."
          />
        </Field>

        <Field label="Team members (optional)">
          <input name="teamMembers" className="field" placeholder="Ava, Jordan, Sam" />
        </Field>

        <Field label="Full description">
          <textarea
            name="description"
            required
            rows={4}
            className="field"
            placeholder="What problem does it solve? Who is it for? What’s the current state?"
          />
        </Field>

        <Field label="Status">
          <select name="status" className="field">
            <option value="seeking">Seeking collaborators</option>
            <option value="building">In progress</option>
            <option value="launched">Launched</option>
          </select>
        </Field>

        <Field label="Project type">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                type="button"
                key={c}
                className="chip"
                data-active={category.includes(c)}
                onClick={() => toggle(category, c, setCategory)}
              >
                {c}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Skills needed (optional)">
          <div className="flex flex-wrap gap-2 mb-2">
            {SKILL_OPTIONS.map((s) => (
              <button
                type="button"
                key={s}
                className="chip"
                data-active={skills.includes(s)}
                onClick={() => toggle(skills, s, setSkills)}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            name="lookingFor"
            className="field"
            placeholder="Any other roles, e.g. level designer, copywriter (comma-separated)"
          />
        </Field>

        <Field label="GitHub repo or live site URL (optional)">
          <input
            name="externalLink"
            type="url"
            className="field"
            placeholder="https://github.com/you/repo or https://yourapp.com"
          />
        </Field>

        <Field label="Your email">
          <input name="email" required type="email" className="field" placeholder="you@bca.edu" />
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
          {loading ? "Posting…" : "Post it"}
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
