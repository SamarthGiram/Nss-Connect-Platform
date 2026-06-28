import { supabase } from '../lib/supabase';
import { createClient } from '@supabase/supabase-js';

/* ── Fetch all profiles (admin) ── */
export const fetchAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/* ── Fetch users by role ── */
export const fetchUsersByRole = async (role) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', role)
    .order('name');
  if (error) throw error;
  return data;
};

/* ── Update user profile (admin) ── */
export const updateUserProfile = async (id, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

/* ── Fetch single profile ── */
export const fetchProfile = async (id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

/* ── Update own profile ── */
export const updateOwnProfile = async (id, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

/* ── Create User Account (Admin Only) ── */
export const createUserAccount = async (email, password, name, role = 'professor') => {
  const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  // Temporary client to avoid changing the current admin's session
  const tempClient = createClient(supabaseUrl, supabaseAnon, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });

  const { data, error } = await tempClient.auth.signUp({ email, password });
  if (error) throw error;

  // Update profile to be specified role & active
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ name, role, status: 'active' })
    .eq('id', data.user.id);
    
  if (profileError) throw profileError;
  return data.user;
};

/* ── Delete user profile ── */
export const deleteUserProfile = async (id) => {
  try {
    // 1. Set created_by to null in events organized by this user
    await supabase
      .from('events')
      .update({ created_by: null })
      .eq('created_by', id);

    // 2. Set professor_id to null in attendance marked by this user
    await supabase
      .from('attendance')
      .update({ professor_id: null })
      .eq('professor_id', id);
  } catch (err) {
    console.warn("Soft cleanup warning (some referenced tables may not exist yet):", err);
  }

  // 3. Now delete the profile row
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
};
