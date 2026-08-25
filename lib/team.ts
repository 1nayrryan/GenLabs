export type TeamMember = {
  name: string;
  role: string;
  section: "board" | "development" | "business" | "design";
  image?: string;
};

// Edit this list as your team comes together.
// Add photo URLs to the `image` field (place photos in public/team/ or use Supabase storage URLs).
export const team: TeamMember[] = [];
