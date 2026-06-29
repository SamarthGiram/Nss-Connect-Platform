import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  HiOutlineCalendar, HiOutlineUserGroup, HiOutlineClipboardCheck,
  HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineLocationMarker, HiOutlineClock
} from 'react-icons/hi';
import { BsShieldCheck } from 'react-icons/bs';
import { FiArrowRight, FiTrendingUp, FiActivity, FiUserPlus, FiCalendar, FiBell, FiCheckSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, iconBg, label, value, sub, subColor, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${iconBg}`}>
      <Icon size={26} className="text-white" />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">{label}</p>
      <p className="text-[28px] font-extrabold text-gray-800 leading-none">{value}</p>
      <p className={`text-[11px] font-bold mt-1 ${subColor}`}>{sub}</p>
    </div>
  </div>
);

const QuickLink = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2.5 px-4 py-3.5 bg-white rounded-xl border border-gray-100 hover:border-[#102167]/30 hover:bg-[#f5f7ff] transition-all duration-200 w-full shadow-sm hover:shadow-md group">
    <div className="w-8 h-8 bg-[#eef2ff] rounded-lg flex items-center justify-center group-hover:bg-[#102167] transition-colors duration-200">
      <Icon size={16} className="text-[#102167] group-hover:text-white transition-colors duration-200" />
    </div>
    <span className="text-sm font-bold text-gray-700 group-hover:text-[#102167] transition-colors duration-200">{label}</span>
  </button>
);

const AdminDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ students: 0, professors: 0, events: 0, pending: 0 });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Count students
        const { count: studentCount } = await supabase
          .from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student');

        // Count professors
        const { count: profCount } = await supabase
          .from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'professor');

        // Count pending approvals
        const { count: pendingCount } = await supabase
          .from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'pending');

        // Fetch pending users (up to 3 for preview)
        const { data: pendingData } = await supabase
          .from('profiles')
          .select('id, name, email, role, created_at')
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(3);

        // Count events
        const { count: eventCount } = await supabase
          .from('events').select('*', { count: 'exact', head: true });

        // Fetch recent events
        const { data: eventsData } = await supabase
          .from('events')
          .select('id, title, date, venue, status')
          .order('date', { ascending: false })
          .limit(4);

        setStats({
          students:   studentCount  || 0,
          professors: profCount     || 0,
          events:     eventCount    || 0,
          pending:    pendingCount  || 0,
        });
        setPendingUsers(pendingData || []);
        setRecentEvents(eventsData  || []);
      } catch (err) {
        console.error('AdminDashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={HiOutlineCalendar}      iconBg="bg-gradient-to-br from-[#102167] to-[#3b4da8]"   label="Total Events"    value={loading ? '…' : stats.events}     sub="This Semester"     subColor="text-gray-400"     onClick={() => navigate('/admin/events')} />
        <StatCard icon={HiOutlineUserGroup}     iconBg="bg-gradient-to-br from-[#ef7041] to-[#f48b62]"   label="Total Students"  value={loading ? '…' : `${stats.students}+`}  sub="Active Volunteers"  subColor="text-[#ef7041]"    onClick={() => navigate('/admin/users')} />
        <StatCard icon={BsShieldCheck}          iconBg="bg-gradient-to-br from-emerald-400 to-green-500" label="Professors"       value={loading ? '…' : stats.professors} sub="Faculty Members"   subColor="text-emerald-500"  onClick={() => navigate('/admin/users')} />
        <StatCard icon={HiOutlineClipboardCheck} iconBg="bg-gradient-to-br from-violet-500 to-purple-600" label="Pending"         value={loading ? '…' : stats.pending}    sub="Need Approval"     subColor="text-violet-500"   onClick={() => navigate('/admin/approvals')} />
      </div>

      {/* ── Row 2: Events + Right Panel ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

        {/* Recent Events */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <HiOutlineCalendar size={18} className="text-[#102167]" /> Recent Events
            </h3>
            <button onClick={() => navigate('/admin/events')}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#102167] bg-[#eef2ff] px-3 py-1.5 rounded-lg hover:bg-[#102167] hover:text-white transition-all duration-200 border-none">
              View All <FiArrowRight size={11} />
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              <p className="text-xs text-gray-400 font-semibold text-center py-6">Loading events…</p>
            ) : recentEvents.length === 0 ? (
              <p className="text-xs text-gray-400 font-semibold text-center py-6">No events yet. Create your first event!</p>
            ) : recentEvents
                .filter(ev => ev.title && ev.title.trim().length > 0)
                .map(ev => {
              const d = ev.date ? new Date(ev.date) : null;
              const isValidDate = d && !isNaN(d.getTime());
              const isUpcoming = isValidDate && d >= new Date();
              return (
                <div key={ev.id} onClick={() => navigate('/admin/events')}
                  className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-xl hover:bg-[#eef2ff] transition-colors group cursor-pointer">
                  <div className={`w-12 h-12 bg-gradient-to-br ${isUpcoming ? 'from-[#ef7041] to-[#f48b62]' : 'from-[#102167] to-[#3b4da8]'} rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0`}>
                    {isValidDate ? (
                      <>
                        <p className="text-sm font-extrabold leading-none">{d.getDate()}</p>
                        <p className="text-[9px] font-bold text-blue-200 uppercase">{d.toLocaleString('default', { month: 'short' })}</p>
                      </>
                    ) : (
                      <HiOutlineCalendar size={20} className="text-white/70" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 group-hover:text-[#102167] transition-colors">{ev.title}</p>
                    <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                      <HiOutlineLocationMarker size={11} className="text-[#ef7041]" /> {ev.venue || '—'}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isUpcoming ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {isUpcoming ? 'Upcoming' : 'Completed'}
                    </span>
                    {isValidDate && (
                      <p className="text-[10px] text-gray-400 font-medium mt-1 flex items-center gap-0.5 justify-end">
                        <HiOutlineClock size={10} /> {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="xl:col-span-2 space-y-4">

          {/* Platform Overview */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <FiTrendingUp size={16} className="text-[#102167]" /> Platform Overview
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Student Registrations', val: Math.min(Math.round((stats.students / Math.max(stats.students + 5, 1)) * 100), 99) || 0, color: 'bg-[#102167]' },
                { label: 'Event Completion Rate', val: recentEvents.length > 0 ? Math.round((recentEvents.filter(e => new Date(e.date) < new Date()).length / recentEvents.length) * 100) : 0, color: 'bg-emerald-500' },
                { label: 'Avg Attendance',         val: 20, color: 'bg-[#ef7041]' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500 font-semibold">{s.label}</span>
                    <span className="text-xs font-extrabold text-gray-700">{s.val}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full transition-all duration-700`} style={{ width: `${s.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals — REAL DATA */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
                <HiOutlineClipboardCheck size={16} className="text-[#ef7041]" /> Pending Approvals
              </h3>
              {stats.pending > 0 && (
                <button onClick={() => navigate('/admin/approvals')}
                  className="text-[10px] font-bold text-[#102167] bg-[#eef2ff] px-2.5 py-1 rounded-lg hover:bg-[#102167] hover:text-white transition-all border-none">
                  View All
                </button>
              )}
            </div>
            {loading ? (
              <p className="text-xs text-gray-400 font-semibold text-center py-4">Loading…</p>
            ) : pendingUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 gap-2">
                <HiOutlineCheckCircle size={28} className="text-emerald-400" />
                <p className="text-xs font-bold text-gray-400">All caught up! No pending approvals.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingUsers.map((p, i) => (
                  <div key={p.id || i} className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="w-8 h-8 bg-[#ef7041] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {(p.name || p.email || '?')[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{p.name || p.email}</p>
                      <p className="text-[10px] text-gray-500 font-medium capitalize">{p.role} Registration</p>
                    </div>
                    <button onClick={() => navigate('/admin/approvals')}
                      className="text-[10px] font-bold text-[#102167] bg-white border border-[#102167]/20 px-2.5 py-1 rounded-lg hover:bg-[#102167] hover:text-white transition-all flex-shrink-0">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-base font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#102167]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickLink icon={FiCalendar}    label="Manage Events"    onClick={() => navigate('/admin/events')} />
          <QuickLink icon={FiCheckSquare} label="Take Attendance"  onClick={() => navigate('/admin/attendance')} />
          <QuickLink icon={FiBell}        label="Announcements"    onClick={() => navigate('/admin/announcements')} />
          <QuickLink icon={FiUserPlus}    label="Pending Approvals" onClick={() => navigate('/admin/approvals')} />
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
