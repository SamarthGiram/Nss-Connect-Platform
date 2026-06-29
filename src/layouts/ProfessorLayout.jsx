import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import nssLogo from '../assets/nss.png';
import { parseProfile } from '../utils/avatarParser';
import {
  HiOutlineViewGrid, HiOutlineCalendar, HiOutlineClipboardCheck,
  HiOutlineMenuAlt2, HiOutlineX, HiOutlineSpeakerphone, HiOutlineUserGroup,
  HiOutlineUser
} from 'react-icons/hi';
import { FiBell, FiChevronDown, FiBookOpen, FiLogOut, FiUser, FiAward } from 'react-icons/fi';

const professorLinks = [
  { name: 'Dashboard',          path: '/professor/dashboard',      icon: HiOutlineViewGrid,       badge: null  },
  { name: 'My Events',          path: '/professor/events',         icon: HiOutlineCalendar,       badge: null  },
  { name: 'Take Attendance',    path: '/professor/attendance',     icon: HiOutlineClipboardCheck, badge: null  },
  { name: 'Announcements',      path: '/professor/announcements',  icon: HiOutlineSpeakerphone,   badge: null  },
  { name: 'Leaderboard',        path: '/professor/leaderboard',    icon: FiAward,                 badge: null  },
  { name: 'Manage Students',    path: '/professor/students',       icon: HiOutlineUserGroup,      badge: null  },
  { name: 'Student Approvals',  path: '/professor/approvals',      icon: HiOutlineClipboardCheck, badge: 'pending' },
  { name: 'My Profile',         path: '/professor/profile',        icon: HiOutlineUser,           badge: null  },
];

