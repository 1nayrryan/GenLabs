import ScrollReveal from "@/components/ScrollReveal";

const MENTEE_FORM_URL = "https://forms.gle/QR9FtTJxhEAVeTZ66";
const MENTOR_FORM_URL = "https://forms.gle/j3y5SQKdixvbQ2tt6";

export default function MentorshipPage() {
  return (
    <div className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Mentorship
          </h1>
          <p className="text-muted max-w-lg mx-auto">
            Whether you&apos;re looking for guidance or want to give back,
            GenLabs connects BCA students with mentors and mentees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <ScrollReveal>
            <a
              href={MENTEE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 border border-line rounded-card-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-mist rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">New to building?</h2>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Get matched with an experienced mentor who can guide you through
                your first project. No experience needed.
              </p>
              <span className="text-sm font-semibold underline underline-offset-4">
                Request a mentor
              </span>
            </a>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <a
              href={MENTOR_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 border border-line rounded-card-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-mist rounded-xl flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Want to mentor?</h2>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Share your skills and experience with fellow BCA students. Help
                someone launch their first real project.
              </p>
              <span className="text-sm font-semibold underline underline-offset-4">
                Apply to mentor
              </span>
            </a>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="bg-mist rounded-card-lg p-8">
            <h2 className="text-xl font-bold mb-6">Learning resources</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Git basics",
                  desc: "Learn version control to collaborate effectively.",
                  url: "https://youtu.be/mJ-qvsxPHpY?si=KY1cdijzDszyrpHU",
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="18" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <path d="M6 21V9a9 9 0 009 9" />
                    </svg>
                  ),
                },
                {
                  title: "Scoping projects",
                  desc: "How to break a big idea into buildable pieces.",
                  url: "https://www.youtube.com/watch?v=wUGiIdqjDdk",
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 3v18M3 9h18" />
                    </svg>
                  ),
                },
                {
                  title: "Asking for help",
                  desc: "How to get unstuck without feeling lost.",
                  url: "https://www.youtube.com/watch?v=UFc-RPbq8kg",
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                      <circle cx="12" cy="17" r="0.5" />
                    </svg>
                  ),
                },
              ].map((resource) => (
                <a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-paper rounded-card card-hover"
                >
                  <div className="text-muted mb-3">{resource.icon}</div>
                  <h3 className="text-sm font-bold mb-1">{resource.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {resource.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
