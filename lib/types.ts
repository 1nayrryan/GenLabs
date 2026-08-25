export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  status: "seeking" | "building" | "launched";
  category: string;
  skills: string[];
  contributors: string[];
  lookingFor: string[];
  links?: { label: string; url: string }[];
  githubRepo?: string;
  featured?: boolean;
  imageUrl?: string;
};

export type Update = {
  id: string;
  projectId: string;
  projectTitle: string;
  author: string;
  date: string;
  body: string;
};

export function rowToProject(row: Record<string, unknown>): Project {
  const ext = (row.external_link as string) || "";
  const isGitHub =
    ext.includes("github.com") && !ext.includes("github.com/");

  return {
    id: row.id as string,
    title: row.title as string,
    summary: row.summary as string,
    description: (row.description as string) || "",
    status: (row.status as Project["status"]) || "seeking",
    category: ((row.tags as string[])?.[0] as string) || "Web App",
    skills: (row.tags as string[]) || [],
    contributors: (row.team_members as string[]) || [],
    lookingFor: (row.looking_for as string[]) || [],
    links: ext && !isGitHub ? [{ label: "Visit site", url: ext }] : [],
    githubRepo: isGitHub
      ? ext.replace("https://github.com/", "")
      : undefined,
    imageUrl: (row.image_url as string) || undefined,
  };
}
