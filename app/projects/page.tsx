"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";
import { Status } from "@/components/StatusTag";
import { mockProjects, CATEGORY_OPTIONS, SKILL_OPTIONS } from "@/lib/mockProjects";

// NOTE: this page reads from lib/mockProjects.ts so the board works
// before Supabase is wired up. Once your database is live, replace the
// `mockProjects` import with a Supabase query in a useEffect (or a
// server component fetch) — the filtering logic below doesn't change.

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [status, setStatus] = useState<Status | "all">("all");

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mockProjects.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (selectedCategories.length > 0 && !selectedCategories.some((c) => p.category.includes(c)))
        return false;
      if (selectedSkills.length > 0 && !selectedSkills.some((s) => p.skills.includes(s)))
        return false;
      if (q) {
        const haystack = [p.title, p.summary, ...p.category, ...p.skills]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, selectedCategories, selectedSkills, status]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-2">Builds</h1>
        <p className="text-muted">
          Browse what's being built right now. Find one to join, or post your own.
        </p>
      </div>

      <ProjectFilters
        search={search}
        onSearchChange={setSearch}
        categories={CATEGORY_OPTIONS}
        selectedCategories={selectedCategories}
        onToggleCategory={(c) => toggle(selectedCategories, c, setSelectedCategories)}
        skills={SKILL_OPTIONS}
        selectedSkills={selectedSkills}
        onToggleSkill={(s) => toggle(selectedSkills, s, setSelectedSkills)}
        status={status}
        onStatusChange={setStatus}
        onClear={() => {
          setSearch("");
          setSelectedCategories([]);
          setSelectedSkills([]);
          setStatus("all");
        }}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <p className="text-muted font-mono text-sm border-2 border-ink rounded-card p-8 text-center">
          Nothing matches those filters yet — try clearing one, or be the first to post a build like this.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
