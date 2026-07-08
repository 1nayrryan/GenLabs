// Swap these placeholders for your real Google Form URLs once you've
// built them — nothing else on this page needs to change.
const MENTEE_FORM_URL = "https://forms.gle/QR9FtTJxhEAVeTZ66";
const MENTOR_FORM_URL = "https://forms.gle/j3y5SQKdixvbQ2tt6";

const resources = [
  {
    title: "Git & GitHub basics",
    body: "Cloning, branching, commits, and your first pull request — written for someone who's never touched the command line.",
  },
  {
    title: "Scoping your first project",
    body: "How to take a vague idea and cut it down to something you can actually finish in a few weeks.",
  },
  {
    title: "How to ask for help on a team",
    body: "Norms for working with collaborators you just met — async updates, code review etiquette, when to escalate to a mentor.",
  },
];

export default function MentorshipPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-2">Mentorship & resources</h1>
      <p className="text-muted max-w-2xl mb-12">
        You don't need to already know how to code, or have shipped something
        before, to start. This is where newer builders connect with students
        who've done it, and where older students can mentor younger ones.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="border-2 border-ink rounded-card p-6">
          <h2 className="text-lg font-semibold mb-2">New to building?</h2>
          <p className="text-sm text-muted mb-5">
            Request a mentor — usually a student who's shipped a project
            before — for check-ins as you go.
          </p>
          <a
            href={MENTEE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-pill bg-ink text-paper text-sm font-medium hover:opacity-85 transition-opacity"
          >
            Request a mentor →
          </a>
        </div>
        <div className="border-2 border-ink rounded-card p-6">
          <h2 className="text-lg font-semibold mb-2">Want to mentor?</h2>
          <p className="text-sm text-muted mb-5">
            If you've built and launched something before, apply to mentor a
            newer student — including outreach to younger students and
            middle schoolers.
          </p>
          <a
            href={MENTOR_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-pill border-2 border-ink text-sm font-medium hover:bg-mist transition-colors"
          >
            Apply to mentor →
          </a>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6">Learning modules</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {resources.map((r) => (
          <div key={r.title} className="border-2 border-line rounded-card p-5">
            <h3 className="font-semibold mb-2">{r.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
