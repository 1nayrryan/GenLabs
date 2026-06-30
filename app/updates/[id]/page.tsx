import { notFound } from "next/navigation";
import Link from "next/link";
import { mockUpdates } from "@/lib/mockUpdates";

export default function UpdateDetail({ params }: { params: { id: string } }) {
  const update = mockUpdates.find((u) => u.id === params.id);
  if (!update) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link href={`/projects/${update.projectId}`} className="font-mono text-xs text-muted hover:text-ink underline">
        ← {update.projectTitle}
      </Link>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tightest2 mt-4 mb-3">
        Update on {update.projectTitle}
      </h1>
      <p className="font-mono text-xs text-muted mb-8">
        by {update.author} ·{" "}
        {new Date(update.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <p className="text-muted leading-relaxed whitespace-pre-line">{update.content}</p>
    </div>
  );
}
