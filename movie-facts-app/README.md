# Movie Facts App

A web application that allows users to sign in with Google, set their favorite movie, and get interesting AI-generated facts about it.

## Features

- **Google Authentication**: Secure sign-in using Google OAuth
- **User Onboarding**: First-time users are asked for their favorite movie
- **Dashboard**: Displays user information and AI-generated movie facts
- **Movie Facts**: OpenAI-powered interesting facts that change on each refresh
- **Logout**: Secure logout functionality

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Google Provider
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI API for generating movie facts

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 18 or higher)
2. **PostgreSQL** database running
3. **Google OAuth credentials** (Client ID and Client Secret)
4. **OpenAI API key**

## Setup Instructions

### Step 1: Install Dependencies

First, make sure you have Node.js installed on your computer. Then run:

```bash
npm install
```

### Step 2: Get Your Database (Supabase PostgreSQL)

**What is Supabase?** It's a free service that gives you a PostgreSQL database in the cloud.

1. **Sign up for Supabase:**

   - Go to [supabase.com](https://supabase.com/)
   - Click "Start your project"
   - Sign up with your email or GitHub account (it's free!)

2. **Create a new project:**

   - Click "New Project"
   - Choose your organization (or create one)
   - Give your project a name like "movie-facts-db"
   - Create a strong password and save it somewhere safe
   - Choose a region close to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

3. **Get your database connection string:**
   - In your Supabase dashboard, click "Settings" (gear icon) in the left sidebar
   - Click "Database"
   - Scroll down to "Connection string" section
   - Copy the "URI" connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)
   - **Important**: Replace `[YOUR-PASSWORD]` with the actual password you created earlier

### Step 3: Get OpenAI API Key

**What is OpenAI?** It's the service that creates the movie facts using AI.

1. **Sign up for OpenAI:**

   - Go to [platform.openai.com](https://platform.openai.com/)
   - Click "Sign up" and create an account

2. **Add payment method:**

   - Go to "Billing" in your dashboard
   - Add a credit card (don't worry, usage for this app will be very cheap - usually under $1)

3. **Create an API key:**
   - Go to "API keys" in the left menu
   - Click "Create new secret key"
   - Give it a name like "movie-facts-app"

### Step 4: Get Google OAuth Credentials

**What is Google OAuth?** It lets users sign in with their Google account instead of creating new passwords.

1. **Go to Google Cloud Console:**

   - Visit [console.cloud.google.com](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create a new project:**

   - Click the project dropdown at the top
   - Click "New Project"
   - Name it "movie-facts-app"
   - Click "Create"

3. **Enable Google+ API:**
4. **Set up OAuth consent screen:**

   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" and click "Create"
   - Fill in required fields:
     - App name: "Movie Facts App"
     - User support email: your email
     - Developer contact: your email
   - Click "Save and Continue" through all steps

5. **Create OAuth credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"

### Step 7: Set Up the Database Tables

Run these commands to create the necessary database tables:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Step 7: Run the Application

Start the development server:

```bash
npm run dev
```

Open your browser and go to: `http://localhost:3000`

## Troubleshooting

**"Database connection failed"** → Double-check your DATABASE_URL is correct and includes your password

**"Google sign-in not working"** → Make sure you added the correct redirect URI in Google Cloud Console

**"OpenAI API error"** → Check that your API key is correct and you have credits/billing set up

**"Environment variables not found"** → Make sure your `.env.local` file is in the root folder of your project

## Database Schema

The app uses the following models:

- **User**: Stores user information including favorite movie
- **Account**: NextAuth account data
- **Session**: NextAuth session data
- **VerificationToken**: NextAuth verification tokens

## Usage Flow

1. **First Visit**: Users are redirected to the Google sign-in page
2. **Authentication**: After successful Google login, new users go to onboarding
3. **Onboarding**: Users enter their favorite movie (first time only)
4. **Dashboard**: Users see their profile info and AI-generated movie facts
5. **Refresh Facts**: Click "New Fact" to get different interesting facts
6. **Logout**: Users can securely log out and will be redirected to sign-in

## API Endpoints

- `GET /api/auth/*` - NextAuth authentication endpoints
- `POST /api/user/favorite-movie` - Save user's favorite movie
- `GET /api/movie-fact` - Get AI-generated movie fact

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npx prisma studio` - Open Prisma database browser

## Security Features

- Protected routes with NextAuth middleware
- Server-side session validation
- Secure environment variable handling
- CSRF protection via NextAuth
