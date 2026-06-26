import { NavLink } from 'react-router-dom';
import nssLogo from '../../assets/nss.png';

const Sidebar = ({ navLinks }) => {
  const activeLink = "flex items-center p-3 my-1 text-white bg-blue-700 rounded-lg shadow-inner";
  const inactiveLink = "flex items-center p-3 my-1 text-gray-200 hover:bg-blue-600 rounded-lg transition-colors duration-200";

  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col shadow-xl z-20 relative">
      <div className="p-6 border-b border-blue-700 flex flex-col items-center justify-center bg-blue-900/30">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-1 mb-3 shadow-lg border-2 border-blue-400">
          <img 
            src={nssLogo} 
            alt="NSS Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div style={{display: 'none'}} className="flex-col items-center">
            <span className="text-[#102167] font-black text-xl leading-none">NSS</span>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-center tracking-wide text-white">NSS Connect</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
              >
                {link.icon && <span className="text-lg">{link.icon}</span>}
                <span className="ml-3">{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
