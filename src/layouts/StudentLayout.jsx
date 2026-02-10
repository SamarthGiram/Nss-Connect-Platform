import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const studentLinks = [
  { name: 'Dashboard', path: '/student/dashboard', icon: '📊' },
  { name: 'Upcoming Events', path: '/student/events', icon: '📅' },
  { name: 'My Attendance', path: '/student/attendance', icon: '📋' },
  { name: 'My Profile', path: '/student/profile', icon: '👤' },
];

const StudentLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar navLinks={studentLinks} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
