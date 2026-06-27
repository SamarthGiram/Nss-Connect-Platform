import { supabase } from '../lib/supabase';

/* ── Fetch attendance for a student ── */
export const fetchStudentAttendance = async (studentId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      events (id, title, date, venue)
    `)
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

/* ── Fetch attendance for an event (professor view) ── */
export const fetchEventAttendance = async (eventId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      profiles!attendance_student_id_fkey (id, name, email, roll_number, "group")
    `)
    .eq('event_id', eventId);
  if (error) throw error;
  return data;
};

/* ── Fetch all students for an event (for taking attendance) ── */
export const fetchStudentsForEvent = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, roll_number, "group"')
    .eq('role', 'student')
    .order('name');
  if (error) throw error;
  return data;
};

/* ── Submit attendance records (upsert) ── */
export const submitAttendance = async (records) => {
  // records: [{ event_id, student_id, professor_id, status }]
  const { data, error } = await supabase
    .from('attendance')
    .upsert(records, { onConflict: 'event_id,student_id' })
    .select();
  if (error) throw error;
  return data;
};

/* ── Get attendance summary for a student ── */
export const fetchStudentAttendanceSummary = async (studentId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select('status')
    .eq('student_id', studentId);
  if (error) throw error;

  const total   = data.length;
  const present = data.filter(r => r.status === 'Present').length;
  const pct     = total > 0 ? Math.round((present / total) * 100) : 0;
  return { total, present, absent: total - present, pct };
};
