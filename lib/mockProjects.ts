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

export const CATEGORY_OPTIONS = [
  "Game",
  "BCA-Specific",
  "Web App",
  "Mobile App",
  "Hardware",
  "Data / AI",
  "Design",
  "Open Source",
] as const;

export const SKILL_OPTIONS = [
  "React",
  "Python",
  "JavaScript",
  "Unity / C#",
  "Swift / iOS",
  "Figma / Design",
  "Writing / Content",
  "Video / Editing",
  "Marketing",
  "No experience needed",
] as const;

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Campus Tutor Match",
    summary:
      "A platform connecting BCA students who need help with peers who can teach.",
    description:
      "Campus Tutor Match is a peer-to-peer tutoring platform built for BCA students. It allows students to sign up as tutors or tutees, match based on subject expertise and availability, and schedule sessions through a simple calendar interface. The goal is to make academic support accessible without needing external services.",
    status: "building",
    category: "Web App",
    skills: ["React", "Python", "JavaScript"],
    contributors: ["Alex Kim", "Priya Sharma"],
    lookingFor: ["Backend developer", "UI designer"],
    links: [],
    githubRepo: "alexk/campus-tutor-match",
  },
  {
    id: "2",
    title: "BLSU Event Hub",
    summary:
      "Centralized event listing and RSVP system for the BCA Black & Latinx Student Union.",
    description:
      "BLSU Event Hub is a web application that centralizes all BLSU events into one place. Students can browse upcoming events, RSVP directly, and receive reminders. The app includes an admin dashboard for B officers to manage events, track attendance, and generate reports for funding applications.",
    status: "launched",
    category: "BCA-Specific",
    skills: ["React", "Figma / Design", "Writing / Content"],
    contributors: ["Jordan Davis", "Maria Garcia", "Sam Chen"],
    lookingFor: [],
    links: [
      { label: "Visit the live site", url: "https://blsu-events.vercel.app" },
    ],
    featured: true,
  },
  {
    id: "3",
    title: "Study Streak",
    summary:
      "A gamified study tracker that rewards consistent study habits with streaks and achievements.",
    description:
      "Study Streak turns studying into a game. Students log their study sessions, build daily streaks, earn achievements, and compete on leaderboards with friends. The app uses spaced repetition principles to suggest optimal review times and tracks progress across subjects.",
    status: "seeking",
    category: "Mobile App",
    skills: ["Swift / iOS", "Figma / Design", "No experience needed"],
    contributors: [],
    lookingFor: ["iOS developer", "Game designer", "Marketing"],
    githubRepo: "octocat/Hello-World",
  },
  {
    id: "4",
    title: "Pixel Pursuit",
    summary:
      "A retro-style adventure game built in Unity with procedurally generated levels.",
    description:
      "Pixel Pursuit is a 2D adventure game inspired by classic pixel art games. Players explore procedurally generated dungeons, solve puzzles, and battle enemies. The game features a pixel art aesthetic, chiptune soundtrack, and a level editor that lets players create and share their own dungeons.",
    status: "seeking",
    category: "Game",
    skills: ["Unity / C#", "Figma / Design", "Video / Editing"],
    contributors: ["Taylor Reed"],
    lookingFor: ["Pixel artist", "Sound designer", "Playtester"],
    githubRepo: "github/gitignore",
  },
  {
    id: "5",
    title: "BCA Lost & Found",
    summary:
      "A digital lost and found system for reporting and claiming lost items on campus.",
    description:
      "BCA Lost & Found replaces the traditional paper-based lost and found with a digital system. Students can post photos and descriptions of found items, search for lost items, and get notified when matching items are reported. Includes a verification system to prevent false claims.",
    status: "building",
    category: "BCA-Specific",
    skills: ["React", "Python", "Figma / Design"],
    contributors: ["Casey Morgan"],
    lookingFor: ["Backend developer", "Mobile developer"],
  },
];
