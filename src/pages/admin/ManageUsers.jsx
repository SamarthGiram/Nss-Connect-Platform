import { useState } from 'react';
import {
  HiOutlineSearch, HiOutlineUserGroup, HiOutlineMail,
  HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineAcademicCap,
  HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineXCircle
} from 'react-icons/hi';
import { FiSave, FiX } from 'react-icons/fi';

const initUsers = [
  { id: 'u1', name: 'Samarth Giram',    email: 'student@nss.com',   role: 'student',   group: 'Group A', status: 'Active',   joined: 'Jun 2023' },
  { id: 'u2', name: 'Priya Sharma',     email: 'priya@nss.com',     role: 'student',   group: 'Group B', status: 'Active',   joined: 'Jun 2023' },
  { id: 'u3', name: 'Rahul Patil',      email: 'rahul@nss.com',     role: 'student',   group: 'Group A', status: 'Inactive', joined: 'Aug 2023' },
  { id: 'u4', name: 'Ananya Kulkarni',  email: 'ananya@nss.com',    role: 'student',   group: 'Group C', status: 'Active',   joined: 'Jun 2024' },
  { id: 'u5', name: 'Vijay Deshmukh',   email: 'vijay@nss.com',     role: 'student',   group: 'Group B', status: 'Active',   joined: 'Jun 2024' },
  { id: 'p1', name: 'S.U. Mali',        email: 'prof@nss.com',      role: 'professor', group: '—',       status: 'Active',   joined: 'Jan 2022' },
  { id: 'p2', name: 'Dr. R. Sharma',    email: 'sharma@nss.com',    role: 'professor', group: '—',       status: 'Active',   joined: 'Jan 2022' },
  { id: 'a1', name: 'Dr. Deshpande',    email: 'admin@nss.com',     role: 'admin',     group: '—',       status: 'Active',   joined: 'Jan 2020' },
];

const ROLE_STYLES = {
  student:   { label: 'Student',   bg: 'bg-[#eef2ff] text-[#102167]',   icon: HiOutlineAcademicCap },
  professor: { label: 'Professor', bg: 'bg-amber-50  text-amber-700',    icon: HiOutlineUserGroup   },
  admin:     { label: 'Admin',     bg: 'bg-red-50    text-red-600',      icon: HiOutlineShieldCheck },
};

const EMPTY = { name: '', email: '', role: 'student', group: 'Group A', status: 'Active' };

const ManageUsers = () => {
  const [users, setUsers]     = useState(initUsers);
  const [search, setSearch]   = useState('');
  const [roleFilter, setRole] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]   = useState(null);
  const [form, setForm]       = useState(EMPTY);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === 'All' || u.role === roleFilter.toLowerCase();
    return matchSearch && matchRole;
  });

  const counts = {
    All:       users.length,
    Student:   users.filter(u => u.role === 'student').length,
    Professor: users.filter(u => u.role === 'professor').length,
    Admin:     users.filter(u => u.role === 'admin').length,
  };

  const openCreate = () => { setForm(EMPTY); setEditId(null); setShowForm(true); };
  const openEdit   = (u)  => { setForm({ name:u.name, email:u.email, role:u.role, group:u.group, status:u.status }); setEditId(u.id); setShowForm(true); };
  const handleDelete = (id) => setUsers(prev => prev.filter(u => u.id !== id));
  const handleSave   = () => {
    if (!form.name || !form.email) return;
    if (editId) {
      setUsers(prev => prev.map(u => u.id === editId ? { ...u, ...form } : u));
    } else {
      setUsers(prev => [...prev, { ...form, id: `u${Date.now()}`, joined: 'Jun 2025' }]);
    }
    setShowForm(false);
  };
  const toggleStatus = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Manage Users</h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">View, add and manage all NSS members</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#ef7041] transition-all duration-300 shadow-md">
          <HiOutlinePlus size={16}/> Add User
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label:'Total Users',  value: counts.All,       color:'text-[#102167]', bg:'bg-[#eef2ff]',   icon: HiOutlineUserGroup   },
          { label:'Students',     value: counts.Student,   color:'text-emerald-600',bg:'bg-emerald-50', icon: HiOutlineAcademicCap },
          { label:'Professors',   value: counts.Professor, color:'text-amber-600',  bg:'bg-amber-50',   icon: HiOutlineUserGroup   },
          { label:'Admins',       value: counts.Admin,     color:'text-red-600',    bg:'bg-red-50',     icon: HiOutlineShieldCheck },
        ].map(c => {
          const IC = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-4">
              <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <IC size={22} className={c.color}/>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-800">{c.value}</p>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">{c.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search + Role Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"/>
        </div>
        {['All','Student','Professor','Admin'].map(r => (
          <button key={r} onClick={() => setRole(r)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200
              ${roleFilter === r ? 'bg-[#102167] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
            {r} {counts[r] !== undefined && <span className="ml-1 opacity-60">({counts[r]})</span>}
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#102167]/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-gray-800">{editId ? 'Edit User' : 'Add New User'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={18}/></button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label:'Full Name', key:'name',  type:'text',  placeholder:'Enter full name' },
              { label:'Email',     key:'email', type:'email', placeholder:'Enter email address' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({...p,[f.key]:e.target.value}))} placeholder={f.placeholder}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all"/>
              </div>
            ))}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Role</label>
              <select value={form.role} onChange={e => setForm(p => ({...p,role:e.target.value}))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] outline-none">
                {['student','professor','admin'].map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase()+r.slice(1)}</option>)}
              </select>
            </div>
            {form.role === 'student' && (
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Group</label>
                <select value={form.group} onChange={e => setForm(p => ({...p,group:e.target.value}))}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] outline-none">
                  {['Group A','Group B','Group C','Group D'].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({...p,status:e.target.value}))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] outline-none">
                {['Active','Inactive'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#1a2f85] transition-all shadow-md">
              <FiSave size={14}/> {editId ? 'Save Changes' : 'Add User'}
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
          <h3 className="font-extrabold text-gray-800">All Members</h3>
          <span className="text-xs text-gray-400 font-bold">{filtered.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {['Member','Email','Role','Group','Status','Joined','Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => {
                const rs = ROLE_STYLES[u.role];
                const RIC = rs.icon;
                return (
                  <tr key={u.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#102167] to-[#3b4da8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {u.name[0]}
                        </div>
                        <p className="text-sm font-bold text-gray-800">{u.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                        <HiOutlineMail size={12} className="text-gray-400"/> {u.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold ${rs.bg}`}>
                        <RIC size={11}/> {rs.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-500 font-semibold">{u.group}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => toggleStatus(u.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold transition-all
                          ${u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                        {u.status === 'Active' ? <HiOutlineCheckCircle size={11}/> : <HiOutlineXCircle size={11}/>}
                        {u.status}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-400 font-medium">{u.joined}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(u)}
                          className="p-2 bg-[#eef2ff] text-[#102167] rounded-lg hover:bg-[#102167] hover:text-white transition-all">
                          <HiOutlinePencil size={13}/>
                        </button>
                        <button onClick={() => handleDelete(u.id)}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
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
            <p className="text-gray-400 font-semibold text-sm">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
