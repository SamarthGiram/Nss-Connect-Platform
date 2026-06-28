import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiAward, FiHeart, FiFlag } from 'react-icons/fi';
import volunteerImg from '../../../assets/nss-volunteers.png';

const CountUp = ({ end, duration = 1500, suffix = '+' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const target = parseInt(end, 10);
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const HeroSection = () => {
  const stats = [
    { value: 120, suffix: '+', label: 'Events' },
    { value: 2500, suffix: '+', label: 'Volunteers' },
    { value: 50, suffix: '+', label: 'Communities' },
    { value: 10, suffix: '+', label: 'Years of Service' },
  ];

  return (
    <section id="home" className="bg-[#fdf8f4] min-h-screen pt-[60px] flex flex-col justify-between overflow-hidden relative">
      {/* Decorative Background Elements */}
      {/* Soft gradient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ece9f8] rounded-full opacity-50 blur-3xl translate-x-20 -translate-y-10 pointer-events-none z-0"></div>
      <div className="absolute bottom-20 left-0 w-[450px] h-[450px] bg-[#fbf5f0] rounded-full opacity-60 blur-3xl -translate-x-10 pointer-events-none z-0"></div>
      
      {/* Circular rings decoration */}
      <div className="absolute right-[-150px] top-[5%] w-[800px] h-[800px] rounded-full border border-gray-100/80 pointer-events-none z-0"></div>
      <div className="absolute right-[-50px] top-[12%] w-[650px] h-[650px] rounded-full border border-dashed border-[#102167]/5 pointer-events-none z-0"></div>

      {/* Denser Dot Grid Patterns to fill space */}
      <div className="absolute top-[20%] left-[2%] w-44 h-44 opacity-[0.07] bg-[radial-gradient(#102167_1.8px,transparent_1.8px)] [background-size:16px_16px] hidden xl:block z-0"></div>
      <div className="absolute bottom-[22%] right-[2%] w-48 h-48 opacity-30 bg-[radial-gradient(#ef7041_1.8px,transparent_1.8px)] [background-size:16px_16px] hidden xl:block z-0"></div>
      <div className="absolute top-[42%] right-[45%] w-24 h-48 opacity-20 bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:14px_14px] hidden lg:block z-0"></div>

      <div className="max-w-7xl mx-auto px-8 w-full flex-grow flex items-center z-10 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 space-y-10 text-center lg:text-left">
            {/* Accent Pill */}
            <div className="inline-flex items-center gap-2 bg-[#ef7041]/10 text-[#ef7041] px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest border border-[#ef7041]/20 shadow-sm opacity-0 reveal-fade-in-up">
              🚀 National Service Scheme Connect
            </div>

            {/* Main Title */}
            <h1 className="text-[56px] sm:text-[76px] lg:text-[88px] font-black leading-[1.04] tracking-tight opacity-0 reveal-fade-in-up delay-100">
              <span className="block text-[#102167]">Not Me</span>
              <span className="block text-[#ef7041] mt-1.5">But You</span>
            </h1>

            {/* Subtitle with Left Accent Bar */}
            <div className="flex gap-4 items-stretch max-w-lg mx-auto lg:mx-0 opacity-0 reveal-fade-in-up delay-200">
              <div className="w-1.5 bg-gradient-to-b from-[#102167] to-[#ef7041] rounded-full hidden sm:block"></div>
              <p className="text-base sm:text-[19px] text-gray-500 font-medium leading-relaxed text-center sm:text-left py-0.5">
                Together we can create a better society and a stronger nation.
              </p>
            </div>

            {/* Explore More CTA Button */}
            <div className="pt-2 opacity-0 reveal-fade-in-up delay-300">
              <Link to="/login"
                className="inline-flex items-center gap-2 bg-[#102167] text-white font-bold px-10 py-5 rounded-full text-base sm:text-lg hover:bg-[#1a2f85] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group border-none">
                Explore More
                <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN: CIRCULAR & DYNAMIC GRAPHIC (Enlarged Layout) ── */}
          <div className="lg:col-span-7 flex items-center justify-center relative w-full h-[480px] sm:h-[620px] lg:h-[680px] opacity-0 reveal-scale-up delay-200">
            
            {/* Multiple Background Accent Rotating Rings */}
            <div className="absolute w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] lg:w-[620px] lg:h-[620px] rounded-full border border-gray-200/50 pointer-events-none z-0"></div>
            <div className="absolute w-[410px] h-[410px] sm:w-[540px] sm:h-[540px] lg:w-[580px] lg:h-[580px] rounded-full border border-dashed border-[#102167]/10 animate-[spin_80s_linear_infinite_reverse] pointer-events-none z-0"></div>
            <div className="absolute w-[350px] h-[350px] sm:w-[470px] sm:h-[470px] lg:w-[510px] lg:h-[510px] rounded-full border border-transparent border-t-[#ef7041]/20 border-r-[#ef7041]/20 animate-[spin_40s_linear_infinite] pointer-events-none z-0 rotate-[45deg]"></div>

            {/* Pulsing particles in empty spots */}
            <div className="absolute top-[12%] right-[18%] w-4 h-4 bg-[#ef7041] rounded-full opacity-70 animate-pulse z-10"></div>
            <div className="absolute top-[24%] left-[12%] w-3 h-3 bg-[#102167] rounded-full opacity-60 animate-bounce z-10"></div>
            <div className="absolute bottom-[20%] right-[12%] w-3 h-3 bg-[#ef7041] rounded-full opacity-80 animate-pulse z-10"></div>
            <div className="absolute bottom-[14%] left-[16%] w-4 h-4 bg-[#102167] rounded-full opacity-50 animate-bounce z-10"></div>

            {/* Rotating Concentric Circle Ring containing the floating badges - Enlarged for Distance */}
            <div className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] rounded-full border-[3px] border-t-[#ef7041] border-b-[#ef7041] border-l-[#102167] border-r-[#102167] opacity-90 animate-[spin_55s_linear_infinite] z-0 flex items-center justify-center">
              
              {/* 1. Community Service - Top-Left (Orange) */}
              <div className="absolute top-[6%] left-[6%] w-20 h-20 sm:w-24 sm:h-24 animate-[spin_55s_linear_infinite_reverse]">
                <div className="w-full h-full rounded-full bg-[#ef7041] hover:bg-[#d65f32] text-white flex flex-col items-center justify-center p-2 text-center shadow-[0_8px_30px_rgba(239,112,65,0.3)] hover:scale-110 transition-transform duration-300 cursor-pointer group/badge">
                  <FiUsers className="text-xl sm:text-2xl mb-1 group-hover/badge:scale-110 transition-transform duration-300" />
                  <span className="text-[8px] sm:text-[10px] font-bold leading-tight uppercase tracking-wider">
                    Community<br/>Service
                  </span>
                </div>
              </div>

              {/* 2. Leadership - Top-Right (Dark Blue) */}
              <div className="absolute top-[6%] right-[6%] w-20 h-20 sm:w-24 sm:h-24 animate-[spin_55s_linear_infinite_reverse]">
                <div className="w-full h-full rounded-full bg-[#102167] hover:bg-[#1a2f85] text-white flex flex-col items-center justify-center p-2 text-center shadow-[0_8px_30px_rgba(16,33,103,0.25)] hover:scale-110 transition-transform duration-300 cursor-pointer group/badge">
                  <FiAward className="text-xl sm:text-2xl mb-1 group-hover/badge:scale-110 transition-transform duration-300" />
                  <span className="text-[8px] sm:text-[10px] font-bold leading-tight uppercase tracking-wider">
                    Leadership
                  </span>
                </div>
              </div>

              {/* 3. Social Responsibility - Bottom-Left (Dark Blue) */}
              <div className="absolute bottom-[6%] left-[6%] w-20 h-20 sm:w-24 sm:h-24 animate-[spin_55s_linear_infinite_reverse]">
                <div className="w-full h-full rounded-full bg-[#102167] hover:bg-[#1a2f85] text-white flex flex-col items-center justify-center p-2 text-center shadow-[0_8px_30px_rgba(16,33,103,0.25)] hover:scale-110 transition-transform duration-300 cursor-pointer group/badge">
                  <FiHeart className="text-xl sm:text-2xl mb-1 group-hover/badge:scale-110 transition-transform duration-300" />
                  <span className="text-[8px] sm:text-[10px] font-bold leading-tight uppercase tracking-wider">
                    Social<br/>Responsibility
                  </span>
                </div>
              </div>

              {/* 4. Nation Building - Bottom-Right (Orange) */}
              <div className="absolute bottom-[6%] right-[6%] w-20 h-20 sm:w-24 sm:h-24 animate-[spin_55s_linear_infinite_reverse]">
                <div className="w-full h-full rounded-full bg-[#ef7041] hover:bg-[#d65f32] text-white flex flex-col items-center justify-center p-2 text-center shadow-[0_8px_30px_rgba(239,112,65,0.3)] hover:scale-110 transition-transform duration-300 cursor-pointer group/badge">
                  <FiFlag className="text-xl sm:text-2xl mb-1 group-hover/badge:scale-110 transition-transform duration-300" />
                  <span className="text-[8px] sm:text-[10px] font-bold leading-tight uppercase tracking-wider">
                    Nation<br/>Building
                  </span>
                </div>
              </div>

            </div>

            {/* Center Circular Photo Container - Enlarged visually to fill graphic space */}
            <div className="relative w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border-[10px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.14)] z-10">
              <img 
                src={volunteerImg} 
                alt="NSS Volunteers" 
                className="w-full h-full object-cover object-center scale-[1.35] hover:scale-[1.45] transition-transform duration-700 ease-out" 
              />
            </div>

          </div>

        </div>
      </div>

      {/* ── Bottom Floating Stats Bar - Large & Padded ── */}
      <div className="px-8 pb-8 z-10 w-full">
        <div className="max-w-6xl mx-auto bg-white rounded-[32px] shadow-[0_16px_48px_rgba(0,0,0,0.05)] border border-gray-100/90 p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-x divide-gray-100 text-center">
            
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center px-4">
                <span className="text-4xl sm:text-5xl font-black text-[#102167] tracking-tight">
                  <CountUp end={s.value} suffix={s.suffix} />
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-400 mt-2.5 uppercase tracking-[0.15em] leading-none">
                  {s.label}
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
