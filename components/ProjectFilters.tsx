"use client";

import { useState } from "react";
import { CATEGORY_OPTIONS, SKILL_OPTIONS } from "@/lib/mockProjects";

type Props = {
  onSearch: (q: string) => void;
  onCategoryChange: (cats: string[]) => void;
  onSkillChange: (skills: string[]) => void;
  onStatusChange: (status: string) => void;
  resultCount: number;
  hasFilters: boolean;
  onClear: () => void;
};

export default function ProjectFilters({
  onSearch,
  onCategoryChange,
  onSkillChange,
  onStatusChange,
  resultCount,
  hasFilters,
  onClear,
}: Props) {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [status, setStatus] = useState("all");

  function toggleItem(
    item: string,
    list: string[],
    setter: (v: string[]) => void,
    onChange: (v: string[]) => void
  ) {
    const next = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    setter(next);
    onChange(next);
  }

  return (
    <div className="space-y-5">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="7" cy="7" r="5" />
          <path d="M11 11l3 3" />
        </svg>
        <input
          type="text"
          placeholder="Search builds..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          className="input-field pl-11"
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          Project Type
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              data-active={categories.includes(cat)}
              className="chip"
              onClick={() =>
                toggleItem(cat, categories, setCategories, onCategoryChange)
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <details className="group">
        <summary className="text-xs font-semibold uppercase tracking-wider text-muted cursor-pointer hover:text-ink transition-colors">
          Skills Required
        </summary>
        <div className="flex flex-wrap gap-2 mt-2">
          {SKILL_OPTIONS.map((skill) => (
            <button
              key={skill}
              data-active={skills.includes(skill)}
              className="chip"
              onClick={() =>
                toggleItem(skill, skills, setSkills, onSkillChange)
              }
            >
              {skill}
            </button>
          ))}
        </div>
      </details>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
          Status
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "All" },
            { value: "seeking", label: "Seeking" },
            { value: "building", label: "In progress" },
            { value: "launched", label: "Launched" },
          ].map((s) => (
            <button
              key={s.value}
              data-active={status === s.value}
              className="chip"
              onClick={() => {
                setStatus(s.value);
                onStatusChange(s.value);
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {(hasFilters || search) && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </span>
          <button
            onClick={() => {
              setSearch("");
              setCategories([]);
              setSkills([]);
              setStatus("all");
              onClear();
            }}
            className="text-sm font-medium text-ink underline underline-offset-4 hover:text-muted transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
