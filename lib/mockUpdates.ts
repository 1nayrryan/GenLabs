export type Update = {
  id: string;
  projectId: string;
  projectTitle: string;
  author: string;
  content: string;
  date: string; // ISO date, e.g. "2026-05-12"
};

export const mockUpdates: Update[] = [
  {
    id: "blsu-event-hub-launch",
    projectId: "blsu-event-hub",
    projectTitle: "BLSU Event Hub",
    author: "J. Okafor",
    content:
      "BLSU Event Hub is officially live. We used it for the first time at last week's general meeting — RSVPs were up compared to the old sign-up sheet, and reminders went out automatically the morning of the event. Next up: adding recurring events so we don't have to re-post the same weekly meeting every time.",
    date: "2026-05-12",
  },
  {
    id: "campus-tutor-match-progress",
    projectId: "campus-tutor-match",
    projectTitle: "Campus Tutor Match",
    author: "A. Rivera",
    content:
      "Subject matching and availability filtering both work now — you can post that you need help with Chem and see every tutor who's free Tuesday afternoons. Still need to build the request/confirm flow so tutors actually get notified. Looking for a second contributor to help with that part.",
    date: "2026-06-02",
  },
  {
    id: "pixel-pursuit-first-level",
    projectId: "pixel-pursuit",
    projectTitle: "Pixel Pursuit",
    author: "T. Nguyen",
    content:
      "First playable level is done! It's rough, but the core mechanic — pushing blocks to redirect light beams — actually works. Spent most of this week learning Unity's tilemap system from scratch. Next goal is three more levels and an actual title screen.",
    date: "2026-06-18",
  },
];
