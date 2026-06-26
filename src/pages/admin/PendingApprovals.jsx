import { useState } from 'react';
import {
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock,
  HiOutlineUserGroup, HiOutlineCalendar, HiOutlineClipboardCheck,
  HiOutlineSearch, HiOutlineFilter
} from 'react-icons/hi';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';

const initApprovals = [
  { id: 'a1', type: 'Student Registration', name: 'Rahul Patil',        email: 'rahul.patil@college.edu', detail: 'Group B — Semester 3',         submitted: '2 hrs ago',  priority: 'High',   status: 'Pending' },
  { id: 'a2', type: 'Attendance Correction', name: 'Ananya Kulkarni',   email: 'ananya.k@college.edu',   detail: 'Blood Donation Camp — Jun 10',  submitted: '4 hrs ago',  priority: 'Medium', status: 'Pending' },
  { id: 'a3', type: 'Event Creation',        name: 'Prof. R. Sharma',   email: 'sharma@college.edu',     detail: 'Digital Literacy Workshop',     submitted: '5 hrs ago',  priority: 'Medium', status: 'Pending' },
  { id: 'a4', type: 'Volunteer Hours Claim', name: 'Vijay Deshmukh',    email: 'vijay.d@college.edu',    detail: 'Flood Relief — 20 hrs claimed', submitted: '1 day ago',  priority: 'Low',    status: 'Pending' },
  { id: 'a5', type: 'Student Registration',  name: 'Sneha Joshi',       email: 'sneha.j@college.edu',    detail: 'Group A — Semester 1',         submitted: '1 day ago',  priority: 'High',   status: 'Pending' },
  { id: 'a6', type: 'NGO Request',           name: 'Green Earth NGO',   email: 'info@greenearth.org',    detail: 'Partnership for tree campaign',  submitted: '2 days ago', priority: 'Low',    status: 'Pending' },
  { id: 'a7', type: 'Student Registration',  name: 'Nikhil More',       email: 'nikhil.m@college.edu',   detail: 'Group C — Semester 2',         submitted: '3 days ago', priority: 'High',   status: 'Approved'},
  { id: 'a8', type: 'Event Creation',        name: 'Prof. S.U. Mali',   email: 'mali@college.edu',       detail: 'Health Camp — Jul 5',          submitted: '4 days ago', priority: 'Medium', status: 'Rejected'},
];

const TYPE_ICONS = {
  'Student Registration':   { icon: HiOutlineUserGroup,      bg: 'bg-[#eef2ff]', color: 'text-[#102167]' },
  'Attendance Correction':  { icon: HiOutlineClipboardCheck, bg: 'bg-amber-50',  color: 'text-amber-600' },
  'Event Creation':         { icon: HiOutlineCalendar,       bg: 'bg-blue-50',   color: 'text-blue-600'  },
  'Volunteer Hours Claim':  { icon: HiOutlineClock,          bg: 'bg-violet-50', color: 'text-violet-600'},
  'NGO Request':            { icon: HiOutlineUserGroup,      bg: 'bg-emerald-50',color: 'text-emerald-600'},
};

const PRIORITY_STYLES = {
  High:   'bg-red-50    text-red-600   border-red-200',
  Medium: 'bg-amber-50  text-amber-600 border-amber-200',
  Low:    'bg-gray-50   text-gray-500  border-gray-200',
};

const STATUS_STYLES = {
  Pending:  'bg-amber-50  text-amber-700',
  Approved: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50   text-red-600',
};

