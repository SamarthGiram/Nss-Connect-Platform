-- 1. Fix the roles for your testing accounts
UPDATE public.profiles
SET role = 'admin', status = 'active'
WHERE name ILIKE '%admin%' OR email ILIKE '%admin%';

UPDATE public.profiles
SET role = 'professor', status = 'active'
WHERE name ILIKE '%prof%' OR email ILIKE '%prof%';

-- 2. Allow professors to create events (Original schema only allowed admins)
DROP POLICY IF EXISTS "events: admin write" ON public.events;
DROP POLICY IF EXISTS "events: admin/professor write" ON public.events;
CREATE POLICY "events: admin/professor write"
  ON public.events FOR ALL
  USING ( public.is_professor_or_admin() );

-- 3. Allow professors to update student profiles (for approvals)
DROP POLICY IF EXISTS "profiles: professor update students" ON public.profiles;
CREATE POLICY "profiles: professor update students"
  ON public.profiles FOR UPDATE
  USING ( public.is_professor_or_admin() AND role = 'student' );

-- 4. Ensure announcements table exists (just in case it was missed)
CREATE TABLE IF NOT EXISTS public.announcements (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  body        text not null,
  tag         text not null default 'General'
              check (tag in ('General','Event','Attendance','Urgent','Holiday','Reminder')),
  created_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz default now()
);

-- 5. Enable RLS and policies for announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "announcements: authenticated read" ON public.announcements;
CREATE POLICY "announcements: authenticated read"
  ON public.announcements FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "announcements: admin/professor create" ON public.announcements;
CREATE POLICY "announcements: admin/professor create"
  ON public.announcements FOR INSERT
  WITH CHECK ( public.is_professor_or_admin() );

DROP POLICY IF EXISTS "announcements: admin/professor delete" ON public.announcements;
CREATE POLICY "announcements: admin/professor delete"
  ON public.announcements FOR DELETE
  USING ( public.is_professor_or_admin() );
