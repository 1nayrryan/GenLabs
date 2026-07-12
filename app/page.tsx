import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import MetricsPanel from "@/components/MetricsPanel";
import ProjectOfMonth from "@/components/ProjectOfMonth";
import PartnersStrip from "@/components/PartnersStrip";
import ScrollReveal from "@/components/ScrollReveal";
import { type Project } from "@/lib/mockProjects";
import { getMetrics } from "@/lib/metrics";
import { supabase } from "@/lib/supabaseClient";

type ProjectRow = {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  status: string;
  tags: string[] | null;
  looking_for: string[] | null;
  team_members: string[] | null;
  external_link: string | null;
};

function rowToProject(row: ProjectRow): Project {
  const isGithub = row.external_link?.startsWith("https://github.com/");
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    description: row.description ?? row.summary,
    status: (row.status as Project["status"]) ?? "building",
    category: row.tags ?? [],
    skills: row.looking_for ?? [],
    contributors: row.team_members ?? [],
    lookingFor: row.looking_for ?? [],
    links: row.external_link && !isGithub ? [{ label: "Live site", url: row.external_link }] : undefined,
    githubRepo: isGithub ? row.external_link!.replace("https://github.com/", "").replace(/\/$/, "") : undefined,
  };
}

export default async function Home() {
  const metrics = await getMetrics();

  let projects: Project[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("projects")
      .select("id,title,summary,description,status,tags,looking_for,team_members,external_link")
      .order("created_at", { ascending: false });
    projects = (data ?? []).map(rowToProject);
  }

  const featured = projects.find((p) => p.status === "launched") ?? projects[0] ?? null;

  return (
    <>
      {/* Hero — split screen: text left, the one vibrant color moment
          (plus the live metrics readout) right */}
      <section className="border-b border-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={0}>
            <p className="font-mono text-xs text-muted mb-4 tracking-wide uppercase">
              BCA student-led · open to all
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[1.02] tracking-tightest2 mb-6">
              Built by students.
              <br />
              Backed by each other.
            </h1>
            <p className="text-lg text-muted max-w-md leading-relaxed mb-8">
              GenLabs connects BCA students who have an idea — but no team,
              no mentor, or no CS background — with collaborators who can
              help them build it and launch it publicly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/submit"
                className="px-6 py-3 rounded-pill bg-ink text-paper font-medium hover:opacity-85 transition-opacity"
              >
                Post a build
              </Link>
              <Link
                href="/projects"
                className="px-6 py-3 rounded-pill border-2 border-ink font-medium hover:bg-mist transition-colors"
              >
                Browse builds
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="relative h-72 md:h-96 rounded-card overflow-hidden border-2 border-ink">
              <div className="hero-mesh absolute inset-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MetricsPanel {...metrics} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Open builds — moved up to where "how it works" used to sit */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold tracking-tightest2">Open builds</h2>
            <Link href="/projects" className="text-sm underline hover:no-underline">
              View all →
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="text-muted font-mono text-sm border-2 border-ink rounded-card p-8 text-center">
              No live builds yet — the first posted project will appear here.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {projects.slice(0, 3).map((p, index) => (
                <ScrollReveal key={p.id} delay={index * 80}>
                  <ProjectCard project={p} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>
      </ScrollReveal>

      {featured ? (
        <ScrollReveal delay={80}>
          <ProjectOfMonth project={featured} />
        </ScrollReveal>
      ) : null}

      {/* How it works — a real sequence, shown as a connected path rather
          than three equal-width boxes */}
      <ScrollReveal>
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-line">
          <h2 className="text-2xl font-semibold tracking-tightest2 mb-12">How it works</h2>
          <div className="relative max-w-2xl">
            <div
              className="absolute left-[15px] top-2 bottom-2 border-l-2 border-dashed border-line"
              aria-hidden="true"
            />
            {[
              {
                title: "Post or browse",
                body: "Pitch your idea, or find a build that needs a hand. No prior network required.",
              },
              {
                title: "Get matched",
                body: "We pair you with collaborators and, if you want one, a mentor who's shipped before.",
              },
              {
                title: "Build and launch",
                body: "Ship something real, public, and yours — the kind of thing you can point to later.",
              },
            ].map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 80}>
                <div className="relative pl-12 pb-10 last:pb-0">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <PartnersStrip />
      </ScrollReveal>

      {/* Mission */}
      <ScrollReveal>
        <section className="border-t border-line bg-mist">
          <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tightest2 mb-4">
                Why this exists
              </h2>
              <p className="text-muted leading-relaxed">
                Not every student who wants to build something has a network of
                engineers to call. GenLabs is built for the student who has an
                idea and nowhere to take it — especially students without
                existing CS connections. The goal isn't just a listing board;
                it's a pathway from idea to shipped product, with people
                checking in along the way.
              </p>
            </div>
            <div className="font-mono text-sm space-y-2 border-2 border-ink rounded-card p-6 bg-paper">
              <p className="text-muted mb-2"># this year's targets</p>
              <p>host_projects: <span className="font-semibold">15+</span></p>
              <p>active_members: <span className="font-semibold">25+</span></p>
              <p>mentors_advisors: <span className="font-semibold">3+</span></p>
              <p>community_partners: <span className="font-semibold">1+</span></p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
