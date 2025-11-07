import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { authAPI } from '../../utils/api';
import '../../styles/Forgot.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const { execute } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await execute(() => authAPI.forgotPassword({ email: formData.email }));
      if (result.success) {
        setStatus({ type: 'success', message: 'OTP sent to your email! Redirecting...' });
        setTimeout(() => {
          navigate('/reset-password');
        }, 2000);
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to send OTP' });
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
      className="forgot-container "
    >
      <motion.div
        variants={itemVariants}
        className="forgot-form-container card-glass"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="forgot-header">
          <h3 className="text-gradient">Forgot Password</h3>
          <p>Enter your email to receive a password reset OTP</p>
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
        <form onSubmit={handleSubmit} className="forgot-form">
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

          <motion.button
            style={{textAlign:"center", display:"flex", justifyContent:"center"}}
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
                <span>Sending OTP...</span>
              </>
            ) : (
              <span>Send OTP</span>
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

export default ForgotPassword;