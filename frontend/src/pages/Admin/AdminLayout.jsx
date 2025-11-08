import { useState } from 'react';
import { Outlet, NavLink, useOutlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  BarChart3,
  Settings
} from 'lucide-react';
import AdminHeader from './AdminHeader';
import '../../styles/AdminSidebar.css';
import ThreeDBackground from '../../components/ThreeDBackground';

export default function AdminLayout({ projects, blogPosts, contacts, handleDelete, openModal }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.3 } }
  };

  return (
   <div className="admin-layout">
      <ThreeDBackground />
      {/* Sidebar */}
      <motion.aside
        className="sidebar"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? 'open' : 'closed'}
      >
        <nav className="sidebar-nav">
          {[
            { to: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { to: 'projects', label: 'Projects', icon: FolderOpen },
            { to: 'blog', label: 'Blog Posts', icon: FileText },
            { to: 'contacts', label: 'Contacts', icon: MessageSquare },
            { to: 'analytics', label: 'Analytics', icon: BarChart3 },
            { to: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <NavLink
              key={item.to}
              to={`/admin/${item.to}`}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <div className="admin-content-wrapper">
          {outlet && React.cloneElement(outlet, { projects, blogPosts, contacts, handleDelete, openModal })}
        </div>
      </div>
    </div>
  );
}