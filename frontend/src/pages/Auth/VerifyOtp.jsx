import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Key } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { authAPI } from '../../utils/api';
import '../../styles/VerifyOtp.css';

const VerifyOtp = () => {
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const { execute } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await execute(() => authAPI.verifyOtp({ email: formData.email, otp: formData.otp }));
      if (result.success) {
        setStatus({ type: 'success', message: 'OTP verified! Redirecting to reset password...' });
        setTimeout(() => {
          navigate('/reset-password', { state: { email: formData.email, otp: formData.otp } });
        }, 2000);
      } else {
        setStatus({ type: 'error', message: result.error || 'Invalid or expired OTP' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await execute(() => authAPI.forgotPassword({ email: formData.email }));
      if (result.success) {
        setStatus({ type: 'success', message: 'New OTP sent to your email!' });
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
      className="verify-otp-container"
    >
      <motion.div
        variants={itemVariants}
        className="verify-otp-form-container card-glass"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="verify-otp-header">
          <h3 className="text-gradient">Verify OTP</h3>
          <p>Enter the OTP sent to your email</p>
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
        <form onSubmit={handleSubmit} className="verify-otp-form">
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
            <label htmlFor="otp">OTP</label>
            <div className="input-wrapper">
              <Key className="h-5 w-5 text-text-secondary" />
              <input
                id="otp"
                type="text"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                placeholder="Enter 6-digit OTP"
                required
                aria-required="true"
                maxLength="6"
                pattern="\d{6}"
                title="OTP must be a 6-digit number"
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
                <span>Verifying OTP...</span>
              </>
            ) : (
              <span>Verify OTP</span>
            )}
          </motion.button>
        </form>

        {/* Resend OTP */}
        <motion.div
          variants={itemVariants}
          className="form-actions"
        >
          <button
            onClick={handleResendOtp}
            disabled={loading || !formData.email}
            className="btn-ghost"
          >
            Resend OTP
          </button>
        </motion.div>

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

export default VerifyOtp;