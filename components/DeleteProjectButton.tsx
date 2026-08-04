"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      return;
    }

    setLoading(true);
    setError(null);

    if (!supabase) {
      setError("Database not configured.");
      setLoading(false);
      return;
    }

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setError("You must be signed in to delete a project.");
        setLoading(false);
        return;
      }

      const { data: project, error: fetchError } = await supabase
        .from("projects")
        .select("id, owner_id")
        .eq("id", projectId)
        .maybeSingle();

      if (fetchError || !project) {
        setError("Project not found.");
        setLoading(false);
        return;
      }

      if (project.owner_id !== userData.user.id) {
        setError("You can only delete projects you posted.");
        setLoading(false);
        return;
      }

      const { error: deleteError } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId)
        .eq("owner_id", userData.user.id);

      if (deleteError) {
        setError(deleteError.message);
        setLoading(false);
        return;
      }

      router.push("/projects");
    } catch (err) {
      setError("An error occurred while deleting the project.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-6 py-3 rounded-pill border-2 border-red-500 text-red-600 font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
      >
        {loading ? "Deleting…" : "Delete project"}
      </button>
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </>
  );
}
