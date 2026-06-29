import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchStudentAttendanceSummary, fetchStudentAttendance } from '../../services/attendanceService';
import { fetchEvents } from '../../services/eventsService';
import { fetchAllUsers, updateOwnProfile } from '../../services/usersService';
import { parseProfile, serializeDepartment } from '../../utils/avatarParser';
import {
  HiOutlineUser, HiOutlineMail, HiOutlinePhone,
  HiOutlineAcademicCap, HiOutlineIdentification, HiOutlineCheckCircle,
  HiOutlineCalendar, HiOutlineClipboardCheck, HiOutlineUserGroup, HiOutlineAnnotation
} from 'react-icons/hi';
import { BsShieldCheck } from 'react-icons/bs';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

const AVATAR_THEMES = [
  { name: 'Ocean',   value: 'from-[#102167] to-[#3b4da8]' },
  { name: 'Sunset',  value: 'from-[#ef7041] to-[#f48b62]' },
  { name: 'Forest',  value: 'from-emerald-500 to-teal-600' },
  { name: 'Galaxy',  value: 'from-violet-500 to-purple-600' },
];

const AVATAR_ICONS = [
  { char: '👨‍🎓', label: 'Male Student' },
  { char: '👩‍🎓', label: 'Female Student' },
  { char: '👨‍🏫', label: 'Male Teacher' },
  { char: '👩‍🏫', label: 'Female Teacher' },
  { char: '🚀', label: 'Rocket' },
  { char: '🌟', label: 'Star' },
  { char: '🦁', label: 'Lion' },
  { char: '🦊', label: 'Fox' },
  { char: '🐼', label: 'Panda' },
  { char: '⚡', label: 'Energy' },
  { char: '🍀', label: 'Clover' },
  { char: '🔥', label: 'Fire' }
];

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
    <div className="w-9 h-9 bg-[#eef2ff] rounded-lg flex items-center justify-center flex-shrink-0">
      <Icon size={17} className="text-[#102167]" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

