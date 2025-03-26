import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT secrets should be stored in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production';

// Token expiration times
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

/**
 * Generate a JWT access token
 * @param {Object} payload - Data to include in the token
 * @returns {String} JWT token
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

/**
 * Generate a JWT refresh token
 * @param {Object} payload - Data to include in the token
 * @returns {String} JWT refresh token
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

/**
 * Verify and decode a JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object|null} Decoded token or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Verify and decode a JWT refresh token
 * @param {String} token - JWT refresh token to verify
 * @returns {Object|null} Decoded token or null if invalid
 */
export function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Hash a password
 * @param {String} password - Plain text password
 * @returns {Promise<String>} Hashed password
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

/**
 * Compare a password with a hash
 * @param {String} password - Plain text password
 * @param {String} hashedPassword - Hashed password
 * @returns {Promise<Boolean>} True if password matches
 */
export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Set JWT tokens in response cookies
 * @param {Object} res - Next.js/Express response object
 * @param {String} accessToken - JWT access token
 * @param {String} refreshToken - JWT refresh token
 */
export function setTokenCookies(res, accessToken, refreshToken) {
  // Set HTTP-only cookies
  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${15 * 60}; SameSite=Strict`,
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`,
  ]);
}

/**
 * Clear JWT tokens from response cookies
 * @param {Object} res - Next.js/Express response object
 */
export function clearTokenCookies(res) {
  res.setHeader('Set-Cookie', [
    'accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict',
    'refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict',
  ]);
}

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  hashPassword,
  comparePassword,
  setTokenCookies,
  clearTokenCookies,
}; 