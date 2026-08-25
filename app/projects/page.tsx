"use client";

import { useState, useMemo, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { type Project, rowToProject } from "@/lib/types";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [status, setStatus] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("projects")
      .select("*")
      .then(({ data, error }) => {
        if (!error && data) {
          setProjects(data.map(rowToProject));
        }
        setLoading(false);
      });
  }, []);

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
            {loading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse border border-line rounded-card p-6">
                    <div className="h-5 bg-mist rounded w-2/3 mb-3" />
                    <div className="h-4 bg-mist rounded w-full mb-2" />
                    <div className="h-4 bg-mist rounded w-4/5" />
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted text-sm">
                  {projects.length === 0
                    ? "No projects yet — be the first to post one."
                    : "No projects match your filters."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
