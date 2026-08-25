export type SiteMetrics = {
  projects: number;
  members: number;
  partners: number;
  visits: number;
};

export async function getMetrics(): Promise<SiteMetrics> {
  try {
    const { getSupabaseServerClient } = await import("./supabase/server");
    const supabase = getSupabaseServerClient();
    if (!supabase) return { projects: 0, members: 0, partners: 0, visits: 0 };

    const [projects, members, partners, visits] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase
        .from("partnerships")
        .select("id", { count: "exact", head: true }),
      supabase.from("page_views").select("id", { count: "exact", head: true }),
    ]);

    return {
      projects: projects.count ?? 0,
      members: members.count ?? 0,
      partners: partners.count ?? 0,
      visits: visits.count ?? 0,
    };
  } catch {
    return { projects: 0, members: 0, partners: 0, visits: 0 };
  }
}
