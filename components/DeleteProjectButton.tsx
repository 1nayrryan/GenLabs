"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DeleteProjectButton({
  projectId,
  ownerId,
}: {
  projectId: string;
  ownerId: string | null;
}) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!supabase) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || user.id !== ownerId) return;

    await supabase.from("projects").delete().eq("id", projectId);
    router.push("/projects");
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
      >
        Delete project
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted">Are you sure?</span>
      <button
        onClick={handleDelete}
        className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
      >
        Yes, delete
      </button>
      <button
        onClick={() => setConfirming(false)}
        className="text-sm font-medium text-muted hover:text-ink transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
