import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, clearStatus, setStatus } from '../../slices/authSlice';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import '../../styles/login.css';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, statusMessage, statusType } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearStatus());
  }, [dispatch]);

  useEffect(() => {
    if (statusType === 'success') {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [statusType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      dispatch(setStatus({ message: 'Passwords do not match', type: 'error' }));
      return;
    }
    await dispatch(register({ name: formData.name, email: formData.email, password: formData.password,confirmPassword:formData.confirmPassword }));
  };

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
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="login-container"
    >
      <motion.div
        variants={itemVariants}
        className="login-form-container card-glass"
      >
        <motion.div variants={itemVariants} className="login-header">
          <h3 className="text-gradient">Join NeoCodez Portfolio</h3>
          <p>Create an account to manage your portfolio</p>
        </motion.div>

        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`status-message ${statusType}`}
            role="alert"
            aria-live="assertive"
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
          <motion.div variants={itemVariants} className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <User className="h-5 w-5 text-text-secondary" />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
                aria-required="true"
                autoComplete="name"
              />
            </div>
          </motion.div>

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
                aria-required="true"
                autoComplete="email"
              />
            </div>
          </motion.div>

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
                aria-required="true"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-text-secondary" /> : <Eye className="h-5 w-5 text-text-secondary" />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="h-5 w-5 text-text-secondary" />
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                required
                aria-required="true"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-text-secondary" /> : <Eye className="h-5 w-5 text-text-secondary" />}
              </button>
            </div>
          </motion.div>

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
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="form-actions">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="btn-ghost">
              Sign in
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