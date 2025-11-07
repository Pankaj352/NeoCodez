// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import '../styles/ProtectedRoute.css';

export default function ProtectedRoute({ children, requireAuth = true, requiredRole }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="protected-route-loading">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="protected-route-loading-content"
        >
          <Loader2 className="protected-route-spinner" />
          <p className="protected-route-loading-text">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    const destination = user?.role === 'admin' ? '/admin' : '/';
    return <Navigate to={destination} replace />;
  }

  return children;
}
