import Link from "next/link";
import { Project } from "@/lib/mockProjects";

export default function ProjectOfMonth({ project }: { project: Project }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-t border-line">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tightest2 leading-[1.05]">
          Project of
          <br />
          the Month
        </h2>
        <div>
          <p className="font-semibold text-xl mb-2">{project.title}</p>
          <p className="text-muted leading-relaxed mb-4">{project.summary}</p>
          <Link
            href={`/projects/${project.id}`}
            className="inline-block px-5 py-2.5 rounded-pill border-2 border-ink text-sm font-medium hover:bg-mist transition-colors"
          >
            View product page →
          </Link>
        </div>
      </div>
    </section>
  );
}
