import Link from "next/link";
import { notFound } from "next/navigation";
import { mockUpdates } from "@/lib/mockUpdates";
import { mockProjects } from "@/lib/mockProjects";

export const dynamic = "force-dynamic";

export default function UpdateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const update = mockUpdates.find((u) => u.id === params.id);
  if (!update) notFound();

  const project = mockProjects.find((p) => p.id === update.projectId);

  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/updates"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-8"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 2L4 7l5 5" />
          </svg>
          All updates
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {update.projectTitle}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>{update.author}</span>
            <span>·</span>
            <span>{new Date(update.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="border-t border-line pt-8 mb-8">
          <p className="text-muted leading-relaxed whitespace-pre-line">
            {update.body}
          </p>
        </div>

        {project && (
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold bg-ink text-paper px-5 py-2.5 rounded-pill hover:bg-ink/80 transition-colors"
          >
            View project
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 6h10M7 2l4 4-4 4" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
