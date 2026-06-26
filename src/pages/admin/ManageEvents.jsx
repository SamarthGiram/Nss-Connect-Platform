import { useState } from 'react';
import {
  HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock,
  HiOutlinePlus, HiOutlineSearch, HiOutlinePencil, HiOutlineTrash, HiOutlineUserGroup
} from 'react-icons/hi';
import { FiSave, FiX } from 'react-icons/fi';

const initEvents = [
  { id: 'e1', title: 'Campus Clean-up Drive', desc: 'Annual campus cleaning event.', date: '2025-11-20', time: '10:00', venue: 'Main Quad',       tag: 'Sanitation', status: 'Active',    volunteers: 45  },
  { id: 'e2', title: 'Blood Donation Camp',   desc: 'Save a life, donate blood.',   date: '2025-11-25', time: '09:00', venue: 'Auditorium',        tag: 'Health',     status: 'Active',    volunteers: 62  },
  { id: 'e3', title: 'Tree Plantation Drive', desc: 'Plant 500 trees city-wide.',   date: '2025-06-28', time: '09:00', venue: 'Green Park, Pune',  tag: 'Environment',status: 'Upcoming',  volunteers: 0   },
  { id: 'e4', title: 'Swachhta Abhiyan',      desc: 'Mass cleanliness drive.',      date: '2025-07-12', time: '08:00', venue: 'Municipal Area',    tag: 'Sanitation', status: 'Upcoming',  volunteers: 0   },
];

const TAG_COLORS = {
  Sanitation:  'bg-blue-50  text-blue-700',
  Health:      'bg-red-50   text-red-600',
  Environment: 'bg-emerald-50 text-emerald-700',
  Education:   'bg-violet-50 text-violet-700',
};
const STATUS_COLORS = {
  Active:   'bg-emerald-50 text-emerald-700',
  Upcoming: 'bg-blue-50    text-blue-700',
  Completed:'bg-gray-100   text-gray-500',
};

const EMPTY = { title: '', desc: '', date: '', time: '', venue: '', tag: 'Sanitation', status: 'Upcoming' };

const ManageEvents = () => {
  const [events, setEvents]   = useState(initEvents);
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]   = useState(null);
  const [form, setForm]       = useState(EMPTY);

  const filtered = events.filter(ev => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase()) || ev.venue.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || ev.status === filter;
    return matchSearch && matchFilter;
  });

  const openCreate = () => { setForm(EMPTY); setEditId(null); setShowForm(true); };
  const openEdit   = (ev) => { setForm({ title:ev.title, desc:ev.desc, date:ev.date, time:ev.time, venue:ev.venue, tag:ev.tag, status:ev.status }); setEditId(ev.id); setShowForm(true); };
  const handleDelete = (id) => setEvents(prev => prev.filter(e => e.id !== id));
  const handleSave = () => {
    if (!form.title || !form.date || !form.venue) return;
    if (editId) {
      setEvents(prev => prev.map(e => e.id === editId ? { ...e, ...form } : e));
    } else {
      setEvents(prev => [...prev, { ...form, id: `e${Date.now()}`, volunteers: 0 }]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Manage Events</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">Create, edit and manage all NSS events</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#ef7041] transition-all duration-300 shadow-md hover:shadow-lg">
          <HiOutlinePlus size={16}/> Add Event
        </button>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"/>
        </div>
        {['All','Active','Upcoming','Completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200
              ${filter === f ? 'bg-[#102167] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#102167]/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-gray-800">{editId ? 'Edit Event' : 'Create New Event'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={18}/></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label:'Event Title', key:'title', type:'text', placeholder:'Enter event title' },
              { label:'Venue',       key:'venue', type:'text', placeholder:'Enter venue' },
              { label:'Date',        key:'date',  type:'date', placeholder:'' },
              { label:'Time',        key:'time',  type:'time', placeholder:'' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all"/>
              </div>
            ))}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Category</label>
              <select value={form.tag} onChange={e => setForm(p => ({...p, tag: e.target.value}))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] outline-none transition-all">
                {['Sanitation','Health','Environment','Education'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] outline-none transition-all">
                {['Active','Upcoming','Completed'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Description</label>
              <textarea rows={2} value={form.desc} onChange={e => setForm(p => ({...p, desc: e.target.value}))}
                placeholder="Event description..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-medium focus:border-[#102167] outline-none transition-all resize-none"/>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#1a2f85] transition-all shadow-md">
              <FiSave size={14}/> {editId ? 'Save Changes' : 'Create Event'}
            </button>
            <button onClick={() => setShowForm(false)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-200 transition-all">
              <FiX size={14}/> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-5">
        {filtered.map(ev => (
          <div key={ev.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="bg-gradient-to-r from-[#102167] to-[#1a2f85] p-5 flex items-center gap-4">
              <div className="w-14 h-14 bg-white/15 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                <p className="text-xl font-black text-white leading-none">{new Date(ev.date).getDate()}</p>
                <p className="text-[9px] font-bold text-[#ef7041] uppercase">{new Date(ev.date).toLocaleString('default',{month:'short'})}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[ev.tag] || 'bg-gray-100 text-gray-500'} bg-white/20 text-white`}>{ev.tag}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[ev.status]}`}>{ev.status}</span>
                </div>
                <h3 className="text-white font-extrabold text-sm leading-tight">{ev.title}</h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{ev.desc}</p>
              <div className="space-y-1.5 mb-4">
                <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                  <HiOutlineLocationMarker size={12} className="text-[#ef7041]"/> {ev.venue}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                  <HiOutlineClock size={12} className="text-[#102167]"/> {ev.time}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                  <HiOutlineUserGroup size={12} className="text-violet-500"/> {ev.volunteers} volunteers registered
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(ev)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#eef2ff] text-[#102167] text-xs font-bold rounded-xl hover:bg-[#102167] hover:text-white transition-all duration-200">
                  <HiOutlinePencil size={12}/> Edit
                </button>
                <button onClick={() => handleDelete(ev.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all duration-200">
                  <HiOutlineTrash size={12}/> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default ManageEvents;
