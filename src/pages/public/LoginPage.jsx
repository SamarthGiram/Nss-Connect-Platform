import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight,
  FiFlag, FiHeart, FiUser, FiShield, FiHome
} from 'react-icons/fi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import nssLogo from '../../assets/nss.png';

/* ── Icon spotlight data ── */
const PILLARS = [
  { Icon: HiOutlineUserGroup, label: 'Community Service',     bg: 'bg-white/10', accent: 'text-white'        },
  { Icon: FiFlag,             label: 'Nation Building',       bg: 'bg-white/10', accent: 'text-white'        },
  { Icon: FiHeart,            label: 'Social Responsibility', bg: 'bg-[#ef7041]/20', accent: 'text-[#f4a07a]'},
  { Icon: FiShield,           label: 'Leadership',            bg: 'bg-[#ef7041]/20', accent: 'text-[#f4a07a]'},
];

const CREDENTIALS = [
  { role: 'Admin',     email: 'admin@nss.com',   color: 'text-[#ef7041]' },
  { role: 'Professor', email: 'prof@nss.com',    color: 'text-blue-300'  },
  { role: 'Student',   email: 'student@nss.com', color: 'text-emerald-300'},
];

const LoginPage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { auth, login } = useAuth();
  const navigate   = useNavigate();
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  /* Cycle pillars every 2.5 s */
  useEffect(() => {
    const iv = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIdx(p => (p + 1) % PILLARS.length);
        setAnimating(false);
      }, 350);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await login(email, password);
      // Navigate based on role from profile (fetched inside login)
      // Re-read auth after login completes
      // auth is set inside context, read it after a tick
      setTimeout(() => {
        const stored = localStorage.getItem('sb-brjbdmxdtaljkvhxtefm-auth-token');
      }, 0);
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('Invalid login'))    setError('Invalid email or password.');
      else if (msg.includes('Email not confirmed')) setError('Please confirm your email before logging in.');
      else setError(msg || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Navigate once auth is set
  useEffect(() => {
    if (auth) {
      if (auth.role === 'admin')     navigate('/admin/dashboard');
      else if (auth.role === 'professor') navigate('/professor/dashboard');
      else navigate('/student/dashboard');
    }
  }, [auth]);

  const { Icon: ActiveIcon, label: activeLabel } = PILLARS[activeIdx];

  return (
    <div className="flex h-screen font-sans overflow-hidden bg-[#f0f4ff]">

      {/* ══════════════════════ LEFT PANEL ══════════════════════ */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[52%] bg-gradient-to-br from-[#0b1a52] via-[#102167] to-[#1a3490] relative overflow-hidden flex-col">

        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[350px] h-[350px] rounded-full bg-[#ef7041]/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full pointer-events-none" />

        {/* Dot grid */}
        <div className="absolute top-16 right-12 grid grid-cols-5 gap-2 opacity-20 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>
        <div className="absolute bottom-16 left-10 grid grid-cols-4 gap-2 opacity-15 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>

        {/* Top nav back link */}
        <div className="relative z-10 px-10 pt-8 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors group">
            <FiHome size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Centre content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-12 text-center gap-8">

          {/* NSS Logo + Name */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <img src={nssLogo} alt="NSS Logo" className="w-20 h-20 object-contain" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight leading-tight">NSS Portal</h1>
              <p className="text-white/60 font-semibold text-sm mt-1 tracking-wider uppercase">National Service Scheme</p>
            </div>
          </div>

          {/* Animated pillar spotlight */}
          <div className="w-full max-w-xs">
            <div className={`transition-all duration-350 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className={`${PILLARS[activeIdx].bg} backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3`}>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  {(() => { const IC = ActiveIcon; return <IC size={28} className={PILLARS[activeIdx].accent} />; })()}
                </div>
                <p className="text-white font-extrabold text-lg leading-tight">{activeLabel}</p>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {PILLARS.map((_, i) => (
                <div key={i} onClick={() => setActiveIdx(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer
                    ${i === activeIdx ? 'w-6 h-2 bg-[#ef7041]' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`} />
              ))}
            </div>
          </div>

          {/* NSS motto */}
          <div className="border-t border-white/10 pt-6 w-full max-w-xs">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">NSS Motto</p>
            <p className="text-2xl font-black text-white">
              Not Me <span className="text-[#ef7041]">But You</span>
            </p>
          </div>
        </div>


      </div>

      {/* ══════════════════════ RIGHT PANEL ══════════════════════ */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-white">

        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#102167]">
              <img src={nssLogo} alt="NSS" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#102167]">NSS Portal</p>
              <p className="text-[10px] text-gray-400 font-semibold">National Service Scheme</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold hover:text-[#102167] transition-colors">
            <FiHome size={13}/> Home
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 max-w-md mx-auto w-full">

          {/* Header */}
          <div className="w-full mb-8 text-left">
            <div className="inline-flex items-center gap-2 bg-[#eef2ff] px-3 py-1.5 rounded-full mb-4">
              <div className="w-2 h-2 bg-[#102167] rounded-full"></div>
              <span className="text-[11px] font-extrabold text-[#102167] uppercase tracking-wider">Secure Login</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              Welcome <span className="text-[#ef7041]">Back!</span>
            </h2>
            <p className="text-gray-400 font-medium text-sm mt-2 leading-relaxed">
              Sign in to your NSS portal and continue your journey of service.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="w-full mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiShield size={14} className="text-red-500" />
              </div>
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">

            {/* Email */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Email Address</label>
              <div className="relative group">
                <FiMail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors duration-300" />
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@nss.com"
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/8 outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="relative group">
                <FiLock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors duration-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/8 outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#102167] transition-colors duration-300">
                  {showPassword ? <FiEyeOff size={17}/> : <FiEye size={17}/>}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <a href="#" className="text-xs font-bold text-[#102167] hover:text-[#ef7041] transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className={`w-full py-4 rounded-xl text-sm font-extrabold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg group
                ${loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#102167] to-[#1a3490] hover:from-[#ef7041] hover:to-[#d4622e] hover:shadow-xl hover:-translate-y-0.5 shadow-[#102167]/30'}`}>
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FiArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>


          {/* Divider */}
          <div className="w-full my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-[11px] text-gray-300 font-bold uppercase tracking-wider">Login As</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* Role pills — clickable selector */}
          <div className="w-full">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Admin',     selected: 'bg-[#102167]  text-white',                                    unselected: 'border-2 border-[#102167]/25  bg-[#eef2ff]  text-[#102167]/60'  },
                { label: 'Professor', selected: 'bg-amber-400   text-white',                                    unselected: 'border-2 border-amber-300     bg-amber-50    text-amber-500'     },
                { label: 'Student',   selected: 'bg-emerald-500 text-white',                                    unselected: 'border-2 border-emerald-300   bg-emerald-50  text-emerald-600'  },
              ].map(q => (
                <button key={q.label} type="button"
                  onClick={() => setSelectedRole(q.label)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold text-center transition-all duration-200 cursor-pointer outline-none focus:outline-none
                    ${selectedRole === q.label ? q.selected : q.unselected}
                    ${selectedRole && selectedRole !== q.label ? 'opacity-40' : 'opacity-100'}`}>
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 font-medium">
              Not a member yet?{' '}
              <Link to="/register" className="text-[#ef7041] font-bold hover:underline">Contact NSS Coordinator</Link>
            </p>
          </div>
        </div>

        {/* Bottom footer strip */}
        <div className="border-t border-gray-50 px-8 py-4 flex items-center justify-between">
          <p className="text-[11px] text-gray-300 font-medium">
            © 2025 NSS Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-300 font-semibold">
            <FiShield size={11} className="text-[#102167]/40"/>
            Secured · Encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
