import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}

export async function isAdminUser() {
  const { user } = await getCurrentUser();
  const adminId = process.env.NEXT_PUBLIC_ADMIN_USER_ID;
  return Boolean(user && adminId && user.id === adminId);
}

export async function isProjectOwner(projectOwnerId: string | null | undefined) {
  const { user } = await getCurrentUser();
  if (!user || !projectOwnerId) return false;
  return user.id === projectOwnerId;
}
