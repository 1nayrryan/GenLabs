import Link from "next/link";
import type { Project } from "@/lib/types";

export default function ProjectOfMonth({ project }: { project: Project }) {
  const hasExternalLink =
    project.external_link && !project.githubRepo;

  const previewContent = project.imageUrl ? (
    <a
      href={project.external_link || `/projects/${project.id}`}
      target={project.external_link ? "_blank" : undefined}
      rel={project.external_link ? "noopener noreferrer" : undefined}
      className="block"
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover rounded-card-lg"
      />
    </a>
  ) : project.githubRepo ? (
    <a
      href={`https://github.com/${project.githubRepo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <img
        src={`https://opengraph.githubassets.com/1/${project.githubRepo}`}
        alt={project.title}
        className="w-full h-full object-cover rounded-card-lg"
      />
    </a>
  ) : hasExternalLink ? (
    <a
      href={project.external_link}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden rounded-card-lg"
    >
      <img
        src={`https://image.thum.io/get/width/800/crop/600/${project.external_link}`}
        alt={project.title}
        className="w-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </a>
  ) : (
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
  );

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
        <div className="flex flex-wrap gap-3">
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
          {hasExternalLink && (
            <a
              href={project.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold border-2 border-ink px-5 py-2.5 rounded-pill hover:bg-ink hover:text-paper transition-colors"
            >
              Visit site
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 9l6-6M3 3h6v6" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="bg-mist rounded-card-lg overflow-hidden min-h-[240px] flex items-center justify-center">
        {previewContent}
      </div>
    </div>
  );
}
