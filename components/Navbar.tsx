import Link from "next/link";
import PostMenu from "./PostMenu";
import MobileMenu from "./MobileMenu";
import AuthButton from "./AuthButton";

const links = [
  { href: "/projects", label: "Builds" },
  { href: "/updates", label: "Updates" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line relative">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileMenu />
          <Link href="/" className="font-semibold text-lg tracking-tightest2">
            GenLabs
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <AuthButton />
          <PostMenu />
        </div>
      </div>
    </header>
  );
}
