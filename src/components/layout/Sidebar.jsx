import { NavLink } from 'react-router-dom';

const Sidebar = ({ navLinks }) => {
  const activeLink = "flex items-center p-3 my-1 text-white bg-blue-700 rounded-lg";
  const inactiveLink = "flex items-center p-3 my-1 text-gray-200 hover:bg-blue-600 rounded-lg transition";

  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col">
      <div className="p-5 border-b border-blue-700">
        <h2 className="text-2xl font-bold text-center">NSS Connect</h2>
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
