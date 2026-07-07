import { partners } from "@/lib/partners";

export default function PartnersStrip() {
  if (partners.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-line">
      <p className="font-mono text-xs uppercase tracking-wide text-muted mb-6 text-center">
        Backed by
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {partners.map((p, i) => (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 w-40 rounded-card border-2 border-dashed border-line flex items-center justify-center hover:border-ink transition-colors"
          >
            {p.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.logoUrl} alt={p.name} className="max-h-10 max-w-[80%] object-contain" />
            ) : (
              <span className="font-mono text-xs text-muted px-3 text-center">{p.name}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
