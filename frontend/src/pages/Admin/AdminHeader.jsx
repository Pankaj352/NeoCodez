import { useAuth } from '../../context/AuthContext';
import { Menu, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import "../../styles/AdminHeader.css"

export default function AdminHeader({ toggleSidebar }) {
    const { loading, error, execute } = useApi();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
    const handleLogout = async () => {
    await logout();
    navigate('/');
  };


  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  return (
    
      <motion.div
        variants={itemVariants}
        className="admin-header"
      >
        <div className="container-lg">
          <div className="admin-user-info">
            <div>
              <h3 className="font-bold">
                Admin <span className="text-gradient">Dashboard</span>
              </h3>
            
            </div>
            
            {/* User Info & Logout */}
            <div className="admin-user-info">
              <div
                className=" user-details "
              >
                <User className="h-5 w-5 text-primary" />
                <div className="text-right">
                  <p className="text-text font-semibold">{user?.name || 'Admin'}</p>
                  
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="admin-logout-btn btn-ghost"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:block">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

  );
}