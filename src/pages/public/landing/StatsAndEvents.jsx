import { useEffect, useRef, useState } from 'react';
import { HiOutlineUserGroup, HiOutlineCalendar, HiOutlineClock, HiOutlineGlobe } from 'react-icons/hi';

const stats = [
  { icon: HiOutlineUserGroup, value: 2500, suffix: '+', label: 'Total Volunteers', color: 'text-[#102167]', bg: 'bg-[#eef2ff]' },
  { icon: HiOutlineCalendar, value: 120, suffix: '+', label: 'Events Conducted', color: 'text-[#ef7041]', bg: 'bg-orange-50' },
  { icon: HiOutlineClock, value: 15000, suffix: '+', label: 'Volunteer Hours', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: HiOutlineGlobe, value: 50, suffix: '+', label: 'Communities Served', color: 'text-violet-600', bg: 'bg-violet-50' },
];

const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatCard = ({ icon: Icon, value, suffix, label, color, bg }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const count = useCountUp(value, 1800, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={28} className={color} />
      </div>
      <p className={`text-4xl font-black ${color}`}>{count.toLocaleString()}{suffix}</p>
      <p className="text-sm text-gray-500 font-semibold mt-2">{label}</p>
    </div>
  );
};

const events = [
  { day: '28', month: 'JUN', title: 'Tree Plantation Drive', venue: 'Green Park, Pune', time: '09:00 AM', tag: 'Environment' },
  { day: '05', month: 'JUL', title: 'Blood Donation Camp', venue: 'Civil Hospital, Pune', time: '10:00 AM', tag: 'Health' },
  { day: '12', month: 'JUL', title: 'Swachhta Abhiyan', venue: 'Pune Municipal Area', time: '08:00 AM', tag: 'Sanitation' },
];

const StatsAndEvents = () => (
  <>
    {/* Stats */}
    <section className="py-16 bg-gradient-to-b from-white to-[#f5f7ff]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest">Our Impact</span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-2">NSS in <span className="text-[#ef7041]">Numbers</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      </div>
    </section>

    {/* Upcoming Events */}
    <section id="events" className="py-20 bg-[#f5f7ff]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest">What's Happening</span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-2">Upcoming <span className="text-[#ef7041]">Events</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((ev, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#102167] to-[#3b4da8] p-5 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-black text-white leading-none">{ev.day}</p>
                  <p className="text-xs font-bold text-[#ef7041] uppercase tracking-wider">{ev.month}</p>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">{ev.tag}</span>
                  <h3 className="text-white font-extrabold mt-1.5 text-sm leading-tight">{ev.title}</h3>
                </div>
              </div>
              <div className="p-5 space-y-2">
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#ef7041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {ev.venue}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#102167]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {ev.time}
                </p>
                <button className="w-full mt-3 py-2.5 bg-[#eef2ff] text-[#102167] font-bold text-sm rounded-xl hover:bg-[#102167] hover:text-white transition-all duration-300 group-hover:bg-[#102167] group-hover:text-white">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default StatsAndEvents;
