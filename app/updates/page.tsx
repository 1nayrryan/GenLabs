import Link from "next/link";
import { mockUpdates } from "@/lib/mockUpdates";

export default function UpdatesPage() {
  const sorted = [...mockUpdates].sort((a, b) => (a.date < b.date ? 1 : -1));

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
                  {u.projectTitle}
                </span>
                <span className="font-mono text-xs text-muted">
                  {new Date(u.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                {u.content.slice(0, 140)}
                {u.content.length > 140 ? "…" : ""}
              </p>
              <p className="font-mono text-xs text-muted">by {u.author}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
