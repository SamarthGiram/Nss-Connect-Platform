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

/* ── Create Professor Account (Admin Only) ── */
export const createProfessorAccount = async (email, password, name) => {
  const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  // Temporary client to avoid changing the current admin's session
  const tempClient = createClient(supabaseUrl, supabaseAnon, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });

  const { data, error } = await tempClient.auth.signUp({ email, password });
  if (error) throw error;

  // Update profile to be professor & active
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ name, role: 'professor', status: 'active' })
    .eq('id', data.user.id);
    
  if (profileError) throw profileError;
  return data.user;
};
