"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

export default function UpdateOwnerBar({
  articleId,
  authorId,
}: {
  articleId: string;
  authorId: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    async function check() {
      if (!supabase || !authorId) {
        setLoading(false);
        return;
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && (user.id === authorId || user.id === ADMIN_ID)) {
        setIsOwner(true);
      }
      setLoading(false);
    }
    check();
  }, [authorId]);

  async function handleDelete() {
    if (!supabase) return;
    await supabase.from("articles").delete().eq("id", articleId);
    router.push("/updates");
  }

  if (loading || !isOwner) return null;

  return (
    <section className="mt-8 pt-8 border-t border-line">
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-grass bg-grass/10 px-3 py-1 rounded-pill">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
          You posted this update
        </span>
      </div>
      <div className="flex items-center gap-4">
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            Delete update
          </button>
        ) : (
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
        )}
      </div>
    </section>
  );
}
