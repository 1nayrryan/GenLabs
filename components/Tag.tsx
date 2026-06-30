export default function Tag({
  label,
  variant = "outline",
}: {
  label: string;
  variant?: "solid" | "outline";
}) {
  return (
    <span className={`tag ${variant === "solid" ? "tag-solid" : "tag-outline"}`}>
      {label}
    </span>
  );
}
