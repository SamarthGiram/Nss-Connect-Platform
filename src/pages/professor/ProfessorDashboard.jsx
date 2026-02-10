import { useAuth } from '../../context/AuthContext';
import { mockEvents } from '../../data/mockData';

const ProfessorDashboard = () => {
  const { auth } = useAuth();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Professor Dashboard
      </h1>
      <p className="text-gray-600 mb-8">Manage your assigned events and attendance</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h4 className="text-lg font-semibold text-gray-600">Assigned Events</h4>
          <p className="text-3xl font-bold text-blue-600">{mockEvents.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h4 className="text-lg font-semibold text-gray-600">Attendance Taken</h4>
          <p className="text-3xl font-bold text-green-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h4 className="text-lg font-semibold text-gray-600">Pending Events</h4>
          <p className="text-3xl font-bold text-yellow-600">2</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">My Assigned Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockEvents.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{event.description}</p>
              <div className="space-y-1 mb-4">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">📅 Date:</span> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">📍 Venue:</span> {event.venue}
                </p>
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Take Attendance
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
