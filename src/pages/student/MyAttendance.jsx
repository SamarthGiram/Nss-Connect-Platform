import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsShieldCheck } from 'react-icons/bs';

const records = [
  { id: 1, event: 'Tree Plantation Drive',   date: '15 Jan 2025', venue: 'Green Park, Pune',     status: 'Present', points: 10 },
  { id: 2, event: 'Blood Donation Camp',      date: '10 Jan 2025', venue: 'Civil Hospital, Pune', status: 'Present', points: 15 },
  { id: 3, event: 'Tree Plantation',          date: '05 Jan 2025', venue: 'Botanical Garden',      status: 'Absent',  points: 0  },
  { id: 4, event: 'Campus Clean-Up Drive',    date: '20 Dec 2024', venue: 'College Campus',        status: 'Present', points: 10 },
  { id: 5, event: 'Covid Awareness Rally',    date: '15 Dec 2024', venue: 'FC Road, Pune',         status: 'Present', points: 10 },
  { id: 6, event: 'Rural Education Camp',     date: '10 Dec 2024', venue: 'Wagholi Village',       status: 'Absent',  points: 0  },
  { id: 7, event: 'Swachhta Abhiyan',         date: '01 Dec 2024', venue: 'Municipal Area',        status: 'Present', points: 10 },
  { id: 8, event: 'Flood Relief Work',        date: '20 Nov 2024', venue: 'Sangli District',       status: 'Present', points: 20 },
];

const present = records.filter(r => r.status === 'Present').length;
const total   = records.length;
const pct     = Math.round((present / total) * 100);
const totalPts = records.reduce((s, r) => s + r.points, 0);

/* Mini circular chart */
const MiniCircle = ({ pct, size = 100, stroke = 9, color = '#102167' }) => {
  const r   = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e8eeff" strokeWidth={stroke} fill="none"/>
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={circ} strokeDashoffset={circ - (pct/100)*circ}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}/>
    </svg>
  );
};

const MyAttendance = () => (
  <div className="space-y-6">
    {/* Header */}
    <div>
      <h1 className="text-2xl font-extrabold text-gray-800">My Attendance</h1>
      <p className="text-sm text-gray-400 font-medium mt-0.5">Track your NSS event participation record</p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Events Attended', value: present, sub: `of ${total} total`, icon: HiOutlineCheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Events Missed',   value: total - present, sub: 'Absent',       icon: HiOutlineXCircle,   color: 'text-red-500',     bg: 'bg-red-50'     },
        { label: 'Attendance %',    value: `${pct}%`, sub: pct >= 75 ? 'Excellent!' : 'Needs Improvement', icon: HiOutlineCalendar, color: 'text-[#102167]', bg: 'bg-[#eef2ff]' },
        { label: 'NSS Points',      value: totalPts,  sub: 'Total Earned',   icon: BsShieldCheck,      color: 'text-violet-600',  bg: 'bg-violet-50'  },
      ].map(c => {
        const IC = c.icon;
        return (
          <div key={c.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center mb-3`}>
              <IC size={20} className={c.color} />
            </div>
            <p className="text-2xl font-extrabold text-gray-800">{c.value}</p>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">{c.label}</p>
            <p className={`text-[11px] font-bold mt-1 ${c.color}`}>{c.sub}</p>
          </div>
        );
      })}
    </div>

    {/* Table + Chart */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Table */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-extrabold text-gray-800">Attendance Record</h3>
          <span className="text-xs font-bold text-gray-400">{records.length} events</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {records.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{r.event}</td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-medium whitespace-nowrap">
                    <span className="flex items-center gap-1"><HiOutlineCalendar size={12} className="text-[#102167]"/> {r.date}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><HiOutlineLocationMarker size={12} className="text-[#ef7041]"/> {r.venue}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold
                      ${r.status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                      {r.status === 'Present' ? <HiOutlineCheckCircle size={12}/> : <HiOutlineXCircle size={12}/>}
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {r.points > 0
                      ? <span className="text-xs font-extrabold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">+{r.points} pts</span>
                      : <span className="text-xs font-bold text-gray-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center gap-4">
        <h3 className="font-extrabold text-gray-800 self-start">Attendance Overview</h3>
        <div className="relative flex items-center justify-center my-2">
          <MiniCircle pct={pct} size={150} stroke={13}/>
          <div className="absolute text-center">
            <p className="text-3xl font-black text-[#102167]">{pct}%</p>
            <p className="text-xs text-gray-400 font-semibold">Overall</p>
          </div>
        </div>
        <div className={`w-full py-3 rounded-xl text-xs font-bold text-center
          ${pct >= 75 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
          {pct >= 75 ? '✓ Excellent! You are doing great.' : '⚠ Attendance below 75%.'}
        </div>
        <div className="w-full space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#102167] rounded-full inline-block"></span>Present</span>
            <span className="text-[#102167]">{present} events</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-red-400 rounded-full inline-block"></span>Absent</span>
            <span className="text-red-500">{total - present} events</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-violet-400 rounded-full inline-block"></span>NSS Points</span>
            <span className="text-violet-600">{totalPts} pts</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MyAttendance;
