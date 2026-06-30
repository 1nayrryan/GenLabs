import { supabase } from "./supabaseClient";

export type SiteMetrics = {
  projects: number;
  members: number;
  partners: number;
  visits: number;
};

const FALLBACK: SiteMetrics = { projects: 0, members: 0, partners: 0, visits: 0 };

// Called from the homepage (a server component) on every request. Until
// Supabase is connected this just returns zeros — once it is, it pulls
// real counts with no other code changes needed.
export async function getMetrics(): Promise<SiteMetrics> {
  if (!supabase) return FALLBACK;

  try {
    const [projects, members, partners, visits] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("partnerships").select("*", { count: "exact", head: true }),
      // `page_views` is a minimal table defined in supabase/schema.sql —
      // see the comment there for how to actually increment it.
      supabase.from("page_views").select("*", { count: "exact", head: true }),
    ]);

    return {
      projects: projects.count ?? 0,
      members: members.count ?? 0,
      partners: partners.count ?? 0,
      visits: visits.count ?? 0,
    };
  } catch {
    return FALLBACK;
  }
}
