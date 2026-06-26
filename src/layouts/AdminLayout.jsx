import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import nssLogo from '../assets/nss.png';
import {
  HiOutlineViewGrid, HiOutlineCalendar, HiOutlineUserGroup,
  HiOutlineClipboardCheck, HiOutlineChartBar, HiOutlineCog
} from 'react-icons/hi';
import { FiBell, FiChevronDown, FiShield } from 'react-icons/fi';

const adminLinks = [
  { name: 'Dashboard',        path: '/admin/dashboard',  icon: HiOutlineViewGrid },
  { name: 'Manage Events',    path: '/admin/events',     icon: HiOutlineCalendar },
  { name: 'Manage Users',     path: '/admin/users',      icon: HiOutlineUserGroup },
  { name: 'Pending Approvals',path: '/admin/approvals',  icon: HiOutlineClipboardCheck },
];

const AdminLayout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen bg-[#f0f4ff] font-sans overflow-hidden">

      {/* ─── Sidebar ─── */}
      <aside className="w-[220px] flex-shrink-0 bg-white flex flex-col shadow-xl relative overflow-hidden">

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#102167] flex-shrink-0">
            <img src={nssLogo} alt="NSS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-[15px] font-extrabold text-[#102167] leading-tight">NSS Admin</h1>
            <p className="text-[9px] text-gray-400 font-semibold tracking-wide leading-tight">Control Panel</p>
          </div>
        </div>

        {/* Admin badge */}
        <div className="mx-3 mt-3 mb-1 flex items-center gap-2 bg-[#fff5f2] border border-[#ef7041]/20 rounded-xl px-3 py-2">
          <FiShield size={13} className="text-[#ef7041] flex-shrink-0" />
          <div>
            <p className="text-[10px] font-extrabold text-[#ef7041] uppercase tracking-wide">Administrator</p>
            <p className="text-[10px] text-gray-500 font-semibold truncate">{auth?.name || 'Admin'}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-3 space-y-1">
          {adminLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink key={link.name} to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#102167] shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#102167]'
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

        {/* Bottom section */}
        <div className="relative mt-auto pb-4">
          <div className="absolute right-4 bottom-20 opacity-15">
            {[...Array(4)].map((_, r) => (
              <div key={r} className="flex gap-1.5 mb-1.5">
                {[...Array(4)].map((_, c) => (
                  <div key={c} className="w-1 h-1 bg-[#102167] rounded-full" />
                ))}
              </div>
            ))}
          </div>
          {/* Mini SVG */}
          <svg viewBox="0 0 180 120" className="w-full px-3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="90" cy="108" rx="70" ry="7" fill="#e8eeff"/>
            {/* Admin desk */}
            <rect x="50" y="72" width="80" height="36" rx="4" fill="#c7d2fe" opacity="0.5"/>
            <rect x="58" y="64" width="64" height="12" rx="3" fill="#a5b4fc" opacity="0.7"/>
            {/* Monitor */}
            <rect x="68" y="40" width="44" height="28" rx="4" fill="#102167" opacity="0.8"/>
            <rect x="72" y="44" width="36" height="20" rx="2" fill="#3b82f6" opacity="0.4"/>
            <rect x="78" y="48" width="24" height="2" rx="1" fill="white" opacity="0.6"/>
            <rect x="78" y="52" width="16" height="2" rx="1" fill="white" opacity="0.4"/>
            <rect x="78" y="56" width="20" height="2" rx="1" fill="white" opacity="0.4"/>
            {/* Stand */}
            <rect x="87" y="68" width="6" height="8" fill="#6366f1" opacity="0.5"/>
          </svg>
          <div className="flex items-center justify-center gap-2 px-4 pb-2">
            <span className="flex-1 border-t border-gray-100"></span>
            <p className="text-[11px] font-bold text-gray-400 whitespace-nowrap">
              Not Me <span className="text-[#ef7041]">But You</span>
            </p>
            <span className="flex-1 border-t border-gray-100"></span>
          </div>
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-[#ef7041] rounded-full"></div>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Header */}
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">
              Welcome, <span className="text-[#ef7041]">{auth?.name?.split(' ')[0] || 'Admin'}!</span>
            </h2>
            <p className="text-sm text-gray-400 font-medium mt-0.5">NSS Admin Control Panel</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors">
              <FiBell size={22} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef7041] rounded-full border border-white"></span>
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ef7041] to-[#f48b62] flex items-center justify-center text-white font-bold text-sm">
                {auth?.name?.[0] || 'A'}
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-gray-700">{auth?.name || 'Admin'}</span>
                <span className="block text-[10px] text-[#ef7041] font-bold">Administrator</span>
              </div>
              <FiChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 pt-7 pb-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-2.5 text-center text-xs text-gray-400 font-medium flex-shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <FiShield size={13} className="text-[#102167]" />
            NSS Admin Portal | <span className="text-[#ef7041] font-bold">Not Me But You</span>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
