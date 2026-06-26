import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import nssLogo from '../assets/nss.png';
import { HiOutlineViewGrid, HiOutlineCalendar, HiOutlineClipboardCheck, HiOutlineUser, HiOutlineMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { FiBell, FiChevronDown } from 'react-icons/fi';

const studentLinks = [
  { name: 'Dashboard',      path: '/student/dashboard',  icon: HiOutlineViewGrid       },
  { name: 'Upcoming Events',path: '/student/events',     icon: HiOutlineCalendar       },
  { name: 'My Attendance',  path: '/student/attendance', icon: HiOutlineClipboardCheck },
  { name: 'My Profile',     path: '/student/profile',    icon: HiOutlineUser           },
];

const SidebarContent = ({ onClose }) => {
  const { auth } = useAuth();
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#102167] flex-shrink-0">
            <img src={nssLogo} alt="NSS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-[15px] font-extrabold text-[#102167] leading-tight">NSS</h1>
            <p className="text-[9px] text-gray-500 leading-tight font-semibold tracking-wide">National Service Scheme</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <HiOutlineX size={20}/>
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 pt-5 space-y-1">
        {studentLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink key={link.name} to={link.path} onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive ? 'bg-[#eef2ff] text-[#102167]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#102167]'
                }`
              }>
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? 'text-[#102167]' : 'text-gray-400'} />
                  {link.name}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Illustration */}
      <div className="relative mt-auto pb-4">
        <div className="absolute right-4 bottom-20 opacity-20">
          {[...Array(4)].map((_, r) => (
            <div key={r} className="flex gap-1.5 mb-1.5">
              {[...Array(4)].map((_, c) => <div key={c} className="w-1 h-1 bg-[#102167] rounded-full" />)}
            </div>
          ))}
        </div>
        <svg viewBox="0 0 180 140" className="w-full px-2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="90" cy="125" rx="75" ry="8" fill="#e8eeff" />
          <path d="M20 120 Q18 105 25 98 Q22 108 30 112" fill="#a5b4fc" opacity="0.5"/>
          <path d="M30 120 Q35 100 28 88" stroke="#818cf8" strokeWidth="1.5" fill="none"/>
          <circle cx="28" cy="86" r="8" fill="#c7d2fe" opacity="0.6"/>
          <path d="M150 118 Q155 98 148 88" stroke="#818cf8" strokeWidth="1.5" fill="none"/>
          <circle cx="149" cy="86" r="9" fill="#c7d2fe" opacity="0.6"/>
          <line x1="90" y1="30" x2="90" y2="118" stroke="#6366f1" strokeWidth="2"/>
          <path d="M90 30 L120 42 L90 54 Z" fill="#102167" opacity="0.85"/>
          <circle cx="85" cy="62" r="5" fill="#ef7041" opacity="0.8"/>
          <circle cx="72" cy="82" r="7" fill="#102167" opacity="0.7"/>
          <rect x="67" y="90" width="10" height="20" rx="3" fill="#3b4da8" opacity="0.7"/>
          <circle cx="108" cy="82" r="7" fill="#102167" opacity="0.7"/>
          <rect x="103" y="90" width="10" height="20" rx="3" fill="#3b4da8" opacity="0.7"/>
        </svg>
        <div className="flex items-center justify-center gap-2 px-4 pb-2">
          <span className="flex-1 border-t border-gray-200"></span>
          <p className="text-[11px] font-bold text-gray-500 whitespace-nowrap">Not Me <span className="text-[#ef7041]">But You</span></p>
          <span className="flex-1 border-t border-gray-200"></span>
        </div>
        <div className="flex justify-center"><div className="w-2 h-2 bg-[#ef7041] rounded-full"></div></div>
      </div>
    </div>
  );
};

const StudentLayout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen bg-[#f0f4ff] font-sans overflow-hidden">

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar — desktop fixed, mobile drawer ── */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-[220px] flex-shrink-0 bg-white flex flex-col shadow-xl overflow-hidden
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Header */}
        <header className="bg-white shadow-sm px-4 md:px-8 py-3 md:py-4 flex items-center justify-between flex-shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger */}
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 flex-shrink-0">
              <HiOutlineMenuAlt2 size={20}/>
            </button>
            <div className="min-w-0">
              <h2 className="text-lg md:text-2xl font-extrabold text-gray-800 truncate">
                Welcome, <span className="text-[#ef7041]">{auth?.name?.split(' ')[0] || 'Student'}!</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-400 font-medium hidden sm:block">Ready to create a positive impact today?</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Bell */}
            <button className="relative p-2 md:p-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#102167]/30 hover:bg-[#f5f7ff] transition-all shadow-sm">
              <FiBell size={18} className="text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef7041] rounded-full border border-white"></span>
            </button>
            {/* User */}
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-[#102167]/30 hover:bg-[#f5f7ff] transition-all duration-200 shadow-sm">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#102167] to-[#3b4da8] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {auth?.name?.[0] || 'S'}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-sm font-bold text-gray-700 leading-tight">{auth?.name || 'Student'}</span>
                <span className="block text-[10px] text-[#102167] font-bold leading-tight">NSS Volunteer</span>
              </div>
              <FiChevronDown size={13} className="text-gray-400 hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-5 md:px-8 pt-4 md:pt-7 pb-4 md:pb-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-2 text-center text-xs text-gray-400 font-medium flex-shrink-0">
          <span className="inline-flex items-center gap-1.5">
            NSS Portal | <span className="text-[#ef7041] font-bold">Not Me But You</span>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default StudentLayout;
