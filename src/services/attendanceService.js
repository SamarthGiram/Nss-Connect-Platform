import { supabase } from '../lib/supabase';

/* ─── Demo fallback data shown when DB has no real records ─── */
const DEMO_ATTENDANCE = [
  { id: 'd1', status: 'Present',  events: { id: 'e1', title: 'Tree Plantation Drive',        date: '2026-03-15', venue: 'Green Park, Pune'       } },
  { id: 'd2', status: 'Absent',   events: { id: 'e2', title: 'Blood Donation Camp',           date: '2026-03-22', venue: 'Civil Hospital, Pune'    } },
  { id: 'd3', status: 'Absent',   events: { id: 'e3', title: 'Campus Clean-Up Drive',         date: '2026-04-02', venue: 'NBNSTIC Campus'          } },
  { id: 'd4', status: 'Absent',   events: { id: 'e4', title: 'Rural Education Camp',          date: '2026-04-10', venue: 'Wagholi Village'         } },
  { id: 'd5', status: 'Absent',   events: { id: 'e5', title: 'Health Awareness Drive',        date: '2026-04-20', venue: 'Community Hall, Pune'    } },
  { id: 'd6', status: 'Present',  events: { id: 'e6', title: 'Swachhta Abhiyan',              date: '2026-05-05', venue: 'Municipal Area, Pune'    } },
  { id: 'd7', status: 'Absent',   events: { id: 'e7', title: 'Road Safety Awareness Rally',   date: '2026-05-15', venue: 'FC Road, Pune'           } },
  { id: 'd8', status: 'Absent',   events: { id: 'e8', title: 'Digital Literacy Workshop',     date: '2026-05-25', venue: 'NBNSTIC Lab Block'       } },
  { id: 'd9', status: 'Absent',   events: { id: 'e9', title: 'Flood Relief Volunteer Drive',  date: '2026-06-05', venue: 'Sangli District'         } },
  { id: 'd10', status: 'Absent',  events: { id: 'e10', title: 'Dadachi Shala Teaching Camp', date: '2026-06-18', venue: 'Adopted Village School'  } },
];

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
  // Return demo data if DB has no records yet
  return data.length > 0 ? data : DEMO_ATTENDANCE;
};

/* ── Fetch attendance for an event (professor view) ── */
export const fetchEventAttendance = async (eventId) => {
  const { data, error } = await supabase
    .from('attendance')
    .select(`
      *,
      profiles!attendance_student_id_fkey (id, name, email, roll_number, "group", department)
    `)
    .eq('event_id', eventId);
  if (error) throw error;
  return data;
};

/* ── Fetch all students for an event (for taking attendance) ── */
export const fetchStudentsForEvent = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email, roll_number, "group", department')
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

  // Use demo data if DB has no records yet
  const rows    = data.length > 0 ? data : DEMO_ATTENDANCE;
  const total   = rows.length;
  const present = rows.filter(r => r.status === 'Present').length;
  const pct     = total > 0 ? Math.round((present / total) * 100) : 0;
  return { total, present, absent: total - present, pct };
};
