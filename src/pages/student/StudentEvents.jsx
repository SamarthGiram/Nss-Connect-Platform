import { mockEvents } from '../../data/mockData';

const StudentEvents = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h1>
      <p className="text-gray-600 mb-8">View all NSS events and activities</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockEvents.map(event => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{event.description}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">📅 Date:</span> {new Date(event.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">📍 Venue:</span> {event.venue}
              </p>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentEvents;
