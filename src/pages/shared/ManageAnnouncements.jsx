import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createAnnouncement, fetchAnnouncements, deleteAnnouncement } from '../../services/announcementsService';
import {
  HiOutlineSpeakerphone, HiOutlineTrash, HiOutlineClock,
  HiOutlineUserGroup, HiOutlineSearch, HiOutlinePlus
} from 'react-icons/hi';
import { FiBell, FiAlertTriangle, FiInfo } from 'react-icons/fi';

const TAG_OPTIONS = ['General', 'Event', 'Attendance', 'Urgent', 'Holiday', 'Reminder'];

const TAG_STYLES = {
  General:    'bg-blue-50   text-blue-700   border-blue-200',
  Event:      'bg-violet-50 text-violet-700 border-violet-200',
  Attendance: 'bg-amber-50  text-amber-700  border-amber-200',
  Urgent:     'bg-red-50    text-red-600    border-red-200',
  Holiday:    'bg-emerald-50 text-emerald-700 border-emerald-200',
  Reminder:   'bg-orange-50 text-orange-700  border-orange-200',
};

const TAG_ICONS = {
  Urgent: FiAlertTriangle,
  General: FiInfo,
};

const EMPTY = { title: '', body: '', tag: 'General' };

const ManageAnnouncements = () => {
  const { auth } = useAuth();
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [deleteId, setDeleteId] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAnnouncements();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    setSaving(true);
    try {
      const created = await createAnnouncement({
        title:       form.title.trim(),
        body:        form.body.trim(),
        tag:         form.tag,
        created_by:  auth.id,
      });
      setItems(prev => [created, ...prev]);
      setForm(EMPTY);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      setItems(prev => prev.filter(i => i.id !== id));
      setDeleteId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const filtered = items.filter(i => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.body.toLowerCase().includes(search.toLowerCase());
    const matchTag = filterTag === 'All' || i.tag === filterTag;
    return matchSearch && matchTag;
  });

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <HiOutlineSpeakerphone className="text-[#102167]" size={26}/>
            Announcements
          </h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">
            Broadcast important messages to all NSS students
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#102167] to-[#1a3490] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#102167]/20 hover:from-[#ef7041] hover:to-[#d4622e] transition-all duration-300 flex-shrink-0"
        >
          <HiOutlinePlus size={18}/> New Announcement
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: items.length, color: 'text-[#102167]', bg: 'bg-[#eef2ff]' },
          { label: 'Urgent', value: items.filter(i => i.tag === 'Urgent').length, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Events', value: items.filter(i => i.tag === 'Event').length, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Reminders', value: items.filter(i => i.tag === 'Reminder').length, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 flex items-center gap-3`}>
            <div>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 font-semibold">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Compose Form */}
      {showForm && (
        <div ref={formRef} className="bg-white rounded-2xl shadow-sm border-2 border-[#102167]/20 p-6">
          <h3 className="text-base font-extrabold text-gray-800 mb-4 flex items-center gap-2">
            <FiBell size={17} className="text-[#102167]"/> Compose New Announcement
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Attendance Reminder for Tree Plantation Drive"
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/8 outline-none transition-all text-sm font-semibold text-gray-700"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Tag</label>
                <select
                  value={form.tag}
                  onChange={e => setForm(p => ({ ...p, tag: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#102167] outline-none transition-all text-sm font-semibold text-gray-700"
                >
                  {TAG_OPTIONS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Message *</label>
              <textarea
                value={form.body}
                onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                rows={4}
                placeholder="Write your announcement message here..."
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/8 outline-none transition-all text-sm font-semibold text-gray-700 resize-none"
                required
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY); }}
                className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button type="submit" disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#102167] to-[#1a3490] text-white text-sm font-bold shadow-md hover:from-[#ef7041] hover:to-[#d4622e] transition-all duration-300 disabled:opacity-60 flex items-center gap-2">
                {saving ? 'Publishing...' : 'Publish Announcement'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <HiOutlineSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder="Search announcements..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"/>
        </div>
        {['All', ...TAG_OPTIONS].map(t => (
          <button key={t} onClick={() => setFilterTag(t)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all
              ${filterTag === t ? 'bg-[#102167] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-[#102167] rounded-full"/>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <HiOutlineSpeakerphone size={40} className="text-gray-300 mx-auto mb-3"/>
            <p className="text-gray-400 font-semibold">No announcements yet</p>
            <p className="text-gray-300 text-sm mt-1">Click "New Announcement" to broadcast your first message</p>
          </div>
        ) : filtered.map(item => {
          const tagStyle = TAG_STYLES[item.tag] || TAG_STYLES.General;
          const TagIcon = TAG_ICONS[item.tag] || HiOutlineSpeakerphone;
          return (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-5">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.tag === 'Urgent' ? 'bg-red-50' : 'bg-[#eef2ff]'}`}>
                  <TagIcon size={18} className={item.tag === 'Urgent' ? 'text-red-500' : 'text-[#102167]'}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="text-sm font-extrabold text-gray-800">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagStyle}`}>{item.tag}</span>
                        <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                          <HiOutlineUserGroup size={10}/> {item.profiles?.name || 'NSS Staff'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                          <HiOutlineClock size={10}/> {formatDate(item.created_at)}
                        </span>
                      </div>
                    </div>
                    {deleteId === item.id ? (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-gray-500 font-medium">Confirm?</span>
                        <button onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-all">Yes</button>
                        <button onClick={() => setDeleteId(null)}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition-all">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteId(item.id)}
                        className="p-2 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0">
                        <HiOutlineTrash size={16}/>
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 font-medium mt-2 leading-relaxed">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageAnnouncements;
