import { useState } from 'react';
import { mockEvents } from '../../data/mockData';
import {
  HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock,
  HiOutlineSearch, HiOutlineUserGroup, HiOutlineCheckCircle
} from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';

const extraEvents = [
  { id: 'e3', title: 'Tree Plantation Drive', description: 'Plant 500 trees city-wide.',  date: '2025-06-28T09:00:00', venue: 'Green Park, Pune',    assignedProfessors: ['p1'], status: 'Upcoming',  volunteers: 24 },
  { id: 'e4', title: 'Swachhta Abhiyan',      description: 'Mass cleanliness drive.',     date: '2025-07-12T08:00:00', venue: 'Municipal Area',       assignedProfessors: ['p1'], status: 'Upcoming',  volunteers: 0  },
  { id: 'e5', title: 'Rural Education Camp',  description: 'Teach children in villages.', date: '2025-07-18T07:30:00', venue: 'Wagholi Village',      assignedProfessors: ['p2'], status: 'Upcoming',  volunteers: 0  },
];

const allEvents = [
  ...mockEvents.map(e => ({ ...e, status: 'Active',  volunteers: 45 })),
  ...extraEvents,
];

const STATUS = {
  Active:    'bg-emerald-50 text-emerald-700',
  Upcoming:  'bg-blue-50    text-blue-700',
  Completed: 'bg-gray-100   text-gray-500',
};

const ProfessorEvents = () => {
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = allEvents.filter(ev => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase()) || ev.venue.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || ev.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">My Events</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">Events assigned to you this semester</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
          <HiOutlineCalendar size={16} />
          {allEvents.filter(e => e.status !== 'Completed').length} Active Events
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"/>
        </div>
        {['All', 'Active', 'Upcoming', 'Completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200
              ${filter === f ? 'bg-[#102167] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map(ev => {
          const d = new Date(ev.date);
          const isSelected = selected === ev.id;
          return (
            <div key={ev.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer
                ${isSelected ? 'border-[#102167]/40' : 'border-gray-100'}`}
              onClick={() => setSelected(isSelected ? null : ev.id)}>

              {/* Card Header */}
              <div className={`p-5 flex items-center gap-4 ${ev.status === 'Completed' ? 'bg-gray-100' : 'bg-gradient-to-r from-[#102167] to-[#1a2f85]'}`}>
                <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${ev.status === 'Completed' ? 'bg-gray-200' : 'bg-white/15'}`}>
                  <p className={`text-xl font-black leading-none ${ev.status === 'Completed' ? 'text-gray-500' : 'text-white'}`}>{d.getDate()}</p>
                  <p className={`text-[9px] font-bold uppercase ${ev.status === 'Completed' ? 'text-gray-400' : 'text-[#ef7041]'}`}>{d.toLocaleString('default',{month:'short'})}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${STATUS[ev.status] || 'bg-gray-100 text-gray-500'}`}>{ev.status}</span>
                  </div>
                  <h3 className={`font-extrabold text-sm leading-tight ${ev.status === 'Completed' ? 'text-gray-600' : 'text-white'}`}>{ev.title}</h3>
                </div>
                {ev.status === 'Active' && <HiOutlineCheckCircle size={20} className="text-emerald-400 flex-shrink-0"/>}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-gray-500 leading-relaxed">{ev.description}</p>
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <HiOutlineLocationMarker size={12} className="text-[#ef7041]"/> {ev.venue}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <HiOutlineClock size={12} className="text-[#102167]"/> {d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <HiOutlineUserGroup size={12} className="text-violet-500"/> {ev.volunteers} volunteers registered
                  </p>
                </div>
                {ev.status !== 'Completed' && (
                  <button className="w-full mt-1 py-2.5 bg-[#102167] text-white text-xs font-bold rounded-xl hover:bg-[#ef7041] transition-all duration-300 flex items-center justify-center gap-1.5 group shadow-md">
                    Mark Attendance <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform"/>
                  </button>
                )}
                {ev.status === 'Completed' && (
                  <div className="w-full mt-1 py-2.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl text-center">
                    ✓ Attendance Submitted
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-gray-500 font-semibold">No events found</p>
        </div>
      )}
    </div>
  );
};

export default ProfessorEvents;
