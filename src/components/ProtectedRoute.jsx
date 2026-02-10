import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    let dashboardPath = '/';
    if (auth.role === 'admin') dashboardPath = '/admin/dashboard';
    if (auth.role === 'professor') dashboardPath = '/professor/dashboard';
    if (auth.role === 'student') dashboardPath = '/student/dashboard';
    
    return <Navigate to={dashboardPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
