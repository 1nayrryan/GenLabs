"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { CATEGORY_OPTIONS, SKILL_OPTIONS } from "@/lib/mockProjects";

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    status: "building",
    teamMembers: "",
    lookingFor: "",
    externalLink: "",
  });

  useEffect(() => {
    async function loadProject() {
      if (!supabase) {
        setError("Database not configured.");
        setLoading(false);
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase.from("projects").select("*").eq("id", params.id).maybeSingle();
      if (error || !data) {
        setError("Project not found.");
        setLoading(false);
        return;
      }

      setForm({
        title: data.title ?? "",
        summary: data.summary ?? "",
        description: data.description ?? "",
        status: data.status ?? "building",
        teamMembers: (data.team_members ?? []).join(", "),
        lookingFor: (data.looking_for ?? []).join(", "),
        externalLink: data.external_link ?? "",
      });
      setCategory(data.tags ?? []);
      setSkills(data.looking_for ?? []);
      setLoading(false);
    }

    loadProject();
  }, [params.id, router, supabase]);

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!supabase) {
      setError("Database not configured.");
      setSaving(false);
      return;
    }

    const lookingFor = form.lookingFor
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const teamMembers = form.teamMembers
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const { error } = await supabase.from("projects").update({
      title: form.title,
      summary: form.summary,
      description: form.description,
      status: form.status,
      tags: category,
      looking_for: [...skills, ...lookingFor],
      team_members: teamMembers,
      external_link: form.externalLink || null,
    }).eq("id", params.id);

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }

    router.push(`/projects/${params.id}`);
  }

  if (loading) {
    return <div className="max-w-xl mx-auto px-6 py-24 text-center">Loading your project…</div>;
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-2">Edit project</h1>
      <p className="text-muted mb-10">Update the details for this build.</p>

      <form onSubmit={handleSubmit} className="space-y-7">
        <label className="block">
          <span className="block text-sm text-muted mb-2">Project title</span>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="field" />
        </label>

        <label className="block">
          <span className="block text-sm text-muted mb-2">One-line summary</span>
          <input required value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="field" />
        </label>

        <label className="block">
          <span className="block text-sm text-muted mb-2">Team members</span>
          <input value={form.teamMembers} onChange={(e) => setForm({ ...form, teamMembers: e.target.value })} className="field" />
        </label>

        <label className="block">
          <span className="block text-sm text-muted mb-2">Description</span>
          <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="field" />
        </label>

        <label className="block">
          <span className="block text-sm text-muted mb-2">Status</span>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="field">
            <option value="seeking">Seeking collaborators</option>
            <option value="building">In progress</option>
            <option value="launched">Launched</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-sm text-muted mb-2">Project type</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button key={c} type="button" className="chip" data-active={category.includes(c)} onClick={() => toggle(category, c, setCategory)}>
                {c}
              </button>
            ))}
          </div>
        </label>

        <label className="block">
          <span className="block text-sm text-muted mb-2">Skills needed</span>
          <div className="flex flex-wrap gap-2 mb-2">
            {SKILL_OPTIONS.map((s) => (
              <button key={s} type="button" className="chip" data-active={skills.includes(s)} onClick={() => toggle(skills, s, setSkills)}>
                {s}
              </button>
            ))}
          </div>
          <input value={form.lookingFor} onChange={(e) => setForm({ ...form, lookingFor: e.target.value })} className="field" />
        </label>

        <label className="block">
          <span className="block text-sm text-muted mb-2">External link</span>
          <input value={form.externalLink} onChange={(e) => setForm({ ...form, externalLink: e.target.value })} className="field" />
        </label>

        {error && <p className="font-mono text-xs text-red-600">{error}</p>}

        <button type="submit" disabled={saving} className="w-full px-5 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity disabled:opacity-50">
          {saving ? "Saving…" : "Save changes"}
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
        .chip {
          border: 2px solid #0E0E10;
          border-radius: 999px;
          padding: 0.35rem 0.7rem;
          font-size: 0.85rem;
          background: #FFFFFF;
        }
        .chip[data-active="true"] {
          background: #0E0E10;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}
