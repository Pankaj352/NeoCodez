import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings, LogOut, User, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaSun, FaMoon, FaCube } from 'react-icons/fa';
import '../styles/Navbar.css';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <FaCube className="logo-icon" />
          <span className="logo-text">NeoCodez</span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9, rotate: -15 }}
            className="theme-toggle"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </motion.button>

          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-menu" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="user-menu-button">
                  <div className="user-avatar">{user?.name?.[0].toUpperCase() || 'A'}</div>
                                    <span className="user-name">{user?.name || 'Admin'}</span>
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="user-dropdown"
                    >
                      <Link to="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item">
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="mobile-menu-button">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav"
          >
            <div className="container mobile-nav-links">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </NavLink>
              ))}
              {isAuthenticated && (
                <NavLink to="/admin" className="mobile-nav-link" onClick={closeMobileMenu}>Admin</NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}