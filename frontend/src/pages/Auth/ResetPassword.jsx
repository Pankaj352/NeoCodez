import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { authAPI } from '../../utils/api';
import '../../styles/ResetPassword.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const { execute } = useApi();
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email || '';
  const otp = location.state?.otp || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      const result = await execute(() => authAPI.resetPassword({ 
        email, 
        otp, 
        password: formData.password 
      }));
      if (result.success) {
        setStatus({ type: 'success', message: 'Password reset successful! Redirecting to login...' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to reset password' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
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
      className="reset-password-container"
    >
      <motion.div
        variants={itemVariants}
        className="reset-password-form-container card-glass"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="reset-password-header">
          <h3 className="text-gradient">Reset Password</h3>
          <p>Enter your new password for {email}</p>
        </motion.div>

        {/* Status Message */}
        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`status-message ${status.type}`}
            role="alert"
            aria-live="assertive"
          >
            {status.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{status.message}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="reset-password-form">
          <motion.div variants={itemVariants} className="form-group">
            <label htmlFor="password">New Password</label>
            <div className="input-wrapper">
              <Lock className="h-5 w-5 text-text-secondary" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter new password"
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
                placeholder="Confirm new password"
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
            style={{textAlign:"center", display:"flex", justifyContent:"center"}}
            type="submit"
            disabled={loading || !email || !otp}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Resetting Password...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </motion.button>
        </form>

        {/* Back to Login */}
        <motion.div
          variants={itemVariants}
          className="form-actions"
        >
          <button
            onClick={() => navigate('/login')}
            className="btn-ghost"
          >
            Back to Sign In
          </button>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          variants={itemVariants}
          className="back-to-home"
        >
          <button
            onClick={() => navigate('/')}
            className="btn-ghost"
          >
            ← Back to NeoCodez
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;