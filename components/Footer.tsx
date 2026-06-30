export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-muted">
        <div>
          <p className="text-ink font-semibold mb-1 tracking-tightest2">GenLabs</p>
          <p>A BCA student initiative. Built by students, for students.</p>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-ink font-medium mb-1">Platform</span>
            <a href="/projects" className="hover:text-ink">Browse builds</a>
            <a href="/submit" className="hover:text-ink">Post a build</a>
            <a href="/mentorship" className="hover:text-ink">Find a mentor</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-ink font-medium mb-1">Org</span>
            <a href="/about" className="hover:text-ink">Mission</a>
            <a href="mailto:hello@genlabs.org" className="hover:text-ink">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
