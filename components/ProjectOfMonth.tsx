import Link from "next/link";
import type { Project } from "@/lib/types";

export default function ProjectOfMonth({ project }: { project: Project }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 block">
          Project of the Month
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tightest2 leading-tight mb-4">
          {project.title}
        </h2>
        <p className="text-muted leading-relaxed mb-6">{project.summary}</p>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold bg-ink text-paper px-5 py-2.5 rounded-pill hover:bg-ink/80 transition-colors"
        >
          View project
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M1 7h12M8 2l5 5-5 5" />
          </svg>
        </Link>
      </div>

      <div className="bg-mist rounded-card-lg p-8 md:p-10 flex items-center justify-center min-h-[240px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-ink/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-muted"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <p className="text-sm text-muted font-medium">{project.category}</p>
        </div>
      </div>
    </div>
  );
}
