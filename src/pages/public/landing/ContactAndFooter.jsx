import { Link } from 'react-router-dom';
import nssLogo from '../../../assets/nss.png';

const ContactAndFooter = () => (
  <>
    {/* Contact */}
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#ef7041] uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-4xl font-extrabold text-[#102167] mt-2">Contact <span className="text-[#ef7041]">Us</span></h2>
          <div className="w-14 h-1 bg-gradient-to-r from-[#102167] to-[#ef7041] rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-5">
            <h3 className="text-xl font-extrabold text-[#102167]">NSS Unit — Samarth College</h3>
            <p className="text-gray-500 leading-relaxed text-[15px]">
              Have questions, want to volunteer, or submit an NGO request? We'd love to hear from you.
            </p>
            {[
              { icon: '📍', label: 'Address', value: 'Samarth College, Pune, Maharashtra 411001' },
              { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
              { icon: '✉️', label: 'Email', value: 'nss@samarthcollege.edu.in' },
              { icon: '🕐', label: 'Office Hours', value: 'Monday – Saturday, 9:00 AM – 5:00 PM' },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 p-4 bg-[#fdf8f4] rounded-xl border border-[#f0e8de]">
                <span className="text-xl flex-shrink-0">{c.icon}</span>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{c.label}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#fdf8f4] rounded-2xl p-8 border border-[#f0e8de]">
            <h3 className="text-lg font-extrabold text-[#102167] mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Name</label>
                  <input type="text" placeholder="Your name"
                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-medium focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Email</label>
                  <input type="email" placeholder="Your email"
                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-medium focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Subject</label>
                <input type="text" placeholder="Message subject"
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-medium focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Message</label>
                <textarea rows={4} placeholder="Your message..."
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-100 text-sm font-medium focus:border-[#102167] focus:ring-4 focus:ring-[#102167]/10 outline-none transition-all resize-none" />
              </div>
              <button type="submit"
                className="w-full py-3.5 bg-[#102167] text-white font-bold rounded-xl hover:bg-[#ef7041] transition-all duration-300 shadow-lg hover:-translate-y-0.5 text-sm">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-[#0c1440] text-white">
      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="grid md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full p-1.5 overflow-hidden">
                <img src={nssLogo} alt="NSS" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-extrabold text-sm tracking-wide">National Service Scheme</p>
                <p className="text-[#ef7041] text-xs font-bold">Not Me But You</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Developing student personality through selfless community service since 1969. Inspired by the ideals of Mahatma Gandhi.
            </p>
            <div className="flex gap-3">
              {['FB', 'TW', 'IG', 'YT'].map(s => (
                <a key={s} href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black hover:bg-[#ef7041] transition-colors duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-extrabold text-sm mb-5 text-white/90">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home','About NSS','Activities','Events','Gallery','Contact','NGO Request'].map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s+/g,'-')}`}
                    className="text-white/50 text-sm font-medium hover:text-[#ef7041] transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#ef7041] rounded-full flex-shrink-0"></span>{l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-sm mb-5 text-white/90">Portal Access</h4>
            <div className="space-y-3">
              {['Student Login','Professor Login','Admin Login'].map(l => (
                <Link key={l} to="/login"
                  className="block w-full text-center py-2.5 border border-white/20 rounded-xl text-xs font-bold text-white/60 hover:border-[#ef7041] hover:text-[#ef7041] hover:bg-[#ef7041]/10 transition-all duration-200">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs font-medium">© 2025 National Service Scheme. All rights reserved.</p>
          <p className="text-white/35 text-xs font-medium">
            Ministry of Youth Affairs & Sports, Government of India &nbsp;|&nbsp;
            <span className="text-[#ef7041] font-bold">Not Me But You</span>
          </p>
        </div>
      </div>
    </footer>
  </>
);

export default ContactAndFooter;
