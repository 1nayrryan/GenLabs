"use client";

import { useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { mockProjects, Project } from "@/lib/mockProjects";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";

function rowToProject(row: Record<string, unknown>): Project {
  const ext = (row.external_link as string) || "";
  const isGitHub =
    ext.includes("github.com") && !ext.includes("github.com/");

  return {
    id: row.id as string,
    title: row.title as string,
    summary: row.summary as string,
    description: (row.description as string) || "",
    status: (row.status as Project["status"]) || "seeking",
    category: ((row.tags as string[])?.[0] as string) || "Web App",
    skills: (row.tags as string[]) || [],
    contributors: (row.team_members as string[]) || [],
    lookingFor: (row.looking_for as string[]) || [],
    links: ext && !isGitHub ? [{ label: "Visit site", url: ext }] : [],
    githubRepo: isGitHub
      ? ext.replace("https://github.com/", "")
      : undefined,
  };
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [status, setStatus] = useState("all");
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [usingDb, setUsingDb] = useState(false);

  // Try to load from Supabase on mount
  useState(() => {
    if (!supabase) return;
    supabase
      .from("projects")
      .select("*")
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProjects(data.map(rowToProject));
          setUsingDb(true);
        }
      });
  });

  const filtered = useMemo(() => {
    let result = projects;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category));
    }

    if (skills.length > 0) {
      result = result.filter((p) => skills.some((s) => p.skills.includes(s)));
    }

    if (status !== "all") {
      result = result.filter((p) => p.status === status);
    }

    return result;
  }, [search, categories, skills, status, projects]);

  const hasFilters =
    categories.length > 0 || skills.length > 0 || status !== "all";

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Builds
          </h1>
          <p className="text-muted">
            Browse projects from BCA students or find one to contribute to.
            {usingDb && (
              <span className="ml-2 text-xs font-mono text-grass">
                (live)
              </span>
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside>
            <ProjectFilters
              onSearch={setSearch}
              onCategoryChange={setCategories}
              onSkillChange={setSkills}
              onStatusChange={setStatus}
              resultCount={filtered.length}
              hasFilters={hasFilters || !!search}
              onClear={() => {
                setSearch("");
                setCategories([]);
                setSkills([]);
                setStatus("all");
              }}
            />
          </aside>

          <div>
            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted text-sm">
                  No projects match your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
