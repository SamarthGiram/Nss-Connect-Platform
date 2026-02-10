import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const adminLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
  { name: 'Manage Events', path: '/admin/events', icon: '📅' },
  { name: 'Manage Users', path: '/admin/users', icon: '👥' },
  { name: 'Pending Approvals', path: '/admin/approvals', icon: '✅' },
];

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar navLinks={adminLinks} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
