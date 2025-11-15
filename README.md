# LocalSkill Exchange

A full-stack MERN (MongoDB, Express, React, Node.js) skill-sharing marketplace platform where users can teach and learn skills in their local community.

## Features

- 🔐 **Authentication & Authorization**: JWT-based auth with email verification and password reset
- 📚 **Skill Listings**: Teachers can create, edit, and manage skill listings
- 🔍 **Search & Discovery**: Advanced search, filtering, and sorting capabilities
- 📅 **Booking System**: Learners can book sessions with teachers
- ⭐ **Reviews & Ratings**: Rating and review system for completed sessions
- 💬 **Messaging**: In-app messaging between learners and teachers
- ❤️ **Favorites**: Save favorite listings for quick access
- 👤 **User Profiles**: Comprehensive user profiles with ratings and reviews
- 🎛️ **Admin Panel**: Admin dashboard for platform management
- 📱 **Responsive Design**: Mobile-first responsive design with Tailwind CSS

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for image uploads
- Nodemailer for emails
- Express Validator for validation

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Headless UI
- Axios for API calls
- React Hot Toast for notifications

## Project Structure

```
project-1/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context providers
│   │   ├── utils/       # Utility functions
│   │   └── App.jsx      # Main App component
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Email service (Gmail or SendGrid for email verification)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/localskill-exchange
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/localskill-exchange

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this
JWT_REFRESH_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@localskillexchange.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/avatar` - Upload avatar
- `GET /api/users/:id/listings` - Get user's listings
- `GET /api/users/:id/reviews` - Get user's reviews

### Listings
- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (teacher only)
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing
- `POST /api/listings/:id/favorite` - Add to favorites
- `DELETE /api/listings/:id/favorite` - Remove from favorites
- `GET /api/listings/favorites` - Get user's favorites

### Bookings
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/confirm` - Confirm booking (teacher)
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `PUT /api/bookings/:id/complete` - Mark as completed

### Reviews
- `GET /api/reviews/user/:userId` - Get reviews for a user
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Messages
- `GET /api/messages/threads` - Get message threads
- `GET /api/messages/:threadId` - Get messages in thread
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark as read

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/listings` - Get all listings
- `PUT /api/admin/listings/:id/flag` - Flag/remove listing
- `PUT /api/admin/users/:id/suspend` - Suspend user

## Environment Variables

See `.env.example` files in both backend and frontend directories for required environment variables.

## Deployment

### Backend (Render/Heroku)
1. Push code to GitHub
2. Connect repository to Render/Heroku
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Set environment variables
6. Deploy

### Database
- Use MongoDB Atlas for cloud database
- Update `MONGODB_URI` in backend `.env`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Built as a portfolio project demonstrating full-stack MERN development skills.

