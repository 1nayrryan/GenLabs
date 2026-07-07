import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type ArticleRow = {
  id: string;
  project_id: string | null;
  author_name: string;
  content: string;
  created_at: string | null;
};

export default async function UpdatesPage() {
  let articles: ArticleRow[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("articles")
      .select("id,project_id,author_name,content,created_at")
      .order("created_at", { ascending: false });
    articles = data ?? [];
  }

  const sorted = [...articles].sort((a, b) => (a.created_at ?? "") < (b.created_at ?? "") ? 1 : -1);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-2">Updates</h1>
      <p className="text-muted mb-12">
        What's happening across builds right now, posted by the people building them.
      </p>

      {sorted.length === 0 ? (
        <p className="text-muted font-mono text-sm border-2 border-ink rounded-card p-8 text-center">
          No updates posted yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {sorted.map((u) => (
            <Link
              key={u.id}
              href={`/updates/${u.id}`}
              className="block rounded-card border-2 border-ink p-6 bg-paper hover:bg-mist transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-mono text-xs text-muted uppercase tracking-wide">
                  {u.project_id ? "Project update" : "Project update"}
                </span>
                <span className="font-mono text-xs text-muted">
                  {new Date(u.created_at ?? Date.now()).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                {u.content.slice(0, 140)}
                {u.content.length > 140 ? "…" : ""}
              </p>
              <p className="font-mono text-xs text-muted">by {u.author_name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
