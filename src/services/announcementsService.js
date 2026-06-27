import { supabase } from '../lib/supabase';

/* ── Fetch all announcements (newest first) ── */
export const fetchAnnouncements = async () => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*, profiles(name, role)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/* ── Fetch announcements visible to a student ── */
export const fetchStudentAnnouncements = async () => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*, profiles(name, role)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/* ── Create announcement (admin/professor) ── */
export const createAnnouncement = async (payload) => {
  const { data, error } = await supabase
    .from('announcements')
    .insert([payload])
    .select('*, profiles(name, role)')
    .single();
  if (error) throw error;
  return data;
};

/* ── Delete announcement ── */
export const deleteAnnouncement = async (id) => {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
