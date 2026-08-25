export default function MetricsPanel({
  metrics,
}: {
  metrics: { projects: number; members: number; partners: number; visits: number };
}) {
  const items = [
    { label: "Projects", value: metrics.projects },
    { label: "Builders", value: metrics.members },
    { label: "Partners", value: metrics.partners },
    { label: "Visits", value: metrics.visits },
  ];

  return (
    <div className="glass rounded-card-lg p-6 md:p-8">
      <div className="grid grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs font-mono font-medium text-muted uppercase tracking-wider mb-1">
              {item.label}
            </p>
            <p className="text-3xl md:text-4xl font-bold tracking-tighter2 font-mono">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
