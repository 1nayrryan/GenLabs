# GenLabs

A platform where BCA students — especially those without existing CS
networks — find collaborators, get mentored, and launch real projects
publicly.

This repo is a working starter: a designed, responsive site with a
project board, filters, a submission form, and a mentorship/resources
page. It runs on mock data out of the box so you can see and demo it
immediately, and is wired to drop in a real Supabase database when
you're ready.

## Run it locally

```bash
npm install
cp .env.local.example .env.local   # fill in once Supabase is set up
npm run dev
```

Open http://localhost:3000.

The site works right away using `lib/mockProjects.ts` — you don't need
Supabase set up just to look at and edit the design.

## Connect the real database (when ready)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql` — this creates the
   `profiles`, `projects`, `project_contributors`, `mentorships`, and
   `partnerships` tables, plus security rules so anyone can view
   projects but only owners can edit their own.
3. Copy your project URL and anon key (Settings → API) into `.env.local`.
4. In `app/projects/page.tsx`, swap the `mockProjects` import for a
   Supabase query — the comment at the top of that file shows where.
5. Wire `app/submit/page.tsx`'s `handleSubmit` to `supabase.from("projects").insert(...)`
   instead of just setting local state.

## Deploy

1. Push this repo to GitHub.
2. Import it at [vercel.com](https://vercel.com) (free tier) — it
   auto-detects Next.js, no config needed.
3. Add your Supabase env vars in Vercel's project settings.
4. Buy a domain on [Namecheap](https://namecheap.com) (~$12/yr) and
   point it at Vercel under Vercel's "Domains" tab. Skip fundraising
   for this — it's cheap enough to just buy.

## File structure

```
app/
  page.tsx                 → homepage (hero, open builds, project of the month,
                              how it works, partners, mission)
  projects/page.tsx         → project board with search + filters
  projects/[id]/page.tsx    → product page: gallery, description, live link
                              or GitHub stats, articles, contributors
  submit/page.tsx           → post-a-build form
  updates/page.tsx          → blog/updates listing ("Updates")
  updates/[id]/page.tsx     → single update/article page
  updates/new/page.tsx      → post-an-update form
  mentorship/page.tsx       → mentor matching (Google Form links) + resources
  team/page.tsx             → board/team grid
  about/page.tsx            → mission + goals
components/
  Navbar, MobileMenu, PostMenu, Footer
  ProjectCard, ProjectFilters, StatusTag, Tag
  ImagePlaceholderGallery, GithubStats
  MetricsPanel, ProjectOfMonth, PartnersStrip
lib/
  mockProjects.ts           → placeholder project data + category/skill taxonomy
  mockUpdates.ts            → placeholder blog/update posts
  partners.ts                → partner logos + links (edit this directly)
  team.ts                     → team member names/roles (edit this directly)
  metrics.ts                  → live metrics, Supabase-backed with a zero fallback
  supabaseClient.ts           → Supabase connection (null until env vars are set)
supabase/schema.sql           → full database schema
```

## Project pages (Penn Labs format)

Each build now gets a page modeled on Penn Labs' own product pages: a large
title, a placeholder image gallery (swap for real screenshots whenever you
have them — see the comment in `ImagePlaceholderGallery.tsx`), a longer
description, then **one** of:

- **A "Visit the live site" button**, if the project has a `links` entry
  whose label includes "site" — use this once something's actually launched.
- **A live GitHub panel** (stars, last commit date, README preview), if the
  project has a `githubRepo` set in `lib/mockProjects.ts`, pulled directly
  from the public GitHub API at request time — no setup needed beyond
  putting the real `owner/repo` string on the project. Two of the demo
  projects point at real public repos (`octocat/Hello-World`,
  `github/gitignore`) so you can see it working immediately; a third points
  at a placeholder repo name to show the "couldn't load" fallback state.
- **A "No GitHub repo linked yet" note**, if neither is set.

Below that, an **Articles** section automatically pulls any posts from
`lib/mockUpdates.ts` (or, once live, the `articles` table) where
`projectId` matches — or shows "No articles currently posted."

## Homepage order

Hero (with the live metrics panel) → Open builds → Project of the Month →
How it works → Partners → Mission. `ProjectOfMonth` pulls whichever project
has `featured: true` in `lib/mockProjects.ts` — move that flag to a
different project whenever you want to swap the spotlight.

## Metrics (the hero readout)

The numbers in the hero box now come from `lib/metrics.ts`, which queries
Supabase for project/profile/partnership counts. Until your database is
connected it just renders zero — once `.env.local` has real Supabase
credentials, the homepage will show live counts with no code changes.
"Visits" reads from a `page_views` table that schema.sql creates but
nothing writes to yet — see the comment in that file for how to start
logging visits whenever that becomes worth the extra database write.

## Blog / Updates

The "Updates" nav tab lists short posts about project progress. The old
single "Post a build" button in the top right is now a **Post** dropdown
with two options: a larger "Post a build" entry and a smaller "Post an
update" entry, matching how often you'd expect each to be used. The
"Post an update" form's project field is a native searchable dropdown
(type to filter) built from your live project list — no extra UI library
needed.

## Team page

`/team` renders six placeholder seats (rows of 3, circle-outline avatar
placeholders) from `lib/team.ts`. Edit names and roles directly there.

## Partners strip

The homepage "Backed by" strip reads from `lib/partners.ts`. Each entry
is a clickable box — set `logoUrl` once you have a real logo image and it
replaces the text placeholder automatically; `href` is the partner's link.

## Design system

- **Colors:** strictly black-and-white interface — off-black `#0E0E10` on
  white `#FFFFFF`, with a light gray `mist` for alternating sections. Color
  only ever shows up in two places: the hero's gradient mesh, and the small
  dot inside each status tag — never in nav, buttons, or borders. This is
  intentional: chrome stays monochrome, color marks the actual content.
- **Type:** system UI font stack for headings and body (so it loads
  instantly and matches each OS), JetBrains Mono for status tags, filter
  chips, and small data points.
- **Shapes:** pill geometry throughout — fully rounded buttons, chips, and
  inputs (`rounded-pill`), and a generous `rounded-card` (28px) on content
  cards. (Note: literal 9999px-radius cards would look like stadiums at this
  content size, so cards use a large-but-readable radius instead — pill
  buttons/tags use the true pill shape.)
- **Focus states:** dashed 2px outline everywhere — a nod to Figma's own
  editor UI, and a consistent visual "tell" across the whole site.
- **Signature element:** the same CI-style status-tag system as before,
  now as monochrome pills with a single color dot (pink = seeking
  collaborators, yellow = in progress, green = launched).

## Mentorship forms

The mentorship page currently links to two placeholder Google Form URLs at
the top of `app/mentorship/page.tsx`:

```ts
const MENTEE_FORM_URL = "https://forms.google.com/REPLACE_WITH_MENTORSHIP_REQUEST_FORM";
const MENTOR_FORM_URL = "https://forms.google.com/REPLACE_WITH_MENTOR_APPLICATION_FORM";
```

Once you build the real forms in Google Forms, paste their share links in
here — nothing else on the page needs to change.

## Builds page: search & filters

The board (`app/projects/page.tsx`) now supports:
- A search bar matching against title, summary, category, and skills
- A **project type** filter (Game, BCA-Specific, Web App, Mobile App,
  Hardware, Data/AI, Design, Open Source — edit the list in
  `lib/mockProjects.ts` under `CATEGORY_OPTIONS`)
- A **skills required** filter (edit `SKILL_OPTIONS` in the same file)
- The existing status filter (seeking / in progress / launched)

All filters combine with AND logic across categories, but OR logic within
each category — e.g. selecting "Game" + "BCA-Specific" shows projects that
are *either*, while selecting "Game" + "Unity/C#" shows projects that are
*both*. Every project's `category` and `skills` should pull from those two
option lists so the filters stay meaningful as you add more projects.

## Roadmap (mapped to your actual goals)

**By August — site live, minimum viable:**
- [ ] Deploy to a real domain
- [ ] Post 10–15 real projects (pull from your own network to start)
- [ ] Recruit 15–20 active members
- [ ] Land 1 concrete partnership (a teacher, BCA's CS department, or
      a local nonprofit all count)

**By December (semester 1 club goal):**
- [ ] 15+ projects posted
- [ ] 25+ active members
- [ ] 3+ mentors/advisors actively paired
- [ ] 1+ documented partnership, with evidence for club renewal

**Stretch:**
- [ ] Partner with other BCA clubs
- [ ] Partner with a local middle school for younger-student mentorship
- [ ] Auto-suggested mentor matching based on skill overlap
- [ ] Real admin dashboard for tracking the 4 core metrics

## Board roles you actually need

- **Build lead** (you) — owns the site and database
- **Marketing/social** — posts progress, recruits members and first projects
- **Outreach** — talks to teachers, clubs, nonprofits for partnerships
  and project sources
- **Mentorship coordinator** — matches mentors to mentees, keeps the
  resources page updated
