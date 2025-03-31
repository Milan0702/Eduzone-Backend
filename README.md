# Eduzone Contact Form Backend

This is the backend server for the Eduzone contact form application. It provides APIs for handling contact form submissions and user authentication.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas (Cloud Database)
- JWT for Authentication
- bcryptjs for Password Hashing
- CORS for Cross-Origin Resource Sharing

## Prerequisites

Before running this application, make sure you have:

- Node.js installed (v12 or higher)
- MongoDB Atlas account
- npm (Node Package Manager)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
```

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd contact-form-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Database Configuration

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your IP address to the IP Access List
4. Create a database user with read/write permissions
5. Get your connection string and update it in the `.env` file

## Available Scripts

- Start development server:
  ```bash
  npm run dev
  ```
- Start production server:
  ```bash
  npm start
  ```

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string"
  }
  ```

### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

## Error Handling

The API implements proper error handling for:
- Invalid requests
- Database connection issues
- Authentication errors
- Validation errors

## Security Features

- Password hashing using bcryptjs
- JWT-based authentication
- CORS protection
- Environment variables for sensitive data
- MongoDB Atlas security features

## Development

For development, the server uses nodemon for automatic reloading when files change.

## Production

For production deployment:
1. Update the `CLIENT_URL` in `.env` to your frontend domain
2. Use proper environment variables for production
3. Ensure all security measures are in place
4. Use a process manager like PM2 (optional)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.
