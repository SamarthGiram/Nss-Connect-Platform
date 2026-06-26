import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiFlag, FiHeart, FiUser, FiShield } from 'react-icons/fi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import nssLogo from '../../assets/nss.png';

const ICONS = [
  { Icon: HiOutlineUserGroup, label: 'Community\nService',  bg: 'from-[#102167] to-[#1a2f85]' },
  { Icon: FiFlag,             label: 'Nation\nBuilding',    bg: 'from-[#ef7041] to-[#f48b62]' },
  { Icon: FiHeart,            label: 'Social\nResponsibility', bg: 'from-[#ef7041] to-[#f48b62]' },
  { Icon: FiUser,             label: 'Leadership',          bg: 'from-[#102167] to-[#1a2f85]' },
];

// Positions: top-left, top-right, bottom-left, bottom-right
const POSITIONS = [
  { top: '14%', left:  '8%'  },
  { top: '14%', right: '8%'  },
  { bottom: '18%', left:  '8%' },
  { bottom: '18%', right: '8%' },
];

const LoginPage = () => {
  const [activeIdx, setActiveIdx] = useState(0);   // which icon is currently lit
  const [spinning, setSpinning] = useState(false);  // trigger spin CSS class
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Cycle icons one-by-one every 2 s with a spin transition
  useEffect(() => {
    const interval = setInterval(() => {
      setSpinning(true);
      setTimeout(() => {
        setActiveIdx(prev => (prev + 1) % ICONS.length);
        setSpinning(false);
      }, 400);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMockLogin = (e) => {
    e.preventDefault();
    setError('');

    let user = null;
    if (email === 'admin@nss.com' || email === 'Admin') {
      user = mockUsers['a1'];
    } else if (email === 'prof@nss.com' || email === 'Professor') {
      user = mockUsers['p1'];
    } else if (email === 'student@nss.com' || email === 'Student') {
      user = mockUsers['u1'];
    }

    if (user && password === '123') {
      const mockToken = `mock-jwt-token-for-${user.role}`;
      login({ ...user, token: mockToken });

      if (user.role === 'admin') navigate('/admin/dashboard');
      if (user.role === 'professor') navigate('/professor/dashboard');
      if (user.role === 'student') navigate('/student/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#e5eff8] to-[#eef4fa] font-sans">
      {/* Background Graphic Elements - Concentric Circles with slow spin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-200 rounded-full opacity-60 animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-gray-300 rounded-full opacity-40 animate-[spin_40s_linear_infinite_reverse]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-dashed border-gray-300 rounded-full opacity-50 animate-[spin_80s_linear_infinite]"></div>

      {/* Floating Orange and Blue Dots */}
      <div className="absolute w-3 h-3 bg-[#102167] rounded-full left-[20%] top-[15%] opacity-80 animate-pulse"></div>
      <div className="absolute w-4 h-4 bg-[#ef7041] rounded-full right-[25%] bottom-[20%] opacity-80 animate-bounce"></div>
      <div className="absolute w-2 h-2 bg-[#ef7041] rounded-full right-[30%] top-[35%] opacity-80 animate-pulse"></div>
      <div className="absolute w-3 h-3 bg-[#102167] rounded-full left-[28%] bottom-[40%] opacity-80 animate-bounce"></div>

      {/* Cloud-like soft background blobs */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white/60 to-transparent"></div>

      {/* ── Sequential one-by-one icon rotator ── */}
      <style>{`
        @keyframes spinIn {
          0%   { transform: rotate(-180deg) scale(0.4); opacity: 0; }
          60%  { transform: rotate(10deg)   scale(1.08); opacity: 1; }
          100% { transform: rotate(0deg)    scale(1);    opacity: 1; }
        }
        @keyframes spinOut {
          0%   { transform: rotate(0deg)   scale(1);    opacity: 1; }
          100% { transform: rotate(180deg) scale(0.4);  opacity: 0; }
        }
        .icon-spin-in  { animation: spinIn  0.4s cubic-bezier(.36,.07,.19,.97) forwards; }
        .icon-spin-out { animation: spinOut 0.4s cubic-bezier(.36,.07,.19,.97) forwards; }
      `}</style>

      {/* Render one icon per corner; each position highlights when it's the active index */}
      {POSITIONS.map((pos, i) => {
        const { Icon, label, bg } = ICONS[i];
        const isActive = activeIdx === i;
        return (
          <div key={i} className="hidden xl:flex absolute flex-col items-center gap-2"
            style={{ ...pos, transition: 'opacity 0.3s' }}>
            <div
              className={`bg-gradient-to-br ${bg} rounded-full text-white flex items-center justify-center ring-4 transition-all duration-500
                ${ isActive
                    ? 'w-[78px] h-[78px] shadow-2xl ring-white/70 scale-110 ' + (spinning ? 'icon-spin-out' : 'icon-spin-in')
                    : 'w-[60px] h-[60px] shadow-md ring-white/30 opacity-40 scale-90'
                }`}
            >
              {(() => { const IC = Icon; return <IC size={isActive ? 32 : 24} />; })()}
            </div>
            <p className={`text-center font-bold leading-tight whitespace-pre-line transition-all duration-500
              ${ isActive ? 'text-[13px] text-gray-800 drop-shadow-sm' : 'text-[11px] text-gray-400' }`}>
              {label}
            </p>
          </div>
        );
      })}

      {/* Central Login Card */}
      <div className="relative z-10 w-[90%] max-w-[420px] p-8 pt-12 pb-8 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(16,33,103,0.15)] border border-white/50">
        
        {/* NSS Logo */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-[100px] h-[100px] rounded-full border-[4px] border-white shadow-lg flex items-center justify-center bg-white overflow-hidden absolute -top-[90px]">
            <img 
              src={nssLogo} 
              alt="NSS Logo" 
              className="w-[90px] h-[90px] object-contain transition-transform hover:scale-105 duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Fallback for the NSS logo if the image isn't uploaded yet */}
            <div style={{display: 'none'}} className="flex-col items-center">
               <span className="text-[#102167] font-black text-2xl leading-none">NSS</span>
               <span className="text-[#ef7041] text-[10px] font-bold mt-1">LOGO</span>
            </div>
          </div>
        </div>

        <h2 className="text-[28px] font-extrabold text-center text-[#102167] mt-2 mb-2">
          Welcome <span className="text-[#ef7041]">Back!</span>
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8 px-2 leading-relaxed font-medium">
          Login to your NSS portal and continue<br/>your journey of service.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center font-semibold shadow-sm animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleMockLogin} className="space-y-5">
          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiMail className="text-gray-400 group-focus-within:text-[#102167] transition-colors duration-300" size={20} />
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-[#102167]/10 focus:border-[#102167] outline-none transition-all text-gray-700 font-semibold placeholder:text-gray-400 placeholder:font-medium bg-gray-50/50 focus:bg-white"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiLock className="text-gray-400 group-focus-within:text-[#102167] transition-colors duration-300" size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-[#102167]/10 focus:border-[#102167] outline-none transition-all text-gray-700 font-semibold placeholder:text-gray-400 placeholder:font-medium bg-gray-50/50 focus:bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#102167] transition-colors duration-300"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pt-1">
            <a href="#" className="text-[13px] font-bold text-[#102167] hover:text-[#ef7041] transition-colors duration-300">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="group w-full py-4 px-4 flex items-center justify-center space-x-2 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-[#102167] to-[#1a2f85] hover:from-[#1a2f85] hover:to-[#102167] transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#102167]/30 shadow-[0_8px_20px_rgba(16,33,103,0.3)]"
            >
              <span>Login</span>
              <FiArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center justify-center space-x-3 opacity-60">
           <div className="h-px bg-gray-300 flex-grow border-t border-dashed border-gray-400"></div>
           <FiShield size={18} className="text-gray-400" />
           <div className="h-px bg-gray-300 flex-grow border-t border-dashed border-gray-400"></div>
        </div>
        
        {/* Sign Up Link */}
        <p className="text-center text-[13px] font-medium text-gray-500 mt-6">
          Not a member yet? <Link to="/register" className="text-[#ef7041] font-bold hover:underline">Contact NSS Coordinator</Link>
        </p>
      </div>

      {/* Bottom Footer Text */}
      <div className="absolute bottom-6 flex flex-col items-center">
         <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-px bg-[#102167]/40"></div>
            <p className="text-[#102167] font-black text-lg tracking-wide uppercase">
              Not Me <span className="text-[#ef7041]">But You</span>
            </p>
            <div className="w-12 h-px bg-[#102167]/40"></div>
         </div>
         <FiHeart size={16} className="text-[#ef7041] fill-current" />
      </div>
    </div>
  );
};

export default LoginPage;
