import { useAuth } from '../../context/AuthContext';

const StudentProfile = () => {
  const { auth } = useAuth();

  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            {auth?.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">Name</label>
            <p className="text-lg text-gray-800">{auth?.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-600">Role</label>
            <p className="text-lg text-gray-800 capitalize">{auth?.role}</p>
          </div>
          
          {auth?.group && (
            <div>
              <label className="block text-sm font-semibold text-gray-600">Group</label>
              <p className="text-lg text-gray-800">{auth.group}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-600">Email</label>
            <p className="text-lg text-gray-800">student@nss.edu</p>
          </div>
        </div>

        <button className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
