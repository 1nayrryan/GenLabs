import { Status } from "@/components/StatusTag";

export type Project = {
  id: string;
  title: string;
  summary: string;        // one-line tagline, shown on cards and the hero card
  description: string;    // longer write-up, shown on the project's own page
  status: Status;
  category: string[];     // what kind of project it is — drives the category filter
  skills: string[];       // what it takes to contribute — drives the skills filter
  contributors: string[];
  lookingFor: string[];
  links?: { label: string; url: string }[]; // a real "Live site" link goes here once launched
  githubRepo?: string;    // "owner/repo" — shown instead of a live link while still in progress
  featured?: boolean;     // marks the homepage's "Project of the Month"
};

// The fixed taxonomy the filter UI is built around. Add to these lists
// as the org grows — every project's category/skills should pull from
// here so filters stay meaningful instead of fragmenting into one-offs.
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
    id: "campus-tutor-match",
    title: "Campus Tutor Match",
    summary:
      "A lightweight web app matching BCA students who need tutoring with peer tutors by subject and availability.",
    description:
      "Campus Tutor Match started as a way to replace the group chat BCA students were using to find tutors. Students post a subject and their availability, and the app surfaces peer tutors who've opted in for that subject. The goal is to make peer tutoring feel as easy to find as a club meeting time.",
    status: "building",
    category: ["Web App", "BCA-Specific"],
    skills: ["React", "Figma / Design"],
    contributors: ["A. Rivera"],
    lookingFor: ["frontend", "design"],
    // Placeholder repo name — swap for the real one once it exists.
    // Until then, the GitHub panel below shows a friendly "not found" state.
    githubRepo: "genlabs-bca/campus-tutor-match",
  },
  {
    id: "blsu-event-hub",
    title: "BLSU Event Hub",
    summary:
      "Central calendar and RSVP tool for BLSU events, built to replace scattered group chats and forms.",
    description:
      "BLSU Event Hub gives BLSU one place to post events, collect RSVPs, and send reminders, instead of relying on a mix of group chats and paper sign-up sheets. It launched in the spring and has been used for every BLSU event since — the first GenLabs project to go from idea to something people actually rely on.",
    status: "launched",
    category: ["Web App", "BCA-Specific"],
    skills: ["React", "JavaScript"],
    contributors: ["J. Okafor", "M. Chen"],
    lookingFor: [],
    links: [{ label: "Live site", url: "#" }],
    featured: true,
  },
  {
    id: "study-streak",
    title: "Study Streak",
    summary:
      "A habit-tracking app for study sessions with friend leaderboards, built as a first project for a new coder.",
    description:
      "Study Streak logs study sessions and turns them into a streak you can compare with friends. It's deliberately small in scope — it was picked as a first project for a student who'd never shipped an app before, with a mentor checking in weekly.",
    status: "seeking",
    category: ["Mobile App"],
    skills: ["Swift / iOS", "No experience needed"],
    contributors: ["S. Patel"],
    lookingFor: ["mentor", "mobile dev"],
    // No repo connected yet — the GitHub panel shows the "not linked" state.
  },
  {
    id: "pixel-pursuit",
    title: "Pixel Pursuit",
    summary:
      "A 2D top-down puzzle game built in Unity, made by a student learning game dev for the first time.",
    description:
      "Pixel Pursuit is a top-down puzzle game where each level introduces one new mechanic. It's the builder's first time using Unity, and the project doubles as a way to learn game design fundamentals — level pacing, tutorialization, and player feedback — while making something playable.",
    status: "seeking",
    category: ["Game"],
    skills: ["Unity / C#", "Design"],
    contributors: ["T. Nguyen"],
    lookingFor: ["game artist", "level designer"],
    // Demo repo so this panel shows real, live GitHub data out of the box.
    githubRepo: "octocat/Hello-World",
  },
  {
    id: "bca-lost-and-found",
    title: "BCA Lost & Found",
    summary:
      "A simple posting board so students can report and search for lost items around campus.",
    description:
      "BCA Lost & Found replaces the lost-and-found bin nobody checks with a searchable board — post what you lost or found, with a photo and location, and get notified on a match.",
    status: "building",
    category: ["Web App", "BCA-Specific", "Open Source"],
    skills: ["JavaScript", "Writing / Content"],
    contributors: ["K. Brooks"],
    lookingFor: ["backend"],
    // Real public repo, used here as a second live demo of the GitHub panel.
    githubRepo: "github/gitignore",
  },
];
