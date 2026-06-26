import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser, FiHash, FiMail, FiPhone, FiBook,
  FiLock, FiEye, FiEyeOff, FiArrowRight,
  FiCheckCircle, FiHome, FiShield, FiHeart
} from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineUserGroup } from 'react-icons/hi';
import nssLogo from '../../assets/nss.png';

/* ─── Why Join NSS cards shown on left panel ─── */
const WHY_NSS = [
  { icon: FiHeart,              color: 'text-[#ef7041]', bg: 'bg-[#ef7041]/15', title: 'Make an Impact',    desc: 'Serve communities in need' },
  { icon: HiOutlineAcademicCap, color: 'text-blue-300',  bg: 'bg-blue-400/15',  title: 'Earn NSS Credits',  desc: 'Recognised across universities' },
  { icon: HiOutlineUserGroup,   color: 'text-emerald-300',bg:'bg-emerald-400/15',title: 'Build Leadership',  desc: 'Grow into a changemaker' },
];

/* ─── Input field helper ─── */
const Field = ({ label, icon: Icon, type = 'text', value, onChange, placeholder, children }) => (
  <div>
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">{label}</label>
    <div className="relative group">
      {Icon && (
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors duration-300 pointer-events-none" />
      )}
      {children ?? (
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder} required
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/8 outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300"
        />
      )}
    </div>
  </div>
);

