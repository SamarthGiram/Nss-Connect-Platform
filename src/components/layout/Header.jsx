import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-700 capitalize">Welcome, {auth?.role}</h1>
          <p className="text-sm text-gray-500">{auth?.name}</p>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
          >
            <span className="mr-2">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
