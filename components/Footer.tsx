import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-muted">
        <div>
          <p
            className="text-ink font-semibold mb-1 tracking-tightest2"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            GenLabs
          </p>
          <p>A BCA student initiative. Built by students, for students.</p>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-ink font-medium mb-1">Platform</span>
            <Link href="/projects" className="hover:text-ink">
              Browse builds
            </Link>
            <Link href="/submit" className="hover:text-ink">
              Post a build
            </Link>
            <Link href="/mentorship" className="hover:text-ink">
              Find a mentor
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-ink font-medium mb-1">Org</span>
            <Link href="/about" className="hover:text-ink">
              Mission
            </Link>
            <a href="mailto:genlabsteam@gmail.com" className="hover:text-ink">
              Contact
            </a>
            <a
              href="https://www.instagram.com/genlabs_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              Instagram
            </a>
            <a
              href="Linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <p>&copy; {new Date().getFullYear()} GenLabs. Made at BCA.</p>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-ink transition-colors">
            About
          </Link>
          <a
            href="https://github.com/1nayrryan/GenLabs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
