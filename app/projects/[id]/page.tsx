import Link from "next/link";
import { notFound } from "next/navigation";
import { type Project, rowToProject } from "@/lib/types";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser, isProjectOwner } from "@/lib/auth";
import GithubStats from "@/components/GithubStats";
import DeleteProjectButton from "@/components/DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = getSupabaseServerClient();
  if (!supabase) notFound();

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) notFound();

  const project = rowToProject(data);
  const ownerId = (data.owner_id as string) || null;

  const { data: articlesData } = await supabase
    .from("articles")
    .select("*")
    .eq("project_id", params.id)
    .order("created_at", { ascending: false });

  const articles = (articlesData || []).map((row) => ({
    id: row.id,
    author: row.author_name,
    date: row.created_at,
    body: row.content,
  }));

  const isOwner = await isProjectOwner(null);
  const isAdmin = await isAdminUser();

  const statusColors: Record<string, string> = {
    seeking: "bg-rose",
    building: "bg-sun",
    launched: "bg-grass",
  };
  const statusLabels: Record<string, string> = {
    seeking: "Seeking collaborators",
    building: "In progress",
    launched: "Launched",
  };

  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/projects"
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
          All builds
        </Link>

        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {project.title}
            </h1>
            <span className="status-tag bg-mist flex-shrink-0">
              <span
                className={`status-dot ${statusColors[project.status]}`}
              />
              {statusLabels[project.status]}
            </span>
          </div>
          <p className="text-lg text-muted leading-relaxed">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          <span className="tag-solid">{project.category}</span>
          {project.skills.map((skill) => (
            <span key={skill} className="tag-outline">
              {skill}
            </span>
          ))}
        </div>

        {project.description && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">About this project</h2>
            <p className="text-muted leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </section>
        )}

        {project.githubRepo ? (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">GitHub</h2>
            <GithubStats repo={project.githubRepo} />
          </section>
        ) : project.links && project.links.length > 0 ? (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">Links</h2>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink text-paper font-semibold px-5 py-2.5 rounded-pill hover:bg-ink/80 transition-colors text-sm"
                >
                  {link.label}
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
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-10">
            <div className="bg-mist rounded-card p-6 text-center">
              <p className="text-sm text-muted">
                No GitHub repo or live site linked yet.
              </p>
            </div>
          </section>
        )}

        {project.contributors.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">Contributors</h2>
            <div className="flex flex-wrap gap-2">
              {project.contributors.map((name) => (
                <span key={name} className="tag-outline">
                  {name}
                </span>
              ))}
            </div>
          </section>
        )}

        {project.lookingFor.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">Looking for</h2>
            <div className="flex flex-wrap gap-2">
              {project.lookingFor.map((role) => (
                <span key={role} className="tag-outline border-rose/30 text-rose">
                  {role}
                </span>
              ))}
            </div>
          </section>
        )}

        {articles.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">Articles</h2>
            <div className="space-y-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/updates/${article.id}`}
                  className="block p-4 border border-line rounded-card hover:bg-mist transition-colors"
                >
                  <p className="text-xs text-muted mb-1">
                    {article.author} ·{" "}
                    {new Date(article.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm leading-relaxed line-clamp-2">
                    {article.body}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {articles.length === 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">Articles</h2>
            <p className="text-sm text-muted">
              No articles currently posted.
            </p>
          </section>
        )}

        <section className="border-t border-line pt-8">
          <p className="text-sm text-muted mb-4">
            Want to help build this?
          </p>
          <a
            href="mailto:genlabsteam@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-semibold bg-ink text-paper px-5 py-2.5 rounded-pill hover:bg-ink/80 transition-colors"
          >
            I want to help
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
          </a>
        </section>

        {(isOwner || isAdmin) && (
          <section className="mt-8 pt-8 border-t border-line flex items-center gap-4">
            <Link
              href={`/projects/${project.id}/edit`}
              className="text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              Edit
            </Link>
            <DeleteProjectButton projectId={project.id} ownerId={ownerId} />
          </section>
        )}
      </div>
    </div>
  );
}
