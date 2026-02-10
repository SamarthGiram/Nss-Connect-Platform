import { useState, useEffect } from 'react';
import { mockUsers } from '../../data/mockData';

const PendingApprovals = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);

  useEffect(() => {
    loadPendingRegistrations();
  }, []);

  const loadPendingRegistrations = () => {
    const registrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]');
    setPendingRegistrations(registrations.filter(r => r.status === 'pending'));
  };

  const handleApprove = (registration) => {
    // Get all registrations
    const allRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]');
    
    // Update status to approved
    const updated = allRegistrations.map(r => 
      r.id === registration.id ? { ...r, status: 'approved' } : r
    );
    localStorage.setItem('pendingRegistrations', JSON.stringify(updated));

    // Add to mock users (in real app, this would be an API call)
    const newUser = {
      id: `u${Date.now()}`,
      name: registration.name,
      email: registration.email,
      role: 'student',
      group: registration.group,
      rollNo: registration.rollNo,
      phone: registration.phone,
      year: registration.year,
      department: registration.department
    };
    
    // Store approved user
    const approvedUsers = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
    approvedUsers.push(newUser);
    localStorage.setItem('approvedUsers', JSON.stringify(approvedUsers));

    loadPendingRegistrations();
    alert(`${registration.name} has been approved!`);
  };

  const handleReject = (registration) => {
    if (!confirm(`Are you sure you want to reject ${registration.name}'s registration?`)) {
      return;
    }

    const allRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]');
    const updated = allRegistrations.map(r => 
      r.id === registration.id ? { ...r, status: 'rejected' } : r
    );
    localStorage.setItem('pendingRegistrations', JSON.stringify(updated));

    loadPendingRegistrations();
    alert(`${registration.name}'s registration has been rejected.`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pending Approvals</h1>
      <p className="text-gray-600 mb-8">Review and approve student registrations</p>

      {pendingRegistrations.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No pending registrations</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year/Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingRegistrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {registration.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {registration.rollNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {registration.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {registration.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Year {registration.year} / {registration.group}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button 
                      onClick={() => handleApprove(registration)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(registration)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
