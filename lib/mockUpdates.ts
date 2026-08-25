export type Update = {
  id: string;
  projectId: string;
  projectTitle: string;
  author: string;
  date: string;
  body: string;
};

export const mockUpdates: Update[] = [
  {
    id: "u1",
    projectId: "2",
    projectTitle: "BLSU Event Hub",
    author: "Jordan Davis",
    date: "2025-06-10",
    body: "We launched the BLSU Event Hub this week! Over 40 students RSVP'd for the first event through the platform. The admin dashboard is working well for tracking attendance.",
  },
  {
    id: "u2",
    projectId: "4",
    projectTitle: "Pixel Pursuit",
    author: "Taylor Reed",
    date: "2025-06-08",
    body: "Prototype is coming along. We have 3 dungeon themes working with procedural generation. Looking for a pixel artist to help with character sprites.",
  },
  {
    id: "u3",
    projectId: "1",
    projectTitle: "Campus Tutor Match",
    author: "Alex Kim",
    date: "2025-06-05",
    body: "Kicked off development this week. Set up the React frontend and started on the matching algorithm. Still need a backend developer to help with the scheduling system.",
  },
];
