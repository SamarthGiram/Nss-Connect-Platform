import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchEvents } from '../../services/eventsService';
import { fetchStudentsForEvent, submitAttendance } from '../../services/attendanceService';
import {
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineUserGroup,
  HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineSearch
} from 'react-icons/hi';
import { FiSave, FiCheck, FiX } from 'react-icons/fi';



const TakeAttendance = () => {
  const { auth } = useAuth();
  const [events, setEvents]               = useState([]);
  const [students, setStudents]           = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [search, setSearch]               = useState('');
  const [attendance, setAttendance]       = useState({});
  const [submitted, setSubmitted]         = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [submitting, setSubmitting]       = useState(false);

  /* Load events */
  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoadingEvents(false));

    fetchStudentsForEvent()
      .then(setStudents)
      .catch(console.error);
  }, []);

  const event = events.find(e => e.id === selectedEvent);

  const filteredStudents = students.filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.group || '').toLowerCase().includes(search.toLowerCase())
  );

  const mark = (id, status) => {
    setSubmitted(false);
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const markAll = (status) => {
    const all = {};
    filteredStudents.forEach(s => { all[s.id] = status; });
    setAttendance(prev => ({ ...prev, ...all }));
  };

  const presentCount = Object.values(attendance).filter(v => v === 'Present').length;
  const absentCount  = Object.values(attendance).filter(v => v === 'Absent').length;
  const unmarked     = students.length - presentCount - absentCount;

  const handleSubmit = async () => {
    if (!selectedEvent) return;
    setSubmitting(true);
    try {
      const records = students.map(s => ({
        event_id:     selectedEvent,
        student_id:   s.id,
        professor_id: auth?.id || null,
        status:       attendance[s.id] || 'Absent',
      }));
      await submitAttendance(records);
      setSubmitted(true);
    } catch (err) {
      alert('Submission failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Take Attendance</h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">Mark student attendance for NSS events</p>
      </div>

      {/* Event Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">Select Event</label>
        <select value={selectedEvent} onChange={e => { setSelectedEvent(e.target.value); setAttendance({}); setSubmitted(false); }}
          className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold text-gray-700 focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all">
          <option value="">— Choose an event —</option>
          {events.map(ev => (
            <option key={ev.id} value={ev.id}>{ev.title} — {new Date(ev.date).toLocaleDateString()}</option>
          ))}
        </select>

        {event && (
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 px-3 py-2 rounded-lg">
              <HiOutlineCalendar size={13} className="text-[#102167]"/>
              {new Date(event.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 px-3 py-2 rounded-lg">
              <HiOutlineLocationMarker size={13} className="text-[#ef7041]"/>
              {event.venue}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 px-3 py-2 rounded-lg">
              <HiOutlineUserGroup size={13} className="text-violet-500"/>
              {students.length} students
            </div>
          </div>
        )}
      </div>

      {/* Attendance Panel */}
      {selectedEvent && (
        <>
          {/* Summary + Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: 'Total Students', value: students.length, color: 'text-[#102167]',  bg: 'bg-[#eef2ff]'  },
              { label: 'Present',        value: presentCount,          color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Absent',         value: absentCount,           color: 'text-red-500',     bg: 'bg-red-50'     },
              { label: 'Unmarked',       value: unmarked,              color: 'text-amber-600',   bg: 'bg-amber-50'   },
            ].map(c => (
              <div key={c.label} className={`${c.bg} rounded-2xl p-4 text-center border border-white shadow-sm`}>
                <p className={`text-3xl font-extrabold ${c.color}`}>{c.value}</p>
                <p className="text-[11px] text-gray-500 font-semibold mt-1">{c.label}</p>
              </div>
            ))}
          </div>

          {/* Search + Bulk Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <HiOutlineSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search student by name or group..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"/>
            </div>
            <div className="flex gap-2">
              <button onClick={() => markAll('Present')}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-transparent transition-all">
                <FiCheck size={12}/> All Present
              </button>
              <button onClick={() => markAll('Absent')}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-200 hover:bg-red-500 hover:text-white hover:border-transparent transition-all">
                <FiX size={12}/> All Absent
              </button>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-extrabold text-gray-800 flex items-center gap-2">
                <HiOutlineUserGroup size={16} className="text-[#102167]"/> Student List
              </h3>
              <span className="text-xs text-gray-400 font-bold">{filteredStudents.length} students</span>
            </div>

            <div className="divide-y divide-gray-50">
              {filteredStudents.map((student, i) => {
                const status = attendance[student.id];
                return (
                  <div key={student.id}
                    className={`flex items-center gap-4 px-6 py-4 transition-colors
                      ${status === 'Present' ? 'bg-emerald-50/40' : status === 'Absent' ? 'bg-red-50/30' : 'hover:bg-gray-50/60'}`}>

                    {/* Rank */}
                    <span className="text-xs font-extrabold text-gray-300 w-5 flex-shrink-0">{i + 1}</span>

                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0
                      ${status === 'Present' ? 'bg-emerald-500' : status === 'Absent' ? 'bg-red-400' : 'bg-gradient-to-br from-[#102167] to-[#3b4da8]'}`}>
                      {student.name[0]}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800">{student.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{student.group || '—'}</p>
                    </div>

                    {/* Status badge */}
                    {status && (
                      <span className={`text-[11px] font-extrabold px-3 py-1.5 rounded-full mr-2 flex items-center gap-1
                        ${status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                        {status === 'Present' ? <HiOutlineCheckCircle size={12}/> : <HiOutlineXCircle size={12}/>}
                        {status}
                      </span>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => mark(student.id, 'Present')}
                        className={`flex items-center gap-1 px-4 py-2 text-xs font-extrabold rounded-xl transition-all duration-200
                          ${status === 'Present'
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:border-transparent'}`}>
                        <FiCheck size={11}/> Present
                      </button>
                      <button onClick={() => mark(student.id, 'Absent')}
                        className={`flex items-center gap-1 px-4 py-2 text-xs font-extrabold rounded-xl transition-all duration-200
                          ${status === 'Absent'
                            ? 'bg-red-500 text-white shadow-md shadow-red-200'
                            : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white hover:border-transparent'}`}>
                        <FiX size={11}/> Absent
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Footer */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                <span className="font-extrabold text-emerald-600">{presentCount} present</span>
                <span className="mx-2">·</span>
                <span className="font-extrabold text-red-400">{absentCount} absent</span>
                <span className="mx-2">·</span>
                <span className="font-extrabold text-amber-500">{unmarked} unmarked</span>
              </div>
              <button onClick={handleSubmit}
                disabled={unmarked > 0}
                className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl transition-all shadow-md
                  ${unmarked > 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#102167] text-white hover:bg-[#ef7041] hover:shadow-lg'}`}>
                <FiSave size={14}/> Submit Attendance
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {submitted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <HiOutlineCheckCircle size={20} className="text-white"/>
              </div>
              <div>
                <p className="text-sm font-extrabold text-emerald-800">Attendance Submitted Successfully!</p>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">
                  {presentCount} present · {absentCount} absent — saved for {event?.title}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {!selectedEvent && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-[#eef2ff] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HiOutlineCalendar size={28} className="text-[#102167]"/>
          </div>
          <p className="text-gray-600 font-bold text-base">Select an event above to begin marking attendance</p>
          <p className="text-gray-400 text-sm font-medium mt-1">All {students.length} registered students will appear here</p>
        </div>
      )}
    </div>
  );
};

export default TakeAttendance;
