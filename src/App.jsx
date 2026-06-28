import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ProfessorLayout from './layouts/ProfessorLayout';
import StudentLayout from './layouts/StudentLayout';

// Pages
import LoginPage from './pages/public/LoginPage';
import LandingPage from './pages/public/LandingPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageEvents from './pages/admin/ManageEvents';
import ManageUsers from './pages/admin/ManageUsers';
import PendingApprovals from './pages/admin/PendingApprovals';
import ManageAnnouncements from './pages/shared/ManageAnnouncements';
import ProfessorDashboard from './pages/professor/ProfessorDashboard';
import ProfessorEvents from './pages/professor/ProfessorEvents';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentEvents from './pages/student/StudentEvents';
import Profile from './pages/shared/Profile';
import StudentAnnouncements from './pages/student/StudentAnnouncements';
import TakeAttendance from './pages/professor/TakeAttendance';
import ProfessorManageStudents from './pages/professor/ProfessorManageStudents';
import MyAttendance from './pages/student/MyAttendance';
import RegisterPage from './pages/public/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard"     element={<AdminDashboard />} />
              <Route path="events"        element={<ManageEvents />} />
              <Route path="users"         element={<ManageUsers />} />
              <Route path="approvals"     element={<PendingApprovals />} />
              <Route path="announcements" element={<ManageAnnouncements />} />
              <Route path="attendance"    element={<TakeAttendance />} />
              <Route path="profile"       element={<Profile />} />
            </Route>
          </Route>

          {/* Professor Routes */}
          <Route element={<ProtectedRoute allowedRoles={['professor']} />}>
            <Route path="/professor" element={<ProfessorLayout />}>
              <Route path="dashboard"     element={<ProfessorDashboard />} />
              <Route path="events"        element={<ProfessorEvents />} />
              <Route path="attendance"    element={<TakeAttendance />} />
              <Route path="announcements" element={<ManageAnnouncements />} />
              <Route path="approvals"     element={<PendingApprovals />} />
              <Route path="students"      element={<ProfessorManageStudents />} />
              <Route path="profile"       element={<Profile />} />
            </Route>
          </Route>

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route path="dashboard"     element={<StudentDashboard />} />
              <Route path="events"        element={<StudentEvents />} />
              <Route path="attendance"    element={<MyAttendance />} />
              <Route path="profile"       element={<Profile />} />
              <Route path="announcements" element={<StudentAnnouncements />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
