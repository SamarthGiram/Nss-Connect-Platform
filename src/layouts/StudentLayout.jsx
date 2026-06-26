import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import nssLogo from '../assets/nss.png';
import { HiOutlineViewGrid, HiOutlineCalendar, HiOutlineClipboardCheck, HiOutlineUser } from 'react-icons/hi';
import { FiBell, FiChevronDown } from 'react-icons/fi';

const studentLinks = [
  { name: 'Dashboard', path: '/student/dashboard', icon: HiOutlineViewGrid },
  { name: 'Upcoming Events', path: '/student/events', icon: HiOutlineCalendar },
  { name: 'My Attendance', path: '/student/attendance', icon: HiOutlineClipboardCheck },
  { name: 'My Profile', path: '/student/profile', icon: HiOutlineUser },
];

const StudentLayout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#f0f4ff] font-sans overflow-hidden">
      {/* ─── Sidebar ─── */}
      <aside className="w-[210px] flex-shrink-0 bg-white flex flex-col shadow-xl relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#102167] flex-shrink-0">
            <img src={nssLogo} alt="NSS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-[15px] font-extrabold text-[#102167] leading-tight">NSS</h1>
            <p className="text-[9px] text-gray-500 leading-tight font-semibold tracking-wide">National Service Scheme</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 pt-5 space-y-1">
          {studentLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#eef2ff] text-[#102167]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#102167]'
                  }`
                }
              >
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
          {/* Dot pattern */}
          <div className="absolute right-4 bottom-20 opacity-20">
            {[...Array(4)].map((_, r) => (
              <div key={r} className="flex gap-1.5 mb-1.5">
                {[...Array(4)].map((_, c) => (
                  <div key={c} className="w-1 h-1 bg-[#102167] rounded-full" />
                ))}
              </div>
            ))}
          </div>
          {/* SVG Illustration */}
          <svg viewBox="0 0 180 140" className="w-full px-2" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ground */}
            <ellipse cx="90" cy="125" rx="75" ry="8" fill="#e8eeff" />
            {/* Plants left */}
            <path d="M20 120 Q18 105 25 98 Q22 108 30 112" fill="#a5b4fc" opacity="0.5"/>
            <path d="M30 120 Q35 100 28 88" stroke="#818cf8" strokeWidth="1.5" fill="none"/>
            <circle cx="28" cy="86" r="8" fill="#c7d2fe" opacity="0.6"/>
            {/* Plants right */}
            <path d="M150 118 Q155 98 148 88" stroke="#818cf8" strokeWidth="1.5" fill="none"/>
            <circle cx="149" cy="86" r="9" fill="#c7d2fe" opacity="0.6"/>
            {/* Flag pole */}
            <line x1="90" y1="30" x2="90" y2="118" stroke="#6366f1" strokeWidth="2"/>
            {/* Flag */}
            <path d="M90 30 L120 42 L90 54 Z" fill="#102167" opacity="0.85"/>
            <circle cx="85" cy="62" r="5" fill="#ef7041" opacity="0.8"/>
            {/* Person 1 */}
            <circle cx="72" cy="82" r="7" fill="#102167" opacity="0.7"/>
            <path d="M65 90 Q72 100 79 90" fill="#3b4da8" opacity="0.7"/>
            <rect x="67" y="90" width="10" height="20" rx="3" fill="#3b4da8" opacity="0.7"/>
            {/* Person 2 */}
            <circle cx="108" cy="82" r="7" fill="#102167" opacity="0.7"/>
            <path d="M101 90 Q108 100 115 90" fill="#3b4da8" opacity="0.7"/>
            <rect x="103" y="90" width="10" height="20" rx="3" fill="#3b4da8" opacity="0.7"/>
          </svg>
          {/* Not Me But You */}
          <div className="flex items-center justify-center gap-2 px-4 pb-2">
            <span className="flex-1 border-t border-gray-200"></span>
            <p className="text-[11px] font-bold text-gray-500 whitespace-nowrap">
              Not Me <span className="text-[#ef7041]">But You</span>
            </p>
            <span className="flex-1 border-t border-gray-200"></span>
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
              Welcome Back, <span className="text-[#ef7041]">{auth?.name?.split(' ')[0] || 'Student'}!</span>
            </h2>
            <p className="text-sm text-gray-400 font-medium mt-0.5">Ready to create a positive impact today?</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-full hover:bg-gray-50 transition-colors">
              <FiBell size={22} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef7041] rounded-full border border-white"></span>
            </button>
            {/* User Avatar */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#102167] to-[#3b4da8] flex items-center justify-center text-white font-bold text-sm">
                {auth?.name?.[0] || 'S'}
              </div>
              <span className="text-sm font-bold text-gray-700">{auth?.name || 'Student'}</span>
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
            <svg className="w-3.5 h-3.5 text-[#102167]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            National Service Scheme (NSS) |&nbsp;<span className="text-[#ef7041] font-bold">Not Me But You</span>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default StudentLayout;
