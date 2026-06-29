-- =========================================================================
-- NSS Connect Platform — Database Schema Update
-- Add Profile Avatar Columns (Theme, Icon/Emoji, Uploaded Photo)
--
-- RUN THIS ENTIRE SCRIPT IN: Supabase Dashboard > SQL Editor
-- =========================================================================

-- 1. Add avatar columns to the profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_theme text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_icon text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_img text;

-- 2. Clear out any cache or update existing profiles with default themes if needed
-- (Optional - newly registered profiles will use these columns automatically)
COMMENT ON COLUMN public.profiles.avatar_theme IS 'CSS class list representing the background gradient of the user avatar';
COMMENT ON COLUMN public.profiles.avatar_icon IS 'Single character/emoji used as the avatar character';
COMMENT ON COLUMN public.profiles.avatar_img IS 'Base64 data URL representing the square center-cropped user profile picture';
