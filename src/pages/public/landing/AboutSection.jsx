import { HiOutlineCheckCircle } from 'react-icons/hi';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import nssLogo from '../../../assets/nss.png';

const objectives = [
  'Understand the community in which volunteers work',
  'Identify the needs and problems of the community',
  'Develop among themselves a sense of social and civic responsibility',
  'Utilize their knowledge in finding practical solutions',
  'Develop competence required for group living and sharing responsibilities',
  'Gain skills in mobilising community participation',
  'Acquire leadership qualities and democratic attitude',
  'Develop capacity to meet emergencies and natural disasters',
];

const AboutSection = () => {
  const [leftRef, leftVisible] = useScrollReveal();
  const [rightRef, rightVisible] = useScrollReveal();

  return (
    <section id="about-nss" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest">Who We Are</span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-2">About <span className="text-[#ef7041]">NSS</span></h2>
          <div className="w-14 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div ref={leftRef} className={`space-y-6 opacity-0 ${leftVisible ? 'reveal-fade-in-right' : ''}`}>
            <div className="flex items-start gap-5 p-6 bg-[#fdf8f4] rounded-2xl border border-[#f0e8de]">
              <img src={nssLogo} alt="NSS" className="w-16 h-16 object-contain flex-shrink-0" />
              <div>
                <h3 className="text-lg font-extrabold text-[#102167]">National Service Scheme</h3>
                <p className="text-sm text-[#ef7041] font-bold mt-0.5">"Not Me But You"</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Launched in 1969, NSS develops the personality of students through service, inspired by Mahatma Gandhi.
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-[15px]">
              The aim of NSS is to develop the personality of students through selfless community service. The motto <strong className="text-[#ef7041]">"Not Me But You"</strong> reflects the essence of democratic living and the importance of placing others before oneself.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#102167] text-white rounded-2xl p-5 shadow-md">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3 text-lg">👁️</div>
                <h4 className="font-extrabold text-sm mb-2">Our Vision</h4>
                <p className="text-xs text-white/75 leading-relaxed">A society of aware, responsible and empowered citizens contributing to national development.</p>
              </div>
              <div className="bg-[#ef7041] text-white rounded-2xl p-5 shadow-md">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-3 text-lg">🎯</div>
                <h4 className="font-extrabold text-sm mb-2">Our Mission</h4>
                <p className="text-xs text-white/75 leading-relaxed">Develop students' personality through community service and create future leaders for India.</p>
              </div>
            </div>
          </div>

          <div ref={rightRef} className={`opacity-0 ${rightVisible ? 'reveal-fade-in-left' : ''}`}>
            <h3 className="text-xl font-extrabold text-[#102167] mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#ef7041] rounded-full"></span>
              Objectives of NSS
            </h3>
            <div className="space-y-2.5">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-[#fdf8f4] rounded-xl border border-transparent hover:border-[#e8e4f4] hover:bg-[#f5f2fc] transition-all duration-200">
                  <HiOutlineCheckCircle size={17} className="text-[#ef7041] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-medium leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
