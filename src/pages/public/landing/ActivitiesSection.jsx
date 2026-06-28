import { FiHeart, FiBookOpen, FiShield, FiSun } from 'react-icons/fi';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

const coreActivities = [
  {
    icon: <FiSun className="text-3xl" />,
    title: 'Environmental Protection',
    description: 'Spearheading afforestation drives, garbage collection, plastic-free campaigns, and biodiversity preservation in adopted villages.',
    stats: '5,000+ Trees Planted',
    color: 'from-emerald-50 to-teal-50 text-emerald-600 border-emerald-100',
    iconBg: 'bg-emerald-100/80 text-emerald-600',
  },
  {
    icon: <FiHeart className="text-3xl" />,
    title: 'Health & Sanitation',
    description: 'Organizing blood donation camps, conducting primary health check-ups, and leading sanitation and hygiene workshops (Swachhta Abhiyan).',
    stats: '1,200+ Pints Donated',
    color: 'from-rose-50 to-orange-50 text-rose-600 border-rose-100',
    iconBg: 'bg-rose-100/80 text-rose-600',
  },
  {
    icon: <FiBookOpen className="text-3xl" />,
    title: 'Education & Literacy',
    description: 'Providing coaching for underprivileged children, distributing books, and running basic digital literacy workshops for rural adults.',
    stats: '300+ Students Taught',
    color: 'from-amber-50 to-orange-50 text-amber-600 border-amber-100',
    iconBg: 'bg-amber-100/80 text-amber-600',
  },
  {
    icon: <FiShield className="text-3xl" />,
    title: 'Disaster Relief & Civic Duty',
    description: 'Mobilizing emergency relief funds, supplying essential goods during natural disasters, and conducting general civic duty workshops.',
    stats: '20+ Relief Drives',
    color: 'from-blue-50 to-indigo-50 text-blue-600 border-blue-100',
    iconBg: 'bg-blue-100/80 text-blue-600',
  },
];

const ActivitiesSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="activities" className="py-24 bg-[#fdf8f4] relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#ece9f8] rounded-full opacity-40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#fdf2e9] rounded-full opacity-50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest bg-[#ef7041]/10 px-4 py-1.5 rounded-full border border-[#ef7041]/20">
            What We Do
          </span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-4">
            Core Service <span className="text-[#ef7041]">Initiatives</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
          <p className="text-gray-500 text-sm mt-3 font-medium max-w-xl mx-auto">
            Developing student personalities and empowering communities through diverse social welfare activities
          </p>
        </div>

        {/* Grid Cards */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreActivities.map((act, idx) => {
            const delayClass = idx === 0 ? 'delay-75' : idx === 1 ? 'delay-150' : idx === 2 ? 'delay-300' : 'delay-400';
            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between opacity-0 ${isVisible ? `reveal-fade-in-up ${delayClass}` : ''}`}
              >
                <div>
                  {/* Icon wrapper */}
                  <div className={`w-16 h-16 rounded-2xl ${act.iconBg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {act.icon}
                  </div>

                  <h3 className="text-xl font-bold text-[#102167] group-hover:text-[#ef7041] transition-colors duration-300">
                    {act.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed font-medium">
                    {act.description}
                  </p>
                </div>

                {/* Bottom statistics badge */}
                <div className="mt-8 pt-6 border-t border-gray-50">
                  <span className={`inline-block text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r ${act.color} shadow-sm uppercase tracking-wider`}>
                    {act.stats}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ActivitiesSection;
