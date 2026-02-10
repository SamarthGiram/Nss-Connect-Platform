import { useState } from 'react';
import { mockEvents, mockUsers } from '../../data/mockData';

const TakeAttendance = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const students = Object.values(mockUsers).filter(u => u.role === 'student');

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Take Attendance</h1>
      <p className="text-gray-600 mb-8">Mark student attendance for events</p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Event</label>
        <select 
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose an event...</option>
          {mockEvents.map(event => (
            <option key={event.id} value={event.id}>{event.title}</option>
          ))}
        </select>
      </div>

      {selectedEvent && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.group}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">Present</button>
                      <button className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700">Absent</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50">
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold">
              Submit Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeAttendance;
