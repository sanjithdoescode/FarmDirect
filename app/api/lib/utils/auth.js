import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers'; // Import cookies

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
    // Handle specific errors like TokenExpiredError if needed
    console.error('Token verification failed:', error.message);
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

/**
 * Get the user from the authorization headers or cookies
 * @param {Request} request - The incoming request object from Next.js API route
 * @returns {Object|null} - The decoded user information (payload) or null
 */
export function getUserFromToken(request) {
  // Get access token from cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // If no token in cookies, try to get it from the Authorization header
  let token = accessToken;
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    console.log('No token found in cookies or authorization header');
    return null;
  }

  // Verify the token
  const decoded = verifyToken(token);
  if (!decoded) {
    console.log('Token verification failed or token expired');
  }
  return decoded; // Returns the payload { id, email, role } or null
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
  getUserFromToken,
}; 