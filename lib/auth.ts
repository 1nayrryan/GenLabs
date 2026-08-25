import { getSupabaseServerClient } from "./supabase/server";

export async function getCurrentUser() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function isAdminUser() {
  const user = await getCurrentUser();
  if (!user) return false;
  return user.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID;
}

export async function isProjectOwner(projectOwnerId: string | null) {
  const user = await getCurrentUser();
  if (!user || !projectOwnerId) return false;
  return user.id === projectOwnerId;
}
