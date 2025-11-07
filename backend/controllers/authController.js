const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer configuration error:', error);
  } else {
    console.log('Nodemailer ready to send emails');
  }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Verify user creation
    if (!user || !user._id) {
      console.error('User creation failed: No user returned from User.create');
      return res.status(400).json({ message: 'Failed to create user' });
    }

    // Generate token
    let token;
    try {
      token = generateToken(user._id, user.role);
    } catch (tokenError) {
      console.error('Token generation error:', tokenError.message);
      await User.deleteOne({ _id: user._id }); // Rollback
      throw new Error(`Token generation failed: ${tokenError.message}`);
    }

    // Send response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('Register error:', error.stack);
    res.status(500).json({
      message: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
    });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error.stack);
    res.status(500).json({
      message: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error.stack);
    res.status(500).json({
      message: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
    });
  }
};

// @desc    Send OTP for password reset
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

    // Save OTP and expiration to user
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: `"NeoCodez" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset OTP - NeoCodez',
      text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes. If you did not request this, please ignore this email.`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .otp {
              font-size: 32px;
              font-weight: bold;
              color: #007bff;
              margin: 20px 0;
              letter-spacing: 2px;
            }
            .cta-button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 10px;
              text-align: center;
              font-size: 12px;
              color: #6c757d;
            }
            .footer a {
              color: #007bff;
              text-decoration: none;
            }
            @media only screen and (max-width: 600px) {
              .container {
                margin: 10px;
              }
              .otp {
                font-size: 28px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NeoCodez</h1>
            </div>
            <div class="content">
              <h2>Password Reset Request</h2>
              <p>Hi ${user.name || 'User'},</p>
              <p>You requested to reset your password. Use the OTP below to proceed:</p>
              <div class="otp">${otp}</div>
              <p>This OTP is valid for <strong>10 minutes</strong>.</p>
              <p>If you did not request a password reset, please ignore this email or contact support.</p>
              <a href="${process.env.FRONTEND_URL}/reset-password" class="cta-button">Reset Password</a>
            </div>
            <div class="footer">
              <p>NeoCodez &bull; <a href="mailto:${process.env.EMAIL_USER}">Contact Us</a></p>
              <p>If you did not sign up, <a href="${process.env.FRONTEND_URL}/unsubscribe">unsubscribe here</a>.</p>
              <p>&copy; ${new Date().getFullYear()} NeoCodez. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('OTP email sent:', {
        to: user.email,
        messageId: info.messageId,
        response: info.response,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      throw new Error(`Failed to send OTP email: ${emailError.message}`);
    }

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Forgot password error:', error.stack);
    res.status(500).json({
      message: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
    });
  }
};

// @desc    Verify OTP and issue reset token
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Clear OTP after verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.RESET_TOKEN_SECRET, {
      expiresIn: '15m',
      algorithm: 'HS256',
    });

    res.status(200).json({ resetToken });
  } catch (error) {
    console.error('Verify OTP error:', error.stack);
    res.status(500).json({
      message: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
    });
  }
};
// @desc    Reset password with token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired reset token' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error.stack);
    res.status(500).json({
      message: process.env.NODE_ENV === 'development' ? error.message : 'Server error',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  verifyOtp,
  resetPassword,
};