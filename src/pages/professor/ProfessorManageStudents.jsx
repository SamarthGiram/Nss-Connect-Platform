import { useState, useEffect } from 'react';
import {
  HiOutlineSearch, HiOutlineMail,
  HiOutlinePencil, HiOutlineAcademicCap,
  HiOutlineCheckCircle, HiOutlineXCircle,
  HiOutlineTrash
} from 'react-icons/hi';
import { FiSave, FiX, FiRefreshCw } from 'react-icons/fi';
import { fetchAllUsers, updateUserProfile, deleteUserProfile } from '../../services/usersService';
import { parseProfile } from '../../utils/avatarParser';

const ROLE_STYLES = {
  student:   { label: 'Student',   bg: 'bg-[#eef2ff] text-[#102167]',   icon: HiOutlineAcademicCap },
};

const ProfessorManageStudents = () => {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [groupFilter, setGroupFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState({});
  const [saving, setSaving]     = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAllUsers();
      // Only keep students
      setUsers(data.filter(u => u.role === 'student'));
    } catch (err) {
      setError('Failed to load students: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const filtered = users.filter(u => {
    const matchSearch = (u.name||'').toLowerCase().includes(search.toLowerCase()) || (u.email||'').toLowerCase().includes(search.toLowerCase());
    const matchGroup  = groupFilter === 'All' || u.group === groupFilter;
    return matchSearch && matchGroup;
  });

  const openEdit = (u) => {
    setForm({ name: u.name, email: u.email, role: 'student', group: u.group || 'Group A', status: u.status || 'active' });
    setEditId(u.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email) return;
    setSaving(true);
    try {
      const updated = await updateUserProfile(editId, {
        name:   form.name,
        group:  form.group,
        status: form.status,
      });
      setUsers(prev => prev.map(u => u.id === editId ? { ...u, ...updated } : u));
      setShowForm(false);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    try {
      await updateUserProfile(id, { status: newStatus });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student "${name}"? This action cannot be undone.`)) return;
    try {
      await deleteUserProfile(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert('Failed to delete student: ' + err.message);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Manage Students</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">View and update student profiles and groups</p>
        </div>
        <button onClick={loadUsers} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-500 hover:text-[#102167] text-sm font-bold rounded-xl transition-all shadow-sm">
          <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''}/> Refresh
        </button>
      </div>

      {/* Search + Group Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"/>
        </div>
        {['All','Group A','Group B','Group C','Group D'].map(r => (
          <button key={r} onClick={() => setGroupFilter(r)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200
              ${groupFilter === r ? 'bg-[#102167] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
            {r}
          </button>
        ))}
      </div>

      {/* Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#102167]/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-gray-800">Edit Student</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={18}/></button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label:'Full Name', key:'name',  type:'text',  placeholder:'Enter full name' },
              { label:'Email',     key:'email', type:'email', placeholder:'Enter email address', disabled: true },
            ].map(f => (
              <div key={f.key}>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">{f.label}</label>
                <input type={f.type} value={form[f.key] || ''} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))} placeholder={f.placeholder}
                  disabled={f.disabled}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all disabled:opacity-60"/>
              </div>
            ))}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Group</label>
              <select value={form.group} onChange={e => setForm(p => ({...p,group:e.target.value}))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] outline-none">
                {['Group A','Group B','Group C','Group D'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({...p,status:e.target.value}))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] outline-none">
                {['active','pending','suspended'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#1a2f85] transition-all shadow-md disabled:opacity-70">
              <FiSave size={14}/> Save Changes
            </button>
            <button onClick={() => setShowForm(false)}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-200 transition-all">
              <FiX size={14}/> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-extrabold text-gray-800">All Students</h3>
          <span className="text-xs text-gray-400 font-bold">{filtered.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['Student','Email','Group','Status','Joined','Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => {
                const parsed = parseProfile(u);
                return (
                  <tr key={parsed.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${parsed.avatar_theme || 'from-[#102167] to-[#3b4da8]'} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden`}>
                          {parsed.avatar_img ? (
                            <img src={parsed.avatar_img} alt={parsed.name} className="w-full h-full object-cover" />
                          ) : (
                            parsed.avatar_icon || parsed.name?.[0] || '?'
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-800">{parsed.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                        <HiOutlineMail size={12} className="text-gray-400"/> {u.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-500 font-semibold">{u.group || '—'}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => toggleStatus(u.id, u.status)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold transition-all
                          ${u.status === 'active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 
                            u.status === 'pending' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' :
                            'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                        {u.status === 'active' ? <HiOutlineCheckCircle size={11}/> : <HiOutlineXCircle size={11}/>}
                        {u.status}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-400 font-medium">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(u)}
                          className="p-2 bg-[#eef2ff] text-[#102167] rounded-lg hover:bg-[#102167] hover:text-white transition-all">
                          <HiOutlinePencil size={13}/>
                        </button>
                        <button onClick={() => handleDelete(u.id, u.name)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                          <HiOutlineTrash size={13}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">👥</p>
            <p className="text-gray-400 font-semibold text-sm">No students found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorManageStudents;
