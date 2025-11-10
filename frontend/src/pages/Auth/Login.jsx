import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, clearStatus } from '../../slices/authSlice';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import '../../styles/login.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user, loading, statusMessage, statusType } = useSelector(
    (state) => state.auth
  );

  // ✅ Clear status messages on mount/unmount
  useEffect(() => {
    dispatch(clearStatus());
    return () => dispatch(clearStatus());
  }, [dispatch]);

  
  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🟡 Submitting login form:', formData);

    dispatch(clearStatus());
    try {
      const response = await dispatch(login(formData)).unwrap();
      console.log('🟢 Login successful:', response);
    } catch (err) {
      console.error('🔴 Login failed:', err);
    }
  };

  // ✅ Redirect user after successful login based on role (lowercase roles)
  useEffect(() => {
    if (isAuthenticated && user) {
      let destination = '/'; // default: user homepage

      if (user.role === 'admin') {
        destination = '/admin/dashboard';
      } else if (user.role === 'user') {
        destination = '/';
      }

      const timer = setTimeout(() => {
        navigate(destination, { replace: true });
      }, 800); // delay for smooth UX (optional)

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, navigate]);

  // 🔍 Debug logs (optional — remove in production)
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user, loading, statusMessage, statusType });
  }, [isAuthenticated, user, loading, statusMessage, statusType]);

  useEffect(() => {
    console.log('Location:', location);
  }, [location]);


  // ✅ Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="login-container"
    >
      <motion.div variants={itemVariants} className="login-form-container card-glass">
        <motion.div variants={itemVariants} className="login-header">
          <h3 className="text-gradient">Welcome Back</h3>
          <p>Sign in to connect with NeoCodez</p>
        </motion.div>

        {/* ✅ Status messages */}
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`status-message ${statusType}`}
            role="alert"
          >
            {statusType === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{statusMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Field */}
          <motion.div variants={itemVariants} className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="h-5 w-5 text-text-secondary" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants} className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="h-5 w-5 text-text-secondary" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </motion.button>
        </form>

        {/* Links */}
        <motion.div variants={itemVariants} className="form-actions">
          <Link to="/forgot-password" className="btn-ghost">
            Forgot Password?
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="form-actions">
          <p>
            Don’t have an account?{' '}
            <Link to="/register" className="btn-ghost">
              Sign up
            </Link>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="back-to-home">
          <Link to="/" className="btn-ghost">
            ← Back to NeoCodez
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
