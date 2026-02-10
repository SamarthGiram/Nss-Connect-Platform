import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginIllustration from '../../assets/login-illustration.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    phone: '',
    group: 'Group A',
    year: '1',
    department: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 3) {
      setError('Password must be at least 3 characters');
      return;
    }

    // Get existing pending registrations from localStorage
    const pendingRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]');
    
    // Create new registration
    const newRegistration = {
      id: `reg_${Date.now()}`,
      ...formData,
      confirmPassword: undefined, // Don't store confirm password
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Add to pending registrations
    pendingRegistrations.push(newRegistration);
    localStorage.setItem('pendingRegistrations', JSON.stringify(pendingRegistrations));

    setSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your account is pending approval from an administrator or professor.
            You will be notified once your account is approved.
          </p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

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
          <Link to="/login" className="text-blue-600 hover:underline mt-8 md:mt-0">
            Already have an account? Log in
          </Link>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto max-h-screen">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Create Account</h2>
          <p className="text-gray-600 mb-6">Register as a student</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              />
            </div>

            {/* Roll Number */}
            <div>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="Roll Number"
                required
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              />
            </div>

            {/* Department */}
            <div>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department (e.g., Computer Science)"
                required
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              />
            </div>

            {/* Year and Group */}
            <div className="grid grid-cols-2 gap-4">
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>

              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              >
                <option value="Group A">Group A</option>
                <option value="Group B">Group B</option>
                <option value="Group C">Group C</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