const YEARS  = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const GROUPS = ['Group A', 'Group B', 'Group C', 'Group D'];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass]     = useState(false);
  const [showConf, setShowConf]     = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [errors, setErrors]         = useState({});

  const [form, setForm] = useState({
    fullName: '', rollNumber: '', email: '', phone: '',
    department: '', year: '1st Year', group: 'Group A',
    password: '', confirmPassword: '',
  });

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())          e.fullName    = 'Full name is required';
    if (!form.rollNumber.trim())        e.rollNumber  = 'Roll number is required';
    if (!form.email.includes('@'))      e.email       = 'Valid email required';
    if (form.phone.length < 10)         e.phone       = 'Valid phone number required';
    if (!form.department.trim())        e.department  = 'Department is required';
    if (form.password.length < 6)      e.password    = 'Min 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  /* ─── Success Screen ─── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center px-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-emerald-50">
            <FiCheckCircle size={38} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Registration Submitted!</h2>
          <p className="text-gray-400 font-medium text-sm leading-relaxed mb-6">
            Your registration request has been sent to the NSS Coordinator.<br/>
            You will receive login credentials via email once approved.
          </p>
          <div className="bg-[#eef2ff] rounded-2xl p-4 mb-6 text-left">
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-2">Submitted Details</p>
            <p className="text-sm font-bold text-gray-700">{form.fullName}</p>
            <p className="text-xs text-gray-400 font-medium">{form.email} · {form.rollNumber}</p>
            <p className="text-xs text-gray-400 font-medium">{form.department} · {form.year} · {form.group}</p>
          </div>
          <Link to="/login"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#102167] to-[#1a3490] text-white font-extrabold text-sm rounded-xl hover:from-[#ef7041] hover:to-[#d4622e] transition-all duration-300 shadow-lg shadow-[#102167]/20">
            Go to Login <FiArrowRight size={15}/>
          </Link>
          <Link to="/" className="block mt-3 text-xs text-gray-400 font-semibold hover:text-[#102167] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  /* ─── Main Register Page ─── */
  return (
    <div className="flex min-h-screen font-sans bg-[#f0f4ff]">

      {/* ══════════ LEFT PANEL ══════════ */}
      <div className="hidden lg:flex lg:w-[40%] xl:w-[42%] bg-gradient-to-br from-[#0b1a52] via-[#102167] to-[#1a3490] relative overflow-hidden flex-col flex-shrink-0">

        {/* Decorative */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#ef7041]/10 pointer-events-none" />

        {/* Dot grids */}
        <div className="absolute top-12 right-10 grid grid-cols-5 gap-2 opacity-20 pointer-events-none">
          {[...Array(20)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"/>)}
        </div>
        <div className="absolute bottom-12 left-8 grid grid-cols-4 gap-2 opacity-15 pointer-events-none">
          {[...Array(16)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"/>)}
        </div>

        {/* Back to home */}
        <div className="relative z-10 px-10 pt-8">
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-semibold transition-colors group w-fit">
            <FiHome size={14} className="group-hover:-translate-x-0.5 transition-transform"/>
            Back to Home
          </Link>
        </div>

        {/* Centre content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-10 text-center gap-7">

          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-sm">
              <img src={nssLogo} alt="NSS Logo" className="w-16 h-16 object-contain"/>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Join NSS</h1>
              <p className="text-white/50 font-semibold text-xs mt-1 tracking-wider uppercase">National Service Scheme</p>
            </div>
          </div>

          {/* Why join cards */}
          <div className="w-full space-y-3">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Why Join NSS?</p>
            {WHY_NSS.map(w => {
              const IC = w.icon;
              return (
                <div key={w.title} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left">
                  <div className={`w-9 h-9 ${w.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <IC size={18} className={w.color}/>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{w.title}</p>
                    <p className="text-white/40 text-xs font-medium">{w.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Motto */}
          <div className="border-t border-white/10 pt-5 w-full">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">NSS Motto</p>
            <p className="text-xl font-black text-white">Not Me <span className="text-[#ef7041]">But You</span></p>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 px-10 pb-8">
          <p className="text-white/25 text-[10px] font-semibold text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-white/50 hover:text-white transition-colors font-bold">Sign In →</Link>
          </p>
        </div>
      </div>

      {/* ══════════ RIGHT PANEL ══════════ */}
      <div className="flex-1 bg-white overflow-y-auto">

        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#102167]">
              <img src={nssLogo} alt="NSS" className="w-full h-full object-contain"/>
            </div>
            <p className="text-sm font-extrabold text-[#102167]">NSS Portal</p>
          </div>
          <Link to="/" className="text-xs text-gray-400 font-semibold hover:text-[#102167] transition-colors flex items-center gap-1">
            <FiHome size={12}/> Home
          </Link>
        </div>

        <div className="max-w-xl mx-auto px-8 py-10">

          {/* Header */}
          <div className="mb-7">
            <div className="inline-flex items-center gap-2 bg-[#eef2ff] px-3 py-1.5 rounded-full mb-4">
              <div className="w-2 h-2 bg-[#102167] rounded-full"></div>
              <span className="text-[10px] font-extrabold text-[#102167] uppercase tracking-wider">Student Registration</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              Create <span className="text-[#ef7041]">Account</span>
            </h2>
            <p className="text-gray-400 font-medium text-sm mt-1.5">
              Register as a student volunteer — your request will be reviewed by the NSS Coordinator.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1 — Full Name + Roll Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                <div className="relative group">
                  <FiUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors pointer-events-none"/>
                  <input type="text" value={form.fullName} onChange={set('fullName')} placeholder="Samarth Giram" required
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:ring-4
                      ${errors.fullName ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-100 focus:border-[#102167] focus:ring-[#102167]/8'}`}/>
                </div>
                {errors.fullName && <p className="text-red-400 text-[10px] font-bold mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Roll Number</label>
                <div className="relative group">
                  <FiHash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors pointer-events-none"/>
                  <input type="text" value={form.rollNumber} onChange={set('rollNumber')} placeholder="2024CS101" required
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:ring-4
                      ${errors.rollNumber ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-100 focus:border-[#102167] focus:ring-[#102167]/8'}`}/>
                </div>
                {errors.rollNumber && <p className="text-red-400 text-[10px] font-bold mt-1">{errors.rollNumber}</p>}
              </div>
            </div>

            {/* Row 2 — Email */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Email Address</label>
              <div className="relative group">
                <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors pointer-events-none"/>
                <input type="email" value={form.email} onChange={set('email')} placeholder="you@college.edu" required
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:ring-4
                    ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-100 focus:border-[#102167] focus:ring-[#102167]/8'}`}/>
              </div>
              {errors.email && <p className="text-red-400 text-[10px] font-bold mt-1">{errors.email}</p>}
            </div>

            {/* Row 3 — Phone */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Phone Number</label>
              <div className="relative group">
                <FiPhone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors pointer-events-none"/>
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" required
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:ring-4
                    ${errors.phone ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-100 focus:border-[#102167] focus:ring-[#102167]/8'}`}/>
              </div>
              {errors.phone && <p className="text-red-400 text-[10px] font-bold mt-1">{errors.phone}</p>}
            </div>

            {/* Row 4 — Department */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Department</label>
              <div className="relative group">
                <FiBook size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors pointer-events-none"/>
                <input type="text" value={form.department} onChange={set('department')} placeholder="e.g., Computer Science" required
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:ring-4
                    ${errors.department ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-100 focus:border-[#102167] focus:ring-[#102167]/8'}`}/>
              </div>
              {errors.department && <p className="text-red-400 text-[10px] font-bold mt-1">{errors.department}</p>}
            </div>

            {/* Row 5 — Year + Group */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Year</label>
                <select value={form.year} onChange={set('year')}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/8 outline-none transition-all text-sm font-semibold text-gray-700">
                  {YEARS.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">NSS Group</label>
                <select value={form.group} onChange={set('group')}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/8 outline-none transition-all text-sm font-semibold text-gray-700">
                  {GROUPS.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>

            {/* Row 6 — Password + Confirm */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Password</label>
                <div className="relative group">
                  <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors pointer-events-none"/>
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Min 6 chars" required
                    className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:ring-4
                      ${errors.password ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-100 focus:border-[#102167] focus:ring-[#102167]/8'}`}/>
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#102167] transition-colors">
                    {showPass ? <FiEyeOff size={15}/> : <FiEye size={15}/>}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-[10px] font-bold mt-1">{errors.password}</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Confirm Password</label>
                <div className="relative group">
                  <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#102167] transition-colors pointer-events-none"/>
                  <input type={showConf ? 'text' : 'password'} value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="Repeat password" required
                    className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-semibold text-gray-700 placeholder:text-gray-300 focus:ring-4
                      ${errors.confirmPassword ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-gray-100 focus:border-[#102167] focus:ring-[#102167]/8'}`}/>
                  <button type="button" onClick={() => setShowConf(!showConf)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#102167] transition-colors">
                    {showConf ? <FiEyeOff size={15}/> : <FiEye size={15}/>}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-[10px] font-bold mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Password strength hint */}
            {form.password && (
              <div className="flex items-center gap-2">
                {[1,2,3,4].map(n => (
                  <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-300
                    ${form.password.length >= n * 2
                      ? n <= 1 ? 'bg-red-400' : n <= 2 ? 'bg-amber-400' : n <= 3 ? 'bg-blue-400' : 'bg-emerald-500'
                      : 'bg-gray-100'}`}/>
                ))}
                <span className="text-[10px] font-bold text-gray-400 w-16 text-right">
                  {form.password.length < 3 ? 'Weak' : form.password.length < 5 ? 'Fair' : form.password.length < 7 ? 'Good' : 'Strong'}
                </span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className={`w-full py-4 mt-2 rounded-xl text-sm font-extrabold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg group
                ${loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#102167] to-[#1a3490] hover:from-[#ef7041] hover:to-[#d4622e] hover:shadow-xl hover:-translate-y-0.5 shadow-[#102167]/30'}`}>
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Create Account
                  <FiArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300"/>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-gray-400 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#102167] font-bold hover:text-[#ef7041] transition-colors">Sign In</Link>
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-300 font-semibold">
              <FiShield size={10} className="text-[#102167]/30"/>
              Your information is secure & encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
