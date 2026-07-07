"use client";

import { useEffect, useState } from "react";

type RepoData = {
  stars: number;
  pushedAt: string;
  htmlUrl: string;
  readmePreview: string | null;
};

export default function GithubStats({ repo }: { repo: string }) {
  const [data, setData] = useState<RepoData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const repoRes = await fetch(`https://api.github.com/repos/${repo}`);
        if (!repoRes.ok) throw new Error("repo fetch failed");
        const repoJson = await repoRes.json();

        let readmePreview: string | null = null;
        try {
          const readmeRes = await fetch(`https://api.github.com/repos/${repo}/readme`);
          if (readmeRes.ok) {
            const readmeJson = await readmeRes.json();
            const decoded = atob(readmeJson.content.replace(/\n/g, ""));
            readmePreview = decoded.slice(0, 320).trim();
          }
        } catch {
          // README is optional — repo stats still render without it.
        }

        if (!cancelled) {
          setData({
            stars: repoJson.stargazers_count ?? 0,
            pushedAt: repoJson.pushed_at,
            htmlUrl: repoJson.html_url,
            readmePreview,
          });
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [repo]);

  if (loading) {
    return (
      <div className="border-2 border-line rounded-card p-5 font-mono text-xs text-muted">
        Loading repo stats…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="border-2 border-line rounded-card p-5">
        <p className="font-mono text-xs text-muted">
          Couldn't load GitHub stats for <span className="text-ink">{repo}</span>.
          Check that the repository name is correct or confirm the repo is public.
        </p>
      </div>
    );
  }

  const lastCommit = new Date(data.pushedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border-2 border-ink rounded-card p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="font-mono text-xs text-muted">{repo}</p>
        <a
          href={data.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs underline hover:no-underline"
        >
          View on GitHub →
        </a>
      </div>
      <div className="flex gap-6 mb-4 font-mono text-xs">
        <span>★ <span className="font-semibold">{data.stars}</span> stars</span>
        <span>Last commit <span className="font-semibold">{lastCommit}</span></span>
      </div>
      {data.readmePreview && (
        <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
          {data.readmePreview}…
        </p>
      )}
    </div>
  );
}
