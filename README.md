# FarmDirect Backend

A backend API for the FarmDirect platform, connecting farmers directly with consumers.

## Features

- **Authentication System**: Complete user authentication with JWT tokens
- **User Management**: User profiles, farmer profiles, and consumer profiles
- **Product Management**: Complete CRUD for managing farm products
- **Order Management**: Order processing and tracking
- **Role-Based Access Control**: Different permissions for farmers, consumers, and admins

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sanjithdoescode/farmdirect.git
   cd farmdirect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/farmdirect
   JWT_SECRET=your-secret-key-change-in-production
   JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and get access tokens
- **POST /api/auth/refresh** - Refresh access token
- **POST /api/auth/logout** - Logout and invalidate tokens

### User Profiles

- **GET /api/users/profile** - Get user profile
- **PUT /api/users/profile** - Update user profile

### Farmer Profiles

- **GET /api/farmer/profile** - Get farmer profile
- **POST /api/farmer/profile** - Create or update farmer profile
- **PUT /api/farmer/profile** - Update farmer profile

### Consumer Profiles

- **GET /api/consumer/profile** - Get consumer profile
- **POST /api/consumer/profile** - Create or update consumer profile
- **PUT /api/consumer/profile** - Update consumer profile

### Products

- **GET /api/products** - List products (with filtering and pagination)
- **POST /api/products** - Create a new product
- **GET /api/products/:id** - Get a specific product
- **PUT /api/products/:id** - Update a product
- **DELETE /api/products/:id** - Delete a product

## Testing

Run all tests:
```bash
npm test
```

Run specific tests:
```bash
npm test -- tests/api/auth.test.js
```

## Manual Testing

You can use cURL to test the endpoints manually. Example:

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","fullName":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
