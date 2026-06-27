import { supabase } from '../lib/supabase';

/* ── Fetch all events ── */
export const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  if (error) throw error;
  return data;
};

/* ── Fetch a single event ── */
export const fetchEvent = async (id) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

/* ── Create event (admin only) ── */
export const createEvent = async (eventData) => {
  const { data, error } = await supabase
    .from('events')
    .insert([eventData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

/* ── Update event (admin only) ── */
export const updateEvent = async (id, eventData) => {
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

/* ── Delete event (admin only) ── */
export const deleteEvent = async (id) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

/* ── Register student for event ── */
export const registerForEvent = async (eventId, studentId) => {
  const { data, error } = await supabase
    .from('event_registrations')
    .upsert([{ event_id: eventId, student_id: studentId }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

/* ── Unregister student ── */
export const unregisterFromEvent = async (eventId, studentId) => {
  const { error } = await supabase
    .from('event_registrations')
    .delete()
    .eq('event_id', eventId)
    .eq('student_id', studentId);
  if (error) throw error;
};

/* ── Get registrations for a student ── */
export const fetchStudentRegistrations = async (studentId) => {
  const { data, error } = await supabase
    .from('event_registrations')
    .select('event_id')
    .eq('student_id', studentId);
  if (error) throw error;
  return data.map(r => r.event_id);
};
