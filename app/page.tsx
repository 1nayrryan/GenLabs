import Link from "next/link";
import { mockProjects } from "@/lib/mockProjects";
import ProjectCard from "@/components/ProjectCard";
import ProjectOfMonth from "@/components/ProjectOfMonth";
import PartnersStrip from "@/components/PartnersStrip";
import ScrollReveal from "@/components/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const projects = mockProjects;
  const featured =
    projects.find((p) => p.featured) ??
    projects.find((p) => p.status === "launched") ??
    projects[0];
  const openBuilds = projects.filter((p) => p.status === "seeking").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-mesh min-h-[70vh] flex items-center justify-center px-5">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6">
            Built by students.
            <br />
            Backed by each other.
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-xl mx-auto">
            GenLabs helps BCA students find collaborators, get mentored, and
            launch real projects — no existing network required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/submit"
              className="bg-ink text-paper font-semibold px-8 py-3.5 rounded-pill hover:bg-ink/80 transition-colors"
            >
              Post a build
            </Link>
            <Link
              href="/projects"
              className="border-2 border-ink font-semibold px-8 py-3.5 rounded-pill hover:bg-ink hover:text-paper transition-colors"
            >
              Browse builds
            </Link>
          </div>
        </div>
      </section>

      {/* Open Builds */}
      <section className="section-padding bg-mist/50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Open builds
                </h2>
                <p className="text-muted mt-1">
                  Projects looking for collaborators right now
                </p>
              </div>
              <Link
                href="/projects"
                className="text-sm font-semibold hover:underline hidden sm:block"
              >
                View all
              </Link>
            </div>
          </ScrollReveal>

          {openBuilds.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {openBuilds.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 100}>
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">
              No open builds yet — be the first to post one.
            </p>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/projects"
              className="text-sm font-semibold hover:underline"
            >
              View all builds
            </Link>
          </div>
        </div>
      </section>

      {/* Project of the Month */}
      {featured && (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <ProjectOfMonth project={featured} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="section-padding bg-mist/50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">
              How it works
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Post or browse",
                desc: "Share your project idea or explore builds from other students.",
              },
              {
                step: "02",
                title: "Get matched",
                desc: "Find collaborators with the skills you need — or offer yours.",
              },
              {
                step: "03",
                title: "Build and launch",
                desc: "Work together, ship something real, and show it to the world.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 150}>
                <div className="text-center p-8">
                  <span className="text-xs font-mono font-semibold text-muted tracking-wider">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <PartnersStrip />
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-ink text-paper">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Why this exists
              </h2>
              <p className="text-paper/70 leading-relaxed">
                Many BCA students want to build projects but don&apos;t have a
                CS network yet. GenLabs is the platform where they can find
                collaborators, get mentored, and launch real projects — all
                within the BCA community.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white/5 border border-white/10 rounded-card p-6 font-mono text-sm">
              <p className="text-paper/50 mb-4">// year targets</p>
              <div className="space-y-2">
                <p>
                  <span className="text-grass">15+</span>{" "}
                  <span className="text-paper/60">projects posted</span>
                </p>
                <p>
                  <span className="text-sun">25+</span>{" "}
                  <span className="text-paper/60">active members</span>
                </p>
                <p>
                  <span className="text-violet">3+</span>{" "}
                  <span className="text-paper/60">mentors paired</span>
                </p>
                <p>
                  <span className="text-rose">1+</span>{" "}
                  <span className="text-paper/60">partnership documented</span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
