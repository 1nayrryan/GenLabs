-- Run this in the Supabase SQL editor (Project → SQL Editor → New query)
-- to set up the database.

-- Student profiles (extends Supabase's built-in auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  grade_level text,
  skills text[],
  looking_for text[],
  is_mentor boolean default false,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;

drop policy if exists "Users can view profiles" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;

create policy "Users can view profiles"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Projects/builds posted to the board
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text not null,
  description text,
  status text not null check (status in ('seeking', 'building', 'launched')),
  tags text[],
  looking_for text[],
  team_members text[],
  owner_id uuid references profiles(id),
  download_url text,
  external_link text,
  image_url text,
  created_at timestamp with time zone default now()
);

create table if not exists project_contributors (
  project_id uuid references projects(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  role text,
  primary key (project_id, profile_id)
);

create table if not exists mentorships (
  id uuid default gen_random_uuid() primary key,
  mentor_id uuid references profiles(id),
  mentee_id uuid references profiles(id),
  project_id uuid references projects(id),
  status text default 'active' check (status in ('active', 'completed')),
  created_at timestamp with time zone default now()
);

create table if not exists partnerships (
  id uuid default gen_random_uuid() primary key,
  organization_name text not null,
  contact_name text,
  partnership_type text,
  notes text,
  started_at date default current_date
);

create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade,
  author_name text not null,
  author_id uuid references auth.users,
  content text not null,
  created_at timestamp with time zone default now()
);

create table if not exists page_views (
  id uuid default gen_random_uuid() primary key,
  path text,
  created_at timestamp with time zone default now()
);

alter table projects enable row level security;

drop policy if exists "Public can view projects" on projects;
drop policy if exists "Authenticated users can insert their own projects" on projects;
drop policy if exists "Users can update their own projects" on projects;
drop policy if exists "Users can delete their own projects" on projects;

create policy "Public can view projects"
  on projects for select
  using (true);

create policy "Authenticated users can insert their own projects"
  on projects for insert
  to authenticated
  with check (auth.uid() = owner_id);

create policy "Users can update their own projects"
  on projects for update
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Users can delete their own projects"
  on projects for delete
  to authenticated
  using (auth.uid() = owner_id);

alter table articles enable row level security;

drop policy if exists "Public can view articles" on articles;
drop policy if exists "Anyone can insert articles" on articles;
drop policy if exists "Anyone can update articles" on articles;

create policy "Public can view articles"
  on articles for select
  using (true);

create policy "Anyone can insert articles"
  on articles for insert
  with check (true);

create policy "Anyone can update articles"
  on articles for update
  using (true);

create policy "Authors can delete their articles"
  on articles for delete
  using (auth.uid() = author_id);
