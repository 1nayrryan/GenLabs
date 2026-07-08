export type Partner = {
  name: string;
  href: string;
  logoUrl?: string; // leave unset to show a text placeholder box instead
};

// Edit this list as real partnerships happen. Each entry shows as a
// clickable logo box on the homepage — set `logoUrl` once you have an
// actual image (e.g. uploaded to Supabase storage or /public), and it'll
// render in place of the placeholder automatically.
export const partners: Partner[] = [
  {
    name: "BCA Black & Latinx Student Union",
    href: "https://radicalramen.my.canva.site/blsu",
    logoUrl: "/partners/blsu_logo.png",
  }
];