const SidebarContent = ({ auth, onClose, pendingCount }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#102167] flex-shrink-0">
          <img src={nssLogo} alt="NSS Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-[15px] font-extrabold text-[#102167] leading-tight">NSS Portal</h1>
          <p className="text-[9px] text-gray-400 font-semibold tracking-wide leading-tight">Faculty Panel</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
          <HiOutlineX size={20}/>
        </button>
      )}
    </div>

    <div className="mx-3 mt-3 mb-1 flex items-center gap-2 bg-amber-50 border border-amber-200/60 rounded-xl px-3 py-2">
      <FiBookOpen size={13} className="text-amber-600 flex-shrink-0" />
      <div>
        <p className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wide">Professor</p>
        <p className="text-[10px] text-gray-500 font-semibold truncate">{auth?.name || 'Faculty'}</p>
      </div>
    </div>

    {/* Pending requests alert */}
    {pendingCount > 0 && (
      <div className="mx-3 mt-2 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[10px] font-black">{pendingCount}</span>
        </div>
        <p className="text-[10px] font-bold text-amber-700">
          {pendingCount} student{pendingCount > 1 ? 's' : ''} awaiting approval
        </p>
      </div>
    )}

    <nav className="flex-1 px-3 pt-3 space-y-1">
      {professorLinks.map(link => {
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
      <svg viewBox="0 0 180 130" className="w-full px-3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="90" cy="118" rx="70" ry="7" fill="#e8eeff"/>
        <rect x="30" y="30" width="120" height="55" rx="4" fill="#102167" opacity="0.12"/>
        <rect x="36" y="36" width="108" height="43" rx="3" fill="#eef2ff"/>
        <line x1="46" y1="48" x2="120" y2="48" stroke="#102167" strokeWidth="2" opacity="0.3"/>
        <line x1="46" y1="56" x2="100" y2="56" stroke="#102167" strokeWidth="2" opacity="0.3"/>
        <line x1="46" y1="64" x2="110" y2="64" stroke="#ef7041" strokeWidth="2" opacity="0.4"/>
        <circle cx="90" cy="93" r="7" fill="#102167" opacity="0.7"/>
        <rect x="84" y="102" width="12" height="16" rx="3" fill="#3b4da8" opacity="0.7"/>
        <line x1="96" y1="95" x2="120" y2="60" stroke="#ef7041" strokeWidth="1.5" opacity="0.6"/>
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

const ProfessorLayout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [avatarTheme, setAvatarTheme] = useState(() => {
    const parsed = parseProfile(auth);
    return parsed?.avatar_theme || localStorage.getItem(`avatar_theme_${auth?.id}`) || 'from-amber-400 to-orange-500';
  });

  const [avatarIcon, setAvatarIcon] = useState(() => {
    const parsed = parseProfile(auth);
    return parsed?.avatar_icon || localStorage.getItem(`avatar_icon_${auth?.id}`) || '';
  });

  const [avatarImg, setAvatarImg] = useState(() => {
    const parsed = parseProfile(auth);
    return parsed?.avatar_img || localStorage.getItem(`avatar_img_${auth?.id}`) || '';
  });

  const handleLogout = () => { logout(); navigate('/login'); };

  useEffect(() => {
    const handleThemeUpdate = () => {
      const parsed = parseProfile(auth);
      const storedTheme = parsed?.avatar_theme || localStorage.getItem(`avatar_theme_${auth?.id}`);
      if (storedTheme) setAvatarTheme(storedTheme);
      const storedIcon = parsed?.avatar_icon || localStorage.getItem(`avatar_icon_${auth?.id}`);
      setAvatarIcon(storedIcon || '');
      const storedImg = parsed?.avatar_img || localStorage.getItem(`avatar_img_${auth?.id}`);
      setAvatarImg(storedImg || '');
    };
    window.addEventListener('avatar-theme-updated', handleThemeUpdate);
    handleThemeUpdate();
    return () => window.removeEventListener('avatar-theme-updated', handleThemeUpdate);
  }, [auth]);

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
        <SidebarContent auth={auth} onClose={() => setSidebarOpen(false)} pendingCount={pendingCount} />
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
                Welcome, <span className="text-amber-500">{auth?.name?.split(' ')[0] || 'Professor'}!</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-400 font-medium hidden sm:block">NSS Faculty Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Bell with pending badge */}
            <div className="relative">
              <button onClick={() => setBellOpen(!bellOpen)}
                className="relative p-2 md:p-2.5 rounded-xl bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 shadow-sm flex-shrink-0 bg-transparent">
                <FiBell size={18} className="text-gray-400" />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-amber-500 rounded-full border-2 border-white text-white text-[9px] font-black flex items-center justify-center px-1">
                    {pendingCount}
                  </span>
                )}
              </button>

              {bellOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 z-50 animate-fade-in origin-top-right">
                    <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-gray-800">Notifications</span>
                      {pendingCount > 0 && <span className="w-2 h-2 bg-amber-500 rounded-full"></span>}
                    </div>
                    <div className="py-2 px-2 max-h-60 overflow-y-auto">
                      {pendingCount > 0 ? (
                        <button
                          onClick={() => {
                            setBellOpen(false);
                            navigate('/professor/approvals');
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 transition-colors flex items-start gap-2.5 bg-transparent border-none shadow-none text-gray-700"
                        >
                          <div className="w-7 h-7 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FiBell size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-700 leading-tight">Student Approvals Pending</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{pendingCount} student accounts are waiting for verification.</p>
                          </div>
                        </button>
                      ) : (
                        <div className="text-center py-6 text-gray-400">
                          <FiBell size={24} className="mx-auto text-gray-300 mb-2" />
                          <p className="text-xs font-medium">All caught up!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 shadow-sm bg-transparent">
                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br ${avatarTheme} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden`}>
                  {avatarImg ? (
                    <img src={avatarImg} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    avatarIcon || auth?.name?.[0] || 'P'
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-sm font-bold text-gray-700 leading-tight">{auth?.name || 'Professor'}</span>
                  <span className="block text-[10px] text-amber-600 font-bold leading-tight">Faculty</span>
                </div>
                <FiChevronDown size={13} className={`text-gray-400 hidden sm:block transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-fade-in origin-top-right">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-extrabold text-gray-800 truncate">{auth?.name || 'Professor'}</p>
                      <p className="text-[9px] text-amber-600 font-bold uppercase tracking-wider mt-0.5">Faculty Coordinator</p>
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate('/professor/profile');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-amber-600 transition-colors flex items-center gap-2.5 bg-transparent border-none shadow-none hover:shadow-none"
                      >
                        <FiUser size={15} className="text-gray-400" />
                        <span className="flex-1 text-left">My Profile</span>
                      </button>

                      {professorLinks.map((link) => {
                        const Icon = link.icon;
                        const showBadge = link.badge === 'pending' && pendingCount > 0;
                        return (
                          <button
                            key={link.name}
                            onClick={() => {
                              setDropdownOpen(false);
                              navigate(link.path);
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-amber-600 transition-colors flex items-center gap-2.5 bg-transparent border-none shadow-none hover:shadow-none"
                          >
                            <Icon size={15} className="text-gray-400" />
                            <span className="flex-1 text-left">{link.name}</span>
                            {showBadge && (
                              <span className="min-w-[16px] h-4 bg-amber-500 text-white text-[8px] font-black rounded-full flex items-center justify-center px-1">
                                {pendingCount}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2.5 bg-transparent border-none shadow-none hover:shadow-none"
                    >
                      <FiLogOut size={15} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-3 sm:px-5 md:px-8 pt-4 md:pt-7 pb-4 md:pb-6">
          <Outlet />
        </main>

        <footer className="bg-white border-t border-gray-100 py-2 text-center text-xs text-gray-400 font-medium flex-shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <FiBookOpen size={12} className="text-amber-500" />
            NSS Faculty Portal | <span className="text-[#ef7041] font-bold">Not Me But You</span>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default ProfessorLayout;
