import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Pull these from your Supabase project settings (Settings → API)
// and put them in .env.local (copy .env.local.example).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// `supabase` stays null until both env vars are set — every caller should
// check for that (see lib/metrics.ts for the pattern) so the site keeps
// working on mock data before your database exists, instead of crashing
// the build with "supabaseUrl is required".
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Example usage once your schema (see supabase/schema.sql) is set up:
//
//   if (supabase) {
//     const { data, error } = await supabase
//       .from("projects")
//       .select("*")
//       .order("created_at", { ascending: false });
//   }

