import Link from "next/link";
import StatusTag from "./StatusTag";
import Tag from "./Tag";
import { Project } from "@/lib/mockProjects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-card border-2 border-ink p-6 bg-paper hover:bg-mist transition-colors group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-lg leading-snug tracking-tightest2 group-hover:underline">
          {project.title}
        </h3>
        <StatusTag status={project.status} />
      </div>
      <p className="text-sm text-muted mb-4 leading-relaxed">{project.summary}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.category.map((t) => (
          <Tag key={t} label={t} variant="solid" />
        ))}
        {project.skills.map((s) => (
          <Tag key={s} label={s} variant="outline" />
        ))}
      </div>
    </Link>
  );
}
