# Referral API System

A Node.js backend API for managing user referrals with authentication, email notifications, and secure token management.

## Features

- User Authentication
  - Register with email verification
  - Login with JWT tokens
  - Password reset functionality
- Referral System
  - Generate unique referral codes
  - Track referral statistics
  - Referral status management
- Security Features
  - JWT token authentication
  - Rate limiting
  - Password hashing
  - Secure cookie handling
- Email Notifications
  - Welcome emails
  - Password reset emails
  - Referral confirmation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Security**: bcryptjs, express-rate-limit
- **Validation**: express-validator

## Project Structure

src/
├── config/
│ └── config.js # Configuration management
├── controllers/
│ ├── auth.controller.js # Authentication logic
│ └── referral.controller.js # Referral system logic
├── middleware/
│ ├── auth.middleware.js # JWT verification
│ └── validation.middleware.js # Input validation
├── models/
│ ├── user.model.js # User schema
│ └── referral.model.js # Referral schema
├── routes/
│ ├── auth.routes.js # Authentication routes
│ └── referral.routes.js # Referral routes
├── utils/
│ ├── emailService.js # Email functionality
│ └── jwtUtils.js # JWT helpers
└── server.js # Application entry point
json
{
"success": false,
"message": "Error description",
"error": "Detailed error info (development only)"
}
To add this README to your repository:
This README provides:
Clear project overview
Setup instructions
API documentation
Testing guidelines
Project structure
Security features
Error handling information
Would you like me to explain any section in more detail?


## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/referal_api.git
   cd referal_api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/referal_DB
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=24h
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   FRONTEND_URL=http://localhost:3000
   ```

4. **Setup Email Service**
   - Enable 2-Step Verification in your Google Account
   - Generate App Password:
     - Go to Google Account Settings
     - Security
     - App Passwords
     - Generate new app password
     - Use this password in EMAIL_PASS environment variable

5. **Start MongoDB**
   ```bash
   # Windows (Run as Administrator)
   net start MongoDB

   # Linux/Mac
   sudo service mongod start
   ```

6. **Run the Application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes
- **Register User**
  ```http
  POST /api/auth/register
  Content-Type: application/json

  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "referralCode": "ABC123" // optional
  }
  ```

- **Login**
  ```http
  POST /api/auth/login
  Content-Type: application/json

  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

- **Forgot Password**
  ```http
  POST /api/auth/forgot-password
  Content-Type: application/json

  {
    "email": "test@example.com"
  }
  ```

### Referral Routes
- **Get User's Referrals**
  ```http
  GET /api/referral
  Authorization: Bearer <jwt_token>
  ```

- **Get Referral Statistics**
  ```http
  GET /api/referral/stats
  Authorization: Bearer <jwt_token>
  ```

## Testing

Use Postman or any API testing tool:

1. **Register a New User**
   - Send POST request to `/api/auth/register`
   - Save the returned referral code

2. **Login**
   - Send POST request to `/api/auth/login`
   - Save the JWT token

3. **Register Another User with Referral**
   - Use the first user's referral code
   - Verify referral in the response

4. **Check Referral Stats**
   - Use JWT token in Authorization header
   - Send GET request to `/api/referral/stats`

## Security Features

- Password Hashing (bcryptjs)
- JWT Token Authentication
- Rate Limiting
- Input Validation
- Secure Cookie Options
- CORS Protection

## Error Handling

The API returns structured error responses:

json
{
"success": false,
"message": "Error description",
"error": "Detailed error info (development only)"
}

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
