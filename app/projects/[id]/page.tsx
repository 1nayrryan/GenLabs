import { notFound } from "next/navigation";
import Link from "next/link";
import StatusTag from "@/components/StatusTag";
import Tag from "@/components/Tag";
import GithubStats from "@/components/GithubStats";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import { type Project } from "@/lib/mockProjects";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isAdminUser, isProjectOwner } from "@/lib/auth";

export const dynamic = "force-dynamic";

type ArticleRow = {
  id: string;
  author_name: string;
  content: string;
  created_at: string | null;
};

type ProjectRow = {
  id: string;
  owner_id: string;
  title: string;
  summary: string;
  description: string | null;
  status: string;
  tags: string[] | null;
  looking_for: string[] | null;
  team_members: string[] | null;
  external_link: string | null;
};

async function loadProject(id: string): Promise<(Project & { owner_id: string }) | null> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return null;

    const { data } = await supabase
      .from("projects")
      .select("id,owner_id,title,summary,description,status,tags,looking_for,team_members,external_link")
      .eq("id", id)
      .maybeSingle();

    if (!data) return null;

    const isGithub = data.external_link?.startsWith("https://github.com/");
    return {
      id: data.id,
      owner_id: data.owner_id,
      title: data.title,
      summary: data.summary,
      description: data.description ?? data.summary,
      status: (data.status as Project["status"]) ?? "building",
      category: data.tags ?? [],
      skills: data.looking_for ?? [],
      contributors: data.team_members ?? [],
      lookingFor: data.looking_for ?? [],
      links: data.external_link && !isGithub ? [{ label: "Live site", url: data.external_link }] : undefined,
      githubRepo: isGithub ? data.external_link!.replace("https://github.com/", "").replace(/\/$/, "") : undefined,
    };
  } catch (error) {
    console.error("Error loading project:", error);
    return null;
  }
}

async function loadArticles(projectId: string): Promise<ArticleRow[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) return [];

    const { data } = await supabase
      .from("articles")
      .select("id,author_name,content,created_at")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    return data ?? [];
  } catch (error) {
    console.error("Error loading articles:", error);
    return [];
  }
}

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const project = await loadProject(params.id);
  if (!project) return notFound();

  const liveLink = project.links?.find((l) => l.label.toLowerCase().includes("site"));
  const articles = await loadArticles(project.id);
  const canEdit = (await isAdminUser()) || (await isProjectOwner(project.owner_id));

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/projects" className="font-mono text-xs text-muted hover:text-ink underline">
        ← All builds
      </Link>

      {/* Large title block */}
      <div className="mt-4 mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tightest2">{project.title}</h1>
          <StatusTag status={project.status} />
        </div>
        <p className="text-lg text-muted leading-relaxed">{project.summary}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-10">
        {project.category.map((c) => (
          <Tag key={c} label={c} variant="solid" />
        ))}
        {project.skills.map((s) => (
          <Tag key={s} label={s} variant="outline" />
        ))}
      </div>

      {/* Description */}
      <div className="mb-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-wide mb-3">About</h2>
        <p className="text-muted leading-relaxed whitespace-pre-line">{project.description}</p>
      </div>

      {/* Live link for finished products, GitHub stats for in-progress ones */}
      <div className="mb-10">
        {liveLink ? (
          <a
            href={liveLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity"
          >
            Visit the live site →
          </a>
        ) : project.githubRepo ? (
          <>
            <h2 className="font-mono text-xs text-muted uppercase tracking-wide mb-3">
              On GitHub
            </h2>
            <GithubStats repo={project.githubRepo} />
          </>
        ) : (
          <p className="font-mono text-xs text-muted border-2 border-dashed border-line rounded-card p-4">
            No GitHub repo linked yet.
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="font-mono text-xs text-muted uppercase tracking-wide mb-2">
            Contributors
          </h2>
          <ul className="text-sm space-y-1">
            {project.contributors.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        {project.lookingFor.length > 0 && (
          <div>
            <h2 className="font-mono text-xs text-muted uppercase tracking-wide mb-2">
              Looking for
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.lookingFor.map((l) => (
                <Tag key={l} label={l} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Articles */}
      <div className="mb-10">
        <h2 className="font-mono text-xs text-muted uppercase tracking-wide mb-3">Articles</h2>
        {articles.length === 0 ? (
          <p className="text-sm text-muted">No articles currently posted.</p>
        ) : (
          <div className="space-y-3">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/updates/${a.id}`}
                className="block border-2 border-line rounded-card p-4 hover:border-ink transition-colors"
              >
                <p className="text-sm leading-relaxed mb-1">
                  {a.content.slice(0, 100)}
                  {a.content.length > 100 ? "…" : ""}
                </p>
                <p className="font-mono text-xs text-muted">
                  {a.author_name} ·{" "}
                  {new Date(a.created_at ?? Date.now()).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:hello@genlabs.org?subject=Interested in ${project.title}`}
          className="inline-block px-6 py-3 rounded-pill border-2 border-ink font-medium hover:bg-mist transition-colors"
        >
          I want to help build this
        </a>
        {canEdit && (
          <>
            <Link
              href={`/projects/${project.id}/edit`}
              className="inline-block px-6 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity"
            >
              Edit project
            </Link>
            <DeleteProjectButton projectId={project.id} />
          </>
        )}
      </div>
    </div>
  );
}
