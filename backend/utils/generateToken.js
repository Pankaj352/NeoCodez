// utils/generateToken.js
const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token for a user
 * @param {string} id - The user's unique ID
 * @param {string} [role] - The user's role (optional)
 * @returns {string} - A signed JWT
 * @throws {Error} - If JWT_SECRET is not defined or signing fails
 */
const generateToken = (id, role) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const payload = role ? { id, role } : { id };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Shorter expiration for better security
      algorithm: 'HS256',
    });
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

module.exports = generateToken;