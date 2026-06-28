import { useState } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';

const teamMembers = [
  {
    name: 'Prof. Nilesh Patil',
    role: 'NSS Program Officer',
    avatar: 'NP',
    bg: 'from-blue-600 to-indigo-600',
    desc: 'Guiding unit activities and university coordination.'
  },
  {
    name: 'Soham Kale',
    role: 'Student President',
    avatar: 'SK',
    bg: 'from-[#102167] to-[#3b4da8]',
    desc: 'Leading campaigns and student volunteer coordination.'
  },
  {
    name: 'Ananya Kulkarni',
    role: 'Student Vice President',
    avatar: 'AK',
    bg: 'from-emerald-500 to-teal-500',
    desc: 'Coordinating healthcare and environmental camps.'
  },
  {
    name: 'Rahul Patil',
    role: 'NSS Unit Secretary',
    avatar: 'RP',
    bg: 'from-[#ef7041] to-orange-500',
    desc: 'Managing reports, attendance, and correspondence.'
  }
];

const faqs = [
  {
    q: 'Who can join the NSS unit?',
    a: 'Any student currently enrolled in the college who is willing to dedicate time to social service and community welfare can apply to register.'
  },
  {
    q: 'What is the required commitment / hours?',
    a: 'Volunteers are expected to complete 120 hours of social service per year, including active participation in regular campus activities and special rural camps.'
  },
  {
    q: 'Do we get certificates or academic benefits?',
    a: 'Yes! Volunteers who successfully complete their service receive an official certificate from the University/Ministry which carries significant weightage in higher education and job applications.'
  },
  {
    q: 'What happens at the Special 7-Day Rural Camp?',
    a: 'It is an immersive residential camp held in an adopted village where volunteers live together, conduct cleanliness drives, build local infrastructure, run literacy classes, and understand rural development first-hand.'
  }
];

export const TeamSection = () => {
  const [teamRef, teamVisible] = useScrollReveal();

  return (
    <section id="team" className="py-24 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest bg-[#ef7041]/10 px-4 py-1.5 rounded-full border border-[#ef7041]/20">
            Our Leadership
          </span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-4">
            NSS Core <span className="text-[#ef7041]">Team</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
          <p className="text-gray-500 text-sm mt-3 font-medium max-w-xl mx-auto">
            Guiding volunteers, organizing campaigns, and steering our social service initiatives.
          </p>
        </div>

        <div ref={teamRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((m, idx) => {
            const delayClass = idx === 0 ? 'delay-75' : idx === 1 ? 'delay-150' : idx === 2 ? 'delay-300' : 'delay-400';
            return (
              <div
                key={idx}
                className={`bg-gray-50/50 rounded-3xl p-6 border border-gray-100 text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group opacity-0 ${teamVisible ? `reveal-fade-in-up ${delayClass}` : ''}`}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${m.bg} flex items-center justify-center text-white text-2xl font-black mx-auto mb-5 shadow-md group-hover:scale-105 transition-transform`}>
                  {m.avatar}
                </div>
                <h3 className="font-extrabold text-gray-800 text-base group-hover:text-[#ef7041] transition-colors">{m.name}</h3>
                <p className="text-xs text-[#ef7041] font-bold mt-1 uppercase tracking-wider">{m.role}</p>
                <p className="text-xs text-gray-400 font-semibold mt-3 leading-relaxed px-2">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const FaqSection = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [faqRef, faqVisible] = useScrollReveal();

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#fdf8f4] overflow-hidden border-t border-gray-100/50">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest bg-[#ef7041]/10 px-4 py-1.5 rounded-full border border-[#ef7041]/20">
            Got Questions?
          </span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-4">
            Frequently Asked <span className="text-[#ef7041]">Questions</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
        </div>

        <div ref={faqRef} className={`space-y-4 opacity-0 ${faqVisible ? 'reveal-fade-in-up' : ''}`}>
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.015)] transition-all duration-300">
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-gray-800 text-sm md:text-base border-none bg-transparent cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HiOutlineQuestionMarkCircle size={18} className="text-[#ef7041]" />
                  {faq.q}
                </span>
                <span className={`text-[#ef7041] text-xs transition-transform duration-300 transform ${openFaqIndex === i ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === i ? 'max-h-40 border-t border-gray-50' : 'max-h-0'}`}>
                <p className="px-6 py-5 text-gray-500 text-xs md:text-sm leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
