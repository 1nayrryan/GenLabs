"use client";

import { useState } from "react";
import { CATEGORY_OPTIONS, SKILL_OPTIONS } from "@/lib/mockProjects";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with a Supabase insert into the `projects` table,
    // including the `category` and `skills` arrays from state above.
    // const { error } = await supabase.from("projects").insert({ ... })
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="font-mono text-sm mb-3 text-muted">[ POSTED ]</p>
        <h1 className="text-2xl font-semibold tracking-tightest2 mb-3">
          Your build is up.
        </h1>
        <p className="text-muted">
          It'll show up on the board once it's reviewed. We'll reach out if a
          collaborator or mentor is a good fit.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-2">Post a build</h1>
      <p className="text-muted mb-10">
        Tell us what you're building or want to build. Even a rough idea counts.
      </p>

      <form onSubmit={handleSubmit} className="space-y-7">
        <Field label="Project title">
          <input required className="field" placeholder="Campus Tutor Match" />
        </Field>

        <Field label="What is it?">
          <textarea
            required
            rows={4}
            className="field"
            placeholder="One or two sentences on what it does and who it's for."
          />
        </Field>

        <Field label="Status">
          <select className="field">
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
          <div className="flex flex-wrap gap-2">
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
        </Field>

        <Field label="Your email">
          <input required type="email" className="field" placeholder="you@bca.edu" />
        </Field>

        <button
          type="submit"
          className="w-full px-5 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity"
        >
          Post it
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
