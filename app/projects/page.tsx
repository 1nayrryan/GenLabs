"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";
import { Status } from "@/components/StatusTag";
import { mockProjects, CATEGORY_OPTIONS, SKILL_OPTIONS, type Project } from "@/lib/mockProjects";
import { supabase } from "@/lib/supabaseClient";

// Shape of a row coming back from the `projects` table.
// Matches the columns in supabase/schema.sql exactly so TypeScript
// catches any mismatch instead of silently giving us undefined.
type DbRow = {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  status: string;
  tags: string[] | null;
  looking_for: string[] | null;
  team_members: string[] | null;
  external_link: string | null;
};

function rowToProject(row: DbRow): Project {
  const isGithub = row.external_link?.startsWith("https://github.com/");
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    description: row.description ?? row.summary,
    status: (row.status as Status) ?? "building",
    category: row.tags ?? [],
    skills: row.looking_for ?? [],
    contributors: row.team_members ?? [],
    lookingFor: row.looking_for ?? [],
    links:
      row.external_link && !isGithub
        ? [{ label: "Live site", url: row.external_link }]
        : undefined,
    githubRepo: isGithub
      ? row.external_link!
          .replace("https://github.com/", "")
          .replace(/\/$/, "")
      : undefined,
  };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [status, setStatus] = useState<Status | "all">("all");

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      // No Supabase credentials yet — show mock data so the page still
      // looks right during development.
      if (!supabase) {
        if (isMounted) setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("id, title, summary, description, status, tags, looking_for, team_members, external_link")
        .order("created_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("Failed to load projects:", error.message);
        setDbError(true);
        setProjects(mockProjects); // graceful fallback to mock data
      } else {
        setProjects((data as DbRow[]).map(rowToProject));
      }

      setLoading(false);
    }

    loadProjects();
    return () => { isMounted = false; };
  }, []);

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.some((c) => p.category.includes(c))
      )
        return false;
      if (
        selectedSkills.length > 0 &&
        !selectedSkills.some((s) => p.skills.includes(s))
      )
        return false;
      if (q) {
        const haystack = [p.title, p.summary, ...p.category, ...p.skills]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [projects, search, selectedCategories, selectedSkills, status]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-2">Builds</h1>
        <p className="text-muted">
          Browse what's being built right now. Find one to join, or post your own.
        </p>
        {dbError && (
          <p className="font-mono text-xs text-red-600 mt-2">
            Couldn't reach the database — showing demo projects instead.
          </p>
        )}
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

      {loading ? (
        <p className="text-muted font-mono text-sm border-2 border-ink rounded-card p-8 text-center">
          Loading builds…
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-muted font-mono text-sm border-2 border-ink rounded-card p-8 text-center">
          Nothing matches those filters yet — try clearing one, or be the
          first to post a build like this.
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
