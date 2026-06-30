// No real screenshots yet, so this renders an honest placeholder instead
// of a broken <img>. Once you have images (e.g. uploaded to Supabase
// storage or /public), replace this block with real <img>/<Image> tags —
// the layout (one large + a row of thumbnails) is already set up for it.
export default function ImagePlaceholderGallery() {
  return (
    <div className="mb-10">
      <div className="rounded-card border-2 border-dashed border-line h-64 md:h-80 flex items-center justify-center mb-3 bg-mist">
        <PlaceholderIcon />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-card border-2 border-dashed border-line h-20 flex items-center justify-center bg-mist"
          >
            <PlaceholderIcon small />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderIcon({ small = false }: { small?: boolean }) {
  const size = small ? 18 : 28;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-muted"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}
