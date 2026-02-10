import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';
import loginIllustration from '../../assets/login-illustration.png';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleMockLogin = (e) => {
    e.preventDefault();
    setError('');

    let user = null;
    if (email === 'admin@nss.com' || email === 'Admin') {
      user = mockUsers['a1'];
    } else if (email === 'prof@nss.com' || email === 'Professor') {
      user = mockUsers['p1'];
    } else if (email === 'student@nss.com' || email === 'Student') {
      user = mockUsers['u1'];
    }

    if (user && password === '123') {
      const mockToken = `mock-jwt-token-for-${user.role}`;
      login({ ...user, token: mockToken });

      if (user.role === 'admin') navigate('/admin/dashboard');
      if (user.role === 'professor') navigate('/professor/dashboard');
      if (user.role === 'student') navigate('/student/dashboard');
    } else {
      setError('Invalid username or password. (Hint: Use admin@nss.com/prof@nss.com/student@nss.com and password 123)');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* Left Side: Illustration */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between items-center bg-white">
          <div className="flex-grow flex items-center justify-center">
            <img 
              src={loginIllustration} 
              alt="NSS Connect Illustration" 
              className="max-w-[50%] h-auto md:max-w-[60%]"
            />
          </div>
          <Link to="/register" className="text-blue-600 hover:underline mt-8 md:mt-0">
            Create an account
          </Link>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Log In</h2>

          <form onSubmit={handleMockLogin} className="space-y-6">
            {/* Your Name/Email Input */}
            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="h-5 w-5 text-gray-400">👤</span>
                </span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Name / Email"
                  className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
                  aria-label="Your Name or Email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="h-5 w-5 text-gray-400">🔒</span>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
                  aria-label="Password"
                />
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Log In
              </button>
            </div>
          </form>

          {/* Or login with social media */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">Or login with</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                <span>f</span>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
                <span>G</span>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors">
                <span>𝕏</span>
              </a>
            </div>
          </div>

          {/* Test Info Box */}
          <div className="mt-6 p-3 bg-gray-50 rounded-md border border-gray-200 text-sm">
             <h4 className="font-semibold text-gray-700">Demo Logins:</h4>
             <p className="text-gray-600"><span className="font-medium">Admin:</span> admin@nss.com</p>
             <p className="text-gray-600"><span className="font-medium">Professor:</span> prof@nss.com</p>
             <p className="text-gray-600"><span className="font-medium">Student:</span> student@nss.com</p>
             <p className="text-gray-600"><span className="font-medium">Password:</span> 123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
