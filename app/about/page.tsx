import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            About GenLabs
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="prose max-w-none mb-12">
            <p className="text-muted leading-relaxed text-lg mb-6">
              GenLabs exists because many BCA students want to build projects
              but don&apos;t have a CS network yet. They don&apos;t know who to
              collaborate with, how to find a mentor, or where to start.
            </p>
            <p className="text-muted leading-relaxed text-lg">
              We&apos;re building the platform where they can find collaborators,
              get mentored, and launch real projects — all within the BCA
              community. No existing network required.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="bg-mist rounded-card-lg p-8 mb-12">
            <h2 className="text-xl font-bold mb-4">This year&apos;s goals</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "15+ projects posted",
                "25+ active members",
                "3+ mentors paired",
                "1+ partnership documented",
              ].map((goal) => (
                <div
                  key={goal}
                  className="flex items-center gap-3 p-3 bg-paper rounded-xl"
                >
                  <span className="w-2 h-2 rounded-full bg-grass flex-shrink-0" />
                  <span className="text-sm font-medium">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="text-center py-8 border-t border-line">
            <h2 className="text-xl font-bold mb-3">Get involved</h2>
            <p className="text-sm text-muted mb-6">
              Want to join GenLabs or learn more? Reach out.
            </p>
            <a
              href="mailto:genlabsteam@gmail.com"
              className="inline-flex items-center gap-2 bg-ink text-paper font-semibold px-6 py-3 rounded-pill hover:bg-ink/80 transition-colors"
            >
              Contact us
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
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
