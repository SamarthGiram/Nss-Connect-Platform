import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import nssLogo from '../../../assets/nss.png';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About NSS', href: '#about-nss', id: 'about-nss' },
  { name: 'Activities', href: '#activities', id: 'activities' },
  { name: 'Events', href: '#events', id: 'events' },
  { name: 'Gallery', href: '#gallery', id: 'gallery' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state for background styling
      setScrolled(window.scrollY > 10);

      // Track active section based on scroll offset
      const scrollPos = window.scrollY + 180; // offset for navbar height + buffer
      const sections = navLinks.map(link => document.getElementById(link.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPos >= section.offsetTop) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-1' : 'py-0'} bg-[#fdf8f4]`}>
      <div className="max-w-7xl mx-auto px-8 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4">
          <img src={nssLogo} alt="NSS" className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] object-contain rounded-full shadow-sm" />
          <div className="leading-tight">
            <p className="text-[13px] sm:text-[15px] font-black text-[#102167] tracking-[0.15em] uppercase">National Service Scheme</p>
            <p className="text-[11px] sm:text-[12.5px] text-[#ef7041] font-bold mt-0.5">Not Me But You</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`relative text-[14px] sm:text-[15.5px] font-bold transition-colors group py-1 ${
                activeSection === link.id ? 'text-[#102167]' : 'text-gray-600 hover:text-[#102167]'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-2 left-0 h-[3px] bg-[#ef7041] rounded-full transition-all duration-300 ${
                  activeSection === link.id
                    ? 'w-full opacity-100'
                    : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'
                }`}
              ></span>
            </a>
          ))}
          <Link to="/login"
            className="bg-[#102167] text-white text-[14px] sm:text-[15.5px] font-extrabold px-8 py-3.5 rounded-xl hover:bg-[#1a2f85] transition-all shadow-md hover:shadow-lg">
            Join Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
