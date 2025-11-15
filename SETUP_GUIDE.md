# LocalSkill Exchange - Setup Guide

## ✅ What Has Been Created

This project has been fully scaffolded with:

### Backend (Complete)
- ✅ Express.js server with all API routes
- ✅ MongoDB models (User, Listing, Booking, Review, Message, Favorite)
- ✅ Authentication system (JWT, email verification, password reset)
- ✅ File upload handling (Cloudinary integration)
- ✅ All CRUD operations for listings, bookings, reviews
- ✅ Messaging system
- ✅ Admin routes
- ✅ Error handling and validation
- ✅ Security middleware (Helmet, rate limiting)

### Frontend (Complete)
- ✅ React application with Vite
- ✅ Tailwind CSS styling
- ✅ All main pages (Home, Browse, Login, Register, Dashboard, Profile, Messages, Listing Detail, Create Listing)
- ✅ Authentication context and protected routes
- ✅ API integration with Axios
- ✅ Responsive design
- ✅ Toast notifications

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/localskill-exchange
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@localskillexchange.com
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

### 3. Database Setup

**Option 1: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Update `MONGODB_URI` in backend `.env`

**Option 2: MongoDB Atlas (Recommended)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update `MONGODB_URI` in backend `.env`

### 4. Cloudinary Setup (For Image Uploads)

1. Create account at https://cloudinary.com
2. Get your Cloud Name, API Key, and API Secret
3. Add them to backend `.env`

### 5. Email Setup (For Email Verification)

**Gmail Setup:**
1. Enable 2-factor authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `EMAIL_PASS`

**Alternative: SendGrid**
- Create account at https://sendgrid.com
- Get API key
- Update email configuration in backend

## 📝 Next Steps

1. **Install Dependencies**: Run `npm install` in both backend and frontend directories
2. **Configure Environment Variables**: Set up all `.env` files
3. **Start Development Servers**: Run both backend and frontend
4. **Test the Application**: 
   - Register a new account
   - Create a listing (as teacher)
   - Browse listings
   - Book a session
   - Leave a review

## 🔧 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running (if local)
- Check connection string in `.env`
- Verify network access (if using Atlas)

### Cloudinary Upload Fails
- Verify Cloudinary credentials in `.env`
- Check file size limits (max 5MB)
- Ensure images are valid formats (jpg, png, webp)

### Email Not Sending
- Verify email credentials
- Check if using App Password (Gmail)
- Check spam folder
- Verify SMTP settings

### CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `server.js`

## 📚 Features to Test

1. **Authentication**
   - Register new user
   - Login/Logout
   - Email verification
   - Password reset

2. **Listings**
   - Create listing (as teacher)
   - Browse listings
   - Search and filter
   - View listing details
   - Add to favorites

3. **Bookings**
   - Request booking
   - Confirm booking (as teacher)
   - Cancel booking
   - Complete session

4. **Reviews**
   - Leave review after completed session
   - View reviews on profile

5. **Messaging**
   - Send messages
   - View message threads

6. **Profile**
   - Update profile
   - Upload avatar
   - View listings and reviews

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js` in frontend
- **Styling**: Modify components in `frontend/src/components`
- **API Routes**: Add new routes in `backend/routes`
- **Database Models**: Modify models in `backend/models`

## 📦 Deployment

See main `README.md` for deployment instructions to:
- Backend: Render, Heroku, or Railway
- Frontend: Vercel or Netlify
- Database: MongoDB Atlas

## 🐛 Troubleshooting

If you encounter issues:
1. Check console logs (both frontend and backend)
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check MongoDB connection
5. Verify API endpoints are accessible

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

**Note**: This is a foundational project. You can extend it with:
- Real-time messaging (WebSockets)
- Payment integration (Stripe)
- Advanced search (Elasticsearch)
- Map integration (Google Maps)
- Video calls (WebRTC)
- And more!

