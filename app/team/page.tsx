import { team } from "@/lib/team";

export default function TeamPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tightest2 mb-2">Team</h1>
      <p className="text-muted mb-12">The board behind GenLabs.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
        {team.map((member, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full border-2 border-ink flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <p className="font-semibold">{member.name}</p>
            <p className="font-mono text-xs text-muted">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
