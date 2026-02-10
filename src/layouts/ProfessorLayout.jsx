import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const professorLinks = [
  { name: 'Dashboard', path: '/professor/dashboard', icon: '📊' },
  { name: 'My Events', path: '/professor/events', icon: '📅' },
  { name: 'Take Attendance', path: '/professor/attendance', icon: '✓' },
];

const ProfessorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar navLinks={professorLinks} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfessorLayout;
