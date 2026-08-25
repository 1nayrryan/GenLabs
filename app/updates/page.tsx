import Link from "next/link";
import { mockUpdates } from "@/lib/mockUpdates";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default function UpdatesPage() {
  const updates = [...mockUpdates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Updates
          </h1>
          <p className="text-muted">
            Progress reports and news from BCA projects.
          </p>
        </div>

        {updates.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {updates.map((update, i) => (
              <ScrollReveal key={update.id} delay={i * 80}>
                <Link
                  href={`/updates/${update.id}`}
                  className="block p-6 border border-line rounded-card card-hover"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-ink">
                      {update.projectTitle}
                    </span>
                    <span className="text-xs text-muted">·</span>
                    <span className="text-xs text-muted">
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed line-clamp-3 mb-3">
                    {update.body}
                  </p>
                  <span className="text-xs text-muted">{update.author}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-mist rounded-card-lg">
            <p className="text-muted text-sm">
              No updates posted yet. Be the first to share progress.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
