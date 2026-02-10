import { mockEvents } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { auth } = useAuth();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Student Dashboard
      </h1>
      <h2 className="text-xl text-gray-600 mb-4">
        Welcome, {auth?.name}! {auth?.group && `(${auth.group})`}
      </h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Your Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-600">Events Attended</h4>
            <p className="text-3xl font-bold text-blue-600">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-600">Total Hours</h4>
            <p className="text-3xl font-bold text-green-600">20</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-600">Upcoming Events</h4>
            <p className="text-3xl font-bold text-yellow-600">{mockEvents.length}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {mockEvents.map(event => (
            <div key={event.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{event.title}</h4>
                <p className="text-sm text-gray-500">{event.venue} - {new Date(event.date).toLocaleString()}</p>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
