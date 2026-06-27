import { useState, useEffect } from 'react';
import {
  HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock,
  HiOutlineSearch, HiOutlineUserGroup, HiOutlineCheckCircle, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash
} from 'react-icons/hi';
import { FiArrowRight, FiX, FiRefreshCw } from 'react-icons/fi';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../services/eventsService';

const STATUS = {
  Active:    'bg-emerald-50 text-emerald-700',
  Upcoming:  'bg-blue-50    text-blue-700',
  Completed: 'bg-gray-100   text-gray-500',
};

const EMPTY = { title: '', description: '', date: '', time: '', venue: '', tag: 'Sanitation', status: 'Upcoming' };

const ProfessorEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('All');
  const [selected, setSelected] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [saving, setSaving]     = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  const filtered = events.filter(ev => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase()) || (ev.venue || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || ev.status === filter;
    return matchSearch && matchFilter;
  });

  const handleSave = async () => {
    if (!form.title || !form.date || !form.venue) return;
    setSaving(true);
    try {
      const datetime = form.date && form.time ? `${form.date}T${form.time}:00` : form.date;
      const payload = {
        title:       form.title,
        description: form.description,
        date:        datetime,
        venue:       form.venue,
        tag:         form.tag,
        status:      form.status,
      };

      if (editId) {
        const updated = await updateEvent(editId, payload);
        setEvents(prev => prev.map(e => e.id === editId ? updated : e));
      } else {
        const created = await createEvent(payload);
        setEvents(prev => [...prev, created]);
      }
      setShowForm(false);
      setForm(EMPTY);
      setEditId(null);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (ev) => {
    const d = new Date(ev.date);
    const dateStr = !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : '';
    const timeStr = !isNaN(d.getTime()) ? d.toTimeString().slice(0, 5) : '';
    setForm({ title: ev.title, description: ev.description || '', date: dateStr, time: timeStr, venue: ev.venue || '', tag: ev.tag || 'Sanitation', status: ev.status });
    setEditId(ev.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#102167] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-gray-400">Loading events…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">My Events</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">Events assigned to you this semester</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadEvents}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-[#102167] hover:border-[#102167]/30 transition-all">
            <FiRefreshCw size={16}/>
          </button>
          <button onClick={() => { setForm(EMPTY); setEditId(null); setShowForm(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#ef7041] transition-all duration-300 shadow-md hover:shadow-lg">
            <HiOutlinePlus size={16}/> Add Event
          </button>
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

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#102167]/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-gray-800">{editId ? 'Edit Event' : 'Create New Event'}</h3>
            <button onClick={() => { setShowForm(false); setEditId(null); }} className="text-gray-400 hover:text-gray-600"><FiX size={18}/></button>
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
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold text-gray-800 focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all"/>
              </div>
            ))}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Category</label>
              <select value={form.tag} onChange={e => setForm(p => ({...p, tag: e.target.value}))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold text-gray-800 focus:border-[#102167] outline-none transition-all">
                {['Sanitation','Health','Environment','Education','General'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({...p, status: e.target.value}))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold text-gray-800 focus:border-[#102167] outline-none transition-all">
                {['Active','Upcoming','Completed'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Description</label>
              <textarea rows={2} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))}
                placeholder="Event description..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-medium text-gray-800 focus:border-[#102167] outline-none transition-all resize-none"/>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#1a2f85] transition-all shadow-md disabled:opacity-70">
              {saving ? 'Saving...' : (editId ? 'Save Changes' : 'Add Event')}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null); }}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-200 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

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
                  <p className={`text-xl font-black leading-none ${ev.status === 'Completed' ? 'text-gray-500' : 'text-white'}`}>{d.getDate() || '--'}</p>
                  <p className={`text-[9px] font-bold uppercase ${ev.status === 'Completed' ? 'text-gray-400' : 'text-[#ef7041]'}`}>{!isNaN(d.getTime()) ? d.toLocaleString('default',{month:'short'}) : ''}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${STATUS[ev.status] || 'bg-gray-100 text-gray-500'}`}>{ev.status}</span>
                  </div>
                  <h3 className={`font-extrabold text-sm leading-tight ${ev.status === 'Completed' ? 'text-gray-600' : 'text-white'} truncate pr-2`}>{ev.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); openEdit(ev); }} className={`p-2 rounded-xl transition-all ${ev.status === 'Completed' ? 'text-gray-400 hover:bg-gray-200 hover:text-[#102167]' : 'text-white/70 hover:bg-white/10 hover:text-white'}`} title="Edit Event">
                    <HiOutlinePencil size={18}/>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(ev.id); }} className={`p-2 rounded-xl transition-all ${ev.status === 'Completed' ? 'text-gray-400 hover:bg-gray-200 hover:text-red-500' : 'text-white/70 hover:bg-white/10 hover:text-red-400'}`} title="Delete Event">
                    <HiOutlineTrash size={18}/>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-gray-500 leading-relaxed">{ev.description}</p>
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <HiOutlineLocationMarker size={12} className="text-[#ef7041]"/> {ev.venue || 'TBA'}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <HiOutlineClock size={12} className="text-[#102167]"/> {!isNaN(d.getTime()) ? d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : 'TBA'}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                    <HiOutlineUserGroup size={12} className="text-violet-500"/> {ev.volunteers || 0} volunteers registered
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
