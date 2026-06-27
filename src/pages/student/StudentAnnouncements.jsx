import { useState, useEffect } from 'react';
import { fetchStudentAnnouncements } from '../../services/announcementsService';
import {
  HiOutlineSpeakerphone, HiOutlineClock, HiOutlineUserGroup,
  HiOutlineSearch
} from 'react-icons/hi';
import { FiAlertTriangle, FiInfo, FiBell } from 'react-icons/fi';

const TAG_STYLES = {
  General:    'bg-blue-50   text-blue-700   border-blue-200',
  Event:      'bg-violet-50 text-violet-700 border-violet-200',
  Attendance: 'bg-amber-50  text-amber-700  border-amber-200',
  Urgent:     'bg-red-50    text-red-600    border-red-200',
  Holiday:    'bg-emerald-50 text-emerald-700 border-emerald-200',
  Reminder:   'bg-orange-50 text-orange-700  border-orange-200',
};

const TAG_OPTIONS = ['All', 'General', 'Event', 'Attendance', 'Urgent', 'Holiday', 'Reminder'];

const StudentAnnouncements = () => {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [search, setSearch]   = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchStudentAnnouncements()
      .then(data => { setItems(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

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

  const urgentCount = items.filter(i => i.tag === 'Urgent').length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
          <FiBell className="text-[#102167]" size={24}/>
          Announcements
        </h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">
          Stay up to date with the latest NSS news and notices
        </p>
      </div>

      {/* Urgent banner */}
      {urgentCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiAlertTriangle size={18} className="text-red-500"/>
          </div>
          <div>
            <p className="text-sm font-extrabold text-red-700">
              {urgentCount} Urgent Announcement{urgentCount > 1 ? 's' : ''} Require Your Attention
            </p>
            <p className="text-xs text-red-500 font-medium">Please read them immediately</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-semibold">{error}</div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <HiOutlineSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder="Search announcements..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"/>
        </div>
        {TAG_OPTIONS.map(t => (
          <button key={t} onClick={() => setFilterTag(t)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all
              ${filterTag === t ? 'bg-[#102167] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-[#102167] rounded-full"/>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <HiOutlineSpeakerphone size={40} className="text-gray-300 mx-auto mb-3"/>
            <p className="text-gray-400 font-semibold">No announcements found</p>
          </div>
        ) : filtered.map(item => {
          const tagStyle = TAG_STYLES[item.tag] || TAG_STYLES.General;
          const isUrgent = item.tag === 'Urgent';
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-200 cursor-pointer p-5
                ${isUrgent ? 'border-red-200 hover:border-red-300' : 'border-gray-100 hover:border-[#102167]/20 hover:shadow-md'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isUrgent ? 'bg-red-50' : 'bg-[#eef2ff]'}`}>
                  {isUrgent
                    ? <FiAlertTriangle size={18} className="text-red-500"/>
                    : <HiOutlineSpeakerphone size={18} className="text-[#102167]"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className={`text-sm font-extrabold ${isUrgent ? 'text-red-700' : 'text-gray-800'}`}>{item.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${tagStyle}`}>{item.tag}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                      <HiOutlineUserGroup size={10}/> {item.profiles?.name || 'NSS Staff'} ({item.profiles?.role || 'staff'})
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                      <HiOutlineClock size={10}/> {formatDate(item.created_at)}
                    </span>
                  </div>
                  {/* Body — expand on click */}
                  <p className={`text-sm text-gray-600 font-medium mt-2 leading-relaxed transition-all ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {item.body}
                  </p>
                  {!isExpanded && item.body.length > 120 && (
                    <p className="text-xs text-[#102167] font-bold mt-1">Click to read more ↓</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentAnnouncements;
