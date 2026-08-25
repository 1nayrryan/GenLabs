"use client";

import { useEffect, useState } from "react";

type GithubData = {
  stars: number;
  lastPush: string;
  readme: string;
  repo: string;
};

export default function GithubStats({ repo }: { repo: string }) {
  const [data, setData] = useState<GithubData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        setData({
          stars: d.stargazers_count,
          lastPush: d.pushed_at,
          readme: d.description || "",
          repo: d.full_name,
        });
      })
      .catch(() => setError(true));
  }, [repo]);

  if (error) {
    return (
      <div className="bg-mist rounded-card p-6 text-center">
        <p className="text-sm text-muted">
          Could not load GitHub data for{" "}
          <span className="font-mono text-ink">{repo}</span>
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-mist rounded-card p-6 animate-pulse">
        <div className="h-4 bg-line rounded w-1/3 mb-3" />
        <div className="h-3 bg-line rounded w-1/2" />
      </div>
    );
  }

  return (
    <div className="bg-mist rounded-card p-6">
      <div className="flex items-center gap-2 mb-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="text-ink"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <span className="text-sm font-semibold font-mono">{data.repo}</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07 3.48 11.85l.67-3.93L1.3 5.14l3.94-.57L7 1z" />
          </svg>
          {data.stars}
        </span>
        <span>
          Last push: {new Date(data.lastPush).toLocaleDateString()}
        </span>
      </div>
      {data.readme && (
        <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
          {data.readme}
        </p>
      )}
    </div>
  );
}
