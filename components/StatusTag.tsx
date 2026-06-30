type Status = "seeking" | "building" | "launched";

// The tag border/text/shape is always pure ink-on-paper (monochrome
// interface). Only the small dot carries color, and that color always
// maps to something real about the project — never decoration.
const config: Record<Status, { label: string; dot: string }> = {
  seeking: { label: "seeking collaborators", dot: "#FB64B6" },
  building: { label: "in progress", dot: "#FFD23F" },
  launched: { label: "launched", dot: "#4ADE80" },
};

export default function StatusTag({ status }: { status: Status }) {
  const c = config[status];
  return (
    <span className="status-tag">
      <span className="status-dot" style={{ backgroundColor: c.dot }} />
      {c.label}
    </span>
  );
}

export type { Status };
