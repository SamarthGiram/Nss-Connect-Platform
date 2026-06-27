-- ============================================================
-- NSS Connect Platform — Supabase Database Schema
-- Run this entire script in: Supabase Dashboard > SQL Editor
-- ============================================================

-- ── 1. PROFILES ──────────────────────────────────────────────
-- Extends auth.users with NSS-specific fields
create table if not exists public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  name          text not null,
  email         text not null,
  role          text not null default 'student' check (role in ('admin', 'professor', 'student')),
  phone         text,
  roll_number   text,
  department    text,
  year          text,
  "group"       text,
  status        text default 'active' check (status in ('active', 'pending', 'suspended')),
  created_at    timestamptz default now()
);

-- ── 1.5 HELPER FUNCTIONS FOR RLS ─────────────────────────────
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
end;
$$ language plpgsql security definer;

create or replace function public.is_professor_or_admin()
returns boolean as $$
begin
  return exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'professor'));
end;
$$ language plpgsql security definer;

-- Row-Level Security
alter table public.profiles enable row level security;

-- Anyone authenticated can read profiles
create policy "profiles: authenticated read"
  on public.profiles for select
  using (auth.role() = 'authenticated');

-- Users can update their own profile
create policy "profiles: own update"
  on public.profiles for update
  using (auth.uid() = id);

-- Admin can insert/update any profile
create policy "profiles: admin full access"
  on public.profiles for all
  using ( public.is_admin() );

-- Allow insert for new signups (service role used in trigger)
create policy "profiles: insert own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ── 2. AUTO-CREATE PROFILE ON SIGNUP ────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 3. EVENTS ────────────────────────────────────────────────
create table if not exists public.events (
  id            uuid default gen_random_uuid() primary key,
  title         text not null,
  description   text,
  date          timestamptz not null,
  venue         text,
  tag           text default 'General',
  status        text default 'Upcoming' check (status in ('Active', 'Upcoming', 'Completed')),
  volunteers    integer default 0,
  created_by    uuid references public.profiles(id),
  created_at    timestamptz default now()
);

alter table public.events enable row level security;

-- Everyone authenticated can read events
create policy "events: authenticated read"
  on public.events for select
  using (auth.role() = 'authenticated');

-- Only admin can create/update/delete events
create policy "events: admin write"
  on public.events for all
  using ( public.is_admin() );

-- ── 4. ATTENDANCE ─────────────────────────────────────────────
create table if not exists public.attendance (
  id            uuid default gen_random_uuid() primary key,
  event_id      uuid references public.events(id) on delete cascade,
  student_id    uuid references public.profiles(id) on delete cascade,
  professor_id  uuid references public.profiles(id),
  status        text not null check (status in ('Present', 'Absent')),
  created_at    timestamptz default now(),
  unique (event_id, student_id)
);

alter table public.attendance enable row level security;

-- Students can see their own attendance
create policy "attendance: student read own"
  on public.attendance for select
  using (auth.uid() = student_id);

-- Professors and admins can read all attendance
create policy "attendance: professor/admin read"
  on public.attendance for select
  using ( public.is_professor_or_admin() );

-- Professors can insert/update attendance
create policy "attendance: professor write"
  on public.attendance for all
  using ( public.is_professor_or_admin() );

-- ── 5. EVENT REGISTRATIONS ───────────────────────────────────
create table if not exists public.event_registrations (
  id            uuid default gen_random_uuid() primary key,
  event_id      uuid references public.events(id) on delete cascade,
  student_id    uuid references public.profiles(id) on delete cascade,
  created_at    timestamptz default now(),
  unique (event_id, student_id)
);

alter table public.event_registrations enable row level security;

create policy "registrations: student manage own"
  on public.event_registrations for all
  using (auth.uid() = student_id);

create policy "registrations: admin/professor read"
  on public.event_registrations for select
  using ( public.is_professor_or_admin() );

-- ── 6. SEED DEFAULT USERS ─────────────────────────────────────
-- After running this schema, create users in Supabase Dashboard > Auth > Users:
--   admin@nss.com     / Admin@123   (role: admin)
--   prof@nss.com      / Prof@123    (role: professor)
--   student@nss.com   / Student@123 (role: student)
-- Then update their profiles manually if the trigger doesn't fire correctly.

-- ── 7. SEED SAMPLE EVENTS ────────────────────────────────────
insert into public.events (title, description, date, venue, tag, status, volunteers)
values
  ('Campus Clean-up Drive',   'Annual campus cleaning event. Students will work in teams to clean the main quad and surrounding areas.',       '2025-11-20T10:00:00+05:30', 'Main Quad',          'Sanitation',  'Active',    45),
  ('Blood Donation Camp',      'Save a life, donate blood. In collaboration with Red Cross Society.',                                            '2025-11-25T09:00:00+05:30', 'Auditorium',         'Health',      'Active',    62),
  ('Tree Plantation Drive',    'Plant 500 trees city-wide. Together we can make Pune greener.',                                                 '2025-06-28T09:00:00+05:30', 'Green Park, Pune',   'Environment', 'Upcoming',  38),
  ('Swachhta Abhiyan',         'Mass cleanliness drive in municipal area under Swachh Bharat Mission.',                                         '2025-07-12T08:00:00+05:30', 'Municipal Area',     'Sanitation',  'Upcoming',  55),
  ('Health Awareness Camp',    'Free health checkups and awareness sessions for local community members.',                                       '2025-08-05T09:00:00+05:30', 'Community Hall',     'Health',      'Upcoming',  30),
  ('Digital Literacy Drive',   'Teaching basic computer and internet skills to rural students and senior citizens.',                             '2025-09-10T10:00:00+05:30', 'Govt. School, Pune', 'Education',   'Upcoming',  25),
  ('Flood Relief Drive',       'Providing essential supplies and relief materials to flood-affected families in Kolhapur district.',             '2025-10-01T07:00:00+05:30', 'Kolhapur District',  'Health',      'Completed', 80),
  ('Independence Day Rally',   'NSS volunteers participated in the Independence Day parade and community pledge drive.',                         '2025-08-15T08:00:00+05:30', 'College Ground',     'General',     'Completed', 120);

-- ── 8. ANNOUNCEMENTS ─────────────────────────────────────────
create table if not exists public.announcements (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  body        text not null,
  tag         text not null default 'General'
              check (tag in ('General','Event','Attendance','Urgent','Holiday','Reminder')),
  created_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz default now()
);

alter table public.announcements enable row level security;

-- Everyone authenticated can read announcements
create policy "announcements: authenticated read"
  on public.announcements for select
  using (auth.role() = 'authenticated');

-- Admin and professor can create
create policy "announcements: admin/professor create"
  on public.announcements for insert
  with check ( public.is_professor_or_admin() );

-- Admin and professor can delete their own
create policy "announcements: admin/professor delete"
  on public.announcements for delete
  using ( public.is_professor_or_admin() );

