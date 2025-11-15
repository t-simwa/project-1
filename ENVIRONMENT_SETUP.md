# Environment Variables & Services Setup Guide

This guide will walk you through setting up all the required environment variables and services for LocalSkill Exchange.

---

## Step 1: Create Environment Variable Files

### Backend `.env` File

1. Navigate to the `backend` folder
2. Create a new file named `.env` (not `.env.example`)
3. Copy and paste the following template:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/localskill-exchange

# JWT Secrets (IMPORTANT: Change these to random strings in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-min-32-chars
JWT_REFRESH_EXPIRE=7d

# Cloudinary (Image Upload Service)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@localskillexchange.com

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env` File

1. Navigate to the `frontend` folder
2. Create a new file named `.env`
3. Copy and paste the following:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Step 2: Set Up MongoDB

### Option A: MongoDB Atlas (Cloud - Recommended for Beginners)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a Cluster**
   - After logging in, click "Build a Database"
   - Choose the FREE tier (M0 Sandbox)
   - Select a cloud provider and region (choose closest to you)
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (SAVE THESE!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
   - Replace `<password>` with your database user password
   - Add your database name at the end: `mongodb+srv://username:password@cluster.mongodb.net/localskill-exchange`

6. **Update Backend `.env`**
   - Open `backend/.env`
   - Replace `MONGODB_URI` with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/localskill-exchange?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB

1. **Install MongoDB**
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: Follow instructions at https://docs.mongodb.com/manual/installation/

2. **Start MongoDB Service**
   - Windows: MongoDB should start automatically as a service
   - Mac/Linux: `brew services start mongodb-community` or `sudo systemctl start mongod`

3. **Verify Installation**
   - Open terminal and run: `mongosh` or `mongo`
   - If it connects, MongoDB is running

4. **Update Backend `.env`**
   - The default connection string should work:
   ```env
   MONGODB_URI=mongodb://localhost:27017/localskill-exchange
   ```

---

## Step 3: Set Up Cloudinary (Image Uploads)

1. **Create Account**
   - Go to https://cloudinary.com/users/register/free
   - Sign up for a free account

2. **Get Your Credentials**
   - After signing up, you'll be taken to the Dashboard
   - You'll see your credentials displayed:
     - Cloud Name
     - API Key
     - API Secret

3. **Update Backend `.env`**
   - Open `backend/.env`
   - Replace the Cloudinary values:
   ```env
   CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
   CLOUDINARY_API_KEY=your-actual-api-key
   CLOUDINARY_API_SECRET=your-actual-api-secret
   ```

**Note:** The free tier includes:
- 25GB storage
- 25GB bandwidth per month
- Perfect for development and small projects

---

## Step 4: Set Up Email Service

### Option A: Gmail (Easiest for Development)

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification" if not already enabled

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "LocalSkill Exchange" as the name
   - Click "Generate"
   - **COPY THE 16-CHARACTER PASSWORD** (you won't see it again!)

3. **Update Backend `.env`**
   - Open `backend/.env`
   - Update email settings:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   EMAIL_FROM=noreply@localskillexchange.com
   ```

### Option B: SendGrid (More Professional)

1. **Create Account**
   - Go to https://signup.sendgrid.com/
   - Sign up for a free account (100 emails/day free)

2. **Verify Your Account**
   - Check your email and verify your account
   - Complete the setup wizard

3. **Create API Key**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name it "LocalSkill Exchange"
   - Choose "Full Access" or "Restricted Access" with Mail Send permissions
   - Click "Create & View"
   - **COPY THE API KEY** (you won't see it again!)

4. **Verify Sender Identity** (Optional but recommended)
   - Go to Settings → Sender Authentication
   - Verify a Single Sender (your email address)

5. **Update Backend `.env`**
   - Open `backend/.env`
   - Update email settings:
   ```env
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key-here
   EMAIL_FROM=your-verified-email@example.com
   ```

---

## Step 5: Generate JWT Secrets

You need to generate secure random strings for JWT secrets. Here are a few ways:

### Option A: Using Node.js (Recommended)
1. Open terminal in the `backend` folder
2. Run:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. Run it twice to get two different secrets
4. Copy the outputs to your `.env` file

### Option B: Online Generator
- Go to https://randomkeygen.com/
- Use "CodeIgniter Encryption Keys" or "Fort Knox Passwords"
- Copy two different 32+ character strings

### Option C: Manual (Less Secure)
- Create two long random strings (at least 32 characters)
- Mix of letters, numbers, and special characters

**Update Backend `.env`:**
```env
JWT_SECRET=paste-your-first-secret-here
JWT_REFRESH_SECRET=paste-your-second-secret-here
```

---

## Step 6: Verify Your Setup

### Check Your Files

1. **Backend `.env`** should have all values filled:
   ```bash
   cd backend
   # On Windows (PowerShell):
   Get-Content .env
   # On Mac/Linux:
   cat .env
   ```

2. **Frontend `.env`** should have:
   ```bash
   cd frontend
   cat .env
   # Should show: VITE_API_URL=http://localhost:5000/api
   ```

### Test the Setup

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   - Should see: "✅ MongoDB connected successfully"
   - Should see: "🚀 Server running on port 5000"

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   - Should open at http://localhost:3000

3. **Test Registration:**
   - Go to http://localhost:3000/register
   - Create an account
   - Check your email for verification (if email is set up)

---

## Troubleshooting

### MongoDB Connection Issues
- **Error: "MongoServerError: bad auth"**
  - Check username/password in connection string
  - Verify database user has correct permissions

- **Error: "MongooseServerSelectionError"**
  - Check if MongoDB is running (local)
  - Verify network access (Atlas) - IP should be whitelisted
  - Check connection string format

### Cloudinary Issues
- **Error: "Invalid API Key"**
  - Double-check credentials in `.env`
  - Ensure no extra spaces in values

### Email Issues
- **Gmail: "Invalid login"**
  - Make sure you're using App Password, not regular password
  - Verify 2FA is enabled

- **No emails received**
  - Check spam folder
  - Verify EMAIL_USER and EMAIL_PASS are correct
  - Check email service logs

### JWT Issues
- **Error: "jwt malformed"**
  - Ensure JWT_SECRET is set and is a long random string
  - Don't use default values in production

---

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` files to Git (they're in `.gitignore`)
- Use different secrets for development and production
- Keep your secrets secure and private
- Rotate secrets periodically in production

---

## Quick Reference Checklist

- [ ] Created `backend/.env` with all values
- [ ] Created `frontend/.env` with API URL
- [ ] Set up MongoDB (Atlas or local)
- [ ] Updated `MONGODB_URI` in backend `.env`
- [ ] Created Cloudinary account
- [ ] Updated Cloudinary credentials in backend `.env`
- [ ] Set up email service (Gmail or SendGrid)
- [ ] Updated email credentials in backend `.env`
- [ ] Generated JWT secrets
- [ ] Updated JWT secrets in backend `.env`
- [ ] Tested backend server starts successfully
- [ ] Tested frontend server starts successfully

---

## Need Help?

If you encounter issues:
1. Check the error messages in the console
2. Verify all environment variables are set correctly
3. Ensure all services are running/accessible
4. Check the troubleshooting section above

Good luck! 🚀

