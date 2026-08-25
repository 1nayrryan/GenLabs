import { team } from "@/lib/team";
import ScrollReveal from "@/components/ScrollReveal";

const sections = [
  { key: "board", label: "Board" },
  { key: "development", label: "Development" },
  { key: "business", label: "Business" },
  { key: "design", label: "Design" },
] as const;

export default function TeamPage() {
  return (
    <div className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Team
          </h1>
          <p className="text-muted max-w-lg mx-auto">
            The people behind GenLabs.
          </p>
        </div>

        {team.length > 0 ? (
          <div className="space-y-16">
            {sections.map((section) => {
              const members = team.filter((m) => m.section === section.key);
              if (members.length === 0) return null;
              return (
                <ScrollReveal key={section.key}>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight mb-8 text-center">
                      {section.label}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                      {members.map((member) => (
                        <div
                          key={member.name}
                          className="flex flex-col items-center w-[140px]"
                        >
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-24 h-24 rounded-full object-cover border-2 border-line mb-3"
                            />
                          ) : (
                            <div className="w-24 h-24 bg-mist rounded-full flex items-center justify-center border-2 border-line mb-3">
                              <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-muted"
                              >
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                            </div>
                          )}
                          <h3 className="text-sm font-bold text-center leading-tight">
                            {member.name}
                          </h3>
                          <p className="text-xs text-muted text-center mt-1">
                            {member.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-mist rounded-card-lg">
            <p className="text-muted text-sm">Team info coming soon.</p>
          </div>
        )}

        <ScrollReveal>
          <div className="mt-20 text-center bg-mist rounded-card-lg p-8">
            <h2 className="text-lg font-bold mb-2">Want to join the team?</h2>
            <p className="text-sm text-muted mb-6">
              We&apos;re always looking for passionate students to help build
              GenLabs.
            </p>
            <a
              href="mailto:genlabsteam@gmail.com"
              className="inline-flex items-center gap-2 bg-ink text-paper font-semibold px-6 py-3 rounded-pill hover:bg-ink/80 transition-colors"
            >
              Get in touch
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
