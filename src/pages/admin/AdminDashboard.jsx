import { useAuth } from '../../context/AuthContext';
import { mockEvents, mockUsers } from '../../data/mockData';

const AdminDashboard = () => {
  const { auth } = useAuth();
  const totalUsers = Object.keys(mockUsers).length;
  const totalStudents = Object.values(mockUsers).filter(u => u.role === 'student').length;
  const totalProfessors = Object.values(mockUsers).filter(u => u.role === 'professor').length;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage and oversee the entire NSS system</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Events</h3>
          <p className="text-4xl font-bold">{mockEvents.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-4xl font-bold">{totalStudents}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Professors</h3>
          <p className="text-4xl font-bold">{totalProfessors}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-4xl font-bold">{totalUsers}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Events</h2>
        <div className="space-y-3">
          {mockEvents.map(event => (
            <div key={event.id} className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0">
              <div>
                <h4 className="font-semibold text-gray-800">{event.title}</h4>
                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} - {event.venue}</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Active</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
