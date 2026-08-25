import Link from "next/link";
import { notFound } from "next/navigation";
import { type Update } from "@/lib/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function UpdateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = getSupabaseServerClient();
  if (!supabase) notFound();

  const { data } = await supabase
    .from("articles")
    .select("*, projects!inner(title)")
    .eq("id", params.id)
    .single();

  if (!data) notFound();

  const update: Update = {
    id: data.id,
    projectId: data.project_id,
    projectTitle: (data.projects as { title: string })?.title || "Project",
    author: data.author_name,
    date: data.created_at,
    body: data.content,
  };

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

        <Link
          href={`/projects/${update.projectId}`}
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
      </div>
    </div>
  );
}
