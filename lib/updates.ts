export type Update = {
  id: string;
  projectId: string;
  projectTitle: string; // denormalized so the listing page doesn't need a join
  author: string;
  date: string; // ISO date
  body: string;
};

export const mockUpdates: Update[] = [
  {
    id: "blsu-event-hub-launch",
    projectId: "blsu-event-hub",
    projectTitle: "BLSU Event Hub",
    author: "J. Okafor",
    date: "2026-06-20",
    body:
      "We pushed the first live version of the Event Hub this week. Every BLSU event now lives in one calendar instead of three group chats, and RSVPs send an automatic reminder the morning of. Next up: letting other clubs use it too.",
  },
  {
    id: "pixel-pursuit-prototype",
    projectId: "pixel-pursuit",
    projectTitle: "Pixel Pursuit",
    author: "T. Nguyen",
    date: "2026-06-15",
    body:
      "First three levels are playable end to end. The core puzzle mechanic works, but everything is still placeholder shapes — if anyone wants to take a pass at real art direction, now's the time before more levels get built on top of the current style.",
  },
  {
    id: "campus-tutor-match-kickoff",
    projectId: "campus-tutor-match",
    projectTitle: "Campus Tutor Match",
    author: "A. Rivera",
    date: "2026-06-10",
    body:
      "Started building this after getting tired of asking three different group chats for a calc tutor. Basic matching logic works locally — looking for someone who can help make the actual interface less rough before showing it to people outside my grade.",
  },
];
