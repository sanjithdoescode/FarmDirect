/**
 * Authentication API Tests
 * 
 * Run these tests with:
 * npm test -- tests/api/auth.test.js
 */

const fetch = require('node-fetch');

// Base URL for API calls
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

// Test user credentials
const TEST_USER = {
  email: `test-${Date.now()}@example.com`,
  password: 'Password123',
  fullName: 'Test User'
};

// Store tokens for later tests
let accessToken;
let refreshToken;

describe('Authentication API', () => {
  // Test registration
  test('should register a new user', async () => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_USER)
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(201);
    expect(data.message).toBe('User registered successfully');
    expect(data.user).toHaveProperty('id');
    expect(data.user.email).toBe(TEST_USER.email);
    expect(data.user.fullName).toBe(TEST_USER.fullName);
  });
  
  // Test login
  test('should login with valid credentials', async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_USER.email,
        password: TEST_USER.password
      })
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.message).toBe('Login successful');
    expect(data).toHaveProperty('accessToken');
    expect(data).toHaveProperty('refreshToken');
    
    // Save tokens for later tests
    accessToken = data.accessToken;
    refreshToken = data.refreshToken;
  });
  
  // Test invalid login
  test('should not login with invalid credentials', async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_USER.email,
        password: 'wrongpassword'
      })
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(401);
    expect(data).toHaveProperty('error');
  });
  
  // Test token refresh
  test('should refresh access token with valid refresh token', async () => {
    // Skip test if refresh token is not available
    if (!refreshToken) {
      console.warn('Skipping refresh token test because no refresh token is available');
      return;
    }
    
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.message).toBe('Token refreshed successfully');
    expect(data).toHaveProperty('accessToken');
    
    // Update access token
    accessToken = data.accessToken;
  });
  
  // Test user profile access with token
  test('should access user profile with valid token', async () => {
    // Skip test if access token is not available
    if (!accessToken) {
      console.warn('Skipping profile access test because no access token is available');
      return;
    }
    
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${accessToken}` 
      }
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('user');
    expect(data.user.email).toBe(TEST_USER.email);
  });
  
  // Test logout
  test('should logout successfully', async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${accessToken}` 
      }
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.message).toBe('Logged out successfully');
  });
}); 