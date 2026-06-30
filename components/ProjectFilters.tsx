"use client";

import { Status } from "./StatusTag";

const statusOptions: { value: Status | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "seeking", label: "Seeking collaborators" },
  { value: "building", label: "In progress" },
  { value: "launched", label: "Launched" },
];

type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  categories: readonly string[];
  selectedCategories: string[];
  onToggleCategory: (c: string) => void;
  skills: readonly string[];
  selectedSkills: string[];
  onToggleSkill: (s: string) => void;
  status: Status | "all";
  onStatusChange: (s: Status | "all") => void;
  onClear: () => void;
  resultCount: number;
};

export default function ProjectFilters({
  search,
  onSearchChange,
  categories,
  selectedCategories,
  onToggleCategory,
  skills,
  selectedSkills,
  onToggleSkill,
  status,
  onStatusChange,
  onClear,
  resultCount,
}: Props) {
  const filtersActive =
    search !== "" || selectedCategories.length > 0 || selectedSkills.length > 0 || status !== "all";

  return (
    <div className="mb-10">
      {/* Search */}
      <div className="relative mb-6">
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search builds by name, description, or tag..."
          className="w-full pl-12 pr-4 py-3 rounded-pill border-2 border-ink bg-paper text-sm placeholder:text-muted"
        />
      </div>

      {/* Project type */}
      <div className="mb-4">
        <p className="font-mono text-xs uppercase tracking-wide text-muted mb-2">
          Project type
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              data-active={selectedCategories.includes(c)}
              onClick={() => onToggleCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Skills required — collapsed by default to avoid crowding the page */}
      <details className="mb-4 group">
        <summary className="font-mono text-xs uppercase tracking-wide text-muted mb-2 cursor-pointer list-none flex items-center gap-1.5">
          Skills required
          <span className="transition-transform group-open:rotate-180">⌄</span>
          {selectedSkills.length > 0 && (
            <span className="text-ink">({selectedSkills.length})</span>
          )}
        </summary>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              data-active={selectedSkills.includes(s)}
              onClick={() => onToggleSkill(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </details>

      {/* Status */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((o) => (
            <button
              key={o.value}
              type="button"
              className="chip"
              data-active={status === o.value}
              onClick={() => onStatusChange(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted">
            {resultCount} build{resultCount !== 1 ? "s" : ""}
          </span>
          {filtersActive && (
            <button
              type="button"
              onClick={onClear}
              className="font-mono text-xs underline text-muted hover:text-ink"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
