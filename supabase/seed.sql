-- ============================================================
-- STEP 2: Seed default users
-- Run this AFTER creating users via Supabase Dashboard > Auth > Users
-- ============================================================

-- After creating these 3 users in Auth > Users > Add user:
--   admin@nss.com     / Admin@123
--   prof@nss.com      / Prof@123
--   student@nss.com   / Student@123
--
-- Run the following to ensure their profiles are correct:

UPDATE public.profiles
SET name = 'Dr. Deshpande', role = 'admin'
WHERE email = 'admin@nss.com';

UPDATE public.profiles
SET name = 'S.U. Mali', role = 'professor'
WHERE email = 'prof@nss.com';

UPDATE public.profiles
SET name = 'Samarth Giram', role = 'student', "group" = 'Group A',
    department = 'Computer Science', year = '3rd Year', roll_number = 'CS2021001'
WHERE email = 'student@nss.com';

-- ── Seed sample events ───────────────────────────────────────
INSERT INTO public.events (title, description, date, venue, tag, status) VALUES
  ('Campus Clean-up Drive', 'Annual campus cleaning event.', '2025-11-20T10:00:00+05:30', 'Main Quad', 'Sanitation', 'Active'),
  ('Blood Donation Camp', 'Save a life, donate blood.', '2025-11-25T09:00:00+05:30', 'Auditorium', 'Health', 'Active'),
  ('Tree Plantation Drive', 'Plant 500 trees city-wide.', '2025-06-28T09:00:00+05:30', 'Green Park, Pune', 'Environment', 'Upcoming'),
  ('Swachhta Abhiyan', 'Mass cleanliness drive in municipal area.', '2025-07-12T08:00:00+05:30', 'Municipal Area', 'Sanitation', 'Upcoming'),
  ('Health Awareness Camp', 'Free health checkups for locals.', '2025-08-05T09:00:00+05:30', 'Community Hall', 'Health', 'Upcoming');
