import { useState, useEffect, useCallback } from 'react';
import { fetchAllUsers, updateUserProfile } from '../../services/usersService';
import {
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock,
  HiOutlineSearch, HiOutlineRefresh, HiOutlineUserGroup,
  HiOutlineAcademicCap, HiOutlinePhone, HiOutlineCalendar
} from 'react-icons/hi';
import { FiCheck, FiX, FiUser, FiAlertCircle, FiUsers } from 'react-icons/fi';

/* ── Status badge styles ─────────────────────────────────────── */
const STATUS_PILL = {
  pending:   'bg-amber-100  text-amber-800   border border-amber-300',
  active:    'bg-emerald-100 text-emerald-800 border border-emerald-300',
  suspended: 'bg-red-100    text-red-700     border border-red-300',
};
const STATUS_LABEL = { pending: 'Pending', active: 'Approved', suspended: 'Rejected' };

/* ── Avatar colours by index ─────────────────────────────────── */
const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-blue-500   to-indigo-600',
  'from-emerald-400 to-teal-500',
  'from-amber-400  to-orange-500',
  'from-rose-400   to-pink-500',
];

/* ── helpers ─────────────────────────────────────────────────── */
const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const initials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

/* ── Sub-components ─────────────────────────────────────────── */
const StatCard = ({ label, value, icon: Icon, bg, text, ring }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
    <div className={`w-14 h-14 ${bg} ring-4 ${ring} rounded-2xl flex items-center justify-center flex-shrink-0`}>
      <Icon size={22} className={text} />
    </div>
    <div>
      <p className="text-3xl font-extrabold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 font-semibold mt-0.5">{label}</p>
    </div>
  </div>
);

