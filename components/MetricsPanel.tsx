import { SiteMetrics } from "@/lib/metrics";

function MetricRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[0.65rem] uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="font-mono text-2xl font-semibold tracking-tightest2">
        {value}
      </span>
    </div>
  );
}

export default function MetricsPanel({ projects, members, partners, visits }: SiteMetrics) {
  return (
    <div className="bg-paper/95 backdrop-blur px-6 py-5 rounded-card border-2 border-ink w-60 space-y-2.5">
      <MetricRow label="Projects" value={projects} />
      <MetricRow label="Builders" value={members} />
      <MetricRow label="Partners" value={partners} />
      <MetricRow label="Visits" value={visits} />
    </div>
  );
}
