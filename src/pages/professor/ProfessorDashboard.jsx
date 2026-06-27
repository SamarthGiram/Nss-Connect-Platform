import { useAuth } from '../../context/AuthContext';
import { mockEvents } from '../../data/mockData';
import {
  HiOutlineCalendar, HiOutlineClipboardCheck, HiOutlineCheckCircle,
  HiOutlineClock, HiOutlineLocationMarker, HiOutlineUserGroup
} from 'react-icons/hi';
import { FiArrowRight, FiActivity, FiBookOpen, FiCalendar, FiBell, FiCheckSquare, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { BsShieldCheck } from 'react-icons/bs';

const StatCard = ({ icon: Icon, iconBg, label, value, sub, subColor }) => (
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

const QuickLink = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2.5 px-4 py-3.5 bg-white rounded-xl border border-gray-100 hover:border-[#102167]/30 hover:bg-[#f5f7ff] transition-all duration-200 w-full shadow-sm hover:shadow-md group">
    <div className="w-8 h-8 bg-[#eef2ff] rounded-lg flex items-center justify-center group-hover:bg-[#102167] transition-colors duration-200">
      <Icon size={16} className="text-[#102167] group-hover:text-white transition-colors duration-200" />
    </div>
    <span className="text-sm font-bold text-gray-700 group-hover:text-[#102167] transition-colors duration-200">{label}</span>
  </button>
);

const recentActivity = [
  { icon: HiOutlineCheckCircle, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', text: 'Attendance marked for Campus Clean-up Drive', time: '1 hr ago'  },
  { icon: HiOutlineCalendar,    iconColor: 'text-[#102167]',   iconBg: 'bg-[#eef2ff]', text: 'Blood Donation Camp upcoming — 5 days left',  time: '3 hrs ago' },
  { icon: HiOutlineUserGroup,   iconColor: 'text-amber-600',   iconBg: 'bg-amber-50',  text: '24 students registered for Tree Drive',       time: '1 day ago' },
  { icon: BsShieldCheck,        iconColor: 'text-violet-600',  iconBg: 'bg-violet-50', text: 'Attendance report submitted to admin',         time: '2 days ago'},
];

const ProfessorDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const today = new Date();

  return (
    <div className="space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon={HiOutlineCalendar}      iconBg="bg-gradient-to-br from-[#102167] to-[#3b4da8]" label="Assigned Events"   value={mockEvents.length} sub="This Semester"     subColor="text-gray-400" />
        <StatCard icon={HiOutlineClipboardCheck} iconBg="bg-gradient-to-br from-amber-400 to-orange-500" label="Attendance Taken"  value="3"                 sub="Events Completed"  subColor="text-amber-500" />
        <StatCard icon={HiOutlineUserGroup}      iconBg="bg-gradient-to-br from-emerald-400 to-green-500" label="Total Students"   value="48"                sub="Under My Groups"   subColor="text-emerald-500" />
        <StatCard icon={BsShieldCheck}           iconBg="bg-gradient-to-br from-violet-500 to-purple-600" label="Pending Reports"  value="2"                 sub="Need Submission"   subColor="text-violet-500" />
      </div>

      {/* ── Row 2: Events + Summary ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

        {/* My Assigned Events */}
        <div className="xl:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
              <HiOutlineCalendar size={18} className="text-[#102167]" /> My Assigned Events
            </h3>
            <button className="text-[11px] font-bold text-[#102167] bg-[#eef2ff] px-3 py-1.5 rounded-lg hover:bg-[#102167] hover:text-white transition-all duration-200">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {mockEvents.map(ev => {
              const d = new Date(ev.date);
              const isPast = d < today;
              return (
                <div key={ev.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#eef2ff] transition-colors group border border-transparent hover:border-[#102167]/10">
                  <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${isPast ? 'bg-gradient-to-br from-gray-400 to-gray-500' : 'bg-gradient-to-br from-[#102167] to-[#3b4da8]'}`}>
                    <p className="text-sm font-extrabold text-white leading-none">{d.getDate()}</p>
                    <p className="text-[9px] font-bold text-blue-200 uppercase">{d.toLocaleString('default',{month:'short'})}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-gray-800">{ev.title}</p>
                    <p className="text-xs text-gray-500 font-medium">{ev.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <HiOutlineLocationMarker size={10} className="text-[#ef7041]"/> {ev.venue}
                      </span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <HiOutlineClock size={10} className="text-[#102167]"/> {d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${isPast ? 'bg-gray-100 text-gray-500' : 'bg-emerald-50 text-emerald-700'}`}>
                      {isPast ? 'Completed' : 'Active'}
                    </span>
                    <button className="text-[10px] font-bold text-[#102167] bg-[#eef2ff] px-2.5 py-1 rounded-lg hover:bg-[#102167] hover:text-white transition-all">
                      Mark Attendance
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Extra upcoming */}
            {[
              { title: 'Tree Plantation Drive', venue: 'Green Park', date: '28 Jun', time: '09:00 AM' },
              { title: 'Swachhta Abhiyan',      venue: 'Municipal Area', date: '12 Jul', time: '08:00 AM' },
            ].map((ev, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#eef2ff] transition-colors group border border-transparent hover:border-[#102167]/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#ef7041] to-[#f48b62] flex flex-col items-center justify-center flex-shrink-0">
                  <p className="text-[10px] font-extrabold text-white leading-tight">{ev.date}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-gray-800">{ev.title}</p>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                    <HiOutlineLocationMarker size={10} className="text-[#ef7041]"/> {ev.venue}
                    <span className="mx-1">•</span>
                    <HiOutlineClock size={10}/> {ev.time}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full flex-shrink-0">Upcoming</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="xl:col-span-2 space-y-4">

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <FiBookOpen size={16} className="text-amber-500"/> Semester Progress
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Events Completed', val: 60, display: '3/5',  color: 'bg-[#102167]'    },
                { label: 'Attendance Filed', val: 85, display: '85%',  color: 'bg-emerald-500'  },
                { label: 'Student Avg Rate', val: 78, display: '78%',  color: 'bg-amber-500'    },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-gray-500 font-semibold">{s.label}</span>
                    <span className="text-xs font-extrabold text-gray-700">{s.display}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full transition-all duration-700`} style={{ width: `${s.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-extrabold text-gray-800 mb-4 flex items-center gap-2">
              <HiOutlineClipboardCheck size={16} className="text-[#102167]"/> Attendance Summary
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Total Students', value: '48', color: 'text-[#102167]' },
                { label: 'Avg Present',    value: '38', color: 'text-emerald-600'},
                { label: 'Avg Absent',     value: '10', color: 'text-red-400'   },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl py-3">
                  <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-amber-50 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <HiOutlineCheckCircle size={14} className="text-amber-500 flex-shrink-0"/>
              <p className="text-xs text-amber-700 font-bold">2 events pending attendance</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2.5: Quick Links ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-base font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#102167]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickLink icon={FiCalendar} label="Manage Events" onClick={() => navigate('/professor/events')} />
          <QuickLink icon={FiCheckSquare} label="Take Attendance" onClick={() => navigate('/professor/attendance')} />
          <QuickLink icon={FiBell} label="Announcements" onClick={() => navigate('/professor/announcements')} />
          <QuickLink icon={FiUsers} label="Manage Students" onClick={() => navigate('/professor/students')} />
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
            <FiActivity size={16} className="text-[#102167]"/> Recent Activity
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {recentActivity.map((act, i) => {
            const IC = act.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-[#eef2ff] transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${act.iconBg}`}>
                  <IC size={17} className={act.iconColor}/>
                </div>
                <p className="text-sm font-semibold text-gray-700 flex-1">{act.text}</p>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">{act.time}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ProfessorDashboard;
