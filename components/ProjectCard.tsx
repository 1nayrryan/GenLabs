import Link from "next/link";
import type { Project } from "@/lib/mockProjects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block bg-paper border border-line rounded-card p-6 card-hover"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-bold tracking-tight leading-snug group-hover:underline">
          {project.title}
        </h3>
        <StatusDot status={project.status} />
      </div>

      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        <span className="tag-solid">{project.category}</span>
        {project.skills.slice(0, 2).map((skill) => (
          <span key={skill} className="tag-outline">
            {skill}
          </span>
        ))}
        {project.skills.length > 2 && (
          <span className="tag-outline">+{project.skills.length - 2}</span>
        )}
      </div>
    </Link>
  );
}

function StatusDot({ status }: { status: Project["status"] }) {
  const colors: Record<string, string> = {
    seeking: "bg-rose",
    building: "bg-sun",
    launched: "bg-grass",
  };

  const labels: Record<string, string> = {
    seeking: "Seeking collaborators",
    building: "In progress",
    launched: "Launched",
  };

  return (
    <span className="status-tag bg-mist flex-shrink-0">
      <span className={`status-dot ${colors[status]}`} />
      <span className="hidden sm:inline">{labels[status]}</span>
    </span>
  );
}
