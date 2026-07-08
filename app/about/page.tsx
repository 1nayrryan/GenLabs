export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-6">Why GenLabs exists</h1>
      <p className="text-muted leading-relaxed mb-6">
        Some students at BCA already have a network — older siblings in
        tech, parents who code, friends who've built apps. A lot of students
        don't. GenLabs exists for that second group: students with an idea
        and no obvious next step.
      </p>
      <p className="text-muted leading-relaxed mb-6">
        We're not just a place to list projects. We're trying to build a
        pathway — post an idea, get matched with collaborators and a mentor,
        ship something real, and have it live publicly under your name.
      </p>

      <h2 className="text-xl font-semibold mb-4">This year's goals</h2>
      <ul className="font-mono text-sm text-muted space-y-2 mb-12">
        <li>→ 15+ projects posted</li>
        <li>→ 25+ active members</li>
        <li>→ 3+ mentors / advisors</li>
        <li>→ 1+ community or organization partnership</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">Get involved</h2>
      <p className="text-muted leading-relaxed">
        Looking to join the board, mentor, or just post a project? Reach out
        at{" "}
        <a href="mailto:hello@genlabs.org" className="underline hover:no-underline">
          hello@genlabs.org
        </a>
        .
      </p>
    </div>
  );
}
