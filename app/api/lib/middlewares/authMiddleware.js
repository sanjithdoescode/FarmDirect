import { verifyToken, verifyRefreshToken, generateAccessToken } from '../utils/auth';

/**
 * Authentication middleware for Next.js API routes
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 * @param {Function} next - Function to continue to the next middleware or handler
 * @returns {Promise<void>}
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get access token from cookies or Authorization header
    let accessToken = req.cookies?.accessToken;
    
    if (!accessToken && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        accessToken = authHeader.substring(7);
      }
    }

    if (!accessToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify the token
    const decoded = verifyToken(accessToken);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach user info to request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    // Continue to the next middleware or handler
    if (next) {
      return next();
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

/**
 * Middleware to check if user has specific role
 * @param {String|Array} roles - Required role(s)
 * @returns {Function} Middleware function
 */
export const hasRole = (roles) => {
  return (req, res, next) => {
    authenticate(req, res, () => {
      const userRoles = Array.isArray(req.user.role) ? req.user.role : [req.user.role];
      const requiredRoles = Array.isArray(roles) ? roles : [roles];
      
      // Check if user has at least one of the required roles
      const hasRequiredRole = userRoles.some(role => requiredRoles.includes(role));
      
      if (!hasRequiredRole) {
        return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
      }
      
      if (next) {
        return next();
      }
    });
  };
};

/**
 * Middleware for token refresh
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 * @param {Function} next - Function to continue to the next middleware or handler
 * @returns {Promise<void>}
 */
export const refreshTokenMiddleware = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }
    
    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
    
    // Generate a new access token
    const accessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    
    // Set the new access token in a cookie
    res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${15 * 60}; SameSite=Strict`);
    
    // Return the new access token in the response
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({ error: 'Token refresh failed' });
  }
};

export default {
  authenticate,
  hasRole,
  refreshTokenMiddleware,
}; 