const Profile = () => {
  const { auth, updateAuth } = useAuth();
  const [editing, setEditing] = useState(false);
  
  // Custom theme/avatar selection
  const [avatarTheme, setAvatarTheme] = useState(() => {
    const parsed = parseProfile(auth);
    return parsed?.avatar_theme || localStorage.getItem(`avatar_theme_${auth?.id}`) || AVATAR_THEMES[0].value;
  });

  const [avatarIcon, setAvatarIcon] = useState(() => {
    const parsed = parseProfile(auth);
    return parsed?.avatar_icon || localStorage.getItem(`avatar_icon_${auth?.id}`) || '';
  });

  const [avatarImg, setAvatarImg] = useState(() => {
    const parsed = parseProfile(auth);
    return parsed?.avatar_img || localStorage.getItem(`avatar_img_${auth?.id}`) || '';
  });

  // State fields
  const [name, setName] = useState(auth?.name || '');
  const [phone, setPhone] = useState(auth?.phone || localStorage.getItem(`phone_${auth?.id}`) || '+91 98765 43210');
  const [bio, setBio] = useState(localStorage.getItem(`bio_${auth?.id}`) || 'NSS member committed to community service and nation building.');
  const [department, setDepartment] = useState(() => {
    const parsed = parseProfile(auth);
    return parsed?.department || localStorage.getItem(`dept_${auth?.id}`) || 'Computer Science';
  });

  const [tempName, setTempName] = useState(name);
  const [tempPhone, setTempPhone] = useState(phone);
  const [tempBio, setTempBio] = useState(bio);
  const [tempDept, setTempDept] = useState(department);

  // Statistics depending on user role
  const [studentStats, setStudentStats] = useState({ present: 0, pct: 0 });
  const [adminStats, setAdminStats] = useState({ students: 0, events: 0, approvals: 0 });
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    if (auth?.id) {
      const parsed = parseProfile(auth);
      setName(auth.name || '');
      setPhone(auth.phone || localStorage.getItem(`phone_${auth.id}`) || '+91 98765 43210');
      setDepartment(parsed?.department || localStorage.getItem(`dept_${auth.id}`) || 'Computer Science');
      setAvatarTheme(parsed?.avatar_theme || localStorage.getItem(`avatar_theme_${auth.id}`) || AVATAR_THEMES[0].value);
      setAvatarIcon(parsed?.avatar_icon || localStorage.getItem(`avatar_icon_${auth.id}`) || '');
      setAvatarImg(parsed?.avatar_img || localStorage.getItem(`avatar_img_${auth.id}`) || '');
      
      setTempName(auth.name || '');
      setTempPhone(auth.phone || localStorage.getItem(`phone_${auth.id}`) || '+91 98765 43210');
      setTempDept(parsed?.department || localStorage.getItem(`dept_${auth.id}`) || 'Computer Science');

      if (auth.role === 'student') {
        // Load student stats
        fetchStudentAttendanceSummary(auth.id)
          .then(setStudentStats)
          .catch(console.error);

        fetchStudentAttendance(auth.id)
          .then(data => {
            const formatted = data.slice(0, 4).map(a => ({
              icon: a.status === 'Present' ? '✅' : '❌',
              text: `Marked ${a.status.toLowerCase()} for ${a.events?.title || 'an event'}`,
              time: new Date(a.created_at).toLocaleDateString(),
              color: a.status === 'Present' ? 'bg-emerald-50' : 'bg-red-50'
            }));
            if (formatted.length === 0) {
              formatted.push({ icon: '👋', text: 'Welcome to NSS! No recent activity.', time: 'Recently', color: 'bg-[#eef2ff]' });
            }
            setActivity(formatted);
          })
          .catch(console.error);
      } else {
        // Load admin / coordinator stats
        const loadDashboardStats = async () => {
          try {
            const users = await fetchAllUsers();
            const events = await fetchEvents();
            
            const stdCount = users.filter(u => u.role === 'student').length;
            const appCount = users.filter(u => u.role === 'student' && u.status === 'pending').length;

            setAdminStats({
              students: stdCount,
              events: events.length,
              approvals: appCount
            });

            // Set activity log
            const recent = events.slice(0, 4).map(e => ({
              icon: '📅',
              text: `Event organized: ${e.title}`,
              time: new Date(e.date).toLocaleDateString(),
              color: 'bg-indigo-50'
            }));
            setActivity(recent.length ? recent : [{ icon: '🌟', text: 'NSS Dashboard initialized.', time: 'Today', color: 'bg-emerald-50' }]);
          } catch (e) {
            console.error(e);
          }
        };
        loadDashboardStats();
      }
    }
  }, [auth]);

  const saveAvatarData = async (updates) => {
    if (!auth?.id) return;
    
    const parsed = parseProfile(auth);
    const newTheme = updates.avatar_theme !== undefined ? updates.avatar_theme : avatarTheme;
    const newIcon = updates.avatar_icon !== undefined ? updates.avatar_icon : avatarIcon;
    const newImg = updates.avatar_img !== undefined ? updates.avatar_img : avatarImg;
    
    // Save to local storage for local backup
    localStorage.setItem(`avatar_theme_${auth.id}`, newTheme);
    localStorage.setItem(`avatar_icon_${auth.id}`, newIcon);
    localStorage.setItem(`avatar_img_${auth.id}`, newImg);
    
    // Update local state
    setAvatarTheme(newTheme);
    setAvatarIcon(newIcon);
    setAvatarImg(newImg);
    
    // Dispatch layout sync event
    window.dispatchEvent(new Event('avatar-theme-updated'));
    
    // Save serialized field to Supabase department column!
    try {
      const serializedDept = serializeDepartment(department, newTheme, newIcon, newImg);
      await updateOwnProfile(auth.id, { department: serializedDept });
      updateAuth({ department: serializedDept });
    } catch (err) {
      console.warn("Failed to save avatar details to Supabase department column:", err);
    }
  };

  const handleSave = async () => {
    try {
      setName(tempName);
      setPhone(tempPhone);
      setBio(tempBio);
      setDepartment(tempDept);
      
      // Update database profile row
      if (auth?.id) {
        const serializedDept = serializeDepartment(tempDept, avatarTheme, avatarIcon, avatarImg);
        await updateOwnProfile(auth.id, {
          name: tempName,
          phone: tempPhone,
          department: serializedDept
        });
        
        // Update global auth context
        updateAuth({
          name: tempName,
          phone: tempPhone,
          department: serializedDept
        });
      }

      // Save to local storage for persistence
      localStorage.setItem(`phone_${auth?.id}`, tempPhone);
      localStorage.setItem(`bio_${auth?.id}`, tempBio);
      localStorage.setItem(`dept_${auth?.id}`, tempDept);
      
      setEditing(false);
    } catch (err) {
      alert('Failed to save profile changes: ' + err.message);
    }
  };

  const handleCancel = () => {
    setTempName(name);
    setTempPhone(phone);
    setTempBio(bio);
    setTempDept(department);
    setEditing(false);
  };

  const changeTheme = (themeClass) => {
    saveAvatarData({ avatar_theme: themeClass });
  };

  const selectIcon = (char) => {
    saveAvatarData({ avatar_icon: char });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 150;
        canvas.height = 150;
        
        // Square center crop logic
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 150, 150);
        
        const base64 = canvas.toDataURL('image/jpeg', 0.85);
        saveAvatarData({ avatar_img: base64 });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    saveAvatarData({ avatar_img: '' });
  };

  const getRoleLabel = () => {
    if (auth?.role === 'admin') return 'NSS Program Officer';
    if (auth?.role === 'professor') return 'NSS Faculty Coordinator';
    return `NSS Volunteer • ${auth?.group || 'Group A'}`;
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">Manage your details, profile theme and credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card — Avatar and Themes */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatarTheme} flex items-center justify-center text-white text-4xl font-black shadow-xl ring-4 ring-[#eef2ff] overflow-hidden`}>
                {avatarImg ? (
                  <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  avatarIcon || name?.[0]?.toUpperCase() || auth?.name?.[0]?.toUpperCase() || 'U'
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <HiOutlineCheckCircle size={14} className="text-white" />
              </div>
            </div>
            
            {/* Upload File buttons */}
            <div className="flex gap-2 justify-center mb-3">
              <label className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-500 text-[10px] font-bold rounded-lg hover:bg-gray-100 hover:text-[#102167] transition-all cursor-pointer">
                📷 Upload Photo
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {avatarImg && (
                <button
                  onClick={handleRemoveImage}
                  className="px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-all border-none bg-transparent cursor-pointer"
                >
                  🗑️ Remove
                </button>
              )}
            </div>
            <h2 className="text-lg font-extrabold text-gray-800">{name || auth?.name || 'User'}</h2>
            <p className="text-xs text-[#ef7041] font-bold mt-1 uppercase tracking-wider">{getRoleLabel()}</p>
            <p className="text-xs text-gray-400 font-medium mt-3 leading-relaxed">{bio}</p>
            
            {/* Theme Selector */}
            <div className="mt-5 w-full border-t border-gray-50 pt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Avatar Theme</p>
              <div className="flex gap-2 justify-center">
                {AVATAR_THEMES.map(theme => (
                  <button
                    key={theme.name}
                    title={theme.name}
                    onClick={() => changeTheme(theme.value)}
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.value} border-2 hover:scale-110 transition-transform ${avatarTheme === theme.value ? 'border-[#102167] scale-105' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>

            {/* Character Selector */}
            <div className="mt-4 w-full border-t border-gray-50 pt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Avatar Character</p>
              <div className="grid grid-cols-6 gap-2 max-w-[200px] mx-auto">
                <button
                  onClick={() => selectIcon('')}
                  className={`w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-black border-2 hover:scale-105 transition-all border-none cursor-pointer ${!avatarIcon ? 'border-[#102167] bg-indigo-100 ring-2 ring-indigo-300' : 'border-transparent'}`}
                  title="Default Initials"
                >
                  Aa
                </button>
                {AVATAR_ICONS.map(icon => (
                  <button
                    key={icon.char}
                    title={icon.label}
                    onClick={() => selectIcon(icon.char)}
                    className={`w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-lg border-2 hover:scale-105 transition-all border-none cursor-pointer ${avatarIcon === icon.char ? 'border-[#102167] bg-indigo-100 ring-2 ring-indigo-300' : 'border-transparent'}`}
                  >
                    {icon.char}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setEditing(!editing)}
              className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-[#102167] text-white text-xs font-bold rounded-xl hover:bg-[#ef7041] transition-all duration-300 shadow-md">
              <FiEdit2 size={12}/> Edit Profile
            </button>
          </div>

          {/* Stats Panel */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-extrabold text-gray-800 text-sm">Dashboard Overview</h3>
            {auth?.role === 'student' ? (
              // Student Stats
              [
                { label: 'Events Attended', value: studentStats.present, color: 'text-[#102167]', bar: studentStats.pct || 0, barColor: 'bg-[#102167]' },
                { label: 'Attendance Rate', value: `${studentStats.pct || 0}%`, color: 'text-emerald-600', bar: studentStats.pct || 0, barColor: 'bg-emerald-500' },
                { label: 'NSS Points',      value: studentStats.present * 10, color: 'text-violet-600', bar: Math.min((studentStats.present * 10) / 300 * 100, 100), barColor: 'bg-violet-500' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-500">{s.label}</span>
                    <span className={`text-xs font-extrabold ${s.color}`}>{s.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.barColor} rounded-full transition-all duration-700`} style={{ width: `${s.bar}%` }}></div>
                  </div>
                </div>
              ))
            ) : (
              // Coordinator & Admin Stats
              [
                { label: 'Total Events Conducted', value: adminStats.events, color: 'text-[#102167]', bar: 100, barColor: 'bg-[#102167]' },
                { label: 'Total Students Registered', value: adminStats.students, color: 'text-emerald-600', bar: 100, barColor: 'bg-emerald-500' },
                { label: 'Pending Approvals', value: adminStats.approvals, color: 'text-[#ef7041]', bar: adminStats.approvals ? 50 : 0, barColor: 'bg-[#ef7041]' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-500">{s.label}</span>
                    <span className={`text-xs font-extrabold ${s.color}`}>{s.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.barColor} rounded-full transition-all duration-700`} style={{ width: `${s.bar}%` }}></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Card — Edit Fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-gray-800">Account Information</h3>
              {!editing && (
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#102167] hover:text-[#ef7041] transition-colors border-none bg-transparent">
                  <FiEdit2 size={13}/> Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                    <input value={tempName} onChange={e => setTempName(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Phone</label>
                    <input value={tempPhone} onChange={e => setTempPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Department / Branch</label>
                    <input value={tempDept} onChange={e => setTempDept(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Role Status</label>
                    <input disabled value={auth?.role?.toUpperCase()}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-semibold text-gray-400 cursor-not-allowed" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Bio</label>
                  <textarea rows={3} value={tempBio} onChange={e => setTempBio(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-medium focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all resize-none" />
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#1a2f85] transition-all shadow-md border-none">
                    <FiSave size={14}/> Save Changes
                  </button>
                  <button onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-200 transition-all border-none">
                    <FiX size={14}/> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoRow icon={HiOutlineUser}            label="Full Name"    value={name || auth?.name || 'User'} />
                <InfoRow icon={HiOutlineMail}            label="Email"        value={auth?.email || 'user@nss.com'} />
                <InfoRow icon={HiOutlinePhone}           label="Phone"        value={phone} />
                <InfoRow icon={HiOutlineAcademicCap}     label="Department"   value={department} />
                <InfoRow icon={HiOutlineIdentification}  label="Role"         value={auth?.role?.toUpperCase()} />
                <InfoRow icon={BsShieldCheck}            label="Member Since" value={auth?.created_at ? new Date(auth.created_at).getFullYear() : '2023'} />
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-extrabold text-gray-800 mb-5">Recent Activity</h3>
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-9 h-9 ${a.color} rounded-xl flex items-center justify-center text-sm flex-shrink-0`}>{a.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700">{a.text}</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
