import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import nssLogo from '../../../assets/nss.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''} bg-[#fdf8f4]`}>
      <div className="max-w-7xl mx-auto px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={nssLogo} alt="NSS" className="w-[46px] h-[46px] object-contain rounded-full" />
          <div className="leading-tight">
            <p className="text-[11px] font-black text-[#102167] tracking-[0.12em] uppercase">National Service Scheme</p>
            <p className="text-[10px] text-[#ef7041] font-semibold">Not Me But You</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About NSS', 'Activities', 'Events', 'Gallery', 'Contact'].map((l, i) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative text-[13px] font-semibold text-gray-600 hover:text-[#102167] transition-colors group">
              {l}
              {i === 0 && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#ef7041] rounded-full"></span>
              )}
            </a>
          ))}
          <Link to="/login"
            className="bg-[#102167] text-white text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#1a2f85] transition-all shadow-md hover:shadow-lg">
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