const PendingApprovals = () => {
  const [items, setItems] = useState(initApprovals);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(null);

  const pending  = items.filter(i => i.status === 'Pending').length;
  const approved = items.filter(i => i.status === 'Approved').length;
  const rejected = items.filter(i => i.status === 'Rejected').length;

  const filtered = items.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || i.status === filter;
    return matchSearch && matchFilter;
  });

  const handleApprove = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'Approved' } : i));
  const handleReject  = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'Rejected' } : i));

  const selected = items.find(i => i.id === selectedId);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">Pending Approvals</h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">Review and action all pending requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: pending,  icon: HiOutlineClock,         bg: 'bg-amber-50',    color: 'text-amber-600',   ring: 'ring-amber-100'  },
          { label: 'Approved',       value: approved, icon: HiOutlineCheckCircle,   bg: 'bg-emerald-50',  color: 'text-emerald-600', ring: 'ring-emerald-100'},
          { label: 'Rejected',       value: rejected, icon: HiOutlineXCircle,       bg: 'bg-red-50',      color: 'text-red-500',     ring: 'ring-red-100'    },
        ].map(c => {
          const IC = c.icon;
          return (
            <div key={c.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-4">
              <div className={`w-14 h-14 ${c.bg} ring-4 ${c.ring} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <IC size={24} className={c.color}/>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-800">{c.value}</p>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">{c.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content — List + Detail */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

        {/* Left — List */}
        <div className="xl:col-span-3 space-y-4">

          {/* Search + Filter */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[180px]">
              <HiOutlineSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search requests..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#102167] focus:ring-2 focus:ring-[#102167]/10 transition-all"/>
            </div>
            {['All','Pending','Approved','Rejected'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all
                  ${filter === f ? 'bg-[#102167] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-[#eef2ff] hover:text-[#102167]'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Request Cards */}
          <div className="space-y-3">
            {filtered.map(item => {
              const ti = TYPE_ICONS[item.type] || { icon: HiOutlineClipboardCheck, bg: 'bg-gray-50', color: 'text-gray-500' };
              const TIC = ti.icon;
              const isSelected = selectedId === item.id;
              return (
                <div key={item.id}
                  onClick={() => setSelectedId(isSelected ? null : item.id)}
                  className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-md
                    ${isSelected ? 'border-[#102167]/30 bg-[#fafbff]' : 'border-gray-100 hover:border-[#102167]/20'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${ti.bg} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <TIC size={18} className={ti.color}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-extrabold text-gray-800">{item.name}</p>
                          <p className="text-xs text-[#102167] font-bold mt-0.5">{item.type}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${PRIORITY_STYLES[item.priority]}`}>
                            {item.priority}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[item.status]}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 font-medium">{item.detail}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                          <HiOutlineClock size={11}/> {item.submitted}
                        </p>
                        {item.status === 'Pending' && (
                          <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                            <button onClick={() => handleApprove(item.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-lg hover:bg-emerald-600 hover:text-white transition-all border border-emerald-200">
                              <FiCheck size={11}/> Approve
                            </button>
                            <button onClick={() => handleReject(item.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 text-[10px] font-extrabold rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-200">
                              <FiX size={11}/> Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-3xl mb-2">✅</p>
                <p className="text-gray-400 font-semibold text-sm">No requests found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right — Detail Panel */}
        <div className="xl:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-0">
              <div className="bg-gradient-to-r from-[#102167] to-[#1a2f85] p-5 rounded-t-2xl">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mb-1">{selected.type}</p>
                <h3 className="text-white font-extrabold text-base">{selected.name}</h3>
                <p className="text-blue-200 text-xs mt-0.5 font-medium">{selected.email}</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label:'Priority',  value: selected.priority, color: selected.priority === 'High' ? 'text-red-600' : selected.priority === 'Medium' ? 'text-amber-600' : 'text-gray-500' },
                    { label:'Status',    value: selected.status,   color: selected.status === 'Approved' ? 'text-emerald-600' : selected.status === 'Rejected' ? 'text-red-500' : 'text-amber-600' },
                    { label:'Submitted', value: selected.submitted, color:'text-gray-600' },
                    { label:'Details',   value: selected.detail,   color:'text-gray-600' },
                  ].map(r => (
                    <div key={r.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{r.label}</p>
                      <p className={`text-xs font-bold mt-1 ${r.color}`}>{r.value}</p>
                    </div>
                  ))}
                </div>

                {selected.status === 'Pending' && (
                  <div className="space-y-2 pt-1">
                    <button onClick={() => handleApprove(selected.id)}
                      className="w-full py-3 bg-emerald-500 text-white font-bold text-sm rounded-xl hover:bg-emerald-600 transition-all shadow-md flex items-center justify-center gap-2">
                      <FiCheck size={15}/> Approve Request
                    </button>
                    <button onClick={() => handleReject(selected.id)}
                      className="w-full py-3 bg-red-50 text-red-600 font-bold text-sm rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-200 flex items-center justify-center gap-2">
                      <FiX size={15}/> Reject Request
                    </button>
                  </div>
                )}

                {selected.status !== 'Pending' && (
                  <div className={`p-3 rounded-xl text-xs font-bold text-center
                    ${selected.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    {selected.status === 'Approved' ? '✓ This request has been approved' : '✗ This request has been rejected'}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center h-64">
              <div className="w-14 h-14 bg-[#eef2ff] rounded-2xl flex items-center justify-center mb-4">
                <FiEye size={22} className="text-[#102167]"/>
              </div>
              <p className="text-sm font-bold text-gray-500">Select a request</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Click any request to view its details here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;
