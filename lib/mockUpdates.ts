export type Update = {
  id: string;
  projectId: string;
  projectTitle: string;
  author: string;
  content: string;
  date: string; // ISO date, e.g. "2026-05-12"
};

export const mockUpdates: Update[] = [];
