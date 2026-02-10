const MyAttendance = () => {
  const mockAttendance = [
    { id: 1, eventName: 'Campus Clean-up Drive', date: '2025-01-15', status: 'Present' },
    { id: 2, eventName: 'Blood Donation Camp', date: '2025-01-10', status: 'Present' },
    { id: 3, eventName: 'Tree Plantation', date: '2025-01-05', status: 'Absent' },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Attendance</h1>
      <p className="text-gray-600 mb-8">View your attendance record for all NSS events</p>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockAttendance.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.eventName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    record.status === 'Present' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAttendance;