/* ── Main Component ──────────────────────────────────────────── */
const PendingApprovals = () => {
  const [all, setAll]           = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [tab, setTab]           = useState('pending');   // 'pending' | 'approved' | 'rejected' | 'all'
  const [actionId, setActionId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [toast, setToast]       = useState(null);       // { msg, type }

  /* ── load ─────────────────────────────────────────────────── */
  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllUsers();
      // Show only student accounts waiting review or already reviewed
      setAll(data.filter(u => u.role === 'student'));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* ── toast helper ─────────────────────────────────────────── */
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* ── approve / reject ─────────────────────────────────────── */
  const handleApprove = async (id) => {
    setActionId(id);
    try {
      await updateUserProfile(id, { status: 'active' });
      setAll(prev => prev.map(u => u.id === id ? { ...u, status: 'active' } : u));
      if (selected?.id === id) setSelected(p => ({ ...p, status: 'active' }));
      showToast('✓ Account approved — student can now log in.');
    } catch (err) {
      setError(err.message);
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id) => {
    setActionId(id);
    try {
      await updateUserProfile(id, { status: 'suspended' });
      setAll(prev => prev.map(u => u.id === id ? { ...u, status: 'suspended' } : u));
      if (selected?.id === id) setSelected(p => ({ ...p, status: 'suspended' }));
      showToast('Account rejected.', 'error');
    } catch (err) {
      setError(err.message);
    } finally {
      setActionId(null);
    }
  };

  /* ── derived counts ───────────────────────────────────────── */
  const pending  = all.filter(u => u.status === 'pending').length;
  const approved = all.filter(u => u.status === 'active').length;
  const rejected = all.filter(u => u.status === 'suspended').length;

  /* ── filtered list ────────────────────────────────────────── */
  const list = all.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.roll_number?.toLowerCase().includes(q) ||
      u.department?.toLowerCase().includes(q);
    const matchTab =
      tab === 'all'      ? true :
      tab === 'pending'  ? u.status === 'pending'   :
      tab === 'approved' ? u.status === 'active'    :
      tab === 'rejected' ? u.status === 'suspended' : true;
    return matchSearch && matchTab;
  });

  /* ── render ────────────────────────────────────────────────── */
  return (
    <div className="space-y-5 relative">

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-bold text-white flex items-center gap-3 transition-all
          ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {toast.type === 'success' ? <FiCheck size={16}/> : <FiX size={16}/>}
          {toast.msg}
        </div>
      )}

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiUsers size={24} className="text-[#102167]"/>
            Student Approval Requests
          </h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">
            Review new student registrations and grant or deny access
          </p>
        </div>
        <button onClick={load} disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:border-[#102167]/30 hover:text-[#102167] transition-all shadow-sm disabled:opacity-50">
          <HiOutlineRefresh size={16} className={loading ? 'animate-spin' : ''}/>
          Refresh
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-center gap-3 text-sm text-red-600 font-semibold">
          <FiAlertCircle size={18} className="flex-shrink-0"/>
          {error}
        </div>
      )}

      {/* ── Urgent banner for pending requests ── */}
      {pending > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <HiOutlineClock size={22} className="text-amber-600"/>
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-amber-800">
              {pending} student{pending > 1 ? 's' : ''} waiting for account approval
            </p>
            <p className="text-xs text-amber-600 font-medium mt-0.5">
              Approve accounts so students can log in to the NSS portal
            </p>
          </div>
          <span className="text-3xl font-black text-amber-500">{pending}</span>
        </div>
      )}

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Pending Review"  value={pending}  icon={HiOutlineClock}       bg="bg-amber-50"   text="text-amber-600"   ring="ring-amber-100"   />
        <StatCard label="Approved"        value={approved} icon={HiOutlineCheckCircle} bg="bg-emerald-50" text="text-emerald-600" ring="ring-emerald-100" />
        <StatCard label="Rejected"        value={rejected} icon={HiOutlineXCircle}     bg="bg-red-50"     text="text-red-500"     ring="ring-red-100"     />
      </div>

      {/* ── Main content ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

        {/* ── Left column: list ── */}
        <div className="xl:col-span-3 space-y-4">

          {/* Search + tabs */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
            <div className="relative">
              <HiOutlineSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input
                type="text"
                placeholder="Search by name, email, roll no., or department…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'pending',  label: 'Pending',  count: pending  },
                { key: 'approved', label: 'Approved', count: approved },
                { key: 'rejected', label: 'Rejected', count: rejected },
                { key: 'all',      label: 'All',      count: all.length },
              ].map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all
                    ${tab === t.key
                      ? 'bg-[#102167] text-white shadow-md'
                      : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
                  {t.label}
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full
                    ${tab === t.key ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Request cards */}
          <div className="space-y-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-[#102167] rounded-full mb-4"/>
                <p className="text-gray-400 text-sm font-semibold">Loading requests…</p>
              </div>
            ) : list.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <HiOutlineUserGroup size={44} className="text-gray-200 mx-auto mb-3"/>
                <p className="text-gray-500 font-bold">No requests found</p>
                <p className="text-gray-400 text-xs font-medium mt-1">
                  {tab === 'pending' ? 'No students waiting for approval right now' : 'Try switching tabs or clearing the search'}
                </p>
              </div>
            ) : list.map((user, idx) => {
              const isSelected = selected?.id === user.id;
              const isPending  = user.status === 'pending';
              const color      = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              return (
                <div key={user.id}
                  onClick={() => setSelected(isSelected ? null : user)}
                  className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? 'border-[#102167]/40 shadow-md bg-[#f9fbff]'
                      : isPending
                        ? 'border-amber-200 hover:border-amber-300 hover:shadow-md'
                        : 'border-gray-100 hover:border-[#102167]/20 hover:shadow-md'}`}>

                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <span className="text-white font-extrabold text-sm">{initials(user.name)}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="text-sm font-extrabold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-400 font-medium mt-0.5 truncate">{user.email}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${STATUS_PILL[user.status]}`}>
                          {STATUS_LABEL[user.status]}
                        </span>
                      </div>

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                        {user.roll_number && (
                          <span className="text-[11px] text-gray-500 font-semibold flex items-center gap-1">
                            <HiOutlineAcademicCap size={12}/> {user.roll_number}
                          </span>
                        )}
                        {user.department && (
                          <span className="text-[11px] text-gray-500 font-semibold">{user.department}</span>
                        )}
                        {user.year && (
                          <span className="text-[11px] text-gray-500 font-semibold">{user.year}</span>
                        )}
                        {user.group && (
                          <span className="text-[11px] text-gray-500 font-semibold">{user.group}</span>
                        )}
                        <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1 ml-auto">
                          <HiOutlineCalendar size={11}/> {fmtDate(user.created_at)}
                        </span>
                      </div>

                      {/* Action buttons — only for pending */}
                      {isPending && (
                        <div className="flex gap-2 mt-3" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => handleApprove(user.id)}
                            disabled={actionId === user.id}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-200 disabled:opacity-60">
                            <FiCheck size={13}/> Approve
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            disabled={actionId === user.id}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 text-red-600 text-xs font-extrabold rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-200 disabled:opacity-60">
                            <FiX size={13}/> Reject
                          </button>
                        </div>
                      )}

                      {/* Status message for reviewed */}
                      {!isPending && (
                        <div className={`mt-2 text-[11px] font-bold px-3 py-1.5 rounded-xl
                          ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                          {user.status === 'active' ? '✓ Account approved — student can log in' : '✗ Account rejected'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right column: detail panel ── */}
        <div className="xl:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-0 overflow-hidden">
              {/* Profile header */}
              <div className="bg-gradient-to-br from-[#0b1a52] via-[#102167] to-[#1a3490] p-6">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${AVATAR_COLORS[all.indexOf(selected) % AVATAR_COLORS.length]} flex items-center justify-center mx-auto mb-3 shadow-xl`}>
                  <span className="text-white font-black text-2xl">{initials(selected.name)}</span>
                </div>
                <h3 className="text-white font-extrabold text-base text-center">{selected.name}</h3>
                <p className="text-blue-200 text-xs font-medium text-center mt-0.5">{selected.email}</p>
                <div className="flex justify-center mt-3">
                  <span className={`text-[11px] font-extrabold px-3 py-1.5 rounded-full ${STATUS_PILL[selected.status]}`}>
                    {STATUS_LABEL[selected.status]}
                  </span>
                </div>
              </div>

              {/* Detail fields */}
              <div className="p-5 space-y-2">
                {[
                  { label: '🎓 Roll Number',  value: selected.roll_number || '—' },
                  { label: '🏛  Department',   value: selected.department  || '—' },
                  { label: '📅 Year',          value: selected.year        || '—' },
                  { label: '👥 Group',         value: selected.group       || '—' },
                  { label: '📞 Phone',         value: selected.phone       || '—' },
                  { label: '📆 Applied On',    value: fmtDate(selected.created_at) },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
                    <p className="text-[11px] text-gray-400 font-bold">{r.label}</p>
                    <p className="text-xs font-bold text-gray-700 text-right">{r.value}</p>
                  </div>
                ))}

                {/* Action buttons */}
                {selected.status === 'pending' ? (
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => handleApprove(selected.id)}
                      disabled={!!actionId}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-extrabold text-sm rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-60">
                      <FiCheck size={16}/> ✓ Approve Account
                    </button>
                    <button
                      onClick={() => handleReject(selected.id)}
                      disabled={!!actionId}
                      className="w-full py-3.5 bg-red-50 text-red-600 font-extrabold text-sm rounded-xl hover:bg-red-500 hover:text-white transition-all border-2 border-red-200 flex items-center justify-center gap-2 disabled:opacity-60">
                      <FiX size={16}/> ✗ Reject Account
                    </button>
                  </div>
                ) : (
                  <div className={`mt-2 p-4 rounded-2xl text-sm font-bold text-center
                    ${selected.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-600 border border-red-200'}`}>
                    {selected.status === 'active'
                      ? '✓ This account is active. Student can log in.'
                      : '✗ This account has been rejected.'}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-200 p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 bg-[#eef2ff] rounded-3xl flex items-center justify-center mb-4">
                <FiUser size={26} className="text-[#102167]"/>
              </div>
              <p className="text-sm font-bold text-gray-500">Select a student request</p>
              <p className="text-xs text-gray-400 font-medium mt-1 max-w-[180px] leading-relaxed">
                Click any card on the left to view the full student profile here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;
