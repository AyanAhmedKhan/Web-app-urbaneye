import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
    const { user, isAuthenticated, hasRole } = useAuth();
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles.length > 0 && !hasRole(roles)) {
        // User authenticated but not authorized
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
