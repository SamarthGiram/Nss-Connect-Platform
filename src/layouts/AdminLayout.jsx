import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import nssLogo from '../assets/nss.png';
import {
  HiOutlineViewGrid, HiOutlineCalendar, HiOutlineUserGroup,
  HiOutlineClipboardCheck, HiOutlineMenuAlt2, HiOutlineX,
  HiOutlineSpeakerphone
} from 'react-icons/hi';
import { FiBell, FiChevronDown, FiShield } from 'react-icons/fi';

const adminLinks = [
  { name: 'Dashboard',            path: '/admin/dashboard',      icon: HiOutlineViewGrid,       badge: null },
  { name: 'Manage Events',        path: '/admin/events',         icon: HiOutlineCalendar,       badge: null },
  { name: 'Take Attendance',      path: '/admin/attendance',     icon: HiOutlineClipboardCheck, badge: null },
  { name: 'Announcements',        path: '/admin/announcements',  icon: HiOutlineSpeakerphone,   badge: null },
  { name: 'Manage Users',         path: '/admin/users',          icon: HiOutlineUserGroup,       badge: null },
  { name: 'Student Approvals',    path: '/admin/approvals',      icon: HiOutlineClipboardCheck, badge: 'pending' },
];

const SidebarContent = ({ onClose, pendingCount }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#102167] flex-shrink-0">
          <img src={nssLogo} alt="NSS Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-[15px] font-extrabold text-[#102167] leading-tight">NSS Admin</h1>
          <p className="text-[9px] text-gray-400 font-semibold tracking-wide leading-tight">Control Panel</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
          <HiOutlineX size={20}/>
        </button>
      )}
    </div>

    <div className="mx-3 mt-3 mb-1 flex items-center gap-2 bg-[#fff5f2] border border-[#ef7041]/20 rounded-xl px-3 py-2">
      <FiShield size={13} className="text-[#ef7041] flex-shrink-0" />
      <div>
        <p className="text-[10px] font-extrabold text-[#ef7041] uppercase tracking-wide">Administrator</p>
      </div>
    </div>

    {/* Pending requests banner */}
    {pendingCount > 0 && (
      <div className="mx-3 mt-2 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[10px] font-black">{pendingCount}</span>
        </div>
        <p className="text-[10px] font-bold text-amber-700">
          {pendingCount} student{pendingCount > 1 ? 's' : ''} waiting approval
        </p>
      </div>
    )}

    <nav className="flex-1 px-3 pt-3 space-y-1">
      {adminLinks.map(link => {
        const Icon = link.icon;
        const showBadge = link.badge === 'pending' && pendingCount > 0;
        return (
          <NavLink key={link.name} to={link.path} onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive ? 'bg-[#eef2ff] text-[#102167] shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-[#102167]'
              }`
            }>
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-[#102167]' : 'text-gray-400'} />
                <span className="flex-1">{link.name}</span>
                {showBadge && (
                  <span className="min-w-[20px] h-5 bg-amber-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center px-1.5">
                    {pendingCount}
                  </span>
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>

    <div className="relative mt-auto pb-4">
      <div className="absolute right-4 bottom-20 opacity-15">
        {[...Array(4)].map((_, r) => (
          <div key={r} className="flex gap-1.5 mb-1.5">
            {[...Array(4)].map((_, c) => <div key={c} className="w-1 h-1 bg-[#102167] rounded-full" />)}
          </div>
        ))}
      </div>
      <svg viewBox="0 0 180 120" className="w-full px-3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="90" cy="108" rx="70" ry="7" fill="#e8eeff"/>
        <rect x="50" y="72" width="80" height="36" rx="4" fill="#c7d2fe" opacity="0.5"/>
        <rect x="58" y="64" width="64" height="12" rx="3" fill="#a5b4fc" opacity="0.7"/>
        <rect x="68" y="40" width="44" height="28" rx="4" fill="#102167" opacity="0.8"/>
        <rect x="72" y="44" width="36" height="20" rx="2" fill="#3b82f6" opacity="0.4"/>
        <rect x="78" y="48" width="24" height="2" rx="1" fill="white" opacity="0.6"/>
        <rect x="78" y="52" width="16" height="2" rx="1" fill="white" opacity="0.4"/>
        <rect x="87" y="68" width="6" height="8" fill="#6366f1" opacity="0.5"/>
      </svg>
      <div className="flex items-center justify-center gap-2 px-4 pb-2">
        <span className="flex-1 border-t border-gray-100"></span>
        <p className="text-[11px] font-bold text-gray-400 whitespace-nowrap">Not Me <span className="text-[#ef7041]">But You</span></p>
        <span className="flex-1 border-t border-gray-100"></span>
      </div>
      <div className="flex justify-center"><div className="w-2 h-2 bg-[#ef7041] rounded-full"></div></div>
    </div>
  </div>
);

const AdminLayout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const handleLogout = () => { logout(); navigate('/login'); };

  // Fetch pending count on mount and poll every 60 seconds
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const { count } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending')
          .eq('role', 'student');
        setPendingCount(count || 0);
      } catch {/* silent */ }
    };
    fetchPending();
    const iv = setInterval(fetchPending, 60000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="flex h-screen bg-[#f0f4ff] font-sans overflow-hidden">

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-[220px] flex-shrink-0 bg-white flex flex-col shadow-xl overflow-hidden
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent onClose={() => setSidebarOpen(false)} pendingCount={pendingCount} />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white shadow-sm px-4 md:px-8 py-3 md:py-4 flex items-center justify-between flex-shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 flex-shrink-0">
              <HiOutlineMenuAlt2 size={20}/>
            </button>
            <div className="min-w-0">
              <h2 className="text-lg md:text-2xl font-extrabold text-gray-800 truncate">
                Welcome, <span className="text-[#ef7041]">{auth?.name?.split(' ')[0] || 'Admin'}!</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-400 font-medium hidden sm:block">NSS Admin Control Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Bell with pending badge */}
            <button className="relative p-2 md:p-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#ef7041]/40 hover:bg-orange-50 transition-all duration-200 shadow-sm">
              <FiBell size={18} className="text-gray-400" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-amber-500 rounded-full border-2 border-white text-white text-[9px] font-black flex items-center justify-center px-1">
                  {pendingCount}
                </span>
              )}
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-[#ef7041]/40 hover:bg-orange-50 transition-all duration-200 shadow-sm">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#ef7041] to-[#f48b62] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {auth?.name?.[0] || 'A'}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-sm font-bold text-gray-700 leading-tight">{auth?.name || 'Admin'}</span>
                <span className="block text-[10px] text-[#ef7041] font-bold leading-tight">Administrator</span>
              </div>
              <FiChevronDown size={13} className="text-gray-400 hidden sm:block" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-3 sm:px-5 md:px-8 pt-4 md:pt-7 pb-4 md:pb-6">
          <Outlet />
        </main>

        <footer className="bg-white border-t border-gray-100 py-2 text-center text-xs text-gray-400 font-medium flex-shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <FiShield size={12} className="text-[#102167]" />
            NSS Admin Portal | <span className="text-[#ef7041] font-bold">Not Me But You</span>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
