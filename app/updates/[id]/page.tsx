import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type ArticleRow = {
  id: string;
  project_id: string | null;
  author_name: string;
  content: string;
  created_at: string | null;
};

async function loadUpdate(id: string): Promise<ArticleRow | null> {
  if (!supabase) return null;

  const { data } = await supabase
    .from("articles")
    .select("id,project_id,author_name,content,created_at")
    .eq("id", id)
    .maybeSingle();

  return data;
}

export default async function UpdateDetail({ params }: { params: { id: string } }) {
  const update = await loadUpdate(params.id);
  if (!update) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href={update.project_id ? `/projects/${update.project_id}` : "/projects"} className="font-mono text-xs text-muted hover:text-ink underline">
        ← Back to builds
      </Link>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tightest2 mt-4 mb-3">
        Project update
      </h1>
      <p className="font-mono text-xs text-muted mb-8">
        by {update.author_name} ·{" "}
        {new Date(update.created_at ?? Date.now()).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <p className="text-muted leading-relaxed whitespace-pre-line">{update.content}</p>
    </div>
  );
}
