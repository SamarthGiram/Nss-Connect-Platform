import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchEvents } from '../../services/eventsService';
import { fetchStudentAttendanceSummary, fetchStudentAttendance } from '../../services/attendanceService';
import {
  HiOutlineUserGroup, HiOutlineCalendar, HiOutlineCheckCircle,
  HiOutlineStar, HiOutlineExternalLink, HiOutlineDownload,
  HiOutlinePhotograph, HiOutlinePhone, HiOutlineLocationMarker
} from 'react-icons/hi';
import { FiArrowRight, FiActivity } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';

// ─── Circular Progress ───────────────────────────────────────────
const CircularProgress = ({ percent }) => {
  const size   = 190;
  const cx     = size / 2;
  const r      = 78;
  const stroke = 11;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#102167" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle cx={cx} cy={cx} r={r} stroke="#e8eeff" strokeWidth={stroke} fill="none" />
        {/* Progress */}
        <circle
          cx={cx} cy={cx} r={r}
          stroke="url(#progressGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      </svg>
      {/* Inner text — absolutely centred */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span className="text-[32px] font-black text-[#102167] leading-none">{percent}%</span>
        <span className="text-[11px] text-gray-400 font-bold tracking-wide">Overall Attendance</span>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, iconBg, value, label, sub, subColor }) => (
  <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
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

// ─── Event Row ────────────────────────────────────────────────────
const EventRow = ({ day, month, title, venue, time }) => (
  <div className="flex items-center gap-4 py-3.5 border-b border-gray-50 last:border-0">
    <div className="w-12 text-center flex-shrink-0">
      <p className="text-xl font-extrabold text-gray-800 leading-none">{day}</p>
      <p className="text-[11px] font-bold text-[#ef7041] uppercase tracking-wider">{month}</p>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-gray-800">{title}</p>
      <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-0.5">
        <HiOutlineLocationMarker size={11} /> {venue}
      </p>
    </div>
    <span className="text-[10px] font-bold text-[#3b82f6] bg-blue-50 px-2.5 py-1 rounded-full flex-shrink-0">
      Upcoming
    </span>
    <span className="text-xs text-gray-400 font-medium w-16 text-right flex-shrink-0">{time}</span>
  </div>
);

// ─── Activity Row ─────────────────────────────────────────────────
const ActivityRow = ({ icon: Icon, iconColor, iconBg, text, time }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon size={15} className={iconColor} />
    </div>
    <p className="text-sm text-gray-700 font-medium flex-1">{text}</p>
    <p className="text-xs text-gray-400 font-medium flex-shrink-0">{time}</p>
  </div>
);

// ─── Quick Link Button ────────────────────────────────────────────
const QuickLink = ({ icon: Icon, label }) => (
  <button className="flex items-center gap-2.5 px-4 py-3.5 bg-white rounded-xl border border-gray-100 hover:border-[#102167]/30 hover:bg-[#f5f7ff] transition-all duration-200 w-full shadow-sm hover:shadow-md group">
    <div className="w-8 h-8 bg-[#eef2ff] rounded-lg flex items-center justify-center group-hover:bg-[#102167] transition-colors duration-200">
      <Icon size={16} className="text-[#102167] group-hover:text-white transition-colors duration-200" />
    </div>
    <span className="text-sm font-bold text-gray-700 group-hover:text-[#102167] transition-colors duration-200">{label}</span>
  </button>
);

// ─── Main Dashboard ───────────────────────────────────────────────
const StudentDashboard = () => {
  const { auth } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [attendance, setAttendance] = useState({ total: 0, present: 0, absent: 0, pct: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load Events
        const allEvents = await fetchEvents();
        setTotalEvents(allEvents.length);
        
        // Filter upcoming
        const now = new Date();
        const upcoming = allEvents
          .filter(e => new Date(e.date) > now || e.status === 'Upcoming')
          .slice(0, 3)
          .map(e => {
            const d = new Date(e.date);
            return {
              day: d.getDate().toString().padStart(2, '0'),
              month: d.toLocaleString('default', { month: 'short' }).toUpperCase(),
              title: e.title,
              venue: e.venue,
              time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
          });
        setUpcomingEvents(upcoming);

        if (auth?.id) {
          // Load Attendance Summary
          const attSummary = await fetchStudentAttendanceSummary(auth.id);
          setAttendance(attSummary);

          // Load Recent Attendance (Activity)
          const attHistory = await fetchStudentAttendance(auth.id);
          const recentAtt = attHistory.slice(0, 3).map(a => ({
            icon: a.status === 'Present' ? HiOutlineCheckCircle : HiOutlineXCircle,
            iconColor: a.status === 'Present' ? 'text-green-600' : 'text-red-600',
            iconBg: a.status === 'Present' ? 'bg-green-50' : 'bg-red-50',
            text: `Marked ${a.status.toLowerCase()} for ${a.events?.title || 'an event'}`,
            time: new Date(a.created_at).toLocaleDateString(),
          }));
          setRecentActivity(recentAtt.length > 0 ? recentAtt : [
            { icon: HiOutlineUserGroup, iconColor: 'text-blue-600', iconBg: 'bg-blue-50', text: 'Welcome to NSS Connect Platform!', time: 'Recently' }
          ]);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [auth]);

  return (
    <div className="space-y-5">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          icon={HiOutlineUserGroup}
          iconBg="bg-gradient-to-br from-[#102167] to-[#3b4da8]"
          label="Total Events"
          value={totalEvents}
          sub="This Semester"
          subColor="text-gray-400"
        />
        <StatCard
          icon={HiOutlineCalendar}
          iconBg="bg-gradient-to-br from-[#ef7041] to-[#f48b62]"
          label="Events Attended"
          value={attendance.present}
          sub="Keep Going!"
          subColor="text-[#ef7041]"
        />
        <StatCard
          icon={HiOutlineCheckCircle}
          iconBg="bg-gradient-to-br from-emerald-400 to-green-500"
          label="Attendance"
          value={`${attendance.pct}%`}
          sub={attendance.total === 0 ? "No events yet" : (attendance.pct >= 75 ? "Excellent!" : "Needs Improvement")}
          subColor={attendance.total === 0 ? "text-gray-400" : (attendance.pct >= 75 ? "text-emerald-500" : "text-amber-500")}
        />
        <StatCard
          icon={BsShieldCheck}
          iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
          label="NSS Points"
          value={attendance.present * 10}
          sub="Great Work!"
          subColor="text-violet-500"
        />
      </div>

      {/* ── Row 2: Events + Attendance ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Upcoming Events */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <HiOutlineCalendar size={18} className="text-[#102167]" />
              Upcoming Events
            </h3>
            <button className="text-[11px] font-bold text-[#102167] bg-[#eef2ff] px-3 py-1.5 rounded-lg hover:bg-[#102167] hover:text-white transition-all duration-200">
              View All
            </button>
          </div>
          <div>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((ev, i) => (
                <EventRow key={i} {...ev} />
              ))
            ) : (
              <p className="text-sm text-gray-500 py-4">No upcoming events scheduled.</p>
            )}
          </div>
          <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#102167] bg-[#eef2ff] px-4 py-2 rounded-xl hover:bg-[#102167] hover:text-white transition-all duration-200 group">
            View All Events
            <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Attendance Overview */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-base font-extrabold text-gray-800 mb-1">Attendance Overview</h3>
          <p className="text-xs text-gray-400 font-medium mb-4">Current semester performance</p>

          {/* Circle — centred */}
          <div className="flex-1 flex items-center justify-center py-2">
            <CircularProgress percent={attendance.pct} />
          </div>

          {/* Status pill */}
          <div className={`mt-4 rounded-xl px-4 py-3 flex items-center gap-2 ${attendance.pct >= 75 ? 'bg-emerald-50' : 'bg-amber-50'}`}>
            <HiOutlineCheckCircle size={16} className={`${attendance.pct >= 75 ? 'text-emerald-500' : 'text-amber-500'} flex-shrink-0`} />
            <p className={`text-xs font-bold ${attendance.pct >= 75 ? 'text-emerald-700' : 'text-amber-700'}`}>
              {attendance.pct >= 75 ? 'Excellent! You are doing great.' : 'Warning: Attendance is low.'}
            </p>
          </div>

          {/* Mini legend */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ['Present', attendance.present, 'text-[#102167]'],
              ['Absent', attendance.absent, 'text-red-400'],
              ['Rate', `${attendance.pct}%`, 'text-emerald-600']
            ].map(([l,v,c])=>(
              <div key={l} className="bg-gray-50 rounded-xl py-2">
                <p className={`text-sm font-extrabold ${c}`}>{v}</p>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Recent Activity + Quick Links ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Recent Activity */}
        <div className="col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <FiActivity size={16} className="text-[#102167]" />
              Recent Activity
            </h3>
          </div>
          {recentActivity.map((act, i) => (
            <ActivityRow key={i} {...act} />
          ))}
          <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#ef7041] bg-orange-50 px-4 py-2 rounded-xl hover:bg-[#ef7041] hover:text-white transition-all duration-200 group">
            View All Activity
            <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Quick Links */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
          <h3 className="text-base font-extrabold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#102167]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <QuickLink icon={HiOutlineExternalLink} label="NSS Guidelines" />
            <QuickLink icon={HiOutlineDownload} label="Downloads" />
            <QuickLink icon={HiOutlinePhotograph} label="Photo Gallery" />
            <QuickLink icon={HiOutlinePhone} label="Contact Coordinator" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
