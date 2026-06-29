import { useState } from 'react';
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock, HiOutlineSearch, HiOutlineFilter } from 'react-icons/hi';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const allEvents = [
  { id: 1, day: '30', month: 'JUN', title: 'Tree Plantation Drive', venue: 'Green Park, Pune', time: '09:00 AM', tag: 'Environment', tagColor: 'bg-emerald-50 text-emerald-700', status: 'upcoming', desc: 'Join us for a city-wide tree plantation drive to increase green cover and raise awareness about deforestation.' },
  { id: 2, day: '05', month: 'JUL', title: 'Blood Donation Camp', venue: 'Civil Hospital, Pune', time: '10:00 AM', tag: 'Health', tagColor: 'bg-red-50 text-red-600', status: 'upcoming', desc: 'Donate blood and save lives. Every unit of blood can save up to three lives. Bring your ID proof.' },
  { id: 3, day: '12', month: 'JUL', title: 'Swachhta Abhiyan', venue: 'Pune Municipal Area', time: '08:00 AM', tag: 'Sanitation', tagColor: 'bg-blue-50 text-blue-700', status: 'upcoming', desc: 'Mass cleanliness drive in collaboration with Pune Municipal Corporation across 10 wards.' },
  { id: 4, day: '18', month: 'JUL', title: 'Rural Education Camp', venue: 'Wagholi Village, Pune', time: '07:30 AM', tag: 'Education', tagColor: 'bg-violet-50 text-violet-700', status: 'upcoming', desc: 'Teaching basic literacy and numeracy to underprivileged children in rural areas.' },
  { id: 5, day: '15', month: 'JUN', title: 'Campus Clean-Up Drive', venue: 'Samarth College Campus', time: '09:00 AM', tag: 'Sanitation', tagColor: 'bg-blue-50 text-blue-700', status: 'completed', desc: 'Annual campus cleaning initiative. Successfully completed with 120+ volunteers.' },
  { id: 6, day: '10', month: 'JUN', title: 'Covid Awareness Rally', venue: 'FC Road, Pune', time: '08:00 AM', tag: 'Health', tagColor: 'bg-red-50 text-red-600', status: 'completed', desc: 'Awareness rally about preventive health measures. Over 500 pamphlets distributed.' },
];

const StudentEvents = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [registered, setRegistered] = useState([]);

  const filtered = allEvents.filter(ev => {
    const matchFilter = filter === 'all' || ev.status === filter;
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase()) || ev.venue.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const toggleRegister = (id) => {
    setRegistered(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Upcoming Events</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">Browse and register for NSS activities</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-[#102167] bg-[#eef2ff] px-4 py-2 rounded-xl">
          <HiOutlineCalendar size={16} />
          {allEvents.filter(e => e.status === 'upcoming').length} Upcoming
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'upcoming', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all duration-200
                ${filter === f ? 'bg-[#102167] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(ev => {
          const isReg = registered.includes(ev.id);
          const isDone = ev.status === 'completed';
          return (
            <div key={ev.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">
              {/* Card Header */}
              <div className={`p-5 flex items-center gap-4 ${isDone ? 'bg-gray-100' : 'bg-gradient-to-r from-[#102167] to-[#1a2f85]'}`}>
                <div className="text-center flex-shrink-0">
                  <p className={`text-3xl font-black leading-none ${isDone ? 'text-gray-500' : 'text-white'}`}>{ev.day}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDone ? 'text-gray-400' : 'text-[#ef7041]'}`}>{ev.month}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isDone ? 'bg-gray-200 text-gray-500' : 'bg-white/20 text-white'}`}>
                    {ev.tag}
                  </span>
                  <h3 className={`font-extrabold mt-1.5 text-sm leading-tight ${isDone ? 'text-gray-600' : 'text-white'}`}>{ev.title}</h3>
                </div>
                {isDone && <FiCheckCircle size={20} className="text-emerald-500 flex-shrink-0" />}
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <p className="text-xs text-gray-500 leading-relaxed">{ev.desc}</p>
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <HiOutlineLocationMarker size={13} className="text-[#ef7041]" /> {ev.venue}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <HiOutlineClock size={13} className="text-[#102167]" /> {ev.time}
                  </p>
                </div>
                <div className="mt-auto pt-2">
                  {isDone ? (
                    <div className="w-full py-2.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl text-center">
                      ✓ Event Completed
                    </div>
                  ) : (
                    <button onClick={() => toggleRegister(ev.id)}
                      className={`group w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5
                        ${isReg
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-[#102167] text-white hover:bg-[#ef7041] shadow-md hover:shadow-lg'}`}>
                      {isReg ? <><FiCheckCircle size={13} /> Registered</> : <>Register Now <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></>}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500 font-semibold">No events found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};

export default StudentEvents;
