import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineAcademicCap, HiOutlineIdentification, HiOutlineCheckCircle } from 'react-icons/hi';
import { BsShieldCheck } from 'react-icons/bs';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

const badges = [
  { label: 'Tree Planter', icon: '🌱', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { label: 'Blood Hero',   icon: '🩸', color: 'bg-red-50    text-red-600    border-red-200'    },
  { label: 'Leader',       icon: '🏅', color: 'bg-amber-50  text-amber-700  border-amber-200'  },
  { label: 'Top Volunteer',icon: '⭐', color: 'bg-violet-50 text-violet-700 border-violet-200' },
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

const StudentProfile = () => {
  const { auth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [bio, setBio]     = useState('Passionate NSS volunteer committed to community service and nation building. Member since 2023.');
  const [tempPhone, setTempPhone] = useState(phone);
  const [tempBio, setTempBio]     = useState(bio);

  const handleSave = () => { setPhone(tempPhone); setBio(tempBio); setEditing(false); };
  const handleCancel = () => { setTempPhone(phone); setTempBio(bio); setEditing(false); };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">My Profile</h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">Manage your NSS volunteer profile</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — Avatar + Stats */}
        <div className="space-y-5">
          {/* Avatar Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#102167] to-[#3b4da8] flex items-center justify-center text-white text-4xl font-black shadow-xl ring-4 ring-[#eef2ff]">
                {auth?.name?.[0]?.toUpperCase() || 'S'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <HiOutlineCheckCircle size={14} className="text-white" />
              </div>
            </div>
            <h2 className="text-lg font-extrabold text-gray-800">{auth?.name || 'Student'}</h2>
            <p className="text-xs text-[#ef7041] font-bold mt-1 capitalize">NSS Volunteer • {auth?.group || 'Group A'}</p>
            <p className="text-xs text-gray-400 font-medium mt-3 leading-relaxed">{bio}</p>
            <button
              onClick={() => setEditing(!editing)}
              className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-[#102167] text-white text-xs font-bold rounded-xl hover:bg-[#ef7041] transition-all duration-300 shadow-md">
              <FiEdit2 size={12}/> Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-extrabold text-gray-800 text-sm">My Stats</h3>
            {[
              { label: 'Events Attended', value: '8', color: 'text-[#102167]', bar: 67, barColor: 'bg-[#102167]' },
              { label: 'Attendance Rate', value: '92%', color: 'text-emerald-600', bar: 92, barColor: 'bg-emerald-500' },
              { label: 'NSS Points',      value: '360', color: 'text-violet-600', bar: 72, barColor: 'bg-violet-500' },
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
            ))}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-extrabold text-gray-800 text-sm mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {badges.map(b => (
                <div key={b.label} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[11px] font-bold ${b.color}`}>
                  <span>{b.icon}</span>{b.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Info + Edit */}
        <div className="lg:col-span-2 space-y-5">
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-gray-800">Personal Information</h3>
              {!editing && (
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#102167] hover:text-[#ef7041] transition-colors">
                  <FiEdit2 size={13}/> Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                    <input disabled value={auth?.name} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-semibold text-gray-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Phone</label>
                    <input value={tempPhone} onChange={e => setTempPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-semibold focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Bio</label>
                  <textarea rows={3} value={tempBio} onChange={e => setTempBio(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-medium focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all resize-none" />
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#102167] text-white text-sm font-bold rounded-xl hover:bg-[#1a2f85] transition-all shadow-md">
                    <FiSave size={14}/> Save Changes
                  </button>
                  <button onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-200 transition-all">
                    <FiX size={14}/> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <InfoRow icon={HiOutlineUser}            label="Full Name"    value={auth?.name || 'Student'} />
                <InfoRow icon={HiOutlineMail}            label="Email"        value="student@nss.com" />
                <InfoRow icon={HiOutlinePhone}           label="Phone"        value={phone} />
                <InfoRow icon={HiOutlineAcademicCap}     label="Group"        value={auth?.group || 'Group A'} />
                <InfoRow icon={HiOutlineIdentification}  label="Role"         value="NSS Volunteer" />
                <InfoRow icon={BsShieldCheck}            label="Member Since" value="June 2023" />
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-extrabold text-gray-800 mb-5">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { icon: '✅', text: 'Marked present for Tree Plantation Drive', time: '2 days ago',   color: 'bg-emerald-50' },
                { icon: '⭐', text: 'Earned 50 NSS Points',                    time: '2 days ago',   color: 'bg-amber-50'   },
                { icon: '📝', text: 'Registered for Blood Donation Camp',       time: '1 week ago',   color: 'bg-blue-50'    },
                { icon: '🏅', text: 'Received "Tree Planter" badge',            time: '2 weeks ago',  color: 'bg-violet-50'  },
              ].map((a, i) => (
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

export default StudentProfile;